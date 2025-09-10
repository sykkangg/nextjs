import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/lib/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    // MongoDB 연결
    await connectDB();

    //요청 데이터 받기
    const {username, email, password} = await request.json();

    //필수 필드 검증
    if(!username || !email || !password) {
      return NextResponse.json({
        success: false,
        message: '모든 필드를 입력해주세요'
      }, {status: 400})
    }

    //비밀번호 길이 검증
    if(password.length < 8) {
      return NextResponse.json({
        success: false,
        message: '비밀번호는 최소 8자 이상이어야 합니다.'
      }, {status: 400})
    }

    const existingUser = await User.findOne({
      $or: [{username}, {email}]
    })

    if(existingUser) {
      return NextResponse.json({
        success: false,
        message: '이미 존재하는 사용자명 또는 이메일입니다.'
      }, {status: 409})
    }

    //비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 12);

    //새 사용자 생성
    const newUser = new User({
      username, email, password: hashedPassword
    })

    await newUser.save();

    return NextResponse.json({
      success: true,
      message: '회원가입이 완료되었습니다',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    }, {status: 201});

  } catch (error) {
    console.error('회원가입 에러:', error);
    return NextResponse.json({
      success: false,
      message: '서버 오류가 발생했습니다'
    }, {status: 500});
  }


}