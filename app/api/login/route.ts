export async function POST(request: Request) {
  const body = await request.json();
  const { id, password } = body;

  console.log('서버에서 받은 데이터:', {id, password});

  if(id === 'test' && password === '111111') {
    return Response.json({
      success: true,
      message: "로그인 성공"
    })
  }

  return Response.json({
    success: false,
    message: "로그인 실패"
  }, {status: 401})

}