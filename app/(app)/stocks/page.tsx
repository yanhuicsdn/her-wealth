"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MarketOverview, MarketIndex, HotStock } from '@/types/stock';

export default function StocksPage() {
  const [overview, setOverview] = useState<MarketOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMarketOverview();
  }, []);

  const fetchMarketOverview = async () => {
    try {
      const response = await fetch('/api/market/overview');
      const data = await response.json();
      setOverview(data);
    } catch (error) {
      console.error('获取市场概览失败:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-4">📊</div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  if (!overview) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-600">加载失败,请重试</p>
      </div>
    );
  }

  const totalStocks = overview.riseCount + overview.fallCount + overview.flatCount;
  const risePercent = ((overview.riseCount / totalStocks) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white px-5 pt-12 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              💰 股市行情
            </h1>
            <p className="text-xs text-gray-500">{overview.date}</p>
          </div>
        </div>

        {/* Market Summary */}
        <Card className="shadow-sm border-0 bg-gradient-to-br from-pink-500 to-pink-600">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-2 text-white text-center">
              <div>
                <div className="text-lg font-bold">{overview.riseCount}</div>
                <div className="text-xs text-pink-100">上涨 📈</div>
              </div>
              <div>
                <div className="text-lg font-bold">{overview.fallCount}</div>
                <div className="text-xs text-pink-100">下跌 📉</div>
              </div>
              <div>
                <div className="text-lg font-bold">{overview.flatCount}</div>
                <div className="text-xs text-pink-100">平盘 ➖</div>
              </div>
            </div>
            <div className="mt-3 text-center">
              <span className="text-pink-100 text-xs">
                上涨占比 {risePercent}%
              </span>
            </div>
          </CardContent>
        </Card>
      </header>

      {/* Main Content */}
      <main className="px-5 py-4 space-y-4">
        {/* Major Indices */}
        <section>
          <h2 className="text-base font-bold text-gray-900 mb-3">主要指数</h2>
          <div className="space-y-2">
            {overview.indexes.map((index) => (
              <Link key={index.code} href={`/stocks/${index.code.replace(/^sh|^sz/, '')}`}>
                <Card className="shadow-sm border-gray-200 hover:border-pink-300 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-900 mb-1">
                          {index.name}
                        </p>
                        <p className="text-xs text-gray-500">{index.code}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          {index.price.toFixed(2)}
                        </p>
                        <p className={`text-xs font-medium ${
                          index.changePercent >= 0 ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {index.changePercent >= 0 ? '+' : ''}{index.changePercent.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Hot Stocks */}
        <section>
          <h2 className="text-base font-bold text-gray-900 mb-3">
            🔥 热门股票
          </h2>
          <div className="space-y-2">
            {overview.hotStocks.map((stock) => (
              <Link key={stock.symbol} href={`/stocks/${stock.symbol}`}>
                <Card className="shadow-sm border-gray-200 hover:border-pink-300 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-sm font-semibold text-gray-900 mb-1">
                          {stock.name}
                        </p>
                        <p className="text-xs text-gray-500">{stock.symbol}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-base font-bold text-gray-900">
                          ¥{stock.price.toFixed(2)}
                        </p>
                        <p className={`text-xs font-medium ${
                          stock.changePercent >= 0 ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">
                      💡 {stock.reason}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Search */}
        <section>
          <h2 className="text-base font-bold text-gray-900 mb-3">
            🔍 搜索股票
          </h2>
          <Link href="/stocks/search">
            <Button className="w-full bg-pink-600 hover:bg-pink-700">
              开始搜索
            </Button>
          </Link>
        </section>
      </main>
    </div>
  );
}
