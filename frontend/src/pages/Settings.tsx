import { useEffect, useState } from 'react'
import {
  Settings as SettingsIcon,
  Cpu,
  Key,
  Bell,
  Database,
  CheckCircle2,
  Circle,
  RefreshCw,
  Zap,
} from 'lucide-react'
import settingsData from '@/data/settings.json'
import { PageLoader } from '@/components/LoadingSkeleton'
import { cn } from '@/lib/utils'

export default function Settings() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  if (loading) {
    return (
      <div className="space-y-5">
        <div>
          <h1 className="text-[22px] font-semibold mb-1 flex items-center gap-2"><SettingsIcon /> 系统设置</h1>
        </div>
        <PageLoader />
      </div>
    )
  }

  const colorMap: Record<string, string> = {
    purple: 'from-violet-500 to-indigo-500',
    blue: 'from-sky-500 to-blue-500',
    green: 'from-emerald-500 to-teal-500',
    'dark-purple': 'from-purple-700 to-violet-700',
    orange: 'from-orange-500 to-amber-500',
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <SettingsIcon className="w-5 h-5 text-violet-600" />
        <h1 className="text-[22px] font-semibold tracking-tight">系统设置</h1>
      </div>

      {/* Model Configuration */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="text-[15px] font-semibold flex items-center gap-2 mb-4">
          <Cpu className="w-4 h-4 text-violet-500" /> 百炼模型配置
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {settingsData.models.map(m => (
            <div key={m.id} className={cn(
              'rounded-xl border p-4 transition-all',
              m.status === 'active'
                ? 'border-violet-200 dark:border-violet-800/50 bg-violet-50/50 dark:bg-violet-950/20'
                : 'border-border bg-muted/30'
            )}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className={cn('w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center text-white text-[11px] font-bold', colorMap[m.color])}>
                    {m.name.split('/')[1]?.charAt(0).toUpperCase() || m.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold font-mono">{m.name}</div>
                    <div className="text-[10px] text-muted-foreground">{m.role}</div>
                  </div>
                </div>
                {m.status === 'active' ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> 运行中
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> 待命
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {m.tasks.map((t, j) => (
                  <span key={j} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* API Config */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="text-[15px] font-semibold flex items-center gap-2 mb-4">
          <Key className="w-4 h-4 text-violet-500" /> API 配置
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">API Endpoint</label>
            <div className="px-3 py-2 rounded-lg bg-muted/50 text-xs font-mono text-card-foreground/80">
              {settingsData.apiConfig.endpoint}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Router Endpoint</label>
            <div className="px-3 py-2 rounded-lg bg-muted/50 text-xs font-mono text-card-foreground/80 truncate">
              {settingsData.apiConfig.routerEndpoint}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">认证方式</label>
            <div className="px-3 py-2 rounded-lg bg-muted/50 text-xs font-mono text-card-foreground/80">
              {settingsData.apiConfig.authMethod}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">API Key</label>
            <div className="px-3 py-2 rounded-lg bg-muted/50 text-xs font-mono text-card-foreground/80 flex items-center justify-between">
              <span>{settingsData.apiConfig.keyMasked}</span>
              <button className="text-violet-600 hover:text-violet-700 text-[10px] font-semibold">显示</button>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">超时（秒）</label>
            <div className="px-3 py-2 rounded-lg bg-muted/50 text-xs font-mono text-card-foreground/80">
              {settingsData.apiConfig.timeout}s
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">重试次数</label>
            <div className="px-3 py-2 rounded-lg bg-muted/50 text-xs font-mono text-card-foreground/80">
              {settingsData.apiConfig.retryCount} 次
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="text-[15px] font-semibold flex items-center gap-2 mb-4">
          <Bell className="w-4 h-4 text-violet-500" /> 通知设置
        </h3>
        <div className="space-y-2">
          {[
            { key: 'complianceAlert', label: '合规风险预警' },
            { key: 'competitorPriceChange', label: '竞品价格变动' },
            { key: 'competitorNewListing', label: '新竞品上架' },
            { key: 'trendUpdate', label: '趋势数据更新' },
            { key: 'reviewSpike', label: '评论异常波动' },
            { key: 'dailyReport', label: '每日报告推送' },
          ].map(item => {
            const enabled = (settingsData.notifications as any)[item.key]
            return (
              <div key={item.key} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted/30 transition-colors">
                <span className="text-sm">{item.label}</span>
                {enabled ? (
                  <span className="flex items-center gap-1.5 text-emerald-600">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-[11px] font-semibold">已开启</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Circle className="w-4 h-4" />
                    <span className="text-[11px] font-semibold">已关闭</span>
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Data Sources */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="text-[15px] font-semibold flex items-center gap-2 mb-4">
          <Database className="w-4 h-4 text-violet-500" /> 数据源状态
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {settingsData.dataSources.map((s, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div>
                <div className="text-[13px] font-semibold">{s.name}</div>
                <div className="text-[10px] text-muted-foreground">上次同步：{s.lastSync}</div>
              </div>
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> {s.status === 'connected' ? '已连接' : '未连接'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
        <Zap className="w-3.5 h-3.5 text-violet-500" />
        百炼 Model Router API · 统一接入126+大模型 · 智能调度
      </div>
    </div>
  )
}
