import { NextRequest, NextResponse } from 'next/server';
import { getHotStocks } from '@/lib/stock-api';

/**
 * GET /api/stocks/hot
 * 获取热门股票
 */
export async function GET(request: NextRequest) {
  try {
    const hotStocks = await getHotStocks();

    return NextResponse.json({
      count: hotStocks.length,
      stocks: hotStocks,
    });
  } catch (error) {
    console.error('获取热门股票失败:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '获取失败' },
      { status: 500 }
    );
  }
}
