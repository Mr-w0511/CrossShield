import { ReactNode } from 'react'
import { Sparkles, Brain, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'

type ModelType = 'qwen' | 'deepseek' | 'vl'

interface ModelOutputCardProps {
  model: ModelType
  title?: string
  children: ReactNode
  className?: string
}

const modelConfig: Record<ModelType, { label: string; icon: typeof Sparkles; gradientClass: string; badgeClass: string; badgeBg: string }> = {
  qwen: {
    label: 'qwen3.7-max',
    icon: Sparkles,
    gradientClass: 'gradient-border-qwen',
    badgeClass: 'text-violet-700 dark:text-violet-300',
    badgeBg: 'bg-violet-100 dark:bg-violet-900/40 border-violet-200 dark:border-violet-800/60',
  },
  deepseek: {
    label: 'deepseek-r1',
    icon: Brain,
    gradientClass: 'gradient-border-deepseek',
    badgeClass: 'text-sky-700 dark:text-sky-300',
    badgeBg: 'bg-sky-100 dark:bg-sky-900/40 border-sky-200 dark:border-sky-800/60',
  },
  vl: {
    label: 'qwen3-vl-plus',
    icon: Eye,
    gradientClass: 'gradient-border-vl',
    badgeClass: 'text-emerald-700 dark:text-emerald-300',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-900/40 border-emerald-200 dark:border-emerald-800/60',
  },
}

export default function ModelOutputCard({ model, title, children, className }: ModelOutputCardProps) {
  const cfg = modelConfig[model]
  const Icon = cfg.icon

  return (
    <div className={cn('rounded-2xl p-[1px]', cfg.gradientClass, className)}>
      <div className="rounded-2xl bg-card p-5 h-full">
        <div className="flex items-center gap-2 mb-4">
          <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border', cfg.badgeBg, cfg.badgeClass)}>
            <Icon className="w-3.5 h-3.5" />
            {cfg.label}
          </span>
          {title && (
            <span className="text-xs font-medium text-muted-foreground">{title}</span>
          )}
        </div>
        <div className="text-sm leading-relaxed text-card-foreground/90 whitespace-pre-line">
          {children}
        </div>
      </div>
    </div>
  )
}
