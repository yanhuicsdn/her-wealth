"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuthStore } from "@/stores/auth.store";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuthStore();
  const [hasPlan, setHasPlan] = useState(false);
  const [planData, setPlanData] = useState<any>(null);

  useEffect(() => {
    const storedPlan = sessionStorage.getItem("generatedPlan");
    if (storedPlan) {
      setHasPlan(true);
      try {
        setPlanData(JSON.parse(storedPlan));
      } catch (error) {
        console.error("解析方案失败:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    if (confirm("确定要退出登录吗?")) {
      logout();
      toast.success("已退出登录");
      router.push("/");
    }
  };

  // 如果未登录,显示登录引导
  if (!isLoading && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-teal-50">
        {/* Header */}
        <header className="bg-gradient-to-r from-pink-600 to-pink-500 text-white p-6 pb-16">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <span className="text-3xl">👋</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">欢迎来到她财</h1>
              <p className="text-pink-100 text-sm">让投资变得简单可信赖</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 -mt-10">
          <Card className="shadow-lg mb-4">
            <CardContent className="p-6 text-center">
              <div className="text-5xl mb-3">🔐</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                登录解锁更多功能
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                登录后可以使用自选股、交易、持仓等功能
              </p>
              <Link href="/auth/login">
                <Button className="w-full bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white">
                  立即登录
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Features Preview */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Card className="shadow-md opacity-60">
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-2">⭐</div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">自选股</h3>
                <p className="text-xs text-gray-600">需登录</p>
              </CardContent>
            </Card>

            <Card className="shadow-md opacity-60">
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-2">💼</div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">我的持仓</h3>
                <p className="text-xs text-gray-600">需登录</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  // 模拟账户数据
  const accountData = {
    totalAssets: 275700,
    cash: 90700,
    marketValue: 185000,
    profitLoss: 20190,
    profitLossPercent: 7.89
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-600 to-pink-500 text-white p-6 pb-16">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <span className="text-3xl">👩‍💼</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">
                {user?.nickname || user?.phone || "我的"}
              </h1>
              <p className="text-pink-100 text-sm">让投资变得简单可信赖</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - overlaps header */}
      <main className="px-4 -mt-10">
        {/* Account Summary Card */}
        <Card className="shadow-lg mb-4 bg-gradient-to-br from-pink-500 to-pink-600 text-white">
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-pink-100 text-sm mb-1">总资产</p>
                <p className="text-3xl font-bold">
                  ¥{(accountData.totalAssets / 10000).toFixed(2)}万
                </p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-bold ${accountData.profitLoss >= 0 ? '' : 'text-red-200'}`}>
                  {accountData.profitLoss >= 0 ? '+' : ''}¥{accountData.profitLoss.toLocaleString()}
                </p>
                <p className={`text-xs ${accountData.profitLossPercent >= 0 ? 'text-pink-100' : 'text-red-200'}`}>
                  {accountData.profitLossPercent >= 0 ? '+' : ''}{accountData.profitLossPercent.toFixed(2)}%
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-pink-400">
              <div>
                <p className="text-pink-100 text-xs">可用资金</p>
                <p className="text-lg font-semibold">
                  ¥{(accountData.cash / 10000).toFixed(2)}万
                </p>
              </div>
              <div>
                <p className="text-pink-100 text-xs">持仓市值</p>
                <p className="text-lg font-semibold">
                  ¥{(accountData.marketValue / 10000).toFixed(2)}万
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trading Features Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Link href="/positions">
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-2">💼</div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">我的持仓</h3>
                <p className="text-xs text-gray-600">
                  查看股票持仓
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/watchlist">
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-2">⭐</div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">自选股</h3>
                <p className="text-xs text-gray-600">
                  关注的股票
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Investment Plan Card */}
        <Card className="shadow-lg mb-4">
          <CardContent className="p-4">
            {hasPlan ? (
              <div className="text-center">
                <div className="text-4xl mb-2">✅</div>
                <h3 className="font-bold text-gray-900 mb-1">已有投资方案</h3>
                <p className="text-sm text-gray-600 mb-3">
                  你的{planData?.goal || "投资"}方案已生成
                </p>
                <Link href="/plan">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-pink-600 border-pink-600 hover:bg-pink-50"
                  >
                    查看我的方案 →
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-4xl mb-2">📊</div>
                <h3 className="font-bold text-gray-900 mb-1">还没有投资方案</h3>
                <p className="text-sm text-gray-600 mb-3">
                  回答5个问题,AI为你量身定制
                </p>
                <Link href="/assessment">
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white"
                  >
                    立即生成方案
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* More Features Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Link href="/products">
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-2">📚</div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">精选产品</h3>
                <p className="text-xs text-gray-600">
                  AI筛选的最优基金
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/stocks">
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-2">📈</div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">股市行情</h3>
                <p className="text-xs text-gray-600">
                  实时股票行情
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Menu List */}
        <Card className="shadow-md mb-4">
          <CardContent className="p-0">
            <div className="divide-y">
              <Link href="/plan">
                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📊</span>
                    <span className="text-sm text-gray-900">我的方案</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>
              </Link>

              <Link href="/orders">
                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📝</span>
                    <span className="text-sm text-gray-900">委托记录</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>
              </Link>

              <button
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                onClick={() => alert("功能开发中:帮助中心")}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">❓</span>
                  <span className="text-sm text-gray-900">帮助中心</span>
                </div>
                <span className="text-gray-400">→</span>
              </button>

              <button
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                onClick={() => alert("功能开发中:设置")}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">⚙️</span>
                  <span className="text-sm text-gray-900">设置</span>
                </div>
                <span className="text-gray-400">→</span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button
          variant="outline"
          className="w-full mb-4 border-gray-300 text-gray-700 hover:bg-gray-50"
          onClick={handleLogout}
        >
          退出登录
        </Button>

        {/* About */}
        <Card className="shadow-md mb-20">
          <CardHeader>
            <CardTitle className="text-base">关于她财</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-gray-600 space-y-1">
            <p>💕 专注女性投资教育</p>
            <p>• AI精选,只推最优</p>
            <p>• 女性视角,通俗易懂</p>
            <p>• 真实案例,值得信赖</p>
            <p className="mt-3 pt-3 border-t text-gray-500">
              版本 2.0.0 | 让每个女性都能掌握投资能力
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
