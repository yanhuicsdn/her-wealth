// 交易相关类型定义

/**
 * 订单类型
 */
export type OrderType = 'buy' | 'sell';

/**
 * 订单方式
 */
export type OrderMethod = 'market' | 'limit' | 'conditional';

/**
 * 订单状态
 */
export type OrderStatus = 'pending' | 'filled' | 'partial' | 'cancelled' | 'rejected';

/**
 * 订单
 */
export interface Order {
  id: string;
  userId: string;
  symbol: string;
  name: string;
  type: OrderType;
  method: OrderMethod;
  quantity: number;
  price?: number;          // 限价单的价格
  status: OrderStatus;
  filledQuantity?: number;
  filledPrice?: number;
  analogy?: string;        // 女性友好的金额比喻
  createdAt: number;
  updatedAt: number;
  filledAt?: number;
}

/**
 * 持仓
 */
export interface Position {
  id: string;
  userId: string;
  symbol: string;
  name: string;
  quantity: number;
  avgCost: number;         // 平均成本价
  currentPrice: number;    // 当前价格
  marketValue: number;     // 市值
  profitLoss: number;      // 盈亏金额
  profitLossPercent: number; // 盈亏比例 (%)
  todayProfitLoss: number; // 今日盈亏
  purchaseDate: number;    // 买入日期
}

/**
 * 账户资产
 */
export interface Account {
  userId: string;
  totalAssets: number;     // 总资产
  cash: number;            // 可用资金
  marketValue: number;     // 证券市值
  profitLoss: number;      // 总盈亏
  profitLossPercent: number; // 总盈亏比例 (%)
  todayProfitLoss: number; // 今日盈亏
  buyingPower: number;     // 购买力
  updatedAt: number;
}

/**
 * 交易确认信息
 */
export interface TradeConfirmation {
  symbol: string;
  name: string;
  type: OrderType;
  quantity: number;
  price: number;
  totalAmount: number;
  analogy: {
    text: string;          // 比喻文本
    example: string;       // 具体例子
  };
  fee: number;             // 手续费
  timestamp: number;
}

/**
 * 订单历史记录
 */
export interface OrderHistory {
  orders: Order[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * 成交记录
 */
export interface Trade {
  id: string;
  orderId: string;
  symbol: string;
  name: string;
  type: OrderType;
  quantity: number;
  price: number;
  amount: number;
  timestamp: number;
}

/**
 * 资金流水
 */
export interface CashFlow {
  id: string;
  userId: string;
  type: 'deposit' | 'withdraw' | 'buy' | 'sell' | 'dividend' | 'fee';
  amount: number;
  balance: number;
  description: string;
  timestamp: number;
}

/**
 * 资产分布
 */
export interface AssetAllocation {
  cash: number;            // 现金比例 (%)
  stock: number;           // 股票比例 (%)
  symbol: string;          // 股票代码
  name: string;            // 股票名称
  percentage: number;      // 占比 (%)
}[];
