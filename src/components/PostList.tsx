import { useState, useEffect, ReactNode } from 'react'
import { PostObj } from '../custom-types/posts'

// components
import PostItem from './PostItem'

const PostList = () => {
    const [postState, setPostsState] = useState<PostObj[]>([])
    const fetchPosts = async () => {
        try {
            const getResponse = await fetch(`http://localhost:3000/posts`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
            });
            const posts = await getResponse.json()
            setPostsState(posts)
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])
    return (
        <>
            {
                postState.map((post, index) => <PostItem key={index} post={post} />)
            }
        </>
    )
}

export default PostList
