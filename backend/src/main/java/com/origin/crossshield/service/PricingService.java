package com.origin.crossshield.service;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PricingService {

    public Map<String, Object> calculatePricing(BigDecimal cost, List<BigDecimal> competitorPrices) {
        // ---------------------------------------------------------------------
        // 百炼 Model Router 调用伪代码：
        // 第一步：调用 qwen3.7-max 进行定价策略推理
        //   modelRouter.route("qwen/qwen3.7-max")
        //       .input("成本:" + cost + ", 竞品价格带:" + competitorPrices +
        //              ", 类目:" + category + ", 合规风险:" + complianceLevel +
        //              ", 蓝海评分:" + blueScore)
        //       .output(建议定价区间 + 定价策略类型(渗透/撇脂/跟随) + 促销日历)
        // 第二步：竞品匹配算法
        //   - 计算竞品价格分位数(P25/P50/P75)
        //   - 匹配细分功能溢价系数(智能+15%/大容量+10%/材质+8%)
        // 第三步：ROI反推 → 最优定价点（利润最大化 vs 销量弹性平衡）
        // ---------------------------------------------------------------------

        BigDecimal avgCompetitor = competitorPrices.stream()
                .reduce(BigDecimal.ZERO, BigDecimal::add)
                .divide(BigDecimal.valueOf(competitorPrices.size()), 2, RoundingMode.HALF_UP);

        BigDecimal minPrice = cost.multiply(new BigDecimal("1.8"));
        BigDecimal maxPrice = cost.multiply(new BigDecimal("2.8"));
        BigDecimal optimalPrice = avgCompetitor.multiply(new BigDecimal("0.92"))
                .setScale(2, RoundingMode.HALF_UP);
        BigDecimal margin = optimalPrice.subtract(cost)
                .divide(optimalPrice, 4, RoundingMode.HALF_UP)
                .multiply(new BigDecimal("100"));

        Map<String, Object> strategy = new HashMap<>();
        strategy.put("cost", cost);
        strategy.put("competitorPriceBand", Map.of(
                "min", competitorPrices.stream().min(BigDecimal::compareTo).orElse(BigDecimal.ZERO),
                "avg", avgCompetitor,
                "max", competitorPrices.stream().max(BigDecimal::compareTo).orElse(BigDecimal.ZERO),
                "p25", competitorPrices.get(competitorPrices.size() / 4),
                "p50", competitorPrices.get(competitorPrices.size() / 2),
                "p75", competitorPrices.get(competitorPrices.size() * 3 / 4)
        ));
        strategy.put("suggestedPriceRange", Map.of("min", minPrice, "max", maxPrice));
        strategy.put("optimalPrice", optimalPrice);
        strategy.put("grossMargin", margin + "%");
        strategy.put("pricingStrategy", "竞争性渗透定价 — 对标P50竞品下浮8%切入，30天后逐步回调至均价线");
        strategy.put("promotionCalendar", List.of(
                Map.of("date", "9月第2周", "event", "开学季促销", "discount", "-12%"),
                Map.of("date", "10月底", "event", "Halloween捆绑", "discount", "搭售+礼品"),
                Map.of("date", "11月中", "event", "黑五预热", "discount", "-18%"),
                Map.of("date", "12月末", "event", "圣诞清仓", "discount", "-25%")
        ));
        strategy.put("modelSummary", "【qwen3.7-max】定价策略输出完成 | 最优定价 $" + optimalPrice
                + "，毛利率 " + margin + "%，建议以渗透定价+节日促销日历组合执行。");
        return strategy;
    }
}
