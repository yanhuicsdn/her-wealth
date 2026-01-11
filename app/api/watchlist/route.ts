import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/watchlist
 * 获取用户的自选股列表
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: 从会话中获取用户ID
    // const supabase = createServerClient();
    // const { data: { user } } = await supabase.auth.getUser();
    // if (!user) {
    //   return NextResponse.json({ error: '未登录' }, { status: 401 });
    // }

    // Mock: 返回模拟的自选股数据
    const mockWatchlist = [
      {
        id: '1',
        symbol: '600519',
        name: '贵州茅台',
        sort_order: 1
      },
      {
        id: '2',
        symbol: '300750',
        name: '宁德时代',
        sort_order: 2
      }
    ];

    return NextResponse.json(mockWatchlist);
  } catch (error) {
    console.error('获取自选股失败:', error);
    return NextResponse.json(
      { error: '获取失败' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/watchlist
 * 添加股票到自选股
 */
export async function POST(request: NextRequest) {
  try {
    const { symbol, name } = await request.json();

    if (!symbol || !name) {
      return NextResponse.json(
        { error: '参数不完整' },
        { status: 400 }
      );
    }

    // TODO: 存储到数据库
    // const { data, error } = await supabase
    //   .from('watchlist')
    //   .insert({
    //     user_id: user.id,
    //     symbol,
    //     name
    //   });

    return NextResponse.json({
      success: true,
      message: '已添加到自选股'
    });
  } catch (error) {
    console.error('添加自选股失败:', error);
    return NextResponse.json(
      { error: '添加失败' },
      { status: 500 }
    );
  }
}
