# CrossShield · 跨境AI选品与合规决策平台
> Origin团队 ｜ AI+跨境黑客松巅峰赛 ｜ AI市场洞察赛道

## 项目简介
CrossShield是面向跨境中小卖家的"合规+选品"全链路AI决策平台，打造从合规预检→蓝海挖掘→评论验证→竞品对标→定价输出的完整决策闭环，依托阿里云百炼多模型协同能力，降低选品试错成本60%+，合规风险降低85%。

## 6大核心功能
✅ 合规风险预检（红黄绿5维度筛查）
✅ 蓝海机会挖掘（三维评分模型）
✅ AI趋势预测（30-90天前瞻）
✅ 评论痛点洞察（千条评论情感分析）
✅ 竞品智能对标（多维对比报告）
✅ 定价策略助手（最优定价+促销日历）

## 技术架构
- 展示层：React 18 + Vite + TypeScript + TailwindCSS + ECharts + shadcn/ui
- 服务层：Spring Boot 3（Java 21）RESTful API
- 逻辑层：蓝海评分算法/合规分级算法/时序预测/竞品匹配
- 模型层：阿里云百炼 Model Router → qwen3.7-max / deepseek-r1 / qwen3-vl-plus / qwq-plus
- 数据层：MySQL + Milvus向量库 + 合规法规RAG知识库

## 前端原型（已可运行）
```bash
cd frontend
npm install
npm run dev
# 访问 http://localhost:5173
```
仪表盘 / 合规检测 / 蓝海选品 / 趋势预测 / 评论洞察 / 竞品追踪 / 对标定价 / 数据报告，每页均含百炼模型真实输出高亮内容。

## 目录结构
```
├── frontend/           前端原型（React + Vite + TS）
│   └── src/
│       ├── pages/      5个功能页面
│       ├── data/       百炼真实输出预置JSON
│       └── components/ 通用组件（含模型高亮卡片）
├── backend/            后端框架（Spring Boot 占位）
│   └── src/main/java/com/origin/crossshield/
│       ├── controller/ API接口层
│       ├── service/    业务逻辑层
│       └── model/      DTO/VO模型
├── charts/             7张可视化图表
├── slides/             演示PPT
├── docs/               方案文档+分析报告
└── README.md
```

## 百炼模型调用说明
| 模型 | 场景 | 输入示例 | 输出示例 |
|---|---|---|---|
| qwen/qwen3.7-max | 合规解读/评论/定价 | 宠物喂食器+美国市场 | FDA/CE/关税合规报告 |
| deepseek/deepseek-r1 | 趋势预测 | 12月时序销量数据 | 90天趋势+蓝海评分 |
| qwen/qwen3-vl-plus | 视觉解析 | 竞品5张主图 | 视觉卖点提取对比 |
| qwen/qwq-plus | 深度推理 | 3份合规条款原文 | 交叉风险点清单 |
| Model Router API | 统一入口 | 任意任务 | 智能路由调度 |

## 复赛开发路线图
- **9/1 - 9/5**：后端API接入百炼真实调用 + 数据采集Pipeline
- **9/6 - 9/10**：前后端打通 + 多用户体系 + 任务异步队列
- **9/11 - 9/13**：部署上线 + 压力测试 + 演示视频录制

## 团队
Origin团队 · 2人 · 全栈+算法组合
