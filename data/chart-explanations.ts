// 女性友好的K线形态和技术指标解释

/**
 * K线形态解释
 */
export const chartPatternExplanations = {
  bullish_engulfing: {
    title: '像抱抱一样向上 🤗',
    explanation: '就像有人突然给了你一个大大的拥抱,股价要涨了!之前的下跌被今天的上涨完全"抱住"了。',
    action: '可以考虑关注',
    mood: 'happy',
  },
  bearish_engulfing: {
    title: '不开心的时候 ☹️',
    explanation: '就像今天心情不好,把之前的好心情都压下去了。股价可能要跌一跌。',
    action: '建议谨慎',
    mood: 'sad',
  },
  hammer: {
    title: '小锤子敲到底 🔨',
    explanation: '就像装修工人敲到了地板,股价已经跌不下去了,可能会反弹哦~',
    action: '可以关注了',
    mood: 'hopeful',
  },
  hanging_man: {
    title: '挂在那儿的人 🎭',
    explanation: '就像在犹豫要不要往下跳,可能要反转了。需要再观察一下。',
    action: '建议观望',
    mood: 'uncertain',
  },
  doji: {
    title: '十字路口的犹豫 🤔',
    explanation: '买方和卖方势均力敌,都在犹豫。就像在十字路口,不知道该往哪走。',
    action: '再看看',
    mood: 'uncertain',
  },
  morning_star: {
    title: '早上的星星 ⭐',
    explanation: '黑夜之后就是黎明!就像看到了希望,股价可能要开始上涨了。',
    action: '积极的信号',
    mood: 'happy',
  },
  evening_star: {
    title: '晚上的星星 🌙',
    explanation: '就像一天要结束了,可能要休息一下。上涨趋势可能要停了。',
    action: '小心一点',
    mood: 'cautious',
  },
  shooting_star: {
    title: '流星划过 ☄️',
    explanation: '就像流星一样,冲得很高但很快就掉下来了。可能要跌。',
    action: '建议谨慎',
    mood: 'cautious',
  },
  three_white_soldiers: {
    title: '三个勇敢的小兵 💪',
    explanation: '连续三根阳线,就像三个小士兵在往上冲!势头很猛,可能继续涨。',
    action: '强劲的上涨信号',
    mood: 'excited',
  },
  three_black_crows: {
    title: '三只乌鸦 🐦‍⬛',
    explanation: '连续三根阴线,就像三只乌鸦在叫,可能不是好消息。股价可能继续跌。',
    action: '注意风险',
    mood: 'worried',
  },
};

/**
 * 技术指标解释
 */
export const indicatorExplanations = {
  MA5: {
    name: '5日均线',
    explanation: '最近5天平均价 - 就像看最近5天的心情日记',
    metaphor: '短期情绪',
    emoji: '📅',
  },
  MA10: {
    name: '10日均线',
    explanation: '最近10天平均价 - 看看最近两周的趋势',
    metaphor: '中期情绪',
    emoji: '📆',
  },
  MA20: {
    name: '20日均线',
    explanation: '最近20天平均价 - 差不多一个月的表现',
    metaphor: '月度趋势',
    emoji: '🗓️',
  },
  MA60: {
    name: '60日均线',
    explanation: '最近60天平均价 - 季度级别的走势',
    metaphor: '季度走势',
    emoji: '📊',
  },
  MACD: {
    name: 'MACD指标',
    explanation: '趋势指标 - 就像看天气预报,预测未来走向',
    metaphor: '股市天气预报',
    emoji: '🌤️',
    details: {
      golden_cross: '金叉 = 快线上穿慢线,就像找到了金矿,积极信号 ✨',
      death_cross: '死叉 = 快线下穿慢线,要小心了 ⚠️',
      positive: 'MACD为正,趋势向上 📈',
      negative: 'MACD为负,趋势向下 📉',
    },
  },
  KDJ: {
    name: 'KDJ指标',
    explanation: '超买超卖指标 - 就像买东西,太贵了别买,便宜了可以买',
    metaphor: '价格温度计',
    emoji: '🌡️',
    details: {
      overbought: 'K>80,太贵了(超买),可能回调 💸',
      oversold: 'K<20,很便宜(超卖),可能反弹 💰',
      neutral: '在20-80之间,正常范围 😌',
    },
  },
  BOLL: {
    name: '布林带',
    explanation: '价格通道 - 就像股价的安全通道,超出通道要注意',
    metaphor: '安全通道',
    emoji: '🛣️',
    details: {
      upper: '上轨 - 价格的天花板,碰到可能要跌 📉',
      lower: '下轨 - 价格的地板,碰到可能反弹 📈',
      middle: '中轨 - 中性价位,围绕它上下波动 ➖',
    },
  },
  RSI: {
    name: 'RSI指标',
    explanation: '相对强弱 - 就像看股票有没有力气继续涨',
    metaphor: '股票力气值',
    emoji: '💪',
    details: {
      strong: 'RSI>50,还有力气上涨 🚀',
      weak: 'RSI<50,有点累了 ⚠️',
      overbought: 'RSI>70,太兴奋了,可能要休息 😵',
      oversold: 'RSI<30,太累了,可能要恢复 😴',
    },
  },
  VOLUME: {
    name: '成交量',
    explanation: '今天有多少人买卖 - 就像商场的人流量',
    metaphor: '商场人气',
    emoji: '👥',
    details: {
      high: '成交量很大,很多人在交易,很热门 🔥',
      low: '成交量很小,比较冷清 ❄️',
      price_up_volume_up: '价涨量增,真上涨 ✅',
      price_up_volume_down: '价涨量减,可能是假涨 ⚠️',
    },
  },
};

/**
 * 趋势解释
 */
export const trendExplanations = {
  upward: {
    title: '像在爬山 🏔️',
    explanation: '股价一路向上,就像在爬山。虽然累但风景会越来越好~',
    mood: 'positive',
    advice: '可以考虑持有,但注意别追太高',
  },
  downward: {
    title: '像在坐滑梯 🎢',
    explanation: '股价一路向下,就像坐滑梯。有点刺激但可能有点怕~',
    mood: 'negative',
    advice: '建议观望,等到底部再考虑',
  },
  sideways: {
    title: '像在平地上走 🚶‍♀️',
    explanation: '股价涨涨跌跌但整体平稳,就像在平地上散步。不急不躁~',
    mood: 'neutral',
    advice: '可以等待,观望一下方向',
  },
  volatile: {
    title: '像过山车 🎢',
    explanation: '股价大起大落,就像坐过山车!刺激但容易晕~',
    mood: 'cautious',
    advice: '心脏不好的小伙伴要小心哦',
  },
};

/**
 * 支撑位和压力位解释
 */
export const levelExplanations = {
  support: {
    title: '支撑位 - 地板 🏠',
    explanation: '就像房间的地板,股价跌到这里通常会有支撑,不容易再跌下去。',
    metaphor: '价格的地板',
    action: '可以考虑在这里买入',
    emoji: '🛡️',
  },
  resistance: {
    title: '压力位 - 天花板 🏠',
    explanation: '就像房间的天花板,股价涨到这里会遇到压力,不容易突破。',
    metaphor: '价格的天花板',
    action: '可以考虑在这里卖出',
    emoji: '🚧',
  },
  breakout: {
    title: '突破 ✨',
    explanation: '就像冲破了天花板,打开新空间!可能是好信号哦~',
    metaphor: '打开新天地',
    action: '可能开启新趋势',
    emoji: '🎉',
  },
  breakdown: {
    title: '跌破 ⚠️',
    explanation: '就像穿破了地板,掉到下一层了。要小心哦~',
    metaphor: '掉到下一层',
    action: '注意风险',
    emoji: '🕳️',
  },
};

/**
 * 获取形态解释
 */
export function getPatternExplanation(pattern: string): typeof chartPatternExplanations[keyof typeof chartPatternExplanations] | null {
  return chartPatternExplanations[pattern as keyof typeof chartPatternExplanations] || null;
}

/**
 * 获取指标解释
 */
export function getIndicatorExplanation(indicator: string): typeof indicatorExplanations[keyof typeof indicatorExplanations] | null {
  return indicatorExplanations[indicator as keyof typeof indicatorExplanations] || null;
}

/**
 * 获取趋势解释
 */
export function getTrendExplanation(trend: 'upward' | 'downward' | 'sideways' | 'volatile'): typeof trendExplanations[keyof typeof trendExplanations] {
  return trendExplanations[trend];
}
