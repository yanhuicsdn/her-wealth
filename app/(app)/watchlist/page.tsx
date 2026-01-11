"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useWatchlistStore } from '@/stores/watchlist.store';
import toast from 'react-hot-toast';

export default function WatchlistPage() {
  const { items, isLoading, fetchWatchlist, removeItem } = useWatchlistStore();

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const handleRemove = async (symbol: string, name: string) => {
    if (confirm(`确定要把 ${name} 从自选股中移除吗?`)) {
      try {
        await removeItem(symbol);
        toast.success('已从自选股删除');
      } catch (error) {
        toast.error('删除失败');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white px-5 pt-12 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <Link href="/stocks" className="inline-flex items-center text-pink-600">
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
        </div>

        <h1 className="text-2xl font-bold text-gray-900">
          ⭐ 我的自选
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {items.length} 只股票
        </p>
      </header>

      {/* Main Content */}
      <main className="px-5 py-4">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">加载中...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              还没有自选股
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              去行情页添加感兴趣的股票吧~
            </p>
            <Link href="/stocks">
              <Button className="bg-pink-600 hover:bg-pink-700">
                去添加股票
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <Link
                key={item.id}
                href={`/stocks/${item.symbol}`}
                className="block"
              >
                <Card className="shadow-sm border-gray-200 hover:border-pink-300 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900 mb-1">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500">{item.symbol}</p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleRemove(item.symbol, item.name);
                        }}
                        className="ml-3 text-red-500 hover:text-red-600 p-2"
                        title="从自选股删除"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077L8.084 14.207a2.25 2.25 0 01-2.083-2.118L6.19 8.74a2.25 2.25 0 012.084-2.119l9.17-2.314a2.25 2.25 0 012.266.166z"
                          />
                        </svg>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
