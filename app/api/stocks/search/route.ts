import { NextRequest, NextResponse } from 'next/server';
import { searchStocks } from '@/lib/stock-api';

/**
 * GET /api/stocks/search?q=茅台
 * 搜索股票
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: '请输入搜索关键词' },
        { status: 400 }
      );
    }

    // 限制搜索关键词长度
    if (query.length > 20) {
      return NextResponse.json(
        { error: '搜索关键词过长' },
        { status: 400 }
      );
    }

    const results = await searchStocks(query.trim());

    return NextResponse.json({
      query,
      count: results.length,
      results,
    });
  } catch (error) {
    console.error('搜索股票失败:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '搜索失败' },
      { status: 500 }
    );
  }
}
