import { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { TrendingUp, Calendar, Flame, Gauge, Target, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react'
import trendData from '@/data/trend.json'
import ModelOutputCard from '@/components/ModelOutputCard'
import { PageLoader } from '@/components/LoadingSkeleton'
import { cn } from '@/lib/utils'

export default function TrendPrediction() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 950)
    return () => clearTimeout(t)
  }, [])

  const lineOption = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    legend: { data: ['搜索量', '销量'], top: 5, textStyle: { fontSize: 11 } },
    grid: { left: 40, right: 30, top: 40, bottom: 45, containLabel: true },
    xAxis: {
      type: 'category',
      data: trendData.monthlyTrend.map(m => m.month),
      axisLabel: { fontSize: 10, color: '#71717a', rotate: 30 },
      axisLine: { lineStyle: { color: '#e4e4e7' } },
    },
    yAxis: [
      { type: 'value', name: '搜索量', position: 'left', axisLabel: { fontSize: 10, color: '#71717a', formatter: (v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v } },
      { type: 'value', name: '销量', position: 'right', axisLabel: { fontSize: 10, color: '#71717a', formatter: (v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v } },
    ],
    series: [
      {
        name: '搜索量', type: 'line', smooth: true, symbol: 'circle', symbolSize: 6,
        data: trendData.monthlyTrend.map(m => m.searchVolume),
        lineStyle: { width: 2.5, color: '#8b5cf6' },
        itemStyle: { color: '#8b5cf6' },
        areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(139,92,246,0.25)' }, { offset: 1, color: 'rgba(139,92,246,0.02)' }] } },
      },
      {
        name: '销量', type: 'line', smooth: true, symbol: 'circle', symbolSize: 6,
        data: trendData.monthlyTrend.map(m => m.salesVolume),
        lineStyle: { width: 2.5, color: '#06b6d4' },
        itemStyle: { color: '#06b6d4' },
        areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(6,182,212,0.25)' }, { offset: 1, color: 'rgba(6,182,212,0.02)' }] } },
      },
    ],
  }

  if (loading) {
    return (
      <div className="space-y-5">
        <div>
          <h1 className="text-[22px] font-semibold mb-1 flex items-center gap-2"><TrendingUp /> 趋势预测</h1>
          <p className="text-sm text-muted-foreground">{trendData.category} · {trendData.targetMarket}</p>
        </div>
        <PageLoader />
      </div>
    )
  }

  const tagColorMap: Record<string, string> = {
    '蓝海': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    '稳定': 'bg-sky-50 text-sky-700 border-sky-200',
    '红海': 'bg-rose-50 text-rose-700 border-rose-200',
    '饱和': 'bg-zinc-50 text-zinc-600 border-zinc-200',
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-5 h-5 text-violet-600" />
            <h1 className="text-[22px] font-semibold tracking-tight">趋势预测中心</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold">{trendData.category}</span>
            <span className="mx-1.5">·</span>
            <span>{trendData.targetMarket}</span>
            <span className="mx-1.5">·</span>
            <span>deepseek-r1 驱动</span>
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: '市场规模', value: trendData.keyMetrics.marketSize, icon: Target, color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-950/40' },
          { label: '复合增长率', value: trendData.keyMetrics.cagr, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/40' },
          { label: '蓝海细分', value: trendData.keyMetrics.hotSubCategory, icon: Flame, color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-950/40' },
          { label: '机会评分', value: `${trendData.keyMetrics.opportunityScore}/10`, icon: Gauge, color: 'text-sky-600', bg: 'bg-sky-50 dark:bg-sky-950/40' },
        ].map((m, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-5 hover:shadow-md transition-all">
            <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mb-3', m.bg)}>
              <m.icon className={cn('w-5 h-5', m.color)} />
            </div>
            <div className="text-xl font-bold tracking-tight">{m.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Trend Chart */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="text-[15px] font-semibold flex items-center gap-2 mb-1">
          <TrendingUp className="w-4 h-4 text-violet-500" /> 搜索量 & 销量月度趋势
        </h3>
        <p className="text-xs text-muted-foreground mb-4">含未来4个月预测数据 · 数据源：Google Trends + Amazon BSR</p>
        <div className="h-[360px]">
          <ReactECharts option={lineOption} style={{ height: '100%', width: '100%' }} notMerge lazyUpdate />
        </div>
      </div>

      {/* Sub-categories */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="text-[15px] font-semibold flex items-center gap-2 mb-1">
          <Target className="w-4 h-4 text-violet-500" /> 细分品类机会矩阵
        </h3>
        <p className="text-xs text-muted-foreground mb-4">6个细分品类的增长-竞争综合评估</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] text-muted-foreground text-left border-b border-border">
                <th className="px-4 py-2.5 font-semibold">细分品类</th>
                <th className="px-4 py-2.5 font-semibold">增速</th>
                <th className="px-4 py-2.5 font-semibold">搜索趋势</th>
                <th className="px-4 py-2.5 font-semibold">竞争度</th>
                <th className="px-4 py-2.5 font-semibold">机会分</th>
                <th className="px-4 py-2.5 font-semibold">标签</th>
              </tr>
            </thead>
            <tbody>
              {trendData.subCategories.map((s, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-muted/40 transition-colors">
                  <td className="px-4 py-3 font-semibold">{s.name}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 font-bold text-emerald-600">
                      <ArrowUpRight className="w-3.5 h-3.5" /> {s.growth}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground font-mono">{s.searchTrend}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.competition}</td>
                  <td className="px-4 py-3">
                    <span className={cn('font-bold', s.opportunity >= 8 ? 'text-emerald-600' : s.opportunity >= 6 ? 'text-amber-600' : 'text-rose-600')}>
                      {s.opportunity}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn('text-[11px] font-bold px-2 py-0.5 rounded border', tagColorMap[s.tag])}>
                      {s.tag}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Seasonal Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="text-[15px] font-semibold flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-violet-500" /> 季节性分析
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30">
              <span className="text-sm text-muted-foreground">旺季</span>
              <span className="text-sm font-bold text-amber-700">{trendData.seasonalAnalysis.peakSeason}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-sky-50 dark:bg-sky-950/30">
              <span className="text-sm text-muted-foreground">淡季</span>
              <span className="text-sm font-bold text-sky-700">{trendData.seasonalAnalysis.lowSeason}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30">
              <span className="text-sm text-muted-foreground">旺季倍数</span>
              <span className="text-sm font-bold text-emerald-700">{trendData.seasonalAnalysis.peakMultiplier}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800/50">
              <span className="text-sm text-muted-foreground">最佳上架窗口</span>
              <span className="text-sm font-bold text-violet-700">{trendData.seasonalAnalysis.bestLaunchWindow}</span>
            </div>
          </div>
          <div className="mt-4 p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground leading-relaxed">
            {trendData.seasonalAnalysis.reason}
          </div>
        </div>

        <ModelOutputCard model="deepseek" title="deepseek-r1 趋势深度推理">
          {trendData.modelInsight}
        </ModelOutputCard>
      </div>
    </div>
  )
}
