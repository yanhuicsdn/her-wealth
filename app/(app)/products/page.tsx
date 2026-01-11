"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { mockProducts } from "@/data/products";

export default function ProductsPage() {
  const [filter, setFilter] = useState<"all" | "fund" | "stock">("all");

  const filteredProducts =
    filter === "all"
      ? mockProducts
      : mockProducts.filter((p) => p.type === filter);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white px-5 pt-12 pb-4 border-b border-gray-100">
        <h1 className="text-xl font-bold text-gray-900 mb-1">精选产品</h1>
        <p className="text-xs text-gray-500">AI为你挑选的最优基金</p>
      </header>

      {/* Filter Tabs - Pill Style */}
      <div className="bg-white px-5 py-4 border-b border-gray-100 sticky top-0 z-10">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
              filter === "all"
                ? "bg-pink-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            全部
          </button>
          <button
            onClick={() => setFilter("fund")}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
              filter === "fund"
                ? "bg-pink-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            基金
          </button>
          <button
            onClick={() => setFilter("stock")}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
              filter === "stock"
                ? "bg-pink-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            股票
          </button>
        </div>
      </div>

      {/* Products List */}
      <main className="px-5 py-4">
        <div className="space-y-3">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.code}`}
              className="block"
            >
              <Card className="shadow-sm border-gray-200 hover:shadow-md hover:border-pink-300 transition-all">
                <CardContent className="p-4">
                  {/* Product Header */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-gray-900 mb-1">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                          {product.code}
                        </span>
                        <span className="text-xs text-pink-600 bg-pink-50 px-2 py-0.5 rounded">
                          {product.type === "fund" ? "基金" : "股票"}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        {product.performance.threeYearReturn.replace("近3年 ", "")}
                      </div>
                      <div className="text-xs text-gray-500">近3年</div>
                    </div>
                  </div>

                  {/* Tagline */}
                  <p className="text-sm text-gray-700 mb-3">{product.tagline}</p>

                  {/* Manager Info */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-3 h-3 text-blue-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-700">
                        <span className="font-medium">{product.managerName}</span>
                        <span className="text-gray-500"> · {product.managerStyle}</span>
                      </p>
                    </div>
                  </div>

                  {/* Holdings Tags */}
                  {product.holdings && product.holdings.length > 0 && (
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1.5">
                        {product.holdings.slice(0, 4).map((holding, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                          >
                            {holding}
                          </span>
                        ))}
                        {product.holdings.length > 4 && (
                          <span className="text-xs bg-gray-50 text-gray-500 px-2 py-1 rounded">
                            +{product.holdings.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* User Case Preview */}
                  <div className="bg-gradient-to-r from-pink-50 to-blue-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-sm shadow-sm">
                          👩
                        </div>
                        <div>
                          <p className="text-xs text-gray-900 font-medium">
                            {product.userCase.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            {product.userCase.age}岁
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-green-600">
                          +
                          {Math.round(
                            ((product.userCase.currentAmount -
                              product.userCase.initialAmount) /
                              product.userCase.initialAmount) *
                              100
                          )}
                          %
                        </p>
                        <p className="text-xs text-gray-500">
                          {product.userCase.duration}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-sm text-gray-500">
              暂无{filter === "fund" ? "基金" : filter === "stock" ? "股票" : ""}产品
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
