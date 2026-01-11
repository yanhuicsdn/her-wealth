# 🌸 她财 (Her-Wealth)

> 专为女性设计的股票交易应用，让投资变得简单可信赖

## ✨ 主要功能

- 📊 **股票行情** - 实时股票行情和K线图表
- 🔐 **用户认证** - 手机号验证登录
- ⭐ **自选股** - 添加和管理关注的股票
- 🛍️ **股票交易** - 买入/卖出股票
- 💼 **持仓管理** - 查看持仓和盈亏
- 📝 **委托记录** - 交易历史记录
- 💡 **AI投资建议** - 个性化投资方案
- 🎨 **女性友好设计** - 温暖、易懂的界面

## 🚀 一键部署（免费）

### 方式 1: Vercel ⭐ 推荐

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyanhuicsdn%2Fher-wealth&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,OPENAI_API_KEY)

**步骤：**
1. 点击上方按钮
2. 用 GitHub 登录 Vercel
3. 点击 "Deploy"
4. 等待 2-3 分钟
5. 获得免费网址：`https://her-wealth-xxxxx.vercel.app`

### 方式 2: Netlify

[![Deploy with Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

**步骤：**
1. 点击上方按钮
2. 用 GitHub 登录
3. 选择 `yanhuicsdn/her-wealth` 仓库
4. 点击 "Deploy Site"

### 方式 3: Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new?template=https://github.com/yanhuicsdn/her-wealth)

**步骤：**
1. 点击上方按钮
2. 用 GitHub 登录
3. 点击 "Deploy Now"

## 💻 本地运行

```bash
# 克隆仓库
git clone https://github.com/yanhuicsdn/her-wealth.git
cd her-wealth

# 安装依赖
npm install

# 运行开发服务器
npm run dev
```

打开浏览器访问 http://localhost:3000

## 🛠️ 技术栈

- **框架**: Next.js 16.1.1 (App Router)
- **UI**: React 19 + TypeScript + Tailwind CSS 4
- **状态管理**: Zustand
- **图表**: Lightweight Charts
- **认证**: Supabase Auth (Mock 实现)
- **AI**: OpenAI API (可选)

## 📦 环境变量（可选）

应用使用 Mock 数据，无需配置即可运行。如需使用真实功能：

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

# OpenAI
OPENAI_API_KEY=your_openai_key
```

## 🎨 设计特色

- 💕 女性友好的粉/蓝配色
- 👜 生活化类比（如"相当于一个LV包包"）
- 🌸 温暖、鼓励性的文案
- 📱 移动优先的响应式设计

## 📝 使用说明

1. **登录**: 点击"立即登录"，输入任意手机号
2. **查看验证码**: 开发环境在终端查看
3. **添加自选**: 在股票详情页点击"添加到自选"
4. **模拟交易**: 点击"买入"或"卖出"体验

## 📄 许可证

MIT License

## 🙏 致谢

Made with 💕 for women investors

---

**立即选择上方任一平台免费部署！** 🚀
