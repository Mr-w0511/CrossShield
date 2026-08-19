package com.origin.crossshield.controller;

import com.origin.crossshield.model.Result;
import com.origin.crossshield.service.PricingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pricing")
public class PricingController {

    @Autowired
    private PricingService pricingService;

    @PostMapping("/calculate")
    public Result<Map<String, Object>> calculatePricing(@RequestBody Map<String, Object> request) {
        BigDecimal cost = new BigDecimal(request.get("cost").toString());
        @SuppressWarnings("unchecked")
        List<BigDecimal> competitorPrices = ((List<Object>) request.get("competitorPrices"))
                .stream()
                .map(o -> new BigDecimal(o.toString()))
                .toList();
        Map<String, Object> strategy = pricingService.calculatePricing(cost, competitorPrices);
        return Result.ok(strategy);
    }
}
