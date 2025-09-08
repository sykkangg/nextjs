import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb'

export async function GET(request: Request) {
  return Response.json({
    message: 'Login API is working',
    method: 'GET'
  })
}

export async function POST(request: Request) {
  
  try {
    await connectDB();
    return NextResponse.json({
      success: true,
      message: "✅ MongoDB 연결 성공!"
    });
  } catch (error) {
    console.error('MongoDB 연결 오류:', error);
    return NextResponse.json({
      success: false, message: '서버 오류'},
      { status: 500}
    )
  }
  // const body = await request.json();
  // const { id, password } = body;

  // console.log('서버에서 받은 데이터:', {id, password});

  // if(id === 'test' && password === '111111') {
  //   return Response.json({
  //     success: true,
  //     message: "로그인 성공"
  //   })
  // }

  // return Response.json({
  //   success: false,
  //   message: "로그인 실패"
  // }, {status: 401})

}