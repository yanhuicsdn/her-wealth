"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import KlineChart from '@/components/charts/kline-chart';
import { StockQuote, KlineData, KlinePeriod } from '@/types/stock';
import { useWatchlistStore } from '@/stores/watchlist.store';
import { useAuthStore } from '@/stores/auth.store';
import toast from 'react-hot-toast';

export default function StockDetailPage({ params }: { params: { symbol: string } }) {
  const { symbol } = params;
  const [stock, setStock] = useState<StockQuote | null>(null);
  const [klineData, setKlineData] = useState<KlineData[]>([]);
  const [period, setPeriod] = useState<KlinePeriod>('daily');
  const [loading, setLoading] = useState(true);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const { addItem, removeItem, items } = useWatchlistStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    fetchStockData();
    fetchKlineData();
  }, [symbol, period]);

  useEffect(() => {
    // 检查是否已在自选中
    const inWatchlist = items.some(item => item.symbol === symbol);
    setIsInWatchlist(inWatchlist);
  }, [items, symbol]);

  const fetchStockData = async () => {
    try {
      const response = await fetch(`/api/stocks/quote?symbol=${symbol}`);
      const data = await response.json();
      setStock(data);
    } catch (error) {
      console.error('获取股票数据失败:', error);
    }
  };

  const fetchKlineData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/stocks/kline?symbol=${symbol}&period=${period}`);
      const data = await response.json();
      setKlineData(data.data || []);
    } catch (error) {
      console.error('获取K线数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleWatchlist = async () => {
    if (!isAuthenticated) {
      toast.error('请先登录');
      return;
    }

    if (!stock) return;

    try {
      if (isInWatchlist) {
        await removeItem(symbol);
        toast.success('已从自选删除');
      } else {
        await addItem(symbol, stock.name);
        toast.success('已添加到自选');
      }
    } catch (error) {
      toast.error(isInWatchlist ? '删除失败' : '添加失败');
    }
  };

  if (!stock) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">加载中...</p>
      </div>
    );
  }

  const isPositive = stock.change >= 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white px-5 pt-12 pb-4 border-b border-gray-100">
        <Link href="/stocks" className="inline-flex items-center text-pink-600 mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 mr-1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          返回行情
        </Link>

        <div className="flex items-start justify-between mb-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{stock.name}</h1>
            <p className="text-sm text-gray-500">{stock.symbol}</p>
          </div>
        </div>

        {/* Price Display */}
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-4xl font-bold text-gray-900">
            ¥{stock.price.toFixed(2)}
          </span>
          <span className={`text-lg font-semibold ${isPositive ? 'text-red-600' : 'text-green-600'}`}>
            {isPositive ? '+' : ''}{stock.change.toFixed(2)}
          </span>
          <span className={`text-base ${isPositive ? 'text-red-600' : 'text-green-600'}`}>
            ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
          </span>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-4 gap-2 text-xs text-gray-600 mt-3">
          <div>
            <span className="text-gray-500">开盘</span>
            <p className="font-medium">{stock.open.toFixed(2)}</p>
          </div>
          <div>
            <span className="text-gray-500">最高</span>
            <p className="font-medium text-red-600">{stock.high.toFixed(2)}</p>
          </div>
          <div>
            <span className="text-gray-500">最低</span>
            <p className="font-medium text-green-600">{stock.low.toFixed(2)}</p>
          </div>
          <div>
            <span className="text-gray-500">昨收</span>
            <p className="font-medium">{stock.prevClose.toFixed(2)}</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-5 py-4 space-y-4">
        {/* K-Line Chart */}
        <Card className="shadow-sm border-gray-200">
          <CardContent className="p-4">
            <h2 className="text-base font-bold text-gray-900 mb-3">📈 K线图</h2>
            {loading ? (
              <div className="flex items-center justify-center h-[300px]">
                <p className="text-gray-600">加载中...</p>
              </div>
            ) : (
              <KlineChart
                data={klineData}
                symbol={symbol}
                period={period}
                height={300}
              />
            )}
          </CardContent>
        </Card>

        {/* Stock Info */}
        <Card className="shadow-sm border-gray-200">
          <CardContent className="p-4">
            <h2 className="text-base font-bold text-gray-900 mb-3">📊 股票信息</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">成交量</span>
                <span className="font-medium">
                  {(stock.volume / 10000).toFixed(0)}万手
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">成交额</span>
                <span className="font-medium">
                  {(stock.turnover / 100000000).toFixed(2)}亿
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">换手率</span>
                <span className="font-medium">2.3%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">市盈率</span>
                <span className="font-medium">35.6</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Explanation Card - Placeholder */}
        <Card className="shadow-sm border-0 bg-gradient-to-br from-pink-50 to-purple-50">
          <CardContent className="p-4">
            <h2 className="text-base font-bold text-gray-900 mb-2">
              💡 财财小姐姐说
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {stock.name}今天{isPositive ? '心情不错' : '有点小情绪'},
              {isPositive ? '涨了' : '跌了'}{Math.abs(stock.changePercent)}%!
            </p>
            <p className="text-sm text-gray-600 mt-2">
              {isPositive
                ? '💕 看起来市场对它很有信心哦,如果你已经在观察这只股票,可以继续关注~'
                : '💔 别担心,股市就像过山车,有涨有跌很正常。如果是好公司,长期看还是会回来的~'}
            </p>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link href={`/trade/buy/${symbol}`} className="block">
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-3">
              买入 🛍️
            </Button>
          </Link>
          <Link href={`/trade/sell/${symbol}`} className="block">
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3">
              卖出 💰
            </Button>
          </Link>
        </div>

        {/* Add to Watchlist */}
        <Button
          variant="outline"
          className={`w-full py-3 ${isInWatchlist ? 'border-pink-600 text-pink-600' : ''}`}
          onClick={handleToggleWatchlist}
        >
          {isInWatchlist ? '✓ 已在自选 ⭐' : '+ 添加到自选 ⭐'}
        </Button>
      </main>
    </div>
  );
}
