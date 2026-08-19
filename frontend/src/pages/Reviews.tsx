import { useEffect, useMemo, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import {
  MessageSquareText,
  Star,
  ThumbsUp,
  ThumbsDown,
  Minus,
  AlertTriangle,
  Quote,
  Sparkles,
  TrendingUp,
  Calendar,
} from 'lucide-react'
import reviewsData from '@/data/reviews.json'
import ModelOutputCard from '@/components/ModelOutputCard'
import { PageLoader } from '@/components/LoadingSkeleton'
import { cn } from '@/lib/utils'

export default function Reviews() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(t)
  }, [])

  const pieOption = {
    tooltip: { trigger: 'item', formatter: '{b}: {c}% ({d}%)' },
    legend: { show: false },
    series: [{
      type: 'pie',
      radius: ['58%', '82%'],
      avoidLabelOverlap: false,
      itemStyle: { borderRadius: 8, borderColor: '#fff', borderWidth: 3 },
      label: {
        show: true, position: 'center',
        formatter: () => `{a|${reviewsData.totalReviews.toLocaleString()}}\n{b|总评论数}`,
        rich: {
          a: { fontSize: 26, fontWeight: 'bold', color: '#18181b', lineHeight: 36 },
          b: { fontSize: 11, color: '#71717a', padding: [2, 0, 0, 0] }
        }
      },
      emphasis: { scale: true, scaleSize: 6 },
      labelLine: { show: false },
      data: [
        { value: reviewsData.sentiment.positive, name: '正面', itemStyle: { color: '#10b981' } },
        { value: reviewsData.sentiment.neutral, name: '中性', itemStyle: { color: '#f59e0b' } },
        { value: reviewsData.sentiment.negative, name: '负面', itemStyle: { color: '#ef4444' } },
      ]
    }]
  }

  const painOption = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: 10, right: 10, top: 15, bottom: 10, containLabel: true },
    xAxis: {
      type: 'value', max: 180,
      axisLine: { show: false }, axisTick: { show: false },
      splitLine: { lineStyle: { color: '#f4f4f5', type: 'dashed' } },
      axisLabel: { fontSize: 10, color: '#71717a' }
    },
    yAxis: {
      type: 'category',
      data: [...reviewsData.painPoints].reverse().map(p => p.point.length > 8 ? p.point.slice(0, 8) + '...' : p.point),
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { fontSize: 11, color: '#52525b', fontWeight: 500 }
    },
    series: [{
      type: 'bar',
      data: [...reviewsData.painPoints].reverse().map(p => ({
        value: p.count,
        itemStyle: {
          borderRadius: [0, 8, 8, 0],
          color: p.percent > 50 ? {
            type: 'linear', x: 0, y: 0, x2: 1, y2: 0,
            colorStops: [{ offset: 0, color: '#fca5a5' }, { offset: 1, color: '#ef4444' }]
          } : p.percent > 30 ? {
            type: 'linear', x: 0, y: 0, x2: 1, y2: 0,
            colorStops: [{ offset: 0, color: '#fcd34d' }, { offset: 1, color: '#f59e0b' }]
          } : {
            type: 'linear', x: 0, y: 0, x2: 1, y2: 0,
            colorStops: [{ offset: 0, color: '#fdba74' }, { offset: 1, color: '#fb923c' }]
          }
        }
      })),
      barWidth: 18,
      label: {
        show: true, position: 'right', fontSize: 11, fontWeight: 600,
        formatter: p => `${p.value}条 (${reviewsData.painPoints.find(x => x.point.length > 8 ? x.point.slice(0, 8) + '...' === p.name : x.point === p.name)?.percent || 0}%)`,
        color: '#52525b'
      }
    }]
  }

  const trendOption = {
    tooltip: { trigger: 'axis' },
    legend: { top: 0, right: 0, textStyle: { fontSize: 10 }, itemWidth: 12, itemHeight: 8 },
    grid: { left: 10, right: 10, top: 30, bottom: 20, containLabel: true },
    xAxis: {
      type: 'category',
      data: reviewsData.sentimentTrend.map(d => d.month),
      axisLine: { lineStyle: { color: '#e4e4e7' } },
      axisLabel: { fontSize: 10, color: '#71717a' }
    },
    yAxis: {
      type: 'value', max: 80,
      axisLine: { show: false }, axisTick: { show: false },
      splitLine: { lineStyle: { color: '#f4f4f5', type: 'dashed' } },
      axisLabel: { fontSize: 10, color: '#71717a', formatter: '{value}%' }
    },
    series: [
      { name: '正面', type: 'line', smooth: true, data: reviewsData.sentimentTrend.map(d => d.positive), itemStyle: { color: '#10b981' }, lineStyle: { width: 2 }, areaStyle: { color: 'rgba(16, 185, 129, 0.15)' }, symbol: 'circle', symbolSize: 5 },
      { name: '中性', type: 'line', smooth: true, data: reviewsData.sentimentTrend.map(d => d.neutral), itemStyle: { color: '#f59e0b' }, lineStyle: { width: 2 }, symbol: 'circle', symbolSize: 5 },
      { name: '负面', type: 'line', smooth: true, data: reviewsData.sentimentTrend.map(d => d.negative), itemStyle: { color: '#ef4444' }, lineStyle: { width: 2 }, areaStyle: { color: 'rgba(239, 68, 68, 0.1)' }, symbol: 'circle', symbolSize: 5 },
    ]
  }

  const stars = useMemo(() => {
    const full = Math.floor(reviewsData.avgRating)
    const half = reviewsData.avgRating - full >= 0.5
    return { full, half, empty: 5 - full - (half ? 1 : 0) }
  }, [])

  if (loading) {
    return (
      <div className="space-y-5">
        <div>
          <h1 className="text-[22px] font-semibold mb-1 flex items-center gap-2"><MessageSquareText /> 评论洞察</h1>
          <p className="text-sm text-muted-foreground">ASIN: {reviewsData.asin} · NLP深度语义分析</p>
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
            <MessageSquareText className="w-5 h-5 text-violet-600" />
            <h1 className="text-[22px] font-semibold tracking-tight">评论洞察分析</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="font-mono text-[12px] font-semibold bg-muted px-2 py-0.5 rounded">{reviewsData.asin}</span>
            <span className="mx-1.5">·</span>
            <span>{reviewsData.productName}</span>
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1.5 rounded-lg bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 font-semibold flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> 上月新增 {reviewsData.lastMonth}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-border bg-card p-5 col-span-1 md:col-span-2 lg:col-span-1 flex flex-col items-center justify-center">
          <div className="h-[180px] w-full">
            <ReactECharts option={pieOption} style={{ height: '100%', width: '100%' }} notMerge lazyUpdate />
          </div>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
              <span className="text-xs font-medium">正面 {reviewsData.sentiment.positive}%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" />
              <span className="text-xs font-medium">中性 {reviewsData.sentiment.neutral}%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-red-500" />
              <span className="text-xs font-medium">负面 {reviewsData.sentiment.negative}%</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
            <Star className="w-3.5 h-3.5" /> 综合评分
          </p>
          <div className="flex items-baseline gap-1.5 mb-2">
            <span className="text-4xl font-bold tracking-tight">{reviewsData.avgRating}</span>
            <span className="text-sm text-muted-foreground">/ 5.0</span>
          </div>
          <div className="flex items-center gap-0.5 mb-4">
            {Array.from({ length: stars.full }).map((_, i) => (
              <Star key={`f-${i}`} className="w-4.5 h-4.5 text-amber-400 fill-amber-400" />
            ))}
            {stars.half && <Star className="w-4.5 h-4.5 text-amber-400 fill-amber-400/50" />}
            {Array.from({ length: stars.empty }).map((_, i) => (
              <Star key={`e-${i}`} className="w-4.5 h-4.5 text-zinc-200 dark:text-zinc-700" />
            ))}
          </div>
          <div className="space-y-1.5 pt-3 border-t border-border">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">品牌</span>
              <span className="font-semibold">{reviewsData.brand}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">评论总数</span>
              <span className="font-semibold">{reviewsData.totalReviews.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-5 border-emerald-100 dark:border-emerald-900/40">
          <p className="text-xs text-emerald-700 dark:text-emerald-300 mb-2 flex items-center gap-1">
            <ThumbsUp className="w-3.5 h-3.5" /> 用户核心好评
          </p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {reviewsData.positivePoints.slice(0, 3).map(p => (
              <span key={p.point} className="text-[11px] font-semibold px-2 py-1 rounded-md bg-white/80 dark:bg-black/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/40">
                {p.point}
              </span>
            ))}
          </div>
          <div className="pt-3 border-t border-emerald-100/70 dark:border-emerald-800/40 space-y-1.5 text-xs">
            {reviewsData.positivePoints.slice(0, 2).map(p => (
              <div key={p.point} className="flex items-center justify-between">
                <span className="text-emerald-700/80 dark:text-emerald-300/80 truncate">{p.point}</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-300 shrink-0 ml-2">{p.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 p-5 border-red-100 dark:border-red-900/40">
          <p className="text-xs text-red-700 dark:text-red-300 mb-2 flex items-center gap-1">
            <ThumbsDown className="w-3.5 h-3.5" /> 高频痛点 TOP 2
          </p>
          <div className="space-y-3 mb-3">
            {reviewsData.painPoints.slice(0, 2).map((p, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] font-semibold text-red-800 dark:text-red-300">{p.point}</span>
                  <span className="text-[11px] font-bold text-red-600 dark:text-red-400">{p.count}条 · {p.percent}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-red-100 dark:bg-red-950/50 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-red-400 to-rose-500" style={{ width: `${Math.min(p.percent, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="pt-3 border-t border-red-100/70 dark:border-red-800/40">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-[11px] text-red-700/90 dark:text-red-300/90 leading-relaxed">
                合计占比负面点评<b>71.5%</b>，优先解决可显著降低差评率
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-1 rounded-2xl border border-border bg-card p-5">
          <h3 className="text-[15px] font-semibold mb-1 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-violet-500" /> 情感走势近6个月
          </h3>
          <p className="text-xs text-muted-foreground mb-3">正面评价占比稳步提升</p>
          <div className="h-[220px]">
            <ReactECharts option={trendOption} style={{ height: '100%', width: '100%' }} notMerge lazyUpdate />
          </div>
        </div>

        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
          <h3 className="text-[15px] font-semibold mb-1 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500" /> 差评痛点深度分布
          </h3>
          <p className="text-xs text-muted-foreground mb-3">按NLP聚类出现频次排序，典型评价原文抽样</p>
          <div className="h-[220px]">
            <ReactECharts option={painOption} style={{ height: '100%', width: '100%' }} notMerge lazyUpdate />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="text-[15px] font-semibold mb-1 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-500" /> 用户声量标签云
          </h3>
          <p className="text-xs text-muted-foreground mb-4">字号越大代表提及频次越高</p>
          <div className="flex flex-wrap gap-2 items-center justify-center p-4 rounded-xl bg-gradient-to-br from-violet-50/50 to-sky-50/50 dark:from-violet-950/20 dark:to-sky-950/20 min-h-[180px]">
            {reviewsData.tagCloud.map((t, i) => (
              <span
                key={i}
                style={{ fontSize: `${Math.max(10, t.size / 2.5)}px` }}
                className={cn(
                  'px-2.5 py-1 rounded-lg font-semibold transition-transform hover:scale-110 cursor-default',
                  t.color === '#10b981' ? 'bg-emerald-100/80 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                    : t.color === '#ef4444' ? 'bg-red-100/80 dark:bg-red-950/40 text-red-700 dark:text-red-300'
                      : 'bg-amber-100/80 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
                )}
              >
                {t.text}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h3 className="text-[15px] font-semibold flex items-center gap-2">
              <Quote className="w-4 h-4 text-violet-500" /> 差评原文抽样（典型）
            </h3>
          </div>
          <div className="divide-y divide-border max-h-[280px] overflow-auto scrollbar-thin">
            {reviewsData.painPoints.slice(0, 4).map((p, i) => (
              <div key={i} className="p-4 hover:bg-red-50/40 dark:hover:bg-red-950/10 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  <span className="text-sm font-semibold text-red-700 dark:text-red-400">{p.point}</span>
                  <div className="ml-auto flex items-center gap-0.5">
                    {Array.from({ length: 1 }).map((_, idx) => (
                      <Star key={idx} className="w-3 h-3 text-red-400 fill-red-400" />
                    ))}
                    {Array.from({ length: 4 }).map((_, idx) => (
                      <Star key={idx} className="w-3 h-3 text-zinc-200 dark:text-zinc-700" />
                    ))}
                  </div>
                </div>
                <p className="text-[12.5px] leading-relaxed text-muted-foreground pl-8 italic">
                  「{p.typicalReview}」
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ModelOutputCard model="qwen" title="产品迭代优化建议（ROI优先级）">
        {reviewsData.improvementSuggestion}
      </ModelOutputCard>
    </div>
  )
}
