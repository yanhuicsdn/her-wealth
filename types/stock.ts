// 股票数据类型定义

/**
 * 股票实时报价
 */
export interface StockQuote {
  symbol: string;          // 股票代码,如 "600519"
  name: string;            // 股票名称,如 "贵州茅台"
  price: number;           // 当前价格
  change: number;          // 涨跌额
  changePercent: number;   // 涨跌幅 (%)
  volume: number;          // 成交量
  turnover: number;        // 成交额
  high: number;            // 最高价
  low: number;             // 最低价
  open: number;            // 开盘价
  prevClose: number;       // 昨收价
  timestamp: number;       // 时间戳
}

/**
 * K线数据
 */
export interface KlineData {
  timestamp: number;       // 时间戳
  open: number;            // 开盘价
  high: number;            // 最高价
  low: number;             // 最低价
  close: number;           // 收盘价
  volume: number;          // 成交量
}

/**
 * K线周期类型
 */
export type KlinePeriod = 'daily' | 'weekly' | 'monthly' | '60min' | '30min' | '15min' | '5min';

/**
 * 市场指数
 */
export interface MarketIndex {
  name: string;            // 指数名称,如 "上证指数"
  code: string;            // 指数代码,如 "sh000001"
  price: number;           // 当前点位
  change: number;          // 涨跌点
  changePercent: number;   // 涨跌幅 (%)
  timestamp: number;       // 时间戳
}

/**
 * 股票基本信息
 */
export interface StockInfo {
  symbol: string;
  name: string;
  industry: string;        // 所属行业
  marketCap: number;       // 市值 (亿元)
  peRatio: number;         // 市盈率
  pbRatio: number;         // 市净率
  dividendYield: number;   // 股息率 (%)
  high52w: number;         // 52周最高
  low52w: number;          // 52周最低
  turnoverRate: number;    // 换手率 (%)
}

/**
 * 技术指标数据
 */
export interface TechnicalIndicators {
  ma5: number;             // 5日均线
  ma10: number;            // 10日均线
  ma20: number;            // 20日均线
  macd: {
    dif: number;           // DIF值
    dea: number;           // DEA值
    macd: number;          // MACD值
  };
  kdj: {
    k: number;             // K值
    d: number;             // D值
    j: number;             // J值
  };
}

/**
 * 股票搜索结果
 */
export interface StockSearchResult {
  symbol: string;
  name: string;
  pinyin: string;          // 拼音缩写
  market: string;          // 市场 (沪市/深市)
}

/**
 * 热门股票
 */
export interface HotStock {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  reason: string;          // 热门原因
}

/**
 * 市场概览
 */
export interface MarketOverview {
  date: string;            // 日期
  indexes: MarketIndex[];  // 主要指数
  hotStocks: HotStock[];   // 热门股票
  riseCount: number;       // 上涨家数
  fallCount: number;       // 下跌家数
  flatCount: number;       // 平盘家数
}

/**
 * 涨跌停股票
 */
export interface LimitMoveStock {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  reason: string;          // 涨跌停原因
}

/**
 * 股票新闻
 */
export interface StockNews {
  id: string;
  symbol: string;
  title: string;
  summary: string;
  publishTime: number;
  source: string;
  url: string;
}
