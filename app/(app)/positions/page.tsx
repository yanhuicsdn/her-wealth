"use client";

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PositionsPage() {
  // Mock: 持仓数据
  const mockPositions = [
    {
      symbol: '600519',
      name: '贵州茅台',
      quantity: 100,
      avgCost: 1700,
      currentPrice: 1850,
      marketValue: 185000,
      profitLoss: 15000,
      profitLossPercent: 8.82
    },
    {
      symbol: '300750',
      name: '宁德时代',
      quantity: 300,
      avgCost: 165,
      currentPrice: 185.5,
      marketValue: 55650,
      profitLoss: 6150,
      profitLossPercent: 12.43
    },
    {
      symbol: '000858',
      name: '五粮液',
      quantity: 200,
      avgCost: 160,
      currentPrice: 155.2,
      marketValue: 31040,
      profitLoss: -960,
      profitLossPercent: -3.0
    }
  ];

  const totalMarketValue = mockPositions.reduce((sum, p) => sum + p.marketValue, 0);
  const totalProfitLoss = mockPositions.reduce((sum, p) => sum + p.profitLoss, 0);
  const totalProfitPercent = totalProfitLoss / (totalMarketValue - totalProfitLoss) * 100;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white px-5 pt-12 pb-4 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">
          🌱 我的持仓
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {mockPositions.length} 只股票
        </p>
      </header>

      {/* Account Summary */}
      <div className="px-5 py-4">
        <Card className="shadow-sm border-0 bg-gradient-to-br from-pink-500 to-pink-600">
          <CardContent className="p-5">
            <div className="grid grid-cols-3 gap-3 text-white text-center">
              <div>
                <div className="text-2xl font-bold">
                  ¥{(totalMarketValue / 10000).toFixed(2)}万
                </div>
                <div className="text-xs text-pink-100">市值</div>
              </div>
              <div>
                <div className={`text-2xl font-bold ${totalProfitLoss >= 0 ? '' : 'text-pink-200'}`}>
                  {totalProfitLoss >= 0 ? '+' : ''}{(totalProfitLoss / 10000).toFixed(2)}万
                </div>
                <div className="text-xs text-pink-100">总盈亏</div>
              </div>
              <div>
                <div className={`text-2xl font-bold ${totalProfitPercent >= 0 ? '' : 'text-pink-200'}`}>
                  {totalProfitPercent >= 0 ? '+' : ''}{totalProfitPercent.toFixed(2)}%
                </div>
                <div className="text-xs text-pink-100">收益率</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Positions List */}
      <main className="px-5 pb-4">
        <h2 className="text-base font-bold text-gray-900 mb-3">
          持仓明细
        </h2>
        <div className="space-y-3">
          {mockPositions.map((position) => (
            <Link
              key={position.symbol}
              href={`/stocks/${position.symbol}`}
              className="block"
            >
              <Card className="shadow-sm border-gray-200 hover:border-pink-300 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 mb-1">
                        {position.name}
                      </p>
                      <p className="text-xs text-gray-500">{position.symbol}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">
                        {position.quantity}股
                      </p>
                      <p className="text-xs text-gray-500">
                        成本¥{position.avgCost}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500">市值</span>
                      <p className="font-medium text-gray-900">
                        ¥{(position.marketValue / 10000).toFixed(2)}万
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">现价</span>
                      <p className="font-medium text-gray-900">
                        ¥{position.currentPrice.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">盈亏</span>
                      <p className={`font-bold ${position.profitLoss >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {position.profitLoss >= 0 ? '+' : ''}¥{position.profitLoss}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-100 flex gap-2">
                    <Link
                      href={`/trade/sell/${position.symbol}`}
                      className="flex-1 text-center py-2 bg-green-50 text-green-600 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors"
                    >
                      卖出
                    </Link>
                    <Link
                      href={`/trade/buy/${position.symbol}`}
                      className="flex-1 text-center py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                    >
                      加仓
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
