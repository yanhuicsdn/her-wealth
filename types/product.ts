// 产品数据类型定义

export type ProductType = "fund" | "stock";

export interface ProductPerformance {
  threeYearReturn: string; // "近3年 +58%"
  humanExplanation: string[]; // ["2021年买10万,现在15.8万"]
  chartData?: { year: string; value: number }[]; // 可选的图表数据
}

export interface ProductRisk {
  maxDrawdown: string; // "最差情况可能亏20%"
  probability: string; // "但拉长到3年,90%情况下赚钱"
  suitable: string[]; // ["能放3年不用", "能接受10-15%的波动"]
  notSuitable: string[]; // ["不能接受任何亏损的别买"]
}

export interface ProductUserCase {
  name: string;
  age: number;
  initialAmount: number;
  currentAmount: number;
  duration: string;
  quote: string; // "中间跌的时候有点慌,但坚持住了,现在很开心"
}

export interface Product {
  id: string;
  code: string; // 基金代码或股票代码
  name: string;
  type: ProductType;

  // 女性叙事元素
  tagline: string; // "适合想存钱买房,但不爱操心的你"
  story: string; // 基金经理的故事
  managerName: string;
  managerStyle: string; // "稳健型"、"成长型"
  managerExperience: string; // "从业10年+,经历过多次牛熊"

  // 历史表现(用人话说)
  performance: ProductPerformance;

  // 风险提示(诚实透明)
  risk: ProductRisk;

  // 真实案例
  userCase: ProductUserCase;

  // 为什么推荐(个性化)
  whyRecommended: string[]; // 基于用户画像的推荐理由

  // 持有公司(熟悉的品牌)
  holdings: string[]; // ["茅台", "腾讯", "阿里巴巴"]

  // 详细信息(可选)
  description?: string;
  fee?: string; // 手续费
  minAmount?: number; // 最低投资金额
}
