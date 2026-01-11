import { NextRequest, NextResponse } from 'next/server';
import { getKlineData } from '@/lib/stock-api';
import { KlinePeriod } from '@/types/stock';

/**
 * GET /api/stocks/kline?symbol=600519&period=daily
 * 获取K线数据
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const symbol = searchParams.get('symbol');
    const period = searchParams.get('period') as KlinePeriod | null;

    if (!symbol) {
      return NextResponse.json(
        { error: '请提供股票代码' },
        { status: 400 }
      );
    }

    // 验证周期参数
    const validPeriods: KlinePeriod[] = ['daily', 'weekly', 'monthly', '60min', '30min', '15min', '5min'];
    const klinePeriod: KlinePeriod = period && validPeriods.includes(period) ? period : 'daily';

    const data = await getKlineData(symbol, klinePeriod);

    return NextResponse.json({
      symbol,
      period: klinePeriod,
      count: data.length,
      data,
    });
  } catch (error) {
    console.error('获取K线数据失败:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '获取失败' },
      { status: 500 }
    );
  }
}
