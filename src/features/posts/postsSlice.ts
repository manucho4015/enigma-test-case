import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { PostObj } from '../../custom-types/posts'
export interface CounterState {
    posts: PostObj[]
}

const initialState: CounterState = {
    posts: [],
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        addPost: (state, action: PayloadAction<PostObj>) => {
            const newPost = action.payload
            return { ...state, newPost }
        },
    },
})

// Action creators are generated for each case reducer function
export const { addPost } = counterSlice.actions

export default counterSlice.reducer