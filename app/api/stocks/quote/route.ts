import { NextRequest, NextResponse } from 'next/server';
import { getStockQuote, getBatchQuotes } from '@/lib/stock-api';

/**
 * GET /api/stocks/quote?symbol=600519
 * 获取单个股票报价
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const symbol = searchParams.get('symbol');

    if (!symbol) {
      return NextResponse.json(
        { error: '请提供股票代码' },
        { status: 400 }
      );
    }

    const quote = await getStockQuote(symbol);

    return NextResponse.json(quote);
  } catch (error) {
    console.error('获取股票报价失败:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '获取失败' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/stocks/quote
 * 批量获取股票报价
 *
 * Body: { symbols: string[] }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { symbols } = body;

    if (!Array.isArray(symbols) || symbols.length === 0) {
      return NextResponse.json(
        { error: '请提供有效的股票代码数组' },
        { status: 400 }
      );
    }

    if (symbols.length > 50) {
      return NextResponse.json(
        { error: '单次最多查询50只股票' },
        { status: 400 }
      );
    }

    const quotes = await getBatchQuotes(symbols);

    return NextResponse.json({ quotes });
  } catch (error) {
    console.error('批量获取股票报价失败:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '获取失败' },
      { status: 500 }
    );
  }
}
