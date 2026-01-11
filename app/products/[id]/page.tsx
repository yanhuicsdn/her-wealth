"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getProductById } from "@/data/products";
import { Product } from "@/types/product";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const productId = params.id as string;
    const foundProduct = getProductById(productId);

    if (foundProduct) {
      setProduct(foundProduct);
    }
    setIsLoading(false);
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-teal-50 flex items-center justify-center pb-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-teal-50 flex items-center justify-center pb-16">
        <Card className="max-w-sm mx-auto">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-4">产品未找到</h2>
            <p className="text-gray-600 mb-6">抱歉,我们找不到这个产品</p>
            <Link href="/products">
              <Button className="bg-pink-600 hover:bg-pink-700">
                返回产品列表
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-teal-50 pb-16">
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-600 to-pink-500 text-white p-4 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Link href="/products" className="text-white">
            ←
          </Link>
          <h1 className="text-base font-bold truncate flex-1">
            {product.name}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        {/* Product Info Card */}
        <Card className="shadow-lg mb-4 bg-gradient-to-br from-pink-50 to-white">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {product.code}
                  </span>
                  <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {product.type === "fund" ? "基金" : "股票"}
                  </span>
                </div>
                <p className="text-sm text-pink-600 font-medium mt-2">
                  {product.tagline}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Manager Story */}
        <Card className="shadow-md mb-4">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">👨‍💼</span>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                  基金经理: {product.managerName}
                </h3>
                <div className="space-y-1 text-xs text-gray-700 mb-2">
                  <p>
                    <span className="font-medium">风格:</span> {product.managerStyle}
                  </p>
                  <p>
                    <span className="font-medium">经验:</span>{" "}
                    {product.managerExperience}
                  </p>
                </div>
                <p className="text-xs text-gray-600 whitespace-pre-line">
                  {product.story}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance */}
        <Card className="shadow-md mb-4">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">
              💰 历史表现
            </h3>
            <div className="bg-green-50 p-3 rounded-lg mb-3">
              <div className="text-xl font-bold text-green-600">
                {product.performance.threeYearReturn}
              </div>
            </div>
            <div className="space-y-2">
              {product.performance.humanExplanation.map((item, index) => (
                <p key={index} className="text-xs text-gray-700">
                  • {item}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Holdings */}
        {product.holdings && product.holdings.length > 0 && (
          <Card className="shadow-md mb-4">
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">
                🏢 持有你熟悉的公司
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.holdings.map((holding, index) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs"
                  >
                    {holding}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Risk Warning */}
        <Card className="shadow-md mb-4 bg-orange-50">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2 text-sm">
              ⚠️ 风险提示
            </h3>
            <p className="text-xs text-orange-800 mb-3">
              这不是保本产品!{product.risk.maxDrawdown},{" "}
              {product.risk.probability}
            </p>

            <div className="space-y-2">
              <div>
                <p className="font-medium text-gray-900 text-xs mb-1">
                  ✓ 适合:
                </p>
                {product.risk.suitable.map((item, index) => (
                  <p key={index} className="text-xs text-gray-700">
                    • {item}
                  </p>
                ))}
              </div>
              <div>
                <p className="font-medium text-gray-900 text-xs mb-1">
                  ✗ 不适合:
                </p>
                {product.risk.notSuitable.map((item, index) => (
                  <p key={index} className="text-xs text-gray-700">
                    • {item}
                  </p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Case */}
        <Card className="shadow-md mb-4">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">
              👥 真实用户案例
            </h3>
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="text-3xl">👩</div>
                <div className="flex-1">
                  <p className="text-xs text-gray-900 font-medium mb-1">
                    {product.userCase.name},跟你同龄
                  </p>
                  <p className="text-xs text-gray-700 mb-1">
                    • {product.userCase.age}岁
                  </p>
                  <p className="text-xs text-gray-700 mb-1">
                    • 投了{product.userCase.initialAmount.toLocaleString()}元
                  </p>
                  <p className="text-xs text-gray-700 mb-1">
                    • 现在{product.userCase.currentAmount.toLocaleString()}元
                  </p>
                  <p className="text-xs text-gray-700">
                    • 坚持{product.userCase.duration},收益{" "}
                    <span className="font-bold text-green-600">
                      +
                      {Math.round(
                        ((product.userCase.currentAmount -
                          product.userCase.initialAmount) /
                          product.userCase.initialAmount) *
                          100
                      )}
                      %
                    </span>
                  </p>
                  <p className="text-xs text-gray-600 italic mt-2">
                    "{product.userCase.quote}"
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Why Recommended */}
        <Card className="shadow-md mb-4">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">
              🤔 为什么推荐这只?
            </h3>
            <ul className="space-y-2">
              {product.whyRecommended.map((reason, index) => (
                <li key={index} className="flex items-start gap-2 text-xs">
                  <span className="text-pink-600 font-bold shrink-0">
                    {index + 1}.
                  </span>
                  <span className="text-gray-700">{reason}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Fee Info */}
        {product.fee && (
          <Card className="shadow-md mb-4 bg-gray-50">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-700">手续费</span>
                <span className="text-xs font-semibold text-gray-900">
                  {product.fee}
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* CTA Buttons */}
        <div className="space-y-3 mb-6">
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white"
            onClick={() => alert("功能开发中:加入自选")}
          >
            ⭐ 加入自选
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full"
            onClick={() => alert("功能开发中:一键配置")}
          >
            🚀 一键配置
          </Button>
        </div>

        {/* Back Button */}
        <div className="text-center pb-6">
          <Link
            href="/plan"
            className="text-pink-600 hover:text-pink-700 text-sm"
          >
            ← 返回我的方案
          </Link>
        </div>
      </main>
    </div>
  );
}
