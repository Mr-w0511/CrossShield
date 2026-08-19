import { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import {
  Tag,
  DollarSign,
  Star,
  ShoppingCart,
  Eye,
  CalendarDays,
  TrendingDown,
  Zap,
  Gift,
  Flame,
  PartyPopper,
  Package,
  ChevronRight,
  Info,
} from 'lucide-react'
import pricingData from '@/data/pricing.json'
import ModelOutputCard from '@/components/ModelOutputCard'
import { PageLoader } from '@/components/LoadingSkeleton'
import { cn } from '@/lib/utils'

export default function Pricing() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 950)
    return () => clearTimeout(t)
  }, [])

  const scatterOption = {
    tooltip: {
      trigger: 'item',
      formatter: (p: any) => {
        const d = p.data[4]
        return `<div style="font-weight:600;margin-bottom:4px">${d.brand} · ${d.name.length > 18 ? d.name.slice(0, 18) + '...' : d.name}</div>
                <div>价格: <b>$${d.price}</b></div>
                <div>评分: <b>${d.rating || '新品'}</b> 星</div>
                <div>月销: <b>${d.sales ? d.sales.toLocaleString() : '0'}</b></div>
                ${d.isOur ? '<div style="color:#8b5cf6;font-weight:600;margin-top:4px">★ 我方产品</div>' : `BSR #${d.bsr}`}`
      }
    },
    grid: { left: 40, right: 20, top: 30, bottom: 40, containLabel: true },
    xAxis: {
      name: '价格 ($)', nameLocation: 'middle', nameGap: 25,
      type: 'value', min: 30, max: 170,
      axisLine: { lineStyle: { color: '#e4e4e7' } },
      splitLine: { lineStyle: { color: '#f4f4f5', type: 'dashed' } },
      axisLabel: { fontSize: 11, color: '#71717a', formatter: '${value}' }
    },
    yAxis: {
      name: '用户评分', nameLocation: 'middle', nameGap: 35,
      type: 'value', min: 3.5, max: 5,
      axisLine: { lineStyle: { color: '#e4e4e7' } },
      splitLine: { lineStyle: { color: '#f4f4f5', type: 'dashed' } },
      axisLabel: { fontSize: 11, color: '#71717a' }
    },
    series: [{
      type: 'scatter',
      symbolSize: (data: any) => Math.max(14, Math.sqrt(data[2]) / 1.8),
      data: pricingData.products.map(p => [
        p.price,
        p.rating || 4.0,
        Math.max(p.sales, 100),
        p.name,
        p
      ]),
      itemStyle: {
        color: (params: any) => params.data[4].isOur ? '#8b5cf6' : '#06b6d4',
        borderColor: '#fff',
        borderWidth: 2,
        shadowBlur: 8,
        shadowColor: (params: any) => params.data[4].isOur ? 'rgba(139,92,246,0.5)' : 'rgba(6,182,212,0.3)'
      },
      emphasis: {
        scale: 1.3,
        itemStyle: { shadowBlur: 18 }
      },
      markArea: {
        silent: true, itemStyle: { color: 'rgba(139,92,246,0.08)' },
        data: [[
          { name: '我方建议定价带', xAxis: 42, yAxis: 3.8, itemStyle: { borderWidth: 1.5, borderColor: '#8b5cf6', borderType: 'dashed', borderRadius: 4 } },
          { xAxis: 60, yAxis: 4.5 }
        ]]
      }
    }],
    graphic: [{
      type: 'text', left: '55%', top: '72%',
      style: { text: '★ 建议定价区', fill: '#8b5cf6', fontSize: 11, fontWeight: 600 }
    }]
  }

  const promoTypeMap: Record<string, { icon: typeof Zap; color: string; bg: string; grad: string }> = {
    launch: { icon: Rocket, color: 'text-violet-700 dark:text-violet-300', bg: 'bg-violet-50 dark:bg-violet-950/40 border-violet-200 dark:border-violet-800/50', grad: 'from-violet-500 to-indigo-500' },
    festival: { icon: PartyPopper, color: 'text-pink-700 dark:text-pink-300', bg: 'bg-pink-50 dark:bg-pink-950/40 border-pink-200 dark:border-pink-800/50', grad: 'from-pink-500 to-rose-500' },
    bfcm: { icon: Flame, color: 'text-red-700 dark:text-red-300', bg: 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800/50', grad: 'from-red-500 to-orange-500' },
    christmas: { icon: Gift, color: 'text-emerald-700 dark:text-emerald-300', bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/50', grad: 'from-emerald-500 to-teal-500' },
    season: { icon: Tag, color: 'text-sky-700 dark:text-sky-300', bg: 'bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800/50', grad: 'from-sky-500 to-blue-500' },
  }

  const bands = [
    { key: 'bargain', label: pricingData.priceDistribution.bargain.range, count: pricingData.priceDistribution.bargain.count, avg: pricingData.priceDistribution.bargain.avgRating, share: pricingData.priceDistribution.bargain.share, grad: 'from-zinc-400 to-zinc-500' },
    { key: 'value', label: pricingData.priceDistribution.value.range, count: pricingData.priceDistribution.value.count, avg: pricingData.priceDistribution.value.avgRating, share: pricingData.priceDistribution.value.share, grad: 'from-sky-400 to-blue-500', active: true },
    { key: 'mid', label: pricingData.priceDistribution.mid.range, count: pricingData.priceDistribution.mid.count, avg: pricingData.priceDistribution.mid.avgRating, share: pricingData.priceDistribution.mid.share, grad: 'from-violet-400 to-indigo-500' },
    { key: 'premium', label: pricingData.priceDistribution.premium.range, count: pricingData.priceDistribution.premium.count, avg: pricingData.priceDistribution.premium.avgRating, share: pricingData.priceDistribution.premium.share, grad: 'from-amber-400 to-orange-500' },
  ]

  if (loading) {
    return (
      <div className="space-y-5">
        <div>
          <h1 className="text-[22px] font-semibold mb-1 flex items-center gap-2"><Tag /> 对标定价</h1>
          <p className="text-sm text-muted-foreground">{pricingData.category} · {pricingData.targetMarket}</p>
        </div>
        <PageLoader />
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Tag className="w-5 h-5 text-violet-600" />
            <h1 className="text-[22px] font-semibold tracking-tight">对标定价策略中心</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold">{pricingData.category}</span>
            <span className="mx-1.5">·</span>
            <span>{pricingData.targetMarket}</span>
            <span className="mx-1.5">·</span>
            <span>竞品矩阵回归分析</span>
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1.5 rounded-lg bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 font-semibold flex items-center gap-1">
            <ShoppingCart className="w-3.5 h-3.5" /> 样本 {pricingData.products.length - 1} 款竞品
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {bands.map(b => (
          <div key={b.key} className={cn(
            'rounded-2xl border p-5 transition-all duration-300',
            b.active
              ? 'border-violet-300 dark:border-violet-700 bg-gradient-to-br from-violet-50/80 to-white dark:from-violet-950/40 dark:to-card shadow-lg shadow-violet-500/10 ring-2 ring-violet-500/20'
              : 'border-border bg-card hover:shadow-md'
          )}>
            <div className="flex items-center justify-between mb-3">
              <span className={cn('text-[11px] font-bold px-2 py-0.5 rounded text-white bg-gradient-to-r', b.grad)}>
                {b.label}
              </span>
              {b.active && (
                <span className="text-[10px] font-bold text-violet-700 dark:text-violet-300 bg-white dark:bg-black/20 px-1.5 py-0.5 rounded">
                  ★ 目标区间
                </span>
              )}
            </div>
            <div className="text-2xl font-bold mb-0.5 tracking-tight">{b.count}<span className="text-sm font-normal text-muted-foreground"> 款</span></div>
            <div className="text-xs text-muted-foreground mb-3">竞品数量 · 占比 {b.share}</div>
            <div className="flex items-center justify-between pt-2.5 border-t border-border/60">
              <span className="text-[11px] text-muted-foreground">均分</span>
              <span className="flex items-center gap-0.5 text-[13px] font-bold">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {b.avg}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h3 className="text-[15px] font-semibold flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-violet-500" /> 价格-评分-销量气泡图
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">气泡大小 = 月销量；紫色=我方占位产品</p>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-sky-400 border-2 border-white shadow-sm" /> 竞品
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-violet-500 border-2 border-white shadow-sm" /> 我方
              </span>
            </div>
          </div>
          <div className="h-[340px]">
            <ReactECharts option={scatterOption} style={{ height: '100%', width: '100%' }} notMerge lazyUpdate />
          </div>
        </div>

        <div className="lg:col-span-2 rounded-2xl border border-border bg-card overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="text-[15px] font-semibold flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500" /> 竞品核心对标表
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">含品牌/价格/评分/BSR综合对比</p>
          </div>
          <div className="max-h-[400px] overflow-auto scrollbar-thin">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-muted/60 backdrop-blur-sm z-10">
                <tr className="text-[11px] text-muted-foreground text-left">
                  <th className="px-4 py-2.5 font-semibold whitespace-nowrap">品牌/产品</th>
                  <th className="px-4 py-2.5 font-semibold">价格</th>
                  <th className="px-4 py-2.5 font-semibold">评分</th>
                  <th className="px-4 py-2.5 font-semibold whitespace-nowrap">月销/BSR</th>
                </tr>
              </thead>
              <tbody>
                {pricingData.products.map(p => (
                  <tr key={p.id} className={cn(
                    'border-t border-border/50 transition-colors',
                    p.isOur
                      ? 'bg-gradient-to-r from-violet-50/70 to-transparent dark:from-violet-950/30 hover:from-violet-100/70 dark:hover:from-violet-950/50'
                      : 'hover:bg-muted/40'
                  )}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className={cn(
                          'w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0',
                          p.isOur
                            ? 'bg-gradient-to-br from-violet-500 to-indigo-500 text-white shadow-md shadow-violet-500/30'
                            : 'bg-muted text-muted-foreground'
                        )}>
                          {p.image}
                        </div>
                        <div className="min-w-0">
                          <div className={cn(
                            'text-[12.5px] font-semibold truncate max-w-[160px]',
                            p.isOur && 'text-violet-700 dark:text-violet-300'
                          )}>
                            {p.name}
                            {p.isOur && <span className="ml-1.5 text-[10px]">★ NEW</span>}
                          </div>
                          <div className="text-[10.5px] text-muted-foreground">{p.brand}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        'text-[14px] font-bold',
                        p.isOur ? 'text-violet-600 dark:text-violet-400' : 'text-card-foreground'
                      )}>
                        ${p.price}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {p.rating > 0 ? (
                        <div className="flex items-center gap-1">
                          <span className="flex items-center gap-0.5">
                            {Array.from({ length: Math.floor(p.rating) }).map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                            ))}
                          </span>
                          <span className="text-[12px] font-semibold">{p.rating}</span>
                        </div>
                      ) : (
                        <span className="text-[11px] font-semibold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 px-1.5 py-0.5 rounded">待积累</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-[12.5px] font-semibold text-card-foreground/90">
                        {p.sales ? p.sales.toLocaleString() : '—'}
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        {p.bsr ? `BSR #${p.bsr}` : '上架中'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ModelOutputCard model="qwen" title="定价策略与首月促销建议">
          {pricingData.priceSuggestion}
        </ModelOutputCard>
        <ModelOutputCard model="vl" title="竞品主图视觉拆解与我方优化建议">
          {pricingData.visualAnalysis}
        </ModelOutputCard>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-4">
          <div>
            <h3 className="text-[15px] font-semibold flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-violet-500" /> 6个月上市促销节奏日历
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">冷启动 → 旺季爆发 → 稳定盈利全生命周期节奏</p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5" /> 总推广预算 ${pricingData.promoCalendar.reduce((s, p) => s + parseInt(p.budget.replace(/[$,]/g, '')), 0).toLocaleString()}
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-[26px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-violet-200 via-sky-200 to-emerald-200 dark:from-violet-800 dark:via-sky-800 dark:to-emerald-800 rounded-full" />

          <div className="space-y-4">
            {pricingData.promoCalendar.map((p, i) => {
              const cfg = promoTypeMap[p.type as keyof typeof promoTypeMap]
              const Icon = cfg.icon
              return (
                <div key={i} className="relative pl-16">
                  <div className={cn('absolute left-[10px] top-2 w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-md ring-4 ring-card z-10 bg-gradient-to-br', cfg.grad)}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className={cn('rounded-xl border p-4 transition-all hover:shadow-lg', cfg.bg)}>
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-2.5">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[13px] font-bold font-mono text-card-foreground/70">{p.month}</span>
                        <span className={cn('text-[12px] font-bold px-2 py-0.5 rounded-md', cfg.color, 'bg-white/70 dark:bg-black/20')}>
                          {p.event}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-2 py-1 rounded-md bg-card/80 font-semibold flex items-center gap-1 text-muted-foreground">
                          <DollarSign className="w-3 h-3" /> 预算 {p.budget}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                      <div className="rounded-lg bg-card/70 dark:bg-black/20 p-3">
                        <div className="flex items-center gap-1 mb-1">
                          <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
                          <span className="text-[10.5px] font-semibold text-muted-foreground">价格策略</span>
                        </div>
                        <p className="text-xs font-bold text-card-foreground/90">{p.discount}</p>
                      </div>
                      <div className="rounded-lg bg-card/70 dark:bg-black/20 p-3">
                        <div className="flex items-center gap-1 mb-1">
                          <Tag className="w-3.5 h-3.5 text-sky-500" />
                          <span className="text-[10.5px] font-semibold text-muted-foreground">叠加优惠券</span>
                        </div>
                        <p className="text-xs font-bold text-card-foreground/90">{p.coupon}</p>
                      </div>
                      <div className="rounded-lg bg-gradient-to-r from-violet-500/10 to-indigo-500/10 dark:from-violet-950/30 dark:to-indigo-950/30 p-3 border border-violet-200/50 dark:border-violet-800/30">
                        <div className="flex items-center gap-1 mb-1">
                          <Info className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
                          <span className="text-[10.5px] font-semibold text-violet-700 dark:text-violet-400">阶段目标</span>
                        </div>
                        <p className="text-xs font-bold text-violet-800 dark:text-violet-300">{p.goal}</p>
                      </div>
                    </div>

                    {i < pricingData.promoCalendar.length - 1 && (
                      <div className="hidden md:flex items-center justify-end gap-1 pt-1">
                        <span className="text-[10px] text-muted-foreground mr-1">进入下一阶段</span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
