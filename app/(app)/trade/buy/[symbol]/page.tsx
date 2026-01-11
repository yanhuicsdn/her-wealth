"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StockQuote } from '@/types/stock';
import { generateTradeConfirmation } from '@/lib/trading/analogy-generator';
import toast from 'react-hot-toast';

export default function BuyPage({ params }: { params: { symbol: string } }) {
  const router = useRouter();
  const { symbol } = params;

  const [stock, setStock] = useState<StockQuote | null>(null);
  const [quantity, setQuantity] = useState<string>('100');
  const [step, setStep] = useState<1 | 2>(1); // 1: 输入, 2: 确认

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
    // A股最小单位是100股(1手)
    const qty = parseInt(value) || 0;
    if (qty % 100 === 0) {
      setQuantity(value);
    }
  };

  const handleQuickQuantity = (multiplier: number) => {
    if (stock) {
      const quickBuy = Math.floor(stock.price * multiplier / 100) * 100;
      setQuantity(Math.max(100, quickBuy).toString());
    }
  };

  const totalAmount = stock ? parseInt(quantity) * stock.price : 0;
  const analogy = generateTradeConfirmation(
    stock?.symbol || '',
    stock?.name || '',
    'buy',
    parseInt(quantity),
    stock?.price || 0
  );

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/trade/buy', {
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

      toast.success('买入成功!');
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
            买入 {stock.name}
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
          {/* 买入数量 */}
          <Card className="shadow-sm border-0 bg-gradient-to-br from-pink-50 to-purple-50">
            <CardContent className="p-5">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                想买多少股? 💭
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    买入数量 (必须是100的整数倍)
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                    min={100}
                    step={100}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
                    placeholder="100"
                  />
                </div>

                {/* 快捷选项 */}
                <div className="space-y-2">
                  <p className="text-xs text-gray-600">快捷选择:</p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleQuickQuantity(1)}
                      className="px-4 py-2 bg-white border border-pink-200 rounded-lg text-sm hover:bg-pink-50 transition-colors"
                    >
                      1千元
                    </button>
                    <button
                      onClick={() => handleQuickQuantity(5)}
                      className="px-4 py-2 bg-white border border-pink-200 rounded-lg text-sm hover:bg-pink-50 transition-colors"
                    >
                      5千元
                    </button>
                    <button
                      onClick={() => handleQuickQuantity(10)}
                      className="px-4 py-2 bg-white border border-pink-200 rounded-lg text-sm hover:bg-pink-50 transition-colors"
                    >
                      1万元
                    </button>
                  </div>
                </div>

                {/* 预估金额 */}
                <div className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">预估金额</span>
                    <span className="text-xl font-bold text-pink-600">
                      ¥{totalAmount.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {analogy.analogy.example}
                  </p>
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
          💕 确认买入
        </h1>
      </header>

      {/* Main Content */}
      <main className="px-5 py-6 space-y-4">
        {/* 订单详情 */}
        <Card className="shadow-lg border-0">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">💼</div>
              <h2 className="text-xl font-bold text-gray-900">
                {analogy.title}
              </h2>
            </div>

            <div className="space-y-3 text-sm border-t border-b border-gray-200 py-4 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">买入数量</span>
                <span className="font-medium">{analogy.quantity}股</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">成交价格</span>
                <span className="font-medium">¥{analogy.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-3">
                <span className="text-gray-900 font-semibold">总金额</span>
                <span className="font-bold text-lg text-pink-600">
                  ¥{analogy.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* 生活化比喻 */}
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-4 mb-4">
              <p className="text-center text-gray-700 mb-2">
                💡 {analogy.analogy.text}
              </p>
              <p className="text-center text-pink-600 font-medium">
                {analogy.analogy.example}
              </p>
            </div>

            <p className="text-center text-xs text-gray-500">
              💡 订单提交后,我们会立即为你执行交易
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
            确认买入 💪
          </Button>
        </div>

        {/* 提示 */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            记住:投资就像养植物,需要耐心哦 🌱
          </p>
        </div>
      </main>
    </div>
  );
}
