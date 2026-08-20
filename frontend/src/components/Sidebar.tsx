import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  ShieldCheck,
  Waves,
  TrendingUp,
  MessageSquareText,
  Crosshair,
  Tag,
  FileText,
  Settings as SettingsIcon,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navGroups = [
  {
    label: '概览',
    items: [
      { path: '/dashboard', label: '仪表盘', icon: LayoutDashboard },
    ],
  },
  {
    label: '选品决策',
    items: [
      { path: '/compliance', label: '合规预检', icon: ShieldCheck },
      { path: '/product-analysis', label: '蓝海选品', icon: Waves },
      { path: '/trend-prediction', label: '趋势预测', icon: TrendingUp },
    ],
  },
  {
    label: '市场洞察',
    items: [
      { path: '/reviews', label: '评论洞察', icon: MessageSquareText },
      { path: '/competitor-tracking', label: '竞品追踪', icon: Crosshair },
      { path: '/pricing', label: '对标定价', icon: Tag },
    ],
  },
  {
    label: '系统',
    items: [
      { path: '/reports', label: '数据报告', icon: FileText },
      { path: '/settings', label: '系统设置', icon: SettingsIcon },
    ],
  },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col z-50">
      <div className="h-16 flex items-center gap-2.5 px-6 border-b border-sidebar-border">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-[15px] font-semibold text-sidebar-foreground tracking-tight">CrossShield</h1>
          <p className="text-[11px] text-muted-foreground">跨境AI选品与合规</p>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-4 overflow-y-auto scrollbar-thin">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="px-3 pt-1 pb-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive =
                  location.pathname === item.path ||
                  (item.path !== '/dashboard' && location.pathname.startsWith(item.path))
                const Icon = item.icon
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'group flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-200',
                      isActive
                        ? 'bg-gradient-to-r from-violet-500 to-indigo-500 text-white shadow-md shadow-violet-500/25'
                        : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground'
                    )}
                  >
                    <Icon className={cn('w-[17px] h-[17px] shrink-0', isActive ? 'text-white' : 'text-muted-foreground group-hover:text-sidebar-foreground')} />
                    <span>{item.label}</span>
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                    )}
                  </NavLink>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-sidebar-border">
        <div className="rounded-xl bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-950/40 dark:to-indigo-950/40 p-3.5 border border-violet-100 dark:border-violet-900/40">
          <p className="text-[11px] font-semibold text-violet-700 dark:text-violet-300 mb-0.5">百炼多模型驱动</p>
          <p className="text-[10px] text-violet-600/70 dark:text-violet-400/70 leading-relaxed">
            qwen3.7-max · deepseek-r1 · vl-plus · qwq-plus
          </p>
        </div>
      </div>
    </aside>
  )
}
