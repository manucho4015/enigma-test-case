import { useState } from 'react'
import { PostObj } from '../custom-types/posts'
import { Comment } from '../custom-types/comments'

const PostItem = ({ post }: { post: PostObj }) => {
    const [isComment, setIsComment] = useState(false)
    const [commText, setCommText] = useState('')


    const submitComment = async (post: PostObj) => {
        try {
            // call to the API
            const getResponse = await fetch(`http://localhost:3000/comments`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
            });
            const comments = await getResponse.json()

            const newComment: Comment = {
                id: `${comments.length + 1}`,
                text: commText,
                postId: post.id
            }
            const postRresponse = await fetch("http://localhost:3000/comments", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(newComment)
            })

            const comment = await postRresponse.json()
            setCommText('')
        } catch (error) {
            console.log(error)
        }


    }
    const likePost = async (post: PostObj) => {
        try {
            const newPost = { ...post, isLiked: !post.isLiked }
            const postRresponse = await fetch(`http://localhost:3000/posts/${post.id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(newPost)
            })

            const newPostResponse = await postRresponse.json()
            console.log(newPostResponse)
        } catch (error) {
            console.log(error)
        }


    }

    return (
        <article className="p-6 mt-8 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-center mb-5 text-gray-500">
                <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                    <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                    Tutorial
                </span>
                <span className='cursor-pointer' onClick={() => likePost(post)}>
                    {
                        post.isLiked ? <img src="/heart-red-svgrepo-com.svg" alt="" className='size-6' /> :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                    }

                </span>

            </div>
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h2>
            <p className="mb-5 font-light text-gray-500 dark:text-gray-400">{post.description}</p>
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <img className="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar" />
                    <span className="font-medium dark:text-white">
                        Jese Leos
                    </span>
                </div>
                <span onClick={() => setIsComment(!isComment)} className="inline-flex cursor-pointer items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Comment
                    <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </span>
            </div>
            {
                isComment &&
                <>
                    <input type="text" value={commText} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCommText(e.target.value)} className='h-8 w-[50%] rounded-xl px-4 mt-4 bg-white' />
                    <button className='h-8 bg-green-700 ml-4 text-white px-2 rounded' onClick={() => submitComment(post)}>Comment</button>
                </>
            }
        </article>
    )
}

export default PostItem
