import { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import {
  LayoutDashboard,
  AlertTriangle,
  AlertCircle,
  Info,
  TrendingUp,
  Trophy,
  RefreshCcw,
  Globe2,
  ShoppingCart,
} from 'lucide-react'
import dashboardData from '@/data/dashboard.json'
import ModelOutputCard from '@/components/ModelOutputCard'
import { PageLoader } from '@/components/LoadingSkeleton'
import { cn } from '@/lib/utils'

const levelConfig = {
  high: { icon: AlertTriangle, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900/50', badge: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300', label: '高风险' },
  medium: { icon: AlertCircle, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/50', badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300', label: '中风险' },
  low: { icon: Info, color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-900/50', badge: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300', label: '低风险' },
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(t)
  }, [])

  const distributionOption = {
    tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
    legend: { bottom: 0, textStyle: { fontSize: 11, color: '#71717a' } },
    series: [{
      type: 'pie',
      radius: ['45%', '70%'],
      avoidLabelOverlap: true,
      itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
      label: { show: false },
      emphasis: { label: { show: true, fontSize: 13, fontWeight: 600 } },
      data: [
        { value: 37.8, name: '智能喂食器', itemStyle: { color: '#8b5cf6' } },
        { value: 24.5, name: '智能饮水机', itemStyle: { color: '#06b6d4' } },
        { value: 18.2, name: '智能猫砂盆', itemStyle: { color: '#10b981' } },
        { value: 12.3, name: '智能玩具', itemStyle: { color: '#f59e0b' } },
        { value: 7.2, name: '其他智能', itemStyle: { color: '#f43f5e' } },
      ]
    }]
  }

  const top10ChartOption = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: 10, right: 20, top: 10, bottom: 20, containLabel: true },
    xAxis: { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { color: '#f4f4f5', type: 'dashed' } } },
    yAxis: {
      type: 'category',
      inverse: true,
      data: dashboardData.blueOceanTop10.slice(0, 8).map(d => d.name.length > 10 ? d.name.slice(0, 10) + '...' : d.name).reverse(),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { fontSize: 11, color: '#52525b', width: 110, overflow: 'truncate' }
    },
    series: [{
      type: 'bar',
      data: [...dashboardData.blueOceanTop10.slice(0, 8).map(d => d.score)].reverse(),
      barWidth: 16,
      itemStyle: {
        borderRadius: [0, 6, 6, 0],
        color: {
          type: 'linear', x: 0, y: 0, x2: 1, y2: 0,
          colorStops: [
            { offset: 0, color: '#c4b5fd' },
            { offset: 1, color: '#8b5cf6' }
          ]
        }
      },
      label: { show: true, position: 'right', fontSize: 11, fontWeight: 600, color: '#7c3aed', formatter: '{c}' }
    }]
  }

  if (loading) return <DashboardShell loading />

  return <DashboardShell />

  function DashboardShell({ loading = false }: { loading?: boolean }) {
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <LayoutDashboard className="w-5 h-5 text-violet-600" />
              <h1 className="text-[22px] font-semibold tracking-tight">运营总览仪表盘</h1>
            </div>
            <p className="text-sm text-muted-foreground">跨境宠物智能用品市场全景数据 · 每日AI自动生成</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">2026-08-20 周四</span>
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-violet-50 hover:bg-violet-100 text-violet-700 text-xs font-medium transition-colors dark:bg-violet-950/40 dark:hover:bg-violet-950/60 dark:text-violet-300">
              <RefreshCcw className="w-3.5 h-3.5" /> 刷新数据
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: '今日市场搜索量', value: '+12.3%', sub: '环比昨日', icon: TrendingUp, grad: 'from-violet-500 to-indigo-500', up: true },
            { title: 'TikTok话题播放', value: '2.4亿+', sub: '近7天累计', icon: Globe2, grad: 'from-pink-500 to-rose-500', up: true },
            { title: '高机会品类', value: '10个', sub: '综合评分≥78', icon: Trophy, grad: 'from-emerald-500 to-teal-500', up: true },
            { title: '合规预警数', value: '4条', sub: '2条高风险待处理', icon: AlertTriangle, grad: 'from-amber-500 to-orange-500', up: false },
          ].map((k, i) => {
            const Icon = k.icon
            return (
              <div key={i} className="rounded-2xl border border-border bg-card p-5 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br text-white shadow-md', k.grad)}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={cn('text-[11px] font-semibold px-2 py-0.5 rounded-md', k.up ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400' : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400')}>
                    {k.up ? '↑' : '!'} 今日
                  </span>
                </div>
                {loading ? (
                  <>
                    <div className="h-7 w-20 skeleton rounded mb-1.5" />
                    <div className="h-3.5 w-28 skeleton rounded" />
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-bold tracking-tight mb-0.5">{k.value}</div>
                    <div className="text-xs text-muted-foreground">{k.sub}</div>
                  </>
                )}
              </div>
            )
          })}
        </div>

        {loading ? <PageLoader /> : (
          <>
            <ModelOutputCard model="qwen" title="今日市场简报">
              {dashboardData.todayBrief}
            </ModelOutputCard>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[15px] font-semibold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      实时合规预警
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">多平台政策变化监控</p>
                  </div>
                  <span className="text-xs bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 px-2 py-1 rounded-md font-medium">
                    {dashboardData.complianceAlerts.filter(a => a.level === 'high').length} 条紧急
                  </span>
                </div>
                <div className="space-y-2.5">
                  {dashboardData.complianceAlerts.map(a => {
                    const cfg = levelConfig[a.level as keyof typeof levelConfig]
                    const Icon = cfg.icon
                    return (
                      <div key={a.id} className={cn('rounded-xl border p-3.5 transition-all hover:shadow-md', cfg.bg)}>
                        <div className="flex gap-3">
                          <div className={cn('w-8 h-8 rounded-lg shrink-0 flex items-center justify-center bg-white dark:bg-black/20', cfg.color)}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <h4 className="text-sm font-semibold truncate">{a.title}</h4>
                              <span className={cn('shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded', cfg.badge)}>{cfg.label}</span>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{a.desc}</p>
                            <div className="flex items-center gap-3 mt-1.5">
                              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                <ShoppingCart className="w-3 h-3" /> {a.category}
                              </span>
                              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                <Globe2 className="w-3 h-3" /> {a.market}
                              </span>
                              <span className="text-[10px] text-muted-foreground ml-auto">{a.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="text-[15px] font-semibold mb-1">品类增长分布</h3>
                <p className="text-xs text-muted-foreground mb-3">美国市场今日搜索增量占比</p>
                <div className="h-[260px]">
                  <ReactECharts option={distributionOption} style={{ height: '100%', width: '100%' }} notMerge lazyUpdate />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
              <div className="lg:col-span-3 rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[15px] font-semibold flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-violet-500" />
                      蓝海选品机会 TOP 10
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">综合需求×竞争×利润三维评分</p>
                  </div>
                </div>
                <div className="h-[320px]">
                  <ReactECharts option={top10ChartOption} style={{ height: '100%', width: '100%' }} notMerge lazyUpdate />
                </div>
              </div>

              <div className="lg:col-span-2 rounded-2xl border border-border bg-card overflow-hidden">
                <div className="p-5 border-b border-border">
                  <h3 className="text-[15px] font-semibold">详细榜单</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">全字段明细数据</p>
                </div>
                <div className="max-h-[360px] overflow-auto scrollbar-thin">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-muted/60 backdrop-blur-sm z-10">
                      <tr className="text-left text-[11px] text-muted-foreground">
                        <th className="px-4 py-2.5 font-semibold">#</th>
                        <th className="px-4 py-2.5 font-semibold">产品名称</th>
                        <th className="px-4 py-2.5 font-semibold">评分</th>
                        <th className="px-4 py-2.5 font-semibold">竞争</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.blueOceanTop10.map(item => (
                        <tr key={item.rank} className="border-t border-border/50 hover:bg-violet-50/40 dark:hover:bg-violet-950/20 transition-colors">
                          <td className="px-4 py-3">
                            <span className={cn('inline-flex w-6 h-6 items-center justify-center rounded-md text-[11px] font-bold',
                              item.rank <= 3 ? 'bg-gradient-to-br from-violet-500 to-indigo-500 text-white' : 'bg-muted text-muted-foreground'
                            )}>{item.rank}</span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-medium text-[13px]">{item.name}</div>
                            <div className="text-[10px] text-muted-foreground mt-0.5">{item.category} · {item.market}</div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-[13px] font-bold text-violet-600 dark:text-violet-400">{item.score}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={cn('text-[10px] font-medium px-2 py-0.5 rounded',
                              item.competition === '低' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                                : item.competition === '中低' ? 'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-400'
                                  : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'
                            )}>{item.competition}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    )
  }
}
