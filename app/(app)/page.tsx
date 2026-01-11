"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header - Clean and Simple */}
      <header className="bg-white px-5 pt-12 pb-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              💕 她财
            </h1>
            <p className="text-xs text-gray-500">让投资变得简单</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="white"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </div>
        </div>

        {/* Quick Action Card */}
        <Card className="shadow-sm border-0 bg-gradient-to-br from-pink-500 to-pink-600">
          <CardContent className="p-5">
            <h2 className="text-lg font-bold text-white mb-2">
              AI定制你的投资方案
            </h2>
            <p className="text-pink-100 text-xs mb-4">
              30秒问卷 · 精选基金 · 一对一方案
            </p>
            <Link href="/assessment">
              <Button
                size="default"
                className="w-full bg-white text-pink-600 hover:bg-gray-50 font-medium"
              >
                立即生成
              </Button>
            </Link>
          </CardContent>
        </Card>
      </header>

      {/* Main Content */}
      <main className="px-5 py-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-pink-600 mb-1">50+</div>
            <div className="text-xs text-gray-600">精选基金</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-pink-600 mb-1">30秒</div>
            <div className="text-xs text-gray-600">快速生成</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-pink-600 mb-1">100%</div>
            <div className="text-xs text-gray-600">女性视角</div>
          </div>
        </div>

        {/* Testimonials - Horizontal Scroll */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-gray-900">用户评价</h3>
            <span className="text-xs text-gray-500">2,341人已生成方案</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5">
            <Card className="min-w-[240px] shadow-sm border-gray-200">
              <CardContent className="p-4">
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  "终于有人直接告诉我要买什么了,而不是让我自己选7000只基金"
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                    <span className="text-sm">👩</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-900">小雅</p>
                    <p className="text-xs text-gray-500">30岁 · 互联网</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="min-w-[240px] shadow-sm border-gray-200">
              <CardContent className="p-4">
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  "AI推荐的方案很靠谱,2年赚了40%"
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-sm">👩‍💼</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-900">阿玲</p>
                    <p className="text-xs text-gray-500">32岁 · 产品经理</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Success Stories */}
        <section>
          <h3 className="text-base font-bold text-gray-900 mb-3">
            真实案例
          </h3>
          <div className="space-y-3">
            <Link href="/products/005827">
              <Card className="shadow-sm border-gray-200 hover:border-pink-300 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center text-2xl">
                        👩
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          小美的投资
                        </p>
                        <p className="text-xs text-gray-600">
                          30万 → 42万 · 2年
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">+40%</p>
                      <p className="text-xs text-gray-500">年化收益</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/products/163406">
              <Card className="shadow-sm border-gray-200 hover:border-pink-300 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-2xl">
                        👩‍💼
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          阿玲的配置
                        </p>
                        <p className="text-xs text-gray-600">
                          50万 → 68万 · 3年
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">+36%</p>
                      <p className="text-xs text-gray-500">年化收益</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/products/161723">
              <Card className="shadow-sm border-gray-200 hover:border-pink-300 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center text-2xl">
                        👩‍🎨
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          小红的稳健
                        </p>
                        <p className="text-xs text-gray-600">
                          20万 → 31万 · 2年
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">+55%</p>
                      <p className="text-xs text-gray-500">年化收益</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* Featured Products */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-gray-900">精选产品</h3>
            <Link href="/products" className="text-xs text-pink-600 font-medium">
              全部 →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/products/005827">
              <Card className="shadow-sm border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="mb-3">
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                      易方达蓝筹
                    </p>
                    <p className="text-xs text-gray-500">005827</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-green-600 font-medium">
                      近3年 +58%
                    </span>
                    <span className="text-xs text-gray-500">稳健型</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/products/163406">
              <Card className="shadow-sm border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="mb-3">
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                      兴全合润
                    </p>
                    <p className="text-xs text-gray-500">163406</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-green-600 font-medium">
                      近3年 +72%
                    </span>
                    <span className="text-xs text-gray-500">成长型</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
