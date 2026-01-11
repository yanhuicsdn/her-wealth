import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/auth/send-sms
 * 发送短信验证码
 */
export async function POST(request: NextRequest) {
  try {
    const { phoneNumber } = await request.json();

    // 验证手机号格式
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return NextResponse.json(
        { error: '手机号格式不正确' },
        { status: 400 }
      );
    }

    // TODO: 集成阿里云短信服务
    // const alicloudResponse = await sendSMS(phoneNumber);

    // Mock: 生成6位随机验证码
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Mock: 在开发环境打印验证码
    if (process.env.NODE_ENV === 'development') {
      console.log('=================================');
      console.log('📱 验证码:', verificationCode);
      console.log('📱 手机号:', phoneNumber);
      console.log('=================================');
    }

    // Mock: 存储验证码 (实际应该存在 Redis 或数据库)
    // 这里我们直接返回成功,验证码会在 verify-sms 中校验

    // 返回成功
    return NextResponse.json({
      success: true,
      message: '验证码已发送'
    });
  } catch (error) {
    console.error('发送短信失败:', error);
    return NextResponse.json(
      { error: '发送失败,请重试' },
      { status: 500 }
    );
  }
}
