import { IComments, IPosts } from "@dto/posts";
import { IUsersData } from "@dto/user_data";
import { createSlice } from "@reduxjs/toolkit";
import { createPostsThunk, getAllPostsCommentsThunk, getPostsThunk } from "@thunk/postThunk";
import { getUsersThunk } from "@thunk/userThunk";

interface IAppState {
  posts: IPosts;
  comments: IComments;
  users: IUsersData;
  likedPost: number[];
  getPostsStatus: string;
  getCommentsStatus: string;
  getUsersStatus: string;
  profileModalOpen: boolean;
}

const initialState: IAppState = {
  posts: [],
  comments: [],
  users: [],
  likedPost: [],
  getPostsStatus: "idle",
  getUsersStatus: "idle",
  getCommentsStatus: "idle",
  profileModalOpen: false,
};

const appDataSlice = createSlice({
  name: "appData",
  initialState,
  reducers: {
    changeProfileModalState: (state, action) => {
      state.profileModalOpen = action.payload
    },
    commentOnPost: (state, action) => {
      state.comments = [...state.comments, action.payload]
    },
    deleteComment: (state, action) => {
      const filterCommentsAfterDelete = state.comments.filter(comment => comment.id !== action.payload)
      state.comments = filterCommentsAfterDelete
    },
    editCommentInState: (state, action) => {
      console.log(action.payload)
      const editComments = state.comments.map(comment => comment.id === action.payload.id ? { ...comment, body: action.payload.body } : comment)
      state.comments = editComments
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostsThunk.pending, (state, action) => {
        state.getPostsStatus = "pending";
      })
      .addCase(getPostsThunk.fulfilled, (state, action) => {
        state.getPostsStatus = "fulfilled";
        state.posts = action.payload;
      })
      .addCase(getPostsThunk.rejected, (state, action) => {
        state.getPostsStatus = "rejected";
      })
      .addCase(getUsersThunk.pending, (state, action) => {
        state.getUsersStatus = "pending";
      })
      .addCase(getUsersThunk.fulfilled, (state, action) => {
        state.getUsersStatus = "fulfilled";
        state.users = action.payload;
      })
      .addCase(getUsersThunk.rejected, (state, action) => {
        state.getUsersStatus = "rejected";
      })
      .addCase(getAllPostsCommentsThunk.pending, (state, action) => {
        state.getCommentsStatus = "pending";
      })
      .addCase(getAllPostsCommentsThunk.fulfilled, (state, action) => {
        state.getCommentsStatus = "fulfilled";
        state.comments = action.payload;
      })
      .addCase(getAllPostsCommentsThunk.rejected, (state, action) => {
        state.getCommentsStatus = "rejected";
      })
  },
});

export const { changeProfileModalState, commentOnPost, deleteComment, editCommentInState } = appDataSlice.actions


export const appDataReducer = appDataSlice.reducer;
