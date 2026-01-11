/**
 * 金额比喻生成器
 * 将投资金额转化为女性容易理解的生活化比喻
 */

export interface Analogy {
  text: string
  example: string
}

/**
 * 生成金额比喻
 * @param amount 金额
 * @returns 比喻对象
 */
export function generateAmountAnalogy(amount: number): Analogy {
  const analogies = [
    {
      threshold: 1000,
      text: "相当于一次美发",
      example: "就像做了一次精致的护理 💇‍♀️"
    },
    {
      threshold: 5000,
      text: "相当于一顿精致晚餐",
      example: "够去西餐厅享受一顿 🍽️"
    },
    {
      threshold: 10000,
      text: "相当于一个轻奢包包",
      example: "像 Coach 或 MK 这种入门款 👜"
    },
    {
      threshold: 50000,
      text: "相当于一次豪华旅行",
      example: "够去巴黎、伦敦玩一圈 ✈️"
    },
    {
      threshold: 100000,
      text: "相当于一个LV包包",
      example: "经典款 LV Speedy 💼"
    },
    {
      threshold: 200000,
      text: "相当于12个LV包包",
      example: "可以开个包包店了 👛👛👛"
    },
    {
      threshold: 500000,
      text: "相当于一辆Mini Cooper",
      example: "四轮跑车开回家 🚗"
    },
    {
      threshold: 1000000,
      text: "相当于一辆豪华轿车",
      example: "奔驰、宝马任你挑 🚙‍♂️"
    }
  ]

  // 找到匹配的比喻
  const match = analogies
    .sort((a, b) => b.threshold - a.threshold)
    .find(a => amount >= a.threshold)

  return match || {
    threshold: 0,
    text: "相当于几次精致下午茶",
    example: "可以和闺蜜喝上好几顿下午茶 ☕"
  }
}

/**
 * 生成盈亏比喻
 * @param profit 盈亏金额
 * @param isPositive 是否盈利
 * @returns 比喻文本
 */
export function generateProfitAnalogy(profit: number, isPositive: boolean): string {
  const absProfit = Math.abs(profit)

  if (absProfit < 100) {
    return isPositive
      ? "够买杯奶茶啦 🧋"
      : "就当少喝杯奶茶"
  }

  if (absProfit < 1000) {
    return isPositive
      ? "可以加个鸡腿了 🍗"
      : "少买件衣服而已"
  }

  if (absProfit < 5000) {
    return isPositive
      ? "够做个美甲啦 💅"
      : "就当少做一次美甲"
  }

  if (absProfit < 10000) {
    return isPositive
      ? "离包包又近了一步 👛"
      : "别担心,包包会回来的"
  }

  return isPositive
    ? "可以奖励自己一下了 ✨"
    : "长期投资会回来的,别担心 🌱"
}

/**
 * 生成交易确认文案
 * @param symbol 股票代码
 * @param name 股票名称
 * @param type 交易类型
 * @param quantity 数量
 * @param price 价格
 * @returns 交易确认信息
 */
export function generateTradeConfirmation(
  symbol: string,
  name: string,
  type: 'buy' | 'sell',
  quantity: number,
  price: number
) {
  const totalAmount = quantity * price
  const analogy = generateAmountAnalogy(totalAmount)
  const actionText = type === 'buy' ? '买入' : '卖出'

  return {
    title: `${name} (${symbol})`,
    action: actionText,
    quantity,
    price,
    totalAmount,
    analogy,
    message: type === 'buy'
      ? `💡 ${analogy.text}\n   ${analogy.example}`
      : `💰 ${analogy.text}\n   ${analogy.example}`
  }
}

/**
 * 生成风险提示
 * @param riskLevel 风险等级
 * @returns 风险提示文本
 */
export function generateRiskWarning(riskLevel: 'low' | 'medium' | 'high'): string {
  const warnings = {
    low: "💕 这个选择比较稳健,像存钱一样安全",
    medium: "💛 中等风险,就像买包包,可能保值也可能贬值",
    high: "❤️‍🔥 风险较高,像买彩票,可能赚很多也可能亏不少"
  }

  return warnings[riskLevel]
}
