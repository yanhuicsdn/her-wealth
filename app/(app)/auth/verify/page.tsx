"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/auth.store';
import toast from 'react-hot-toast';

function VerifyPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuth } = useAuthStore();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    const phone = searchParams.get('phone');
    if (phone) {
      setPhoneNumber(phone);
      // 开始倒计时
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [searchParams]);

  const handleResend = async () => {
    try {
      const response = await fetch('/api/auth/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber })
      });

      if (!response.ok) {
        throw new Error('发送失败');
      }

      toast.success('验证码已发送');
      setCountdown(60);
    } catch (error) {
      toast.error('发送失败,请重试');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (code.length !== 6) {
      toast.error('请输入6位验证码');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/verify-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, code })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '验证失败');
      }

      // 设置认证状态
      setAuth({
        id: data.user.id,
        phone: data.user.phone_number,
        nickname: data.user.nickname
      });

      toast.success('登录成功!');

      // 跳转到首页
      setTimeout(() => {
        router.push('/');
      }, 500);
    } catch (error) {
      console.error('验证失败:', error);
      toast.error(error instanceof Error ? error.message : '验证失败,请重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center px-5 pb-20">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🔐</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            验证手机号
          </h1>
          <p className="text-gray-600">
            验证码已发送至 {phoneNumber.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}
          </p>
        </div>

        {/* Verify Form */}
        <Card className="shadow-lg border-0">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  验证码
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => {
                    // 只允许数字
                    const value = e.target.value.replace(/\D/g, '');
                    setCode(value.slice(0, 6));
                  }}
                  placeholder="请输入6位验证码"
                  maxLength={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-colors text-center text-2xl tracking-widest"
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading || code.length !== 6}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 font-medium"
              >
                {isLoading ? '验证中...' : '确认登录'}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={countdown > 0}
                  className="text-sm text-pink-600 hover:text-pink-700 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  {countdown > 0
                    ? `重新发送 (${countdown}s)`
                    : '重新发送验证码'}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Back */}
        <div className="mt-6 text-center space-y-3">
          <Link
            href="/auth/login"
            className="block text-pink-600 hover:text-pink-700"
          >
            ← 返回修改手机号
          </Link>
        </div>
      </div>
    </div>
  );
}

// Wrapper with Suspense boundary
export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-teal-50 flex items-center justify-center">
        <p className="text-gray-600">加载中...</p>
      </div>
    }>
      <VerifyPageContent />
    </Suspense>
  );
}
