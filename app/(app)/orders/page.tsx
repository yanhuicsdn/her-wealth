"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface Order {
  id: string;
  symbol: string;
  name: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  analogy?: string;
}

export default function OrdersPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('请先登录');
      router.push('/auth/login');
      return;
    }
    fetchOrders();
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Mock data for now
      const mockOrders: Order[] = [
        {
          id: '1',
          symbol: '600519',
          name: '贵州茅台',
          type: 'buy',
          quantity: 100,
          price: 1850,
          totalAmount: 185000,
          status: 'completed',
          createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          analogy: '相当于一个LV包包 💼'
        },
        {
          id: '2',
          symbol: '000858',
          name: '五粮液',
          type: 'buy',
          quantity: 200,
          price: 165,
          totalAmount: 33000,
          status: 'completed',
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
          analogy: '相当于一次豪华旅行 ✈️'
        },
        {
          id: '3',
          symbol: '600519',
          name: '贵州茅台',
          type: 'sell',
          quantity: 50,
          price: 1820,
          totalAmount: 91000,
          status: 'completed',
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          analogy: '相当于一个轻奢包包 👜'
        },
        {
          id: '4',
          symbol: '300750',
          name: '宁德时代',
          type: 'buy',
          quantity: 100,
          price: 195,
          totalAmount: 19500,
          status: 'pending',
          createdAt: new Date().toISOString(),
          analogy: '够做个美甲啦 💅'
        }
      ];
      setOrders(mockOrders);
    } catch (error) {
      toast.error('获取订单失败');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;
    return date.toLocaleDateString('zh-CN');
  };

  const getStatusText = (status: Order['status']) => {
    const statusMap = {
      pending: '委托中',
      completed: '已成',
      cancelled: '已撤'
    };
    return statusMap[status];
  };

  const getStatusColor = (status: Order['status']) => {
    const colorMap = {
      pending: 'text-yellow-600',
      completed: 'text-green-600',
      cancelled: 'text-gray-500'
    };
    return colorMap[status];
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white px-5 pt-12 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <Link href="/profile" className="inline-flex items-center text-pink-600">
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
            返回我的
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-gray-900">
          📋 委托记录
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {orders.length} 条记录
        </p>
      </header>

      {/* Main Content */}
      <main className="px-5 py-4">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">加载中...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              还没有委托记录
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              去交易页买只股票吧~
            </p>
            <Link href="/stocks">
              <Button className="bg-pink-600 hover:bg-pink-700">
                去选股
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/stocks/${order.symbol}`}
                className="block"
              >
                <Card className="shadow-sm border-gray-200 hover:border-pink-300 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-semibold text-gray-900">
                            {order.name}
                          </p>
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            order.type === 'buy'
                              ? 'bg-red-100 text-red-600'
                              : 'bg-green-100 text-green-600'
                          }`}>
                            {order.type === 'buy' ? '买入' : '卖出'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">{order.symbol}</p>
                      </div>
                      <span className={`text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-sm mb-3">
                      <div>
                        <p className="text-xs text-gray-500">数量</p>
                        <p className="font-medium">{order.quantity}股</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">价格</p>
                        <p className="font-medium">¥{order.price.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">金额</p>
                        <p className="font-medium">
                          ¥{(order.totalAmount / 10000).toFixed(2)}万
                        </p>
                      </div>
                    </div>

                    {order.analogy && (
                      <div className="bg-pink-50 rounded-lg p-2 mb-2">
                        <p className="text-xs text-pink-700">
                          💡 {order.analogy}
                        </p>
                      </div>
                    )}

                    <p className="text-xs text-gray-400">
                      {formatDate(order.createdAt)}
                    </p>
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
