"use client";

import { useEffect, useRef, useState } from 'react';
import {
  createChart,
  IChartApi,
  ISeriesApi,
  CandlestickData,
  Time,
} from 'lightweight-charts';
import { KlineData, KlinePeriod } from '@/types/stock';

interface KlineChartProps {
  data: KlineData[];
  symbol: string;
  period?: KlinePeriod;
  height?: number;
}

const periodLabels: Record<KlinePeriod, string> = {
  daily: '日K',
  weekly: '周K',
  monthly: '月K',
  '60min': '60分',
  '30min': '30分',
  '15min': '15分',
  '5min': '5分',
};

export default function KlineChart({
  data,
  symbol,
  period = 'daily',
  height = 300,
}: KlineChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<KlinePeriod>(period);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // 创建图表
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height,
      layout: {
        background: { color: '#ffffff' },
        textColor: '#333',
      },
      grid: {
        vertLines: { color: '#f0f0f0' },
        horzLines: { color: '#f0f0f0' },
      },
      crosshair: {
        mode: 1,
      },
      rightPriceScale: {
        borderColor: '#cccccc',
      },
      timeScale: {
        borderColor: '#cccccc',
        timeVisible: true,
        secondsVisible: false,
      },
    });

    chartRef.current = chart;

    // 添加K线系列
    const candlestickSeries = (chart as any).addCandlestickSeries({
      upColor: '#ef4444',      // 上涨用红色
      downColor: '#10b981',    // 下跌用绿色
      borderUpColor: '#ef4444',
      borderDownColor: '#10b981',
      wickUpColor: '#ef4444',
      wickDownColor: '#10b981',
    });

    candlestickSeriesRef.current = candlestickSeries;

    // 响应式调整
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [height]);

  // 更新数据
  useEffect(() => {
    if (!candlestickSeriesRef.current || !data.length) return;

    const candlestickData: CandlestickData[] = data.map((item) => ({
      time: (item.timestamp / 1000) as Time,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
    }));

    candlestickSeriesRef.current.setData(candlestickData);

    // 自动调整视图
    if (chartRef.current) {
      chartRef.current.timeScale().fitContent();
    }
  }, [data]);

  // 切换周期
  const handlePeriodChange = async (newPeriod: KlinePeriod) => {
    setSelectedPeriod(newPeriod);
    // 这里应该触发数据重新获取
    // 由于这是纯展示组件,实际数据获取应该在父组件完成
  };

  return (
    <div className="w-full">
      {/* Period Selector */}
      <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
        {(['daily', 'weekly', 'monthly', '60min', '30min', '15min', '5min'] as KlinePeriod[]).map(
          (p) => (
            <button
              key={p}
              onClick={() => handlePeriodChange(p)}
              className={`px-3 py-1.5 text-sm rounded-lg whitespace-nowrap transition-colors ${
                selectedPeriod === p
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {periodLabels[p]}
            </button>
          )
        )}
      </div>

      {/* Chart Container */}
      <div
        ref={chartContainerRef}
        className="w-full bg-white rounded-lg border border-gray-200"
        style={{ height }}
      />

      {/* Chart Legend */}
      <div className="mt-2 text-xs text-gray-600 flex gap-4">
        <span>
          <span className="inline-block w-3 h-3 bg-red-500 mr-1"></span>
          上涨
        </span>
        <span>
          <span className="inline-block w-3 h-3 bg-green-500 mr-1"></span>
          下跌
        </span>
        <span>双指缩放 · 拖动平移</span>
      </div>
    </div>
  );
}
