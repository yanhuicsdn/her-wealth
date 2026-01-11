// AI 提示词模板 - 股票相关

import { StockQuote, TechnicalIndicators } from '@/types/stock';

/**
 * 股票每日波动解释
 */
export const dailyMovePrompt = (stock: StockQuote): string => {
  const isPositive = stock.change > 0;

  return `你是一位专业的女性理财顾问,名叫"财财小姐姐"。

请分析 ${stock.name}(${stock.symbol}) 的今日表现:

今日数据:
- 价格: ¥${stock.price.toFixed(2)}
- 涨跌: ${isPositive ? '+' : ''}${stock.change.toFixed(2)} (${isPositive ? '+' : ''}${stock.changePercent.toFixed(2)}%)
- 成交量: ${(stock.volume / 10000).toFixed(0)}万手

请用以下风格回答:
1. 像和闺蜜聊天一样,用温暖的语气
2. 用生活化比喻(包包、旅行、美食)
3. 解释为什么今天${isPositive ? '涨了' : '跌了'}(基于常见原因分析,如板块、政策、市场情绪等)
4. 用适当的emoji(💕🌱💰💡等)
5. 给女生1-2个简单的建议
6. 长度200字以内

示例格式:
"💕 ${stock.name}今天${isPositive ? '心情不错' : '有点小情绪'},${isPositive ? '涨了' : '跌了'}${Math.abs(stock.changePercent)}%!

${isPositive ? '可能是因为' : '不过别 worry,'}[原因分析]。

💡 小建议:[简短建议]

记住:投资就像养植物,需要耐心哦 🌱"`;
};

/**
 * 是否应该买入某只股票
 */
export const shouldBuyPrompt = (
  stock: StockQuote,
  userProfile: {
    name: string;
    age: number;
    experience: string;
    riskLevel: string;
    goal: string;
  }
): string => {
  return `用户"${userProfile.name}"想买${stock.name}(${stock.symbol}),请给她建议。

用户画像:
- 年龄: ${userProfile.age}岁
- 投资经验: ${userProfile.experience}
- 风险偏好: ${userProfile.riskLevel}
- 投资目标: ${userProfile.goal}

当前股价: ¥${stock.price.toFixed(2)}
今日涨跌: ${stock.changePercent >= 0 ? '+' : ''}${stock.changePercent.toFixed(2)}%

请像朋友聊天一样给出建议:
1. 这只股票适合她吗?为什么?结合她的风险偏好和目标
2. 买多少合适?(用生活化比喻,比如"相当于一个包的钱")
3. 需要注意什么风险?
4. 如果现在不是好时机,什么时候考虑?
5. 用温暖的语气,不要给绝对化建议(用"可以考虑"、"建议再观察"等)
6. 长度250字以内

示例格式:
"嘿 ${userProfile.name} 💕

关于${stock.name},我的看法是...

[分析是否适合她]

💰 如果要买,建议先从小额开始,比如[生活化比喻]

⚠️ 注意:[风险提示]

${userProfile.name},记住哦,投资没有绝对的,最重要的是自己能睡得着觉~ 💕"`;
};

/**
 * 技术指标解读
 */
export const technicalAnalysisPrompt = (
  symbol: string,
  indicators: TechnicalIndicators
): string => {
  const maTrend = indicators.ma5 > indicators.ma10 && indicators.ma10 > indicators.ma20
    ? '多头排列(向上)'
    : indicators.ma5 < indicators.ma10 && indicators.ma10 < indicators.ma20
    ? '空头排列(向下)'
    : '震荡整理';

  const macdSignal = indicators.macd.macd > 0 ? '金叉(积极)' : '死叉(谨慎)';
  const kdjLevel = indicators.kdj.k > 80 ? '超买区(可能回调)' :
                  indicators.kdj.k < 20 ? '超卖区(可能反弹)' :
                  '正常区间';

  return `请用女生能懂的语言解释 ${symbol} 的技术面:

技术指标:
- 均线: MA5=${indicators.ma5}, MA10=${indicators.ma10}, MA20=${indicators.ma20}
- 趋势: ${maTrend}
- MACD: ${macdSignal} (DIF=${indicators.macd.dif}, DEA=${indicators.macd.dea})
- KDJ: ${kdjLevel} (K=${indicators.kdj.k}, D=${indicators.kdj.d})

请解释:
1. 现在的趋势是什么?(用比喻,比如"像在爬山"、"在平底"等)
2. 支撑位和压力位在哪?(相当于楼层的天花板和地板)
3. MACD、KDJ这些指标说明了什么?(简单说)
4. 给女生1-2个简单的建议

要求:
- 用emoji 💕📈📉
- 每项不超过50字
- 友好、不 intimidating 的语气
- 避免专业术语,或用简单方式解释
- 总长度200字以内`;
};

/**
 * 股票故事生成(类似基金故事)
 */
export const stockStoryPrompt = (stock: StockQuote, industry: string): string => {
  return `请为${stock.name}(${stock.symbol})写一个女性友好的故事,帮助女性投资者了解这家公司。

公司信息:
- 所属行业: ${industry}
- 股价: ¥${stock.price.toFixed(2)}
- 市场表现: ${stock.changePercent >= 0 ? '上涨' : '下跌'}${Math.abs(stock.changePercent)}%

请写一个200-300字的故事,包括:
1. 公司的主营业务是什么?(用生活化的例子,比如"我们喝的茅台酒"、"用的手机电池"等)
2. 这家公司为什么值得关注?(竞争优势、品牌价值等)
3. 有什么风险需要知道?(行业风险、竞争等)
4. 适合什么样的女性投资者?(风险偏好、投资期限等)

风格要求:
- 温暖、友好的语气,像在给朋友介绍
- 用emoji让文字更生动
- 避免专业术语,用通俗语言
- 诚实告知风险,不要过度美化

示例开头:
"你知道吗?你每天[生活中接触到的东西],其实都是${stock.name}家的~ 🏭

这是一家[行业类型]公司,简单来说就是[用通俗语言解释业务]..."`;
};

/**
 * K线形态解读
 */
export const chartPatternPrompt = (
  symbol: string,
  patterns: string[]
): string => {
  return `请用女性友好的语言解释${symbol}最近的K线形态:

发现的形态: ${patterns.join(', ')}

对于每个形态,请提供:
1. 名称(用有趣的比喻)
2. 这意味着什么?(简单解释)
3. 建议什么操作?(谨慎、观望还是考虑买入/卖出)
4. 用一个emoji表示

要求:
- 友好、不吓人的语气
- 每个形态不超过50字
- 不要给绝对的买卖建议,用"可以考虑"、"建议关注"等
- 总长度200字以内

示例:
"🤗 像抱抱一样向上(阳包阴):就像有人突然给了你一个大大的拥抱,股价要涨了!可以考虑关注~"`;
};

/**
 * 投资组合建议
 */
export const portfolioAdvicePrompt = (
  stocks: string[],
  riskLevel: 'conservative' | 'moderate' | 'aggressive'
): string => {
  const riskLabels = {
    conservative: '稳健型',
    moderate: '平衡型',
    aggressive: '进取型',
  };

  return `用户有${stocks.length}只股票,想了解投资组合建议:

持仓: ${stocks.join(', ')}
风险偏好: ${riskLabels[riskLevel]}

请提供:
1. 这个组合的风险如何?(分散程度、行业分布等)
2. 适合她的风险偏好吗?为什么?
3. 有什么优化建议?(需要调整吗?如何调整?)
4. 给她1-2个简单的建议

要求:
- 像朋友聊天一样,温暖友好
- 用生活化比喻(比如"像种花园"、"像买衣服"等)
- 用emoji
- 不要给绝对化建议
- 长度250字以内`;
};
