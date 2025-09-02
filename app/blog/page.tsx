import { useState, useEffect } from 'react';
import Link from 'next/link';
import postsData from '@/app/data/post.json'

interface Props {
  id: number,
  title: string,
  text: string
}

export default async function BlogListPage() {
  const latestData = postsData
  .sort((a, b) => b.id - a.id)
  .slice(0,3);

  return (
    <>
      <h4>최신글</h4>
      <ul>
        {latestData.map((item, index)=>(
          <li key={index}>
            <Link href={`/blog/${item.id}`}>
              <span>{item.id}</span>
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
