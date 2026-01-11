"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AssessmentPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: "",
    assets: "",
    goal: "",
    timeframe: "",
    riskLevel: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // 调用真实的AI API生成方案
      const response = await fetch("/api/plan/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("生成方案失败");
      }

      const plan = await response.json();

      // 将方案数据存储到sessionStorage,供plan页面使用
      sessionStorage.setItem("generatedPlan", JSON.stringify(plan));

      // 跳转到方案页面,携带用户输入参数
      window.location.href = "/plan?" + new URLSearchParams(formData as any);
    } catch (error) {
      console.error("生成方案错误:", error);
      alert("生成方案失败,请稍后重试");
      setIsLoading(false);
    }
  };

  const progress = (step / 5) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-600 to-pink-500 text-white p-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-white">
            ←
          </Link>
          <h1 className="text-lg font-bold">📋 快速测评</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>问题 {step}/5</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-pink-600 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="age" className="text-lg font-medium">
                    你的年龄是多少?
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="例如: 30"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                    className="mt-3"
                  />
                </div>
                <Button
                  onClick={() => setStep(2)}
                  disabled={!formData.age}
                  className="w-full bg-pink-600 hover:bg-pink-700"
                  size="lg"
                >
                  下一步 →
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="assets" className="text-lg font-medium">
                    你的存款大约是多少?
                  </Label>
                  <Input
                    id="assets"
                    type="number"
                    placeholder="例如: 300000"
                    value={formData.assets}
                    onChange={(e) =>
                      setFormData({ ...formData, assets: e.target.value })
                    }
                    className="mt-3"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    单位:元,包括银行理财、现金等所有资产
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => setStep(1)}
                    variant="outline"
                    className="flex-1"
                  >
                    ← 上一步
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    disabled={!formData.assets}
                    className="flex-1 bg-pink-600 hover:bg-pink-700"
                  >
                    下一步 →
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <Label className="text-lg font-medium">你的理财目标是什么?</Label>
                  <Select
                    value={formData.goal}
                    onValueChange={(value) =>
                      setFormData({ ...formData, goal: value })
                    }
                  >
                    <SelectTrigger className="mt-3">
                      <SelectValue placeholder="请选择目标" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buy_house">�� 买房首付</SelectItem>
                      <SelectItem value="education">👶 教育金</SelectItem>
                      <SelectItem value="retirement">🏖 养老规划</SelectItem>
                      <SelectItem value="travel">✈️ 旅行基金</SelectItem>
                      <SelectItem value="growth">💼 资产增值</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => setStep(2)}
                    variant="outline"
                    className="flex-1"
                  >
                    ← 上一步
                  </Button>
                  <Button
                    onClick={() => setStep(4)}
                    disabled={!formData.goal}
                    className="flex-1 bg-pink-600 hover:bg-pink-700"
                  >
                    下一步 →
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div>
                  <Label className="text-lg font-medium">你打算投资多长时间?</Label>
                  <Select
                    value={formData.timeframe}
                    onValueChange={(value) =>
                      setFormData({ ...formData, timeframe: value })
                    }
                  >
                    <SelectTrigger className="mt-3">
                      <SelectValue placeholder="请选择期限" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1year">1年以内 (可能随时用)</SelectItem>
                      <SelectItem value="3years">1-3年 (中期规划)</SelectItem>
                      <SelectItem value="5years">3-5年 (长期规划)</SelectItem>
                      <SelectItem value="5plus">5年以上 (超长期)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => setStep(3)}
                    variant="outline"
                    className="flex-1"
                  >
                    ← 上一步
                  </Button>
                  <Button
                    onClick={() => setStep(5)}
                    disabled={!formData.timeframe}
                    className="flex-1 bg-pink-600 hover:bg-pink-700"
                  >
                    下一步 →
                  </Button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-4">
                <div>
                  <Label className="text-lg font-medium">你的风险偏好是?</Label>
                  <Select
                    value={formData.riskLevel}
                    onValueChange={(value) =>
                      setFormData({ ...formData, riskLevel: value })
                    }
                  >
                    <SelectTrigger className="mt-3">
                      <SelectValue placeholder="请选择风险偏好" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conservative">
                        🐢 保守型 (宁可少赚,不能亏本)
                      </SelectItem>
                      <SelectItem value="moderate">
                        🚶 稳健型 (能接受小波动,追求稳健增长)
                      </SelectItem>
                      <SelectItem value="aggressive">
                        🐎 进取型 (能承受较大风险,追求更高收益)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => setStep(4)}
                    variant="outline"
                    className="flex-1"
                  >
                    ← 上一步
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!formData.riskLevel || isLoading}
                    className="flex-1 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600"
                    size="lg"
                  >
                    {isLoading ? "生成中..." : "🚀 生成方案"}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tips */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            💡 <strong>提示:</strong> 请根据你的真实情况填写,AI会根据你的回答生成最适合的投资方案。
          </p>
        </div>
      </main>
    </div>
  );
}
