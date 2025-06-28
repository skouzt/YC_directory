import { STARTUP_BY_ID_QUERY } from '@/lib/queris';
import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';
import { Skeleton } from "@/components/ui/ui/skeleton"
import Link from 'next/link'
import Image from 'next/image'
import React ,{Suspense} from 'react'
import markdownit from 'markdown-it';
import View from '@/components/ui/ui/View';

const md = markdownit();

export const experimental_ppr= true; 

const page = async({params}: {params: Promise< {id: string }>}) => {
  const id = (await params).id;
  const post = await client.fetch(STARTUP_BY_ID_QUERY,  {id})
  if (!post) return  notFound();

  const parsedCotent = md.render(post?.pitch || '')


    return <>
    <section className='pink_container !min-h-[230px]'>
        <p className='tag'>{formatDate(post?._createdAt)}</p>
        <h1 className='heading'>{post.title}</h1>
        <p className='subheading !max-w-5xl text-white'>{post.description}</p>
    </section>
    <section className='section_container'>
        <img src={post.image} alt="thumbnail" className='w-[90%] sm:w-[400px] mx-auto h-auto rounded-xl border-gray-200 shadow-md' />
    

    <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
        <div className='flex-between gap-5'>
            <Link href={`/user/${post.author?._id} `} className='flex gap-2 items-center mb-3'>
            <Image src={post.author?.image} alt='avatar' width={64} height={64} className='rounded-full drop-shadow-lgshadow-lg'/>

        <div >
            <p className='text-20-medium'>{post.author?.name} </p>
            <p className='text-16-medium !text-black-300'>@{post.author?.username} </p>
        </div>
        </Link>
        <p className='category_tag'>{post?.category}</p>
        </div>
        <h3 className='text-30-bold'>Pitch Detail</h3>
        {parsedCotent ? (

            <article 
            className='prose max-w-4xl font-work-sans break-all'
            dangerouslySetInnerHTML={{__html: parsedCotent}}
            />
        ): (
            <p className='no-result'>no detail provided </p>
        )}
    </div>
    <hr  className='divider'/>

    <Suspense fallback={<Skeleton  className='view_skeleton'/>}>
        <View id={id}/>
    </Suspense>

        </section>
    </>
}

export default page