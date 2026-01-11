import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { age, assets, goal, timeframe, riskLevel } = body;

    // 验证必填字段
    if (!age || !assets || !goal || !timeframe || !riskLevel) {
      return NextResponse.json(
        { error: "缺少必填字段" },
        { status: 400 }
      );
    }

    // 如果没有OpenAI API密钥,返回mock数据
    if (!openai) {
      return NextResponse.json({
        plan: generateMockPlan(age, assets, goal, timeframe, riskLevel),
      });
    }

    // 映射风险偏好到中文
    const riskLevelMap: Record<string, string> = {
      conservative: "保守型",
      moderate: "稳健型",
      aggressive: "进取型",
    };

    // 映射目标到中文
    const goalMap: Record<string, string> = {
      buy_house: "买房首付",
      education: "教育金",
      retirement: "养老规划",
      travel: "旅行基金",
      growth: "资产增值",
    };

    // 映射时间到中文
    const timeframeMap: Record<string, string> = {
      "1year": "1年以内",
      "3years": "1-3年",
      "5years": "3-5年",
      "5plus": "5年以上",
    };

    // 构建OpenAI提示词
    const prompt = `你是一位专业的女性理财顾问。请根据以下用户信息,生成一个个性化的投资组合方案:

用户画像:
- 年龄: ${age}岁
- 投资金额: ${Number(assets).toLocaleString()}元
- 投资目标: ${goalMap[goal]}
- 投资期限: ${timeframeMap[timeframe]}
- 风险偏好: ${riskLevelMap[riskLevel]}

请推荐3只基金(从中国市场上真实的优秀基金中挑选),并按照以下JSON格式返回:

{
  "allocations": [
    {
      "name": "基金名称",
      "code": "基金代码",
      "percentage": 配置比例(数字),
      "amount": 配置金额(数字),
      "reason": "推荐理由(用女性能理解的语言,比如'像包包一样保值'、'比存银行踏实'等)",
      "type": "基金类型"
    }
  ],
  "expectedReturn": "预期年化收益率范围(如:8-12%)",
  "maxDrawdown": "最大回撤(如:-15%)",
  "projectedValue": "3年后预计资产范围(如:38-42万)",
  "similarCase": {
    "name": "真实案例用户名",
    "age": 年龄,
    "initialAmount": 初始金额,
    "currentAmount": 当前金额,
    "duration": "投资时长",
    "return": "收益率(如:+40%)"
  }
}

要求:
1. 配置比例总和必须是100
2. 根据风险偏好调整股债比例(保守型多配债,进取型多配股)
3. 推荐理由要用生活化的比喻,避免专业术语
4. 基金必须是真实存在的优秀基金
5. 只返回JSON,不要其他文字`;

    // 调用OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "你是一位专业的女性理财顾问,擅长用简单易懂的语言解释投资,帮助女性做出正确的投资决策。",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const responseText = completion.choices[0].message.content;

    // 解析JSON响应
    let plan;
    try {
      // 提取JSON部分(可能包含markdown代码块)
      const jsonMatch = responseText?.match(/```json\n?([\s\S]*?)\n?```/) || responseText?.match(/\{[\s\S]*\}/);
      const jsonText = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : responseText;
      plan = JSON.parse(jsonText || "{}");
    } catch (parseError) {
      console.error("JSON解析错误:", parseError);
      // 如果解析失败,返回默认方案
      plan = {
        allocations: [
          {
            name: "易方达蓝筹精选",
            code: "005827",
            percentage: 60,
            amount: Math.round(Number(assets) * 0.6),
            reason: "稳健增长,适合长期持有",
            type: "混合基金",
          },
          {
            name: "兴全合润混合",
            code: "163406",
            percentage: 30,
            amount: Math.round(Number(assets) * 0.3),
            reason: "补充成长性,但别太激进",
            type: "混合基金",
          },
          {
            name: "招商中债债券",
            code: "161723",
            percentage: 10,
            amount: Math.round(Number(assets) * 0.1),
            reason: "降低波动,睡得着觉",
            type: "债券基金",
          },
        ],
        expectedReturn: "8-12%",
        maxDrawdown: "-15%",
        projectedValue: `${Math.round(Number(assets) * 1.3)}-${Math.round(Number(assets) * 1.4)}万`,
        similarCase: {
          name: "小美",
          age: Number(age),
          initialAmount: Number(assets),
          currentAmount: Math.round(Number(assets) * 1.4),
          duration: "2年",
          return: "+40%",
        },
      };
    }

    return NextResponse.json(plan);
  } catch (error) {
    console.error("生成方案错误:", error);
    return NextResponse.json(
      { error: "生成方案失败,请稍后重试" },
      { status: 500 }
    );
  }
}

/**
 * 生成Mock方案(当OpenAI API不可用时)
 */
function generateMockPlan(age: string, assets: string, goal: string, timeframe: string, riskLevel: string) {
  const goalMap: Record<string, string> = {
    buy_house: "买房首付",
    retirement: "养老规划",
    children_education: "子女教育",
    wealth_growth: "财富增长",
  };

  return {
    profile: {
      age: Number(age),
      assets: `${assets}万`,
      goal: goalMap[goal] || goal,
      timeframe: `${timeframe}年`,
      riskLevel: riskLevel === 'conservative' ? '保守型' : riskLevel === 'moderate' ? '稳健型' : '进取型',
    },
    allocation: [
      {
        category: "股票型基金",
        percentage: 40,
        amount: Math.round(Number(assets) * 0.4),
        recommendation: "沪深300指数基金",
        type: "指数基金",
      },
      {
        category: "债券型基金",
        percentage: 40,
        amount: Math.round(Number(assets) * 0.4),
        recommendation: "纯债基金",
        type: "债券基金",
      },
      {
        category: "货币基金",
        percentage: 20,
        amount: Math.round(Number(assets) * 0.2),
        recommendation: "余额宝类货币基金",
        type: "货币基金",
      },
    ],
    expectedReturn: "6-10%",
    maxDrawdown: "-8%",
    projectedValue: `${Math.round(Number(assets) * 1.2)}-${Math.round(Number(assets) * 1.3)}万`,
    similarCase: {
      name: "小美",
      age: Number(age),
      initialAmount: Number(assets),
      currentAmount: Math.round(Number(assets) * 1.25),
      duration: "2年",
      return: "+25%",
    },
  };
}
