"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StockQuote } from '@/types/stock';
import toast from 'react-hot-toast';

export default function SellPage({ params }: { params: { symbol: string } }) {
  const router = useRouter();
  const { symbol } = params;

  const [stock, setStock] = useState<StockQuote | null>(null);
  const [quantity, setQuantity] = useState<string>('100');
  const [step, setStep] = useState<1 | 2>(1);

  // Mock: 当前持仓
  const currentPosition = {
    quantity: 500, // 持有500股
    avgCost: 1700 // 成本价1700元
  };

  useEffect(() => {
    fetchStockQuote();
  }, [symbol]);

  const fetchStockQuote = async () => {
    try {
      const response = await fetch(`/api/stocks/quote?symbol=${symbol}`);
      const data = await response.json();
      setStock(data);
    } catch (error) {
      toast.error('获取股票信息失败');
    }
  };

  const handleQuantityChange = (value: string) => {
    const qty = parseInt(value) || 0;
    if (qty % 100 === 0 && qty <= currentPosition.quantity) {
      setQuantity(value);
    }
  };

  const totalAmount = stock ? parseInt(quantity) * stock.price : 0;
  const profit = stock ? (stock.price - currentPosition.avgCost) * parseInt(quantity) : 0;
  const profitPercent = currentPosition.avgCost > 0
    ? (profit / (currentPosition.avgCost * parseInt(quantity))) * 100
    : 0;

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/trade/sell', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol: stock?.symbol,
          name: stock?.name,
          quantity: parseInt(quantity),
          price: stock?.price
        })
      });

      if (!response.ok) {
        throw new Error('交易失败');
      }

      toast.success('卖出成功!');
      router.push('/positions');
    } catch (error) {
      toast.error('交易失败,请重试');
    }
  };

  if (!stock) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">加载中...</p>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <header className="bg-white px-5 pt-12 pb-4 border-b border-gray-100">
          <Link href={`/stocks/${symbol}`} className="inline-flex items-center text-pink-600 mb-3">
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
            返回详情
          </Link>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            卖出 {stock.name}
          </h1>
          <p className="text-sm text-gray-500">{stock.symbol}</p>

          <div className="flex items-baseline gap-2 mt-3">
            <span className="text-3xl font-bold text-gray-900">
              ¥{stock.price.toFixed(2)}
            </span>
            <span className={`text-sm ${stock.change >= 0 ? 'text-red-600' : 'text-green-600'}`}>
              {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
            </span>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-5 py-6 space-y-4">
          {/* 当前持仓 */}
          <Card className="shadow-sm border-gray-200">
            <CardContent className="p-4">
              <h3 className="text-sm font-bold text-gray-900 mb-3">
                当前持仓
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">持有数量</span>
                  <span className="font-medium">{currentPosition.quantity}股</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">成本价</span>
                  <span className="font-medium">¥{currentPosition.avgCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">当前价</span>
                  <span className="font-medium">¥{stock.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-gray-100 pt-2">
                  <span className="text-gray-600">浮动盈亏</span>
                  <span className={`font-bold ${stock.price >= currentPosition.avgCost ? 'text-red-600' : 'text-green-600'}`}>
                    {stock.price >= currentPosition.avgCost ? '+' : ''}¥{(stock.price - currentPosition.avgCost) * currentPosition.quantity}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 卖出数量 */}
          <Card className="shadow-sm border-0 bg-gradient-to-br from-pink-50 to-purple-50">
            <CardContent className="p-5">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                要卖多少股? 💭
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    卖出数量 (最多{currentPosition.quantity}股)
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                    min={100}
                    max={currentPosition.quantity}
                    step={100}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
                    placeholder="100"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    可用: {currentPosition.quantity}股
                  </p>
                </div>

                {/* 预估金额和盈亏 */}
                <div className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">预估金额</span>
                    <span className="text-xl font-bold text-gray-900">
                      ¥{totalAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <span className="text-gray-600">预估盈亏</span>
                    <span className={`font-bold ${profit >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {profit >= 0 ? '+' : ''}¥{profit.toFixed(2)} ({profitPercent >= 0 ? '+' : ''}{profitPercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 下一步按钮 */}
          <Button
            onClick={() => setStep(2)}
            disabled={parseInt(quantity) < 100}
            className="w-full bg-pink-600 hover:bg-pink-700 py-4 text-lg font-medium"
          >
            下一步 →
          </Button>
        </main>
      </div>
    );
  }

  // 确认页面
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white px-5 pt-12 pb-4 border-b border-gray-100">
        <button
          onClick={() => setStep(1)}
          className="inline-flex items-center text-pink-600 mb-3"
        >
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
          返回修改
        </button>

        <h1 className="text-2xl font-bold text-gray-900">
          💰 确认卖出
        </h1>
      </header>

      {/* Main Content */}
      <main className="px-5 py-6 space-y-4">
        {/* 订单详情 */}
        <Card className="shadow-lg border-0">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">💰</div>
              <h2 className="text-xl font-bold text-gray-900">
                {stock?.name} ({stock?.symbol})
              </h2>
            </div>

            <div className="space-y-3 text-sm border-t border-b border-gray-200 py-4 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">卖出数量</span>
                <span className="font-medium">{parseInt(quantity)}股</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">卖出价格</span>
                <span className="font-medium">¥{stock?.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-3">
                <span className="text-gray-900 font-semibold">预估金额</span>
                <span className="font-bold text-lg text-gray-900">
                  ¥{totalAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-gray-600">预估盈亏</span>
                <span className={`font-bold ${profit >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {profit >= 0 ? '+' : ''}¥{profit.toFixed(2)} ({profitPercent >= 0 ? '+' : ''}{profitPercent.toFixed(2)}%)
                </span>
              </div>
            </div>

            <p className="text-center text-xs text-gray-500">
              💡 卖出后资金会立即到账,可以继续买入其他股票
            </p>
          </CardContent>
        </Card>

        {/* 确认按钮 */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => setStep(1)}
            variant="outline"
            className="py-4"
          >
            再想想
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-pink-600 hover:bg-pink-700 py-4 font-medium"
          >
            确认卖出 💪
          </Button>
        </div>
      </main>
    </div>
  );
}
