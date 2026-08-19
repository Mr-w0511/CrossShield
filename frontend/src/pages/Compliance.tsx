import { useEffect, useState } from 'react'
import {
  ShieldCheck,
  ShieldAlert,
  Shield,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Info,
  MapPin,
  Calendar,
  ChevronRight,
} from 'lucide-react'
import complianceData from '@/data/compliance.json'
import ModelOutputCard from '@/components/ModelOutputCard'
import { CardSkeleton } from '@/components/LoadingSkeleton'
import { cn } from '@/lib/utils'

const levelBadgeMap = {
  '需关注': { icon: AlertTriangle, color: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-950/50 border-amber-300 dark:border-amber-800/60', grad: 'from-amber-400 to-orange-500' },
  '低风险': { icon: Info, color: 'text-sky-700 dark:text-sky-400', bg: 'bg-sky-100 dark:bg-sky-950/50 border-sky-300 dark:border-sky-800/60', grad: 'from-sky-400 to-blue-500' },
  '无风险': { icon: CheckCircle2, color: 'text-emerald-700 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800/60', grad: 'from-emerald-400 to-teal-500' },
}

const overallMap = {
  红色: { bg: 'from-red-500 to-rose-500', label: '高风险', text: 'text-red-500' },
  黄色: { bg: 'from-amber-400 to-orange-500', label: '中等风险', text: 'text-amber-500' },
  绿色: { bg: 'from-emerald-400 to-teal-500', label: '低风险', text: 'text-emerald-500' },
}

const sections = [
  { key: 'fdaCert', title: 'FDA食品接触认证', sub: '美国市场准入', icon: ShieldCheck, model: 'qwen' as const },
  { key: 'ceCert', title: 'CE RED欧盟认证', sub: '欧盟27国市场', icon: Shield, model: 'qwen' as const },
  { key: 'prohibited', title: '禁售/限制项排查', sub: '平台政策合规', icon: CheckCircle2, model: 'qwen' as const },
  { key: 'ipRisk', title: '知识产权风险', sub: '专利商标侵权', icon: AlertCircle, model: 'qwen' as const },
  { key: 'tariff', title: '关税/原产地分析', sub: 'HS编码+物流建议', icon: MapPin, model: 'qwen' as const },
]

export default function Compliance() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

  const overallCfg = overallMap[complianceData.overallLevel as keyof typeof overallMap]
  const score = complianceData.score
  const circumference = 2 * Math.PI * 60
  const progress = (score / 100) * circumference
  const dashOffset = circumference - progress

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck className="w-5 h-5 text-violet-600" />
          <h1 className="text-[22px] font-semibold tracking-tight">合规检测报告</h1>
        </div>
        <p className="text-sm text-muted-foreground">全维度市场准入与风险评估 · 百炼多模型推理验证</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : (
        <>
          <div className={cn('rounded-2xl p-[1px] bg-gradient-to-r', overallCfg.bg, 'shadow-lg')}>
            <div className="rounded-2xl bg-card p-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
                <div className="lg:col-span-1 flex flex-col items-center">
                  <div className="relative w-40 h-40">
                    <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
                      <circle cx="80" cy="80" r="60" fill="none" stroke="#f4f4f5" strokeWidth="12" />
                      <circle
                        cx="80" cy="80" r="60" fill="none"
                        stroke={`url(#grad-${complianceData.overallLevel})`}
                        strokeWidth="12" strokeLinecap="round"
                        strokeDasharray={`${progress} ${circumference}`}
                        strokeDashoffset={0}
                      />
                      <defs>
                        <linearGradient id={`grad-${complianceData.overallLevel}`} x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#f59e0b" />
                          <stop offset="100%" stopColor="#f97316" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-4xl font-bold tracking-tight">{score}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">综合合规分</div>
                    </div>
                  </div>
                  <div className={cn('mt-3 px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r text-white', overallCfg.bg)}>
                    {overallCfg.label} · {complianceData.overallLevel}等级
                  </div>
                </div>

                <div className="lg:col-span-3 space-y-5">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-violet-50 dark:bg-violet-950/40 flex items-center justify-center text-violet-600 dark:text-violet-400">
                        <ShieldCheck className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <div className="text-[11px] text-muted-foreground">检测品类</div>
                        <div className="text-sm font-semibold">{complianceData.category}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-950/40 flex items-center justify-center text-sky-600 dark:text-sky-400">
                        <MapPin className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <div className="text-[11px] text-muted-foreground">目标市场</div>
                        <div className="text-sm font-semibold">{complianceData.market}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                        <Calendar className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <div className="text-[11px] text-muted-foreground">检测日期</div>
                        <div className="text-sm font-semibold">{complianceData.checkDate}</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-3">
                    {sections.map(s => {
                      const d = complianceData.resultDetail[s.key as keyof typeof complianceData.resultDetail] as any
                      const cfg = levelBadgeMap[d.level as keyof typeof levelBadgeMap] || levelBadgeMap['低风险']
                      const Icon = s.icon
                      return (
                        <div key={s.key} className="rounded-xl border border-border p-3 text-center hover:shadow-md transition-shadow">
                          <div className={cn('w-9 h-9 mx-auto rounded-lg bg-gradient-to-br text-white mb-2 flex items-center justify-center', cfg.grad)}>
                            <Icon className="w-4.5 h-4.5" />
                          </div>
                          <div className="text-[11px] font-semibold leading-tight">{s.title.split(' ')[0]}</div>
                          <div className={cn('mt-1.5 text-[10px] font-bold px-2 py-0.5 rounded inline-block', cfg.bg, cfg.color)}>
                            {d.level}
                          </div>
                          <div className="text-[11px] font-bold mt-1 text-muted-foreground">
                            {d.score || complianceData.resultDetail.tariff.score}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 p-3.5 flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                    <div className="text-[12.5px] leading-relaxed">
                      <span className="font-semibold text-amber-800 dark:text-amber-300">核心整改建议：</span>
                      <span className="text-amber-800/90 dark:text-amber-300/90">优先补充FDA食品接触材料高温迁移检测报告（7工作日），同步调整开盖结构规避USD968231S外观专利重叠点，预计可将综合评分提升至85+（绿色等级）。</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {sections.map(s => {
              const d = complianceData.resultDetail[s.key as keyof typeof complianceData.resultDetail] as any
              const cfg = levelBadgeMap[d.level as keyof typeof levelBadgeMap] || levelBadgeMap['低风险']
              const Icon = s.icon
              const isTariff = s.key === 'tariff'

              return (
                <div key={s.key} className="rounded-2xl border border-border bg-card overflow-hidden hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300">
                  <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-gradient-to-r from-muted/50 to-transparent">
                    <div className="flex items-center gap-3">
                      <div className={cn('w-10 h-10 rounded-xl bg-gradient-to-br text-white flex items-center justify-center shadow-sm', cfg.grad)}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-[14px] font-semibold">{s.title}</h3>
                        <p className="text-[11px] text-muted-foreground">{s.sub}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!isTariff && (
                        <div className="text-right">
                          <div className="text-lg font-bold leading-none">{d.score}</div>
                          <div className="text-[10px] text-muted-foreground">/100</div>
                        </div>
                      )}
                      <span className={cn('inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold border', cfg.bg, cfg.color)}>
                        {!isTariff && <cfg.icon className="w-3.5 h-3.5" />}
                        {isTariff ? `关税 ${d.rate}` : d.level}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <ModelOutputCard model={s.model} className="shadow-none">
                      {isTariff ? d.content : d.content}
                    </ModelOutputCard>
                    {isTariff && (
                      <div className="mt-4 flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-100 dark:border-emerald-900/40">
                        <div className="text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                          建议越南组装USMCA关税优化
                        </div>
                        <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                          节省 3.9% <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
