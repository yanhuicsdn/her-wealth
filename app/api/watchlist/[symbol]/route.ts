import { NextRequest, NextResponse } from 'next/server';

/**
 * DELETE /api/watchlist/[symbol]
 * 从自选股中删除股票
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ symbol: string }> }
) {
  try {
    const { symbol } = await params;

    if (!symbol) {
      return NextResponse.json(
        { error: '缺少股票代码' },
        { status: 400 }
      );
    }

    // TODO: 从数据库删除
    // const { error } = await supabase
    //   .from('watchlist')
    //   .delete()
    //   .eq('user_id', user.id)
    //   .eq('symbol', symbol);

    return NextResponse.json({
      success: true,
      message: '已从自选股删除'
    });
  } catch (error) {
    console.error('删除自选股失败:', error);
    return NextResponse.json(
      { error: '删除失败' },
      { status: 500 }
    );
  }
}
