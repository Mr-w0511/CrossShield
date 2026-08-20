import { useEffect, useState } from 'react'
import {
  FileText,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Minus,
  Download,
  Lightbulb,
  Layers,
  Calendar,
} from 'lucide-react'
import reportsData from '@/data/reports.json'
import ModelOutputCard from '@/components/ModelOutputCard'
import { PageLoader } from '@/components/LoadingSkeleton'
import { cn } from '@/lib/utils'

export default function Reports() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 950)
    return () => clearTimeout(t)
  }, [])

  if (loading) {
    return (
      <div className="space-y-5">
        <div>
          <h1 className="text-[22px] font-semibold mb-1 flex items-center gap-2"><FileText /> 数据报告</h1>
          <p className="text-sm text-muted-foreground">综合分析报告</p>
        </div>
        <PageLoader />
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-5 h-5 text-violet-600" />
            <h1 className="text-[22px] font-semibold tracking-tight">综合分析报告</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold">{reportsData.category}</span>
            <span className="mx-1.5">·</span>
            <span>报告周期 {reportsData.reportPeriod}</span>
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-sm font-semibold shadow-md shadow-violet-500/25 hover:shadow-lg transition-all">
          <Download className="w-4 h-4" /> 导出报告
        </button>
      </div>

      {/* Executive Summary */}
      <div className="rounded-2xl border border-violet-200 dark:border-violet-800/50 bg-gradient-to-br from-violet-50/80 to-indigo-50/50 dark:from-violet-950/30 dark:to-indigo-950/20 p-6">
        <h3 className="text-[15px] font-semibold flex items-center gap-2 mb-2 text-violet-700 dark:text-violet-300">
          <Lightbulb className="w-4 h-4" /> 执行摘要
        </h3>
        <p className="text-sm text-card-foreground/80 leading-relaxed">{reportsData.executiveSummary}</p>
      </div>

      {/* KPIs */}
      <div>
        <h3 className="text-[15px] font-semibold flex items-center gap-2 mb-4">
          <Layers className="w-4 h-4 text-violet-500" /> 关键指标看板
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {reportsData.kpis.map((kpi, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-5 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{kpi.label}</span>
                {kpi.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                ) : kpi.trend === 'down' ? (
                  <TrendingDown className="w-4 h-4 text-rose-500" />
                ) : (
                  <Minus className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold tracking-tight">{kpi.value}</span>
                <span className="text-sm text-muted-foreground">{kpi.unit}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className={cn(
                  'text-[11px] font-semibold',
                  kpi.trend === 'up' ? 'text-emerald-600' : kpi.trend === 'down' ? 'text-rose-600' : 'text-muted-foreground'
                )}>
                  {kpi.change}
                </span>
                <span className="text-[10px] text-muted-foreground font-mono">{kpi.model}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Module Reports */}
      <div>
        <h3 className="text-[15px] font-semibold flex items-center gap-2 mb-4">
          <Layers className="w-4 h-4 text-violet-500" /> 六大模块分析结果
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {reportsData.moduleReports.map((m, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <h4 className="text-[14px] font-semibold">{m.module}</h4>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {m.status === 'pass' ? '通过' : '未通过'} · {m.score}
                </span>
              </div>
              <ul className="space-y-1.5">
                {m.keyFindings.map((f, j) => (
                  <li key={j} className="text-xs text-muted-foreground flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 pt-2 border-t border-border/50">
                <span className="text-[10px] text-muted-foreground font-mono">{m.model}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="rounded-2xl border border-amber-200 dark:border-amber-800/50 bg-gradient-to-br from-amber-50/80 to-orange-50/50 dark:from-amber-950/30 dark:to-orange-950/20 p-6">
        <h3 className="text-[15px] font-semibold flex items-center gap-2 mb-3 text-amber-700 dark:text-amber-300">
          <Lightbulb className="w-4 h-4" /> 行动建议
        </h3>
        <ol className="space-y-2">
          {reportsData.recommendations.map((r, i) => (
            <li key={i} className="text-sm text-card-foreground/80 flex items-start gap-2.5">
              <span className="text-amber-600 font-bold shrink-0">{i + 1}.</span>
              <span className="leading-relaxed">{r}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Model Insight */}
      <ModelOutputCard model="qwen" title="qwen3.7-max 综合研判">
        本报告周期内，CrossShield平台六大模块全部通过分析验证，品类综合机会评分8.4/10。合规预检为黄级（72分），仅FCC ID需补充申请，不阻塞选品流程。趋势预测显示Q4旺季增速达23.5%，9月为最佳上架窗口。建议立即启动选品流程，以$49.99中价值定价切入，通过双频WiFi+防卡粮结构设计建立差异化壁垒，预计首月销量3200台，毛利率维持35%以上。
      </ModelOutputCard>

      <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
        <Calendar className="w-3.5 h-3.5" />
        报告生成时间：{reportsData.reportDate} · 百炼多模型协同分析
      </div>
    </div>
  )
}
