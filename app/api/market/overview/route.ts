import { NextRequest, NextResponse } from 'next/server';
import { getMarketOverview } from '@/lib/stock-api';

/**
 * GET /api/market/overview
 * 获取市场概览
 */
export async function GET(request: NextRequest) {
  try {
    const overview = await getMarketOverview();

    return NextResponse.json(overview);
  } catch (error) {
    console.error('获取市场概览失败:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '获取失败' },
      { status: 500 }
    );
  }
}
