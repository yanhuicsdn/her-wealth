import { Product } from "@/types/product";

// 模拟产品数据 - 女性叙事风格
export const mockProducts: Product[] = [
  {
    id: "fund-001",
    code: "005827",
    name: "易方达蓝筹精选",
    type: "fund",
    tagline: "适合想存钱买房,但不爱操心的你",
    story: `张坤,是个很稳的人。

他只买他真正理解的\"好公司\",就像你只买真正喜欢的包。

他持有茅台、腾讯这些你每天都在用的公司,不追热点,不赶潮流,稳稳地赚钱。

从业10年+,经历过多次牛熊,知道什么时候该进攻,什么时候该防守。`,
    managerName: "张坤",
    managerStyle: "稳健型",
    managerExperience: "从业10年+,经历过多次牛熊",
    performance: {
      threeYearReturn: "近3年 +58%",
      humanExplanation: [
        "2021年买10万,现在15.8万",
        "2022年跌了15%,2023年涨回26%",
        "→ 相当于你买了个包,后来涨价又能买两个",
      ],
    },
    risk: {
      maxDrawdown: "最差情况可能亏20%",
      probability: "但拉长到3年,90%情况下是赚钱的",
      suitable: [
        "能放3年不用",
        "能接受10-15%的波动",
        "希望比银行利息高,但别太折腾",
      ],
      notSuitable: ["不能接受任何亏损的别买"],
    },
    userCase: {
      name: "小美",
      age: 30,
      initialAmount: 100000,
      currentAmount: 158000,
      duration: "2年",
      quote: "中间跌的时候有点慌,但坚持住了,现在很开心",
    },
    whyRecommended: [
      "你30岁,能承担一点风险",
      "你想买房,需要稳健增长",
      "这只基金持有茅台、腾讯,都是你熟悉的公司",
      "基金经理张坤,从业10年+,经历过多次牛熊",
    ],
    holdings: ["贵州茅台", "腾讯控股", "阿里巴巴", "美团", "五粮液"],
    description: "专注于投资蓝筹股的混合基金,适合长期持有",
    fee: "申购费1.5%(通过我们开户打1折)",
    minAmount: 10,
  },
  {
    id: "fund-002",
    code: "163406",
    name: "兴全合润混合",
    type: "fund",
    tagline: "补充一些成长性,但别太激进",
    story: `谢治宇,是个很聪明的人。

他不只买大公司,也会发现一些"被低估的宝藏",就像你逛淘宝总能淘到性价比高的好货。

他擅长在市场低迷时找到机会,别人恐慌时他敢买,别人贪婪时他卖,这就是"逆向投资"。

从业8年,管理的基金规模超过500亿,是业内公认的成长股投资高手。`,
    managerName: "谢治宇",
    managerStyle: "成长型",
    managerExperience: "从业8年,管理规模超500亿",
    performance: {
      threeYearReturn: "近3年 +72%",
      humanExplanation: [
        "2021年买10万,现在17.2万",
        "2022年跌了18%,2023年猛涨45%",
        "→ 波动有点大,但长期看很给力",
      ],
    },
    risk: {
      maxDrawdown: "最差情况可能亏25%",
      probability: "但拉长到3年,80%情况下赚钱",
      suitable: [
        "能放3年不用",
        "能接受20-25%的波动",
        "希望收益更高一些",
      ],
      notSuitable: ["不能接受亏损超过15%的别买"],
    },
    userCase: {
      name: "阿玲",
      age: 32,
      initialAmount: 150000,
      currentAmount: 258000,
      duration: "3年",
      quote: "2022年跌的时候很慌,但忍住没卖,现在收益很满意",
    },
    whyRecommended: [
      "你想给方案补充一些成长性",
      "你能承担比纯债基金更高的波动",
      "基金经理谢治宇是成长股高手",
      "这只基金历史表现优秀,长期持有收益可观",
    ],
    holdings: ["宁德时代", "比亚迪", "隆基绿能", "药明康德", "立讯精密"],
    description: "专注于成长股的混合基金,追求长期资本增值",
    fee: "申购费1.5%(通过我们开户打1折)",
    minAmount: 10,
  },
  {
    id: "fund-003",
    code: "161723",
    name: "招商中债债券",
    type: "fund",
    tagline: "降低波动,让你睡得着觉",
    story: `这是一只纯债基金,就像把钱借给国家、银行、大公司。

基金经理张艺,是个很谨慎的人。她只买信用等级高的债券,就像你只会借钱给靠谱的朋友。

这只基金很少亏损,就像银行理财一样稳,但收益会稍微高一点点。

如果你特别害怕风险,这只基金就是你的"安全垫"。`,
    managerName: "张艺",
    managerStyle: "保守型",
    managerExperience: "从业12年,专注债券投资",
    performance: {
      threeYearReturn: "近3年 +14%",
      humanExplanation: [
        "2021年买10万,现在11.4万",
        "每年收益4-5%,很稳定",
        "→ 比银行理财好一点点,但很稳",
      ],
    },
    risk: {
      maxDrawdown: "最差情况可能亏2-3%",
      probability: "历史上98%的情况下是赚钱的",
      suitable: [
        "不能接受亏损",
        "随时可能用钱",
        "想要比银行存款高一点的收益",
      ],
      notSuitable: ["想追求高收益的别买"],
    },
    userCase: {
      name: "小红",
      age: 28,
      initialAmount: 50000,
      currentAmount: 57000,
      duration: "3年",
      quote: "很稳,虽然收益不高,但从来没亏过,我很安心",
    },
    whyRecommended: [
      "你想降低整体组合的波动",
      "你需要一个\"安全垫\"来平衡风险",
      "这只基金很稳,能让你睡得着觉",
      "适合作为投资组合的保守部分",
    ],
    holdings: ["国债", "政策性金融债", "高等级企业债"],
    description: "纯债基金,专注于债券投资,风险较低",
    fee: "申购费0(免申购费)",
    minAmount: 10,
  },
];

// 根据产品ID获取产品
export function getProductById(id: string): Product | undefined {
  return mockProducts.find((p) => p.id === id);
}

// 根据基金代码获取产品
export function getProductByCode(code: string): Product | undefined {
  return mockProducts.find((p) => p.code === code);
}
