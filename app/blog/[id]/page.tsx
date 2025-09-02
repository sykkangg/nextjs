import {use} from 'react'
import BlogListPage from '@/app/blog/page'
import postData from '@/app/data/post.json'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

interface PostType {
  id: number,
  title: string,
  text: string
}

export default function BlogPage({params}: PageProps):JSX.Element {
  const {id} = use(params);
  const post: PostType | undefined = postData.find(post => post.id === parseInt(id));

  return (
    <>
      <BlogListPage/>
      {post?( 
          <>
            <h3>{post.title}</h3>
            <p>{post.text}</p>
          </>
        ) : (
          <h3>
            게시글을 찾을 수 없습니다.
          </h3>
        )
      }
    </>
  )
}