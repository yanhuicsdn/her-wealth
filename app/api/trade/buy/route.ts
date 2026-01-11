import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/trade/buy
 * 买入股票
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
        { error: '买入数量必须是100的整数倍' },
        { status: 400 }
      );
    }

    // TODO: 检查用户余额是否充足
    // const { data: account } = await supabase
    //   .from('accounts')
    //   .select('cash')
    //   .eq('user_id', user.id)
    //   .single();

    // const totalAmount = quantity * price;
    // if (account.cash < totalAmount) {
    //   return NextResponse.json(
    //     { error: '余额不足' },
    //     { status: 400 }
    //   );
    // }

    // TODO: 创建订单
    // const { data: order } = await supabase
    //   .from('orders')
    //   .insert({
    //     user_id: user.id,
    //     symbol,
    //     name,
    //     type: 'buy',
    //     quantity,
    //     price,
    //     status: 'filled',
    //     filled_quantity: quantity,
    //     filled_price: price
    //   })
    //   .select()
    //   .single();

    // TODO: 更新持仓
    // TODO: 更新账户余额

    return NextResponse.json({
      success: true,
      message: '买入成功'
    });
  } catch (error) {
    console.error('买入失败:', error);
    return NextResponse.json(
      { error: '买入失败' },
      { status: 500 }
    );
  }
}
