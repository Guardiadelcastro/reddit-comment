import * as React from 'react'
import { Comment } from './components/Comment'
import { mockPost } from './mocks/post.mock'
import type { Comment as TComment, Post } from './types/reddit'

type State = {
  post: Post
}

export type Action =
  | {
      type: 'comment'
      comment: string
      id: string
    }
  | { type: 'like'; id: string }
  | { type: 'dislike'; id: string }

//Function that returns a new comment to make it easier to use
function createComment(comment: string): TComment {
  return {
    id: Math.random().toString(),
    body: comment,
    createdAt: new Date().toISOString(),
    updatedAt: null,
    replies: [],
    likes: 0,
    dislikes: 0,
  }
}

// traverse the comment tree and update the post with the new comment
function updatePost(post: Post, id: string, comment: string): Post {
  function addReply(
    replies: TComment[],
    id: string,
    comment: string
  ): TComment[] {
    return replies.map((reply) => {
      if (reply.id === id) {
        return {
          ...reply,
          replies: [...reply.replies, createComment(comment)],
        }
      }
      if (reply.replies.length > 0) {
        return {
          ...reply,
          replies: addReply(reply.replies, id, comment),
        }
      }
      return reply
    })
  }
  if (post.id === id) {
    return {
      ...post,
      replies: [...post.replies, createComment(comment)],
    }
  }
  if (post.replies.length > 0) {
    return {
      ...post,
      replies: addReply(post.replies, id, comment),
    }
  }
  return post
}

// Traverse the tree and add a like or dislike to the post
function updatePostLikeOrDislike(
  post: Post,
  id: string,
  type: 'like' | 'dislike'
): Post {
  function addLikeOrDislike(replies: TComment[], id: string): TComment[] {
    return replies.map((reply) => {
      if (reply.id === id) {
        return {
          ...reply,
          likes: type === 'like' ? reply.likes + 1 : reply.likes,
          dislikes: type === 'like' ? reply.dislikes + 1 : reply.dislikes,
        }
      }
      if (reply.replies.length > 0) {
        return {
          ...reply,
          replies: addLikeOrDislike(reply.replies, id),
        }
      }
      return reply
    })
  }
  if (post.id === id) {
    return {
      ...post,
      likes: type === 'like' ? post.likes + 1 : post.likes,
      dislikes: type === 'like' ? post.dislikes + 1 : post.dislikes,
    }
  }
  if (post.replies.length > 0) {
    return {
      ...post,
      replies: addLikeOrDislike(post.replies, id),
    }
  }
  return post
}

//reducer of actions that can be taken on the post
// likes and dislikes are incomplete as it allows for multiple likes and dislikes. In a real app this will be limited by the user and user interaction would toggle the like/dislike
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'comment':
      return {
        ...state,
        post: updatePost(state.post, action.id, action.comment),
      }
    case 'like':
      return {
        post: updatePostLikeOrDislike(state.post, action.id, 'like'),
      }
    case 'dislike':
      return {
        post: updatePostLikeOrDislike(state.post, action.id, 'dislike'),
      }
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    post: { ...mockPost },
  })
  return (
    <div className="p-8 h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-semibold text-orange-500 text-center">
          Reddit comment clone
        </h1>
        <h2 className="mt-4 text-xl font-semibold">{state.post.title}</h2>
        <Comment comment={state.post} dispatch={dispatch} first />
        <div className="ml-2 pl-4">
          {state.post.replies.map((reply) => {
            console.log({ reply })
            return (
              <Comment comment={reply} dispatch={dispatch} key={reply.id} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default App
