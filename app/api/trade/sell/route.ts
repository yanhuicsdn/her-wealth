import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/trade/sell
 * 卖出股票
 */
export async function POST(request: NextRequest) {
  try {
    const { symbol, name, quantity, price } = await request.json();

    // 验证参数
    if (!symbol || !name || !quantity || !price) {
      return NextResponse.json(
        { error: '参数不完整' },
        { status: 400 }
      );
    }

    if (quantity % 100 !== 0) {
      return NextResponse.json(
        { error: '卖出数量必须是100的整数倍' },
        { status: 400 }
      );
    }

    // TODO: 检查持仓是否充足
    // const { data: position } = await supabase
    //   .from('positions')
    //   .select('quantity')
    //   .eq('user_id', user.id)
    //   .eq('symbol', symbol)
    //   .single();

    // if (!position || position.quantity < quantity) {
    //   return NextResponse.json(
    //     { error: '持仓不足' },
    //     { status: 400 }
    //   );
    // }

    // TODO: 创建订单
    // TODO: 更新持仓
    // TODO: 更新账户余额

    return NextResponse.json({
      success: true,
      message: '卖出成功'
    });
  } catch (error) {
    console.error('卖出失败:', error);
    return NextResponse.json(
      { error: '卖出失败' },
      { status: 500 }
    );
  }
}
