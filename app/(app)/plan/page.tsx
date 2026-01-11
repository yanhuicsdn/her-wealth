"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Allocation = {
  name: string;
  code: string;
  percentage: number;
  amount: number;
  reason: string;
  type: string;
};

type SimilarCase = {
  name: string;
  age: number;
  initialAmount: number;
  currentAmount: number;
  duration: string;
  return: string;
};

type Plan = {
  allocations: Allocation[];
  expectedReturn: string;
  maxDrawdown: string;
  projectedValue: string;
  similarCase: SimilarCase;
};

const defaultPlan: Plan = {
  allocations: [
    {
      name: "易方达蓝筹精选",
      code: "005827",
      percentage: 60,
      amount: 180000,
      reason: "稳健增长,适合长期持有",
      type: "混合基金",
    },
    {
      name: "兴全合润混合",
      code: "163406",
      percentage: 30,
      amount: 90000,
      reason: "补充成长性,但别太激进",
      type: "混合基金",
    },
    {
      name: "招商中债债券",
      code: "161723",
      percentage: 10,
      amount: 30000,
      reason: "降低波动,睡得着觉",
      type: "债券基金",
    },
  ],
  expectedReturn: "8-12%",
  maxDrawdown: "-15%",
  projectedValue: "38-42万",
  similarCase: {
    name: "小美",
    age: 30,
    initialAmount: 300000,
    currentAmount: 420000,
    duration: "2年",
    return: "+40%",
  },
};

function PlanPageContent() {
  const searchParams = useSearchParams();
  const [plan, setPlan] = useState<Plan>(defaultPlan);
  const [hasPlan, setHasPlan] = useState(false);

  const age = searchParams.get("age") || "30";
  const assets = searchParams.get("assets") || "300000";
  const goalMap: Record<string, string> = {
    buy_house: "买房首付",
    education: "教育金",
    retirement: "养老规划",
    travel: "旅行基金",
    growth: "资产增值",
  };
  const goal = goalMap[searchParams.get("goal") || "buy_house"];

  useEffect(() => {
    const storedPlan = sessionStorage.getItem("generatedPlan");
    if (storedPlan) {
      try {
        const parsedPlan = JSON.parse(storedPlan);
        setPlan(parsedPlan);
        setHasPlan(true);
      } catch (error) {
        console.error("解析方案数据失败:", error);
      }
    }
  }, []);

  // 如果还没有生成方案,显示引导页
  if (!hasPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-teal-50 p-4">
        <div className="pt-8">
          <Card className="shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">📊</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                还没有生成你的方案
              </h2>
              <p className="text-gray-600 mb-6">
                回答5个问题,AI为你量身定制投资组合
              </p>
              <Link href="/assessment">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white"
                >
                  🚀 立即生成方案
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* 看看别人的方案 */}
          <Card className="shadow-md mt-4">
            <CardHeader>
              <CardTitle className="text-lg">💡 看看别人的方案</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">小美,30岁</span>
                    <br />
                    30万 → 42万 (2年)
                    <br />
                    <span className="text-green-600 font-bold">+40%</span>
                  </p>
                </div>
                <div className="p-3 bg-pink-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">阿玲,32岁</span>
                    <br />
                    50万 → 68万 (3年)
                    <br />
                    <span className="text-green-600 font-bold">+36%</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-600 to-pink-500 text-white p-4">
        <h1 className="text-xl font-bold">📊 我的投资方案</h1>
      </header>

      {/* Main Content */}
      <main className="p-4">
        {/* Plan Summary */}
        <Card className="shadow-md mb-4 bg-gradient-to-br from-pink-50 to-white">
          <CardContent className="p-4">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                🎯 你的{goal}方案
              </h2>
              <p className="text-sm text-gray-600">
                基于{Number(assets).toLocaleString()}元存款
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Allocations */}
        <div className="space-y-3 mb-4">
          {plan.allocations.map((allocation, index) => (
            <Card key={index} className="shadow-md">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <Link
                      href={`/products/${allocation.code}`}
                      className="block"
                    >
                      <h3 className="text-base font-bold text-gray-900 mb-1">
                        {allocation.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {allocation.code}
                        </span>
                        <span className="text-xs text-pink-600">
                          详情 →
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        {allocation.reason}
                      </p>
                    </Link>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-pink-600">
                      {allocation.percentage}%
                    </div>
                    <div className="text-xs text-gray-600">
                      ¥{(allocation.amount / 10000).toFixed(0)}万
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-pink-600 to-pink-500 h-2 rounded-full"
                    style={{ width: `${allocation.percentage}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Stats */}
        <Card className="shadow-lg mb-4">
          <CardContent className="p-4">
            <h3 className="font-bold text-gray-900 mb-3">方案总结</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">💡 预期收益</div>
                <div className="text-sm font-bold text-green-600">
                  {plan.expectedReturn}
                </div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">⚠️ 最大回撤</div>
                <div className="text-sm font-bold text-orange-600">
                  {plan.maxDrawdown}
                </div>
              </div>
              <div className="text-center p-3 bg-pink-50 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">📊 3年后</div>
                <div className="text-sm font-bold text-pink-600">
                  {plan.projectedValue}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Similar Case */}
        <Card className="shadow-md mb-4">
          <CardContent className="p-4">
            <h3 className="font-bold text-gray-900 mb-3">👥 真实案例</h3>
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="text-3xl">👩</div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm mb-1">
                    {plan.similarCase.name},跟你同龄
                  </p>
                  <p className="text-xs text-gray-700 mb-1">
                    • {plan.similarCase.age}岁,投了
                    {plan.similarCase.initialAmount.toLocaleString()}元
                  </p>
                  <p className="text-xs text-gray-700 mb-1">
                    • 现在{plan.similarCase.currentAmount.toLocaleString()}元
                  </p>
                  <p className="text-xs text-gray-700">
                    • 坚持{plan.similarCase.duration},收益{" "}
                    <span className="font-bold text-green-600">
                      {plan.similarCase.return}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Buttons */}
        <div className="space-y-3 mb-6">
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white"
            onClick={() => alert("功能开发中:跳转券商开户")}
          >
            🚀 立即配置这个方案
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full"
            onClick={() => alert("功能开发中:查看详细逻辑")}
          >
            🤔 为什么这样配?
          </Button>
        </div>

        {/* Risk Warning */}
        <div className="p-3 bg-orange-50 rounded-lg border border-orange-200 mb-6">
          <p className="text-xs text-orange-800">
            ⚠️ <strong>风险提示:</strong> 基金投资有风险,过往业绩不代表未来表现。
            请根据您的风险承受能力选择合适的投资方案。
          </p>
        </div>
      </main>
    </div>
  );
}

// Wrapper component with Suspense boundary
export default function PlanPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-teal-50 flex items-center justify-center">
        <p className="text-gray-600">加载中...</p>
      </div>
    }>
      <PlanPageContent />
    </Suspense>
  );
}
