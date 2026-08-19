import { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import {
  Waves,
  TrendingUp,
  Target,
  Lightbulb,
  DollarSign,
  Flame,
  Rocket,
  ChevronRight,
} from 'lucide-react'
import paData from '@/data/productAnalysis.json'
import ModelOutputCard from '@/components/ModelOutputCard'
import { PageLoader } from '@/components/LoadingSkeleton'
import { cn } from '@/lib/utils'

export default function ProductAnalysis() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(t)
  }, [])

  const radarOption = {
    tooltip: {},
    radar: {
      indicator: [
        { name: '市场需求', max: 100 },
        { name: '竞争程度(反向)', max: 100 },
        { name: '利润空间', max: 100 },
        { name: '供应链成熟度', max: 100 },
        { name: '政策友好度', max: 100 },
        { name: '技术门槛', max: 100 },
      ],
      center: ['50%', '55%'],
      radius: '65%',
      splitNumber: 4,
      axisName: { color: '#52525b', fontSize: 11 },
      splitArea: { areaStyle: { color: ['#fafafa', '#fff', '#fafafa', '#fff'] } },
      splitLine: { lineStyle: { color: '#e4e4e7' } },
      axisLine: { lineStyle: { color: '#d4d4d8' } },
    },
    series: [{
      type: 'radar',
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: { width: 2, color: '#8b5cf6' },
      itemStyle: { color: '#8b5cf6', borderColor: '#fff', borderWidth: 2 },
      areaStyle: {
        color: {
          type: 'radial', x: 0.5, y: 0.5, r: 0.5,
          colorStops: [
            { offset: 0, color: 'rgba(139, 92, 246, 0.05)' },
            { offset: 1, color: 'rgba(139, 92, 246, 0.35)' }
          ]
        }
      },
      data: [{ value: [92, 100 - paData.threeDScores.competition, paData.threeDScores.profit, paData.threeDScores.capacity, 86, 72], name: '三维竞争力指数' }]
    }]
  }

  const trendOption = {
    tooltip: { trigger: 'axis' },
    grid: { left: 30, right: 20, top: 30, bottom: 30, containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: paData.trendCurve.map(d => d.month),
      axisLine: { lineStyle: { color: '#e4e4e7' } },
      axisLabel: { fontSize: 10, color: '#71717a', rotate: 30 }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#f4f4f5', type: 'dashed' } },
      axisLabel: { fontSize: 10, color: '#71717a' }
    },
    series: [
      {
        name: '搜索热度指数',
        type: 'line',
        smooth: 0.4,
        symbol: 'circle',
        symbolSize: 7,
        data: paData.trendCurve.map(d => d.value),
        lineStyle: { width: 3, color: '#8b5cf6' },
        itemStyle: { color: '#fff', borderColor: '#8b5cf6', borderWidth: 2.5 },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(139, 92, 246, 0.35)' },
              { offset: 1, color: 'rgba(139, 92, 246, 0.02)' }
            ]
          }
        },
        markPoint: {
          symbol: 'pin', symbolSize: 45,
          data: [
            { type: 'max', name: '峰值', itemStyle: { color: '#f59e0b' } }
          ],
          label: { fontSize: 10, fontWeight: 600 }
        }
      },
      {
        name: '趋势均线',
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: { width: 2, color: '#06b6d4', type: 'dashed' },
        data: [95, 105, 120, 140, 144, 146, 158, 173, 192, 215, 242, 276]
      }
    ]
  }

  const threeDConfig = [
    { key: 'profit', label: '利润空间', value: paData.threeDScores.profit, grad: 'from-emerald-400 to-teal-500', icon: DollarSign, desc: '综合毛利率55%+' },
    { key: 'capacity', label: '供应链能力', value: paData.threeDScores.capacity, grad: 'from-sky-400 to-blue-500', icon: Rocket, desc: '深圳TOP3代工厂' },
    { key: 'competition', label: '竞争强度', value: paData.threeDScores.competition, grad: 'from-amber-400 to-orange-500', icon: Target, desc: '中等偏下蓝海区' },
  ]

  const oppPotentialMap: Record<string, { bg: string; color: string }> = {
    '极高': { bg: 'bg-gradient-to-r from-red-500 to-rose-500', color: 'text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/40' },
    '高': { bg: 'bg-gradient-to-r from-violet-500 to-indigo-500', color: 'text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/40' },
    '中': { bg: 'bg-gradient-to-r from-sky-500 to-blue-500', color: 'text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/40' },
  }
  const oppInvestMap: Record<string, string> = {
    '高': 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300',
    '中等': 'bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300',
    '低': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
  }

  if (loading) {
    return (
      <div className="space-y-5">
        <div>
          <h1 className="text-[22px] font-semibold mb-1 flex items-center gap-2"><Waves /> 蓝海选品分析</h1>
          <p className="text-sm text-muted-foreground">三维竞争力模型 + 趋势预测</p>
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
            <Waves className="w-5 h-5 text-violet-600" />
            <h1 className="text-[22px] font-semibold tracking-tight">蓝海选品深度分析</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-violet-600 dark:text-violet-400">{paData.category}</span>
            <span className="mx-1.5">·</span>
            <span>{paData.subCategory}</span>
            <span className="mx-1.5">·</span>
            <span>百炼多模型协同分析</span>
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1.5 rounded-lg bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 font-semibold flex items-center gap-1">
            <Flame className="w-3.5 h-3.5" /> 月搜索 486K
          </span>
          <span className="px-2.5 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> 同比 +243%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {threeDConfig.map(d => {
          const Icon = d.icon
          return (
            <div key={d.key} className="rounded-2xl border border-border bg-card p-5 group hover:shadow-xl hover:shadow-violet-500/5 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className={cn('w-11 h-11 rounded-xl bg-gradient-to-br text-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300', d.grad)}>
                  <Icon className="w-5.5 h-5.5" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold tracking-tight">{d.value}</div>
                  <div className="text-[10px] text-muted-foreground">/ 100 指数</div>
                </div>
              </div>
              <div className="mb-1.5 font-semibold text-sm">{d.label}</div>
              <div className="text-xs text-muted-foreground mb-3">{d.desc}</div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className={cn('h-full rounded-full bg-gradient-to-r transition-all duration-1000', d.grad)}
                  style={{ width: `${d.value}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-[15px] font-semibold flex items-center gap-2">
                <Target className="w-4 h-4 text-violet-500" /> 六维竞争力雷达
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">全方位评估品类状态</p>
            </div>
          </div>
          <div className="h-[300px]">
            <ReactECharts option={radarOption} style={{ height: '100%', width: '100%' }} notMerge lazyUpdate />
          </div>
        </div>

        <div className="lg:col-span-3 rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-[15px] font-semibold flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-violet-500" /> 12个月搜索热度趋势
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">Google Trends + 亚马逊站内搜索指数融合</p>
            </div>
          </div>
          <div className="h-[300px]">
            <ReactECharts option={trendOption} style={{ height: '100%', width: '100%' }} notMerge lazyUpdate />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ModelOutputCard model="deepseek" title="未来90天趋势预测">
          {paData.trendConclusion}
        </ModelOutputCard>
        <ModelOutputCard model="qwen" title="三维选品切入建议">
          {paData.suggestion}
        </ModelOutputCard>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="text-[15px] font-semibold flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500" /> 创新机会点矩阵
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">潜力 × 投入 四象限分析，优先突破高潜力低投入项目</p>
          </div>
          <span className="text-xs bg-gradient-to-r from-violet-500 to-indigo-500 text-white px-2.5 py-1 rounded-md font-semibold">
            {paData.opportunities.length} 个机会待挖掘
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-0">
          {paData.opportunities.map((op, i) => {
            const pot = oppPotentialMap[op.potential as keyof typeof oppPotentialMap]
            const inv = oppInvestMap[op.invest as keyof typeof oppInvestMap]
            return (
              <div key={op.id} className={cn('p-5 hover:bg-violet-50/50 dark:hover:bg-violet-950/20 transition-colors group',
                i !== paData.opportunities.length - 1 && 'border-b md:border-b-0 xl:border-b-0 md:border-r xl:border-r border-border last:border-0')}>
                <div className="flex items-start justify-between mb-3">
                  <div className={cn('w-9 h-9 rounded-lg text-white flex items-center justify-center shadow-md', pot.bg)}>
                    <span className="text-sm font-bold">#{op.id}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-violet-500 group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="text-sm font-bold mb-1.5 leading-snug">{op.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3 min-h-[48px]">{op.desc}</p>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className={cn('text-[10px] font-bold px-1.5 py-0.5 rounded', pot.color)}>
                    潜力 {op.potential}
                  </span>
                  <span className={cn('text-[10px] font-bold px-1.5 py-0.5 rounded', inv)}>
                    投入 {op.invest}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
