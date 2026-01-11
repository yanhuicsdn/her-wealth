"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StockSearchResult } from '@/types/stock';

export default function StockSearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<StockSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      const response = await fetch(`/api/stocks/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('搜索失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  const goToStock = (symbol: string) => {
    router.push(`/stocks/${symbol}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white px-5 pt-12 pb-4 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          🔍 搜索股票
        </h1>

        {/* Search Input */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="输入股票代码、名称或拼音"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
          />
          <Button
            type="submit"
            disabled={loading || !query.trim()}
            className="bg-pink-600 hover:bg-pink-700 px-6"
          >
            {loading ? '搜索中' : '搜索'}
          </Button>
        </form>
      </header>

      {/* Main Content */}
      <main className="px-5 py-4">
        {!searched && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              开始搜索
            </h3>
            <p className="text-sm text-gray-600">
              输入股票代码、名称或拼音缩写
            </p>
            <div className="mt-6 space-y-2 text-sm text-gray-500">
              <p>示例:</p>
              <p className="text-pink-600">茅台 / 600519 / GZMT</p>
              <p className="text-pink-600">五粮液 / 000858 / WLY</p>
            </div>
          </div>
        )}

        {searched && results.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😕</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              没有找到相关股票
            </h3>
            <p className="text-sm text-gray-600">
              试试其他关键词吧
            </p>
          </div>
        )}

        {searched && results.length > 0 && (
          <div>
            <p className="text-sm text-gray-600 mb-3">
              找到 <span className="font-bold text-pink-600">{results.length}</span> 只股票
            </p>
            <div className="space-y-2">
              {results.map((stock) => (
                <Card
                  key={stock.symbol}
                  className="shadow-sm border-gray-200 hover:border-pink-300 transition-colors cursor-pointer"
                  onClick={() => goToStock(stock.symbol)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900 mb-1">
                          {stock.name}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="bg-gray-100 px-2 py-0.5 rounded">
                            {stock.symbol}
                          </span>
                          <span>{stock.market}</span>
                        </div>
                      </div>
                      <div className="text-pink-600">
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
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
