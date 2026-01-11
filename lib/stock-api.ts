// 股票数据 API 客户端
// 支持 Tushare Pro 或其他数据源

import { StockQuote, KlineData, KlinePeriod, MarketIndex, StockSearchResult, HotStock, MarketOverview } from '@/types/stock';

// 缓存配置
const CACHE_DURATION = {
  QUOTE: 3000,        // 报价缓存3秒
  KLINE: 60000,       // K线缓存1分钟
  OVERVIEW: 300000,   // 市场概览缓存5分钟
};

// 简单的内存缓存
const cache = new Map<string, { data: any; expiry: number }>();

function getCache<T>(key: string): T | null {
  const cached = cache.get(key);
  if (cached && cached.expiry > Date.now()) {
    return cached.data as T;
  }
  cache.delete(key);
  return null;
}

function setCache(key: string, data: any, duration: number): void {
  cache.set(key, {
    data,
    expiry: Date.now() + duration,
  });
}

/**
 * 获取股票实时报价
 */
export async function getStockQuote(symbol: string): Promise<StockQuote> {
  const cacheKey = `quote:${symbol}`;
  const cached = getCache<StockQuote>(cacheKey);
  if (cached) return cached;

  // TODO: 替换为真实的 Tushare Pro API 调用
  // const data = await fetchFromTushare(`/daily?ts_code=${symbol}`);

  // Mock 数据 - 返回一些常见的A股股票
  const mockData: Record<string, StockQuote> = {
    '600519': {
      symbol: '600519',
      name: '贵州茅台',
      price: 1850.00,
      change: 25.50,
      changePercent: 1.40,
      volume: 2580000,
      turnover: 4773000000,
      high: 1860.00,
      low: 1825.00,
      open: 1830.00,
      prevClose: 1824.50,
      timestamp: Date.now(),
    },
    '000858': {
      symbol: '000858',
      name: '五粮液',
      price: 155.20,
      change: -2.30,
      changePercent: -1.46,
      volume: 18500000,
      turnover: 2870000000,
      high: 158.00,
      low: 154.00,
      open: 157.50,
      prevClose: 157.50,
      timestamp: Date.now(),
    },
    '300750': {
      symbol: '300750',
      name: '宁德时代',
      price: 185.50,
      change: 8.20,
      changePercent: 4.63,
      volume: 32500000,
      turnover: 6020000000,
      high: 188.00,
      low: 178.00,
      open: 180.00,
      prevClose: 177.30,
      timestamp: Date.now(),
    },
    '600036': {
      symbol: '600036',
      name: '招商银行',
      price: 32.50,
      change: 0.80,
      changePercent: 2.52,
      volume: 45800000,
      turnover: 1480000000,
      high: 32.80,
      low: 31.50,
      open: 31.80,
      prevClose: 31.70,
      timestamp: Date.now(),
    },
    '000001': {
      symbol: '000001',
      name: '平安银行',
      price: 11.25,
      change: -0.15,
      changePercent: -1.32,
      volume: 32500000,
      turnover: 366000000,
      high: 11.40,
      low: 11.15,
      open: 11.35,
      prevClose: 11.40,
      timestamp: Date.now(),
    },
  };

  const data = mockData[symbol];

  if (!data) {
    throw new Error(`股票 ${symbol} 暂无数据`);
  }

  setCache(cacheKey, data, CACHE_DURATION.QUOTE);
  return data;
}

/**
 * 获取K线数据
 */
export async function getKlineData(symbol: string, period: KlinePeriod = 'daily'): Promise<KlineData[]> {
  const cacheKey = `kline:${symbol}:${period}`;
  const cached = getCache<KlineData[]>(cacheKey);
  if (cached) return cached;

  // TODO: 替换为真实的 Tushare Pro API 调用
  // const data = await fetchFromTushare(`/daily?ts_code=${symbol}`);

  // 生成 Mock K线数据
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;
  const data: KlineData[] = [];

  let basePrice = 1800;
  for (let i = 200; i >= 0; i--) {
    const timestamp = now - i * dayMs;
    const open = basePrice + (Math.random() - 0.5) * 50;
    const close = open + (Math.random() - 0.5) * 30;
    const high = Math.max(open, close) + Math.random() * 20;
    const low = Math.min(open, close) - Math.random() * 20;
    const volume = Math.floor(Math.random() * 5000000) + 1000000;

    data.push({
      timestamp: timestamp / 1000,
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume,
    });

    basePrice = close;
  }

  setCache(cacheKey, data, CACHE_DURATION.KLINE);
  return data;
}

/**
 * 搜索股票
 */
export async function searchStocks(query: string): Promise<StockSearchResult[]> {
  const cacheKey = `search:${query}`;
  const cached = getCache<StockSearchResult[]>(cacheKey);
  if (cached) return cached;

  // Mock 搜索数据
  const allStocks: StockSearchResult[] = [
    { symbol: '600519', name: '贵州茅台', pinyin: 'GZMT', market: '沪市' },
    { symbol: '000858', name: '五粮液', pinyin: 'WLY', market: '深市' },
    { symbol: '300750', name: '宁德时代', pinyin: 'NDSD', market: '创业板' },
    { symbol: '600036', name: '招商银行', pinyin: 'ZSYH', market: '沪市' },
    { symbol: '000001', name: '平安银行', pinyin: 'PAYH', market: '深市' },
    { symbol: '600031', name: '三一重工', pinyin: 'SYZG', market: '沪市' },
    { symbol: '000333', name: '美的集团', pinyin: 'MDJT', market: '深市' },
    { symbol: '601318', name: '中国平安', pinyin: 'ZGPA', market: '沪市' },
    { symbol: '600276', name: '恒瑞医药', pinyin: 'HRYY', market: '沪市' },
    { symbol: '002594', name: '比亚迪', pinyin: 'BYD', market: '深市' },
  ];

  const results = allStocks.filter(
    (stock) =>
      stock.symbol.includes(query) ||
      stock.name.includes(query) ||
      stock.pinyin.toLowerCase().includes(query.toLowerCase())
  );

  setCache(cacheKey, results, CACHE_DURATION.OVERVIEW);
  return results;
}

/**
 * 获取热门股票
 */
export async function getHotStocks(): Promise<HotStock[]> {
  const cacheKey = 'hot:stocks';
  const cached = getCache<HotStock[]>(cacheKey);
  if (cached) return cached;

  const mockHotStocks: HotStock[] = [
    {
      symbol: '300750',
      name: '宁德时代',
      price: 185.50,
      changePercent: 4.63,
      reason: '新能源板块龙头,今日放量上涨',
    },
    {
      symbol: '600519',
      name: '贵州茅台',
      price: 1850.00,
      changePercent: 1.40,
      reason: '白酒板块反弹,机构持续看好',
    },
    {
      symbol: '002594',
      name: '比亚迪',
      price: 245.80,
      changePercent: 3.25,
      reason: '新能源汽车销量创新高',
    },
    {
      symbol: '600036',
      name: '招商银行',
      price: 32.50,
      changePercent: 2.52,
      reason: '银行板块整体走强',
    },
  ];

  setCache(cacheKey, mockHotStocks, CACHE_DURATION.OVERVIEW);
  return mockHotStocks;
}

/**
 * 获取市场概览
 */
export async function getMarketOverview(): Promise<MarketOverview> {
  const cacheKey = 'market:overview';
  const cached = getCache<MarketOverview>(cacheKey);
  if (cached) return cached;

  const mockOverview: MarketOverview = {
    date: new Date().toISOString().split('T')[0],
    indexes: [
      {
        name: '上证指数',
        code: 'sh000001',
        price: 3085.25,
        change: 25.30,
        changePercent: 0.83,
        timestamp: Date.now(),
      },
      {
        name: '深证成指',
        code: 'sz399001',
        price: 10185.60,
        change: 85.40,
        changePercent: 0.85,
        timestamp: Date.now(),
      },
      {
        name: '创业板指',
        code: 'sz399006',
        price: 2058.90,
        change: 32.50,
        changePercent: 1.60,
        timestamp: Date.now(),
      },
    ],
    hotStocks: await getHotStocks(),
    riseCount: 2580,
    fallCount: 1850,
    flatCount: 320,
  };

  setCache(cacheKey, mockOverview, CACHE_DURATION.OVERVIEW);
  return mockOverview;
}

/**
 * 批量获取股票报价
 */
export async function getBatchQuotes(symbols: string[]): Promise<StockQuote[]> {
  const promises = symbols.map((symbol) => getStockQuote(symbol));
  return Promise.all(promises);
}
