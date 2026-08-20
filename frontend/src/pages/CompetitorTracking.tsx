import { useEffect, useState } from 'react'
import {
  Crosshair,
  TrendingDown,
  TrendingUp,
  Minus,
  Star,
  AlertTriangle,
  Package,
  DollarSign,
  Eye,
} from 'lucide-react'
import competitorData from '@/data/competitors.json'
import ModelOutputCard from '@/components/ModelOutputCard'
import { PageLoader } from '@/components/LoadingSkeleton'
import { cn } from '@/lib/utils'

export default function CompetitorTracking() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 950)
    return () => clearTimeout(t)
  }, [])

  if (loading) {
    return (
      <div className="space-y-5">
        <div>
          <h1 className="text-[22px] font-semibold mb-1 flex items-center gap-2"><Crosshair /> 竞品追踪</h1>
          <p className="text-sm text-muted-foreground">{competitorData.category} · {competitorData.targetMarket}</p>
        </div>
        <PageLoader />
      </div>
    )
  }

  const severityMap: Record<string, { color: string; bg: string }> = {
    high: { color: 'text-rose-700', bg: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/50' },
    medium: { color: 'text-amber-700', bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/50' },
    low: { color: 'text-sky-700', bg: 'bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800/50' },
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Crosshair className="w-5 h-5 text-violet-600" />
            <h1 className="text-[22px] font-semibold tracking-tight">竞品追踪中心</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold">{competitorData.category}</span>
            <span className="mx-1.5">·</span>
            <span>{competitorData.targetMarket}</span>
            <span className="mx-1.5">·</span>
            <span>监控 {competitorData.trackedCompetitors.length} 个核心竞品</span>
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1.5 rounded-lg bg-violet-50 dark:bg-violet-950/40 text-violet-700 font-semibold flex items-center gap-1">
            <Package className="w-3.5 h-3.5" /> {competitorData.trackedCompetitors.length} 竞品
          </span>
          <span className="px-2.5 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 font-semibold flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" /> {competitorData.priceAlerts.length} 预警
          </span>
        </div>
      </div>

      {/* Price Alerts */}
      <div className="space-y-3">
        <h3 className="text-[15px] font-semibold flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" /> 实时价格预警
        </h3>
        {competitorData.priceAlerts.map((alert, i) => {
          const cfg = severityMap[alert.severity]
          return (
            <div key={i} className={cn('rounded-xl border p-4 flex items-start gap-3', cfg.bg)}>
              <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center shrink-0', cfg.bg, 'border')}>
                <AlertTriangle className={cn('w-4 h-4', cfg.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn('text-[12px] font-bold', cfg.color)}>{alert.type}</span>
                  <span className="text-sm font-semibold">{alert.brand}</span>
                  <span className="text-[11px] text-muted-foreground ml-auto">{alert.time}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{alert.detail}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Competitor Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="text-[15px] font-semibold flex items-center gap-2">
            <Eye className="w-4 h-4 text-violet-500" /> 竞品实时监控面板
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">价格/BSR/评分/库存/Listing变化全维度追踪</p>
        </div>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm min-w-[900px]">
            <thead className="sticky top-0 bg-muted/60 backdrop-blur-sm z-10">
              <tr className="text-[11px] text-muted-foreground text-left">
                <th className="px-4 py-2.5 font-semibold whitespace-nowrap">品牌/产品</th>
                <th className="px-4 py-2.5 font-semibold whitespace-nowrap">价格</th>
                <th className="px-4 py-2.5 font-semibold whitespace-nowrap">价格变动</th>
                <th className="px-4 py-2.5 font-semibold whitespace-nowrap">BSR</th>
                <th className="px-4 py-2.5 font-semibold whitespace-nowrap">BSR变动</th>
                <th className="px-4 py-2.5 font-semibold whitespace-nowrap">评分</th>
                <th className="px-4 py-2.5 font-semibold whitespace-nowrap">Review</th>
                <th className="px-4 py-2.5 font-semibold whitespace-nowrap">库存</th>
                <th className="px-4 py-2.5 font-semibold whitespace-nowrap">最近变化</th>
              </tr>
            </thead>
            <tbody>
              {competitorData.trackedCompetitors.map(c => (
                <tr key={c.id} className="border-t border-border/50 hover:bg-muted/40 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-[12.5px] truncate max-w-[160px]">{c.name}</div>
                    <div className="text-[10.5px] text-muted-foreground">{c.brand}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[14px] font-bold">${c.price}</span>
                  </td>
                  <td className="px-4 py-3">
                    {c.priceChangeType === 'down' ? (
                      <span className="flex items-center gap-0.5 text-[12px] font-semibold text-rose-600">
                        <TrendingDown className="w-3.5 h-3.5" /> {c.priceChange > 0 ? `+$${c.priceChange}` : c.priceChange}
                      </span>
                    ) : c.priceChangeType === 'up' ? (
                      <span className="flex items-center gap-0.5 text-[12px] font-semibold text-emerald-600">
                        <TrendingUp className="w-3.5 h-3.5" /> +${c.priceChange}
                      </span>
                    ) : (
                      <span className="flex items-center gap-0.5 text-[12px] font-semibold text-muted-foreground">
                        <Minus className="w-3.5 h-3.5" /> 持平
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[12.5px] font-semibold">#{c.bsr.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    {c.bsrChange < 0 ? (
                      <span className="text-[12px] font-semibold text-emerald-600">{c.bsrChange}</span>
                    ) : (
                      <span className="text-[12px] font-semibold text-rose-600">+{c.bsrChange}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-[12px] font-semibold">{c.rating}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-[12.5px]">{c.reviews.toLocaleString()}</div>
                    {c.reviewsChange > 0 && (
                      <div className="text-[10px] text-emerald-600">+{c.reviewsChange}</div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      'text-[11px] font-semibold px-2 py-0.5 rounded',
                      c.stockStatus === '充足' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    )}>
                      {c.stockStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[11px] text-muted-foreground whitespace-nowrap">{c.lastChange}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary + Model Insight */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="text-[15px] font-semibold flex items-center gap-2 mb-4">
            <DollarSign className="w-4 h-4 text-violet-500" /> 竞品价格分布
          </h3>
          <div className="space-y-3">
            {[
              { range: '$25-35', count: 2, brands: 'Petmate, Faroro' },
              { range: '$36-45', count: 2, brands: 'Wopet, Homerun' },
              { range: '$46-60', count: 2, brands: 'Petlibro, Cat Mate' },
              { range: '$61-90', count: 1, brands: 'Litter-Robot' },
              { range: '$90+', count: 1, brands: 'SUREFLAP' },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs font-mono text-muted-foreground w-16 shrink-0">{b.range}</span>
                <div className="flex-1 h-7 rounded-lg bg-muted overflow-hidden flex items-center px-2 gap-2">
                  <div
                    className="h-full rounded bg-gradient-to-r from-violet-400 to-indigo-400 transition-all"
                    style={{ width: `${(b.count / 8) * 100}%` }}
                  />
                  <span className="text-[11px] font-semibold z-10 relative">{b.count}款</span>
                </div>
                <span className="text-[10px] text-muted-foreground truncate max-w-[120px]">{b.brands}</span>
              </div>
            ))}
          </div>
        </div>

        <ModelOutputCard model="qwen" title="qwen3.7-max 竞品动态分析">
          {competitorData.modelInsight}
        </ModelOutputCard>
      </div>
    </div>
  )
}
