# BMS × Soulscape

> **数字身心觉知生态平台 · 投资人与合作伙伴全功能交互演示系统**  
> **Digital Wellness & Spiritual Discovery Ecosystem (Investor Demonstration)**

---

## 🌟 项目愿景与产品定位 (Product Vision)

**BMS × Soulscape** 是一款专为数字时代现代人打造的高端身心健康与灵性觉知生态应用。融汇了 **88 枚原创原初神谕卡**、**全息七脉轮声波调频乐库**、**认证大师智库 1对1 咨询**、**多步骤闭环修行之旅**、**数字能量积分钱包**、**AI 觉知向导模拟** 以及 **全维度生态合伙人管理中枢**。

本项目为**完全可交互、功能闭环的高保真演示 Web App**，所有主次路径均有实际页面承接与本地状态流转，杜绝死链接、空屏与生硬占位符。

---

## 🛠️ 技术栈 (Tech Stack)

- **框架**：Next.js 14 App Router + TypeScript
- **样式**：Tailwind CSS (精心调配象牙白 `#FAF8F5`、鼠尾草绿 `#5A8B6F`、薰衣草紫 `#7160A1` 与静水炭黑)
- **动效**：Framer Motion + CSS 3D Transforms (卡牌真实 3D 翻转动效) + Canvas Confetti
- **图表**：Recharts (商业创收 AreaChart、模块占比 BarChart、留存与 AI 用量)
- **图标**：Lucide Icons
- **声波引擎**：HTML5 Web Audio API 振荡器（实时在浏览器端生成 432Hz、528Hz、639Hz 等纯净正弦波与双耳节拍，不依赖外部大型 CDN 媒体流）
- **状态管理与持久化**：React Context + LocalStorage（抽牌记录、积分账本、预约排班、旅程进度全量本地持久化）
- **适配器架构**：针对未来生产级对接，开箱预留了 `LLMAdapter`、`PaymentGatewayAdapter` 与 `AuthAdapter` 抽象层

---

## 🚀 快速启动指南 (Setup & Run)

```bash
# 1. 安装依赖 (如首次拉取代码)
npm install

# 2. 启动本地开发服务器
npm run dev

# 3. 访问本地演示应用
# 浏览器打开 http://localhost:3000
```

生产级编译校验：
```bash
npm run build
```

---

## 🎭 演示角色系统 (Demo Roles & Switcher)

应用顶部常驻 **Demo Role Switcher（演示身份切换栏）**，无需输入账号密码，随时一键无感切换体验三大角色视角：

1. **普通会员 (Member)**：
   - 角色：`林若尘 (演示会员)`
   - 权限：体验每日免费抽牌、消耗 20 积分体验三牌阵、试听 12 首调频声波、在 AI 觉知向导中对话、预约导师个案并管理个人积分钱包。
   - 专属入口：`/dashboard`、`/wallet`、`/journeys`、`/library`、`/history`

2. **认证导师 (Mentor)**：
   - 角色：`苏念真 老师 (藏传颂钵与荣格心理意象导师)`
   - 权限：查看主讲课程与学员数、管理来访者预约排班、进入加密视频会议室、发布专栏文章、批注 88 张神谕卡、查看分成结算流水及推广分销邀请码。
   - 专属入口：`/mentor`、`/mentor/bookings`、`/mentor/content`、`/mentor/cards`、`/mentor/courses`、`/mentor/earnings`、`/mentor/share-links`

3. **管理合伙人 (Admin)**：
   - 角色：`BMS 首席生态合伙人`
   - 权限：监控平台全维度经营大盘（4,820 用户、¥98,400 GMV、14,200 次占读）、用户名录治理、导师资质审核、88 卡牌组资产图谱、声波乐库编排、流水台账审计、AI 用量监控与系统 API 密钥槽位配置。
   - 专属入口：`/admin`、`/admin/users`、`/admin/mentors`、`/admin/card-decks`、`/admin/music`、`/admin/content`、`/admin/memberships`、`/admin/transactions`、`/admin/ai-usage`、`/admin/analytics`、`/admin/settings`

---

## 🧭 全站核心路由地图 (Route Architecture)

### 公开探索区 (Public)
| 路由路径 | 页面定位与功能 |
| :--- | :--- |
| `/` | 投资人落地页：品牌主旨、3D 卡牌翻转互动、五大生态支柱、可试听声波发生器、导师矩阵、会员定价与兴趣引导 |
| `/explore` | 全局综合搜索枢纽：跨卡牌、曲目、脉轮、文章、导师的统一检索与热门标签推荐 |
| `/cards` | 88 张原创神谕卡画廊：按七脉轮与八大界域筛选、关键词搜索、卡牌全屏详情弹窗 |
| `/cards/[id]` | 单张卡牌深度专页：象征图腾、光明启示、阴影警示、反思之问与配套调频音推荐 |
| `/card-reading` | 核心抽牌占读仪式：单牌免费(0积分) / 三牌阵(20积分)、洗牌切牌动效、翻转揭晓、AI 综合解析与手记输入 |
| `/reading-result`| 占读成果深度呈现：卡牌多维对照、AI 全息分析与后续修行建议 |
| `/music` | 调频声疗乐库：12 首索尔菲吉奥与 432Hz 曲目、4 套主题歌单、分类筛选、实时 Web Audio 双耳节拍合成 |
| `/music/[id]` | 单曲声波生物学专页：载波与差频参数解析、对应脉轮对齐练习 |
| `/chakras` | 七脉轮全息图谱：百会至会阴垂直能量柱、赫兹频率表、失衡信号排查、每日真言 |
| `/chakras/[id]` | 单个脉轮深度导引：生理腺体对照、平衡/受阻身心体征、配套调频音与对应神谕卡 |
| `/knowledge` | 觉知百科：8 篇高质量身心科学文献、阅读时长、分类筛选、沉浸式全文字阅览器 |
| `/mentors` | 认证导师名录：8 位虚拟导师档案、流派专长、真实评价、可预约档期、模拟预约弹窗 |
| `/mentors/[id]` | 导师主页：详细履历、专长认证、主讲课程预览、直接发起咨询预约 |
| `/courses` | 大师系统课：3 套进阶课程大纲预览、课时清单、学习进度打卡打标与积分解锁 |
| `/pricing` | 商业模型与定价方案：免费版、尊享版、赞助人年费体系对比，加购积分包与模拟收银台结算 |
| `/login` | 演示免密登录：一键切换三种角色视角体验不同权限界面 |
| `/register` | 演示注册：兴趣爱好选择并即时获赠 100 初始体验积分 |

### 会员专区 (Member)
| 路由路径 | 页面定位与功能 |
| :--- | :--- |
| `/dashboard` | 个人觉知看板：动态问候、会员等级、可用积分、进行中旅程、最新占读卡牌、每日推荐音频、导师预约日程 |
| `/ai-guide` | AI 觉知向导模拟室：确定性意图模板驱动的多轮对话、预设情绪排查、LLM 适配器架构代码查看器 |
| `/journeys` | 定制修行之旅：晨光扎根、心轮慈悲、深睡诱导三套 5 步仪式化流程，带进度保存与完结勋章 |
| `/library` | 私人心灵藏珍：一览收藏的卡牌、调频音频、导师与文章 |
| `/history` | 占读历史档案：按时间倒序排列的每一次提问、抽牌原型、AI 合成解析与个人体悟手记 |
| `/wallet` | 积分钱包与台账：实时余额、使用规则指引、30+ 笔流水账本、快速模拟充值与重置余额 |
| `/profile` | 个人设置中心：当前身份信息、角色快速切换、本地数据重置 |

### 导师工作台 (Mentor)
| 路由路径 | 页面定位与功能 |
| :--- | :--- |
| `/mentor` | 导师主仪表盘：总个案数、学员好评率、月度预估分润、待履约个案列表、加密会议室入口 |
| `/mentor/bookings` | 咨询排班管理：预约确认、时段筛选、来访者诉求备忘录 |
| `/mentor/content` | 专栏文稿创作：已发布文献阅读量监控、在线 Markdown 撰写与发布弹窗 |
| `/mentor/cards` | 88 卡牌独家批注：为对应卡牌附加导师心得，反哺学员抽牌结果 |
| `/mentor/courses` | 课程运营：查看主讲课程的学员人数、各讲义模块大纲与评分 |
| `/mentor/earnings` | 收益分成对账：80% 导师分成模型、月度结余折算、模拟提现申请 |
| `/mentor/share-links`| 专属推广分销：个人专属引流链接、带参数海报二维码与 20% 推荐佣金体系 |

### 管理后台 (Admin)
| 路由路径 | 页面定位与功能 |
| :--- | :--- |
| `/admin` | 经营驾驶舱：4,820 用户、¥98,400 GMV 走势 AreaChart、生态模块使用占比、实时交易流 |
| `/admin/users` | 用户管理台：会员等级、积分余额明细、注册时间与活跃状态 |
| `/admin/mentors` | 导师审核：资历审核、履约场次、评分监控 |
| `/admin/card-decks` | 卡牌资产图谱：88 张卡牌在七脉轮的分布分布统计、IP 原创合规声明 |
| `/admin/music` | 声波乐库编排：音频载频与双耳节拍差频配置、热度追踪 |
| `/admin/content` | 文献审核：全站 8 篇前沿身心知识文献的过审与浏览量监控 |
| `/admin/memberships`| 定价策略引擎：配置各档会籍月费/年费及每月赠送积分配额 |
| `/admin/transactions`| 审计总账：全站 30+ 笔流水日志实时搜索、类型筛选与金额核对 |
| `/admin/ai-usage` | AI 监控：模拟 Token 消耗量折算、API 边际成本预估、每日请求 BarChart |
| `/admin/analytics` | 留存大屏：30日 Cohort 留存曲线、多级转化漏斗分析 |
| `/admin/settings` | 系统与适配器配置：LLM 提供商与网关密钥槽位预留、全站演示状态恢复 |

---

## 🔌 生产级适配器抽象 (Production Adapters)

为了在未来平滑迁移至真实商业化生产环境，项目在 `src/services/adapters/` 规范化定义了适配器接口：

1. **大语言模型适配器 (`LLMAdapter`)**：
   - 当前实现：`LocalSimulationLLMAdapter`，采用本地确定性意图模板与分支逻辑，清晰标注 `[DEMO SIMULATION]`。
   - 生产替换：填入 OpenAI / Claude / Gemini API Key 即可切换为实时大模型推理。
2. **支付网关适配器 (`PaymentGatewayAdapter`)**：
   - 当前实现：`MockPaymentAdapter`，模拟 600ms 处理延迟并生成真实格式交易单据，不发起真实资金扣划。
   - 生产替换：无缝对接 Stripe Checkout、微信支付服务商或支付宝接口。
3. **身份认证适配器 (`AuthAdapter`)**：
   - 当前实现：`LocalStorageAuthAdapter`，支持免密一键切换 Member / Mentor / Admin 角色会话。
   - 生产替换：接入 Supabase Auth、NextAuth.js 或企业级 OAuth。

---

## 🛡️ 演示合规与医疗免责声明 (Compliance & Medical Disclaimer)

1. **演示数据说明**：本应用所展示之 8 位导师身份、个人履历、学员评论、卡牌解读和交易流水均为演示模拟数据，非真实商业合同或真实履约承诺。
2. **非医疗诊断声明**：平台所包含之七脉轮知识、声波频率赫兹与神谕卡反思仅供身心自我觉察、正念呼吸与压力舒缓使用，绝不构成任何形式的临床心理治疗、精神卫生干预或医疗处方建议。如遇严重身心困扰，请寻求专业执业医师帮助。
3. **零付费承诺**：演示中的所有充值与消费操作均采用虚拟演示代币，无需绑定银行卡，亦不产生任何实际扣款。
