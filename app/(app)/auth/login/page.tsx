"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/auth.store';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 验证手机号格式
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      toast.error('请输入正确的手机号码');
      return;
    }

    setIsLoading(true);

    try {
      // 发送验证码
      const response = await fetch('/api/auth/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '发送失败');
      }

      // 跳转到验证码输入页面
      router.push(`/auth/verify?phone=${encodeURIComponent(phoneNumber)}`);
    } catch (error) {
      console.error('发送短信失败:', error);
      toast.error(error instanceof Error ? error.message : '发送失败,请重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center px-5 pb-20">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">💕</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            欢迎来到她财
          </h1>
          <p className="text-gray-600">
            让投资变得简单又温暖
          </p>
        </div>

        {/* Login Form */}
        <Card className="shadow-lg border-0">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
              手机号登录
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  手机号码
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="请输入手机号"
                  maxLength={11}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-colors"
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading || !phoneNumber}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 font-medium"
              >
                {isLoading ? '发送中...' : '获取验证码'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                登录即表示同意
                <Link href="/terms" className="text-pink-600 hover:underline">
                  《用户协议》
                </Link>
                {' '}和
                <Link href="/privacy" className="text-pink-600 hover:underline">
                  《隐私政策》
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-pink-600 hover:text-pink-700"
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
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
