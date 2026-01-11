import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/auth/verify-sms
 * 验证短信验证码并创建用户会话
 */
export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, code } = await request.json();

    // 验证手机号和验证码格式
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return NextResponse.json(
        { error: '手机号格式不正确' },
        { status: 400 }
      );
    }

    if (!code || code.length !== 6) {
      return NextResponse.json(
        { error: '验证码格式不正确' },
        { status: 400 }
      );
    }

    // TODO: 从 Redis 或数据库中获取存储的验证码进行验证
    // const storedCode = await getStoredCode(phoneNumber);
    // if (storedCode !== code) {
    //   return NextResponse.json({ error: '验证码错误' }, { status: 400 });
    // }

    // Mock: 开发环境,任何6位数字验证码都接受
    const isValidCode = /^\d{6}$/.test(code);
    if (!isValidCode) {
      return NextResponse.json(
        { error: '验证码错误' },
        { status: 400 }
      );
    }

    // TODO: 集成 Supabase Auth
    // const { data, error } = await supabase.auth.signInWithOtp({
    //   phone: phoneNumber,
    //   token: code,
    // });

    // Mock: 创建或获取用户
    const mockUser = {
      id: `user_${phoneNumber}`,
      phone_number: phoneNumber,
      nickname: `用户${phoneNumber.slice(-4)}`,
      created_at: new Date().toISOString()
    };

    // TODO: 检查用户是否存在,不存在则创建
    // const { data: existingUser } = await supabase
    //   .from('profiles')
    //   .select('*')
    //   .eq('phone_number', phoneNumber)
    //   .single();

    // if (!existingUser) {
    //   // 创建新用户
    //   const { data: newUser } = await supabase
    //     .from('profiles')
    //     .insert({
    //       phone_number: phoneNumber,
    //       nickname: `用户${phoneNumber.slice(-4)}`
    //     })
    //     .select()
    //     .single();
    // }

    return NextResponse.json({
      success: true,
      user: mockUser,
      message: '登录成功'
    });
  } catch (error) {
    console.error('验证失败:', error);
    return NextResponse.json(
      { error: '验证失败,请重试' },
      { status: 500 }
    );
  }
}
