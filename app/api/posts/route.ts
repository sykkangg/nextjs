export async function GET() {
  return Response.json({ 
    message: "Posts API",
    posts: []
  });
}
