/**
 * The Comment component,
 * As implemented can be used for the first comment (post), or any comment or reply. This can be refactored into two components and maybe the first post comment can be a different component than the reply component.
 */

import * as React from 'react'
import { Action } from '../App'
import { CommentBox } from './CommentBox'
import { Comment as TComment } from '../types/reddit'
import { LightButton } from './Buttons'

type CommentProps = {
  comment: TComment
  dispatch: React.Dispatch<Action>
  first?: boolean
}

function Comment({
  first = false,
  comment,
  dispatch,
}: CommentProps): JSX.Element {
  const [show, setShow] = React.useState(first)
  return (
    <div className="mt-4 flex flex-col gap-4 ">
      <p>{comment.body}</p>
      <div className="flex gap-2">
        <LightButton
          square
          onClick={() => dispatch({ type: 'like', id: comment.id })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
              clipRule="evenodd"
            />
          </svg>
          {comment.likes > 0 ? <span>{comment.likes}</span> : null}
        </LightButton>
        <LightButton
          square
          onClick={() => dispatch({ type: 'dislike', id: comment.id })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
              clipRule="evenodd"
            />
          </svg>
          {comment.dislikes > 0 ? <span>{comment.dislikes}</span> : null}
        </LightButton>
        {!first ? (
          <LightButton onClick={() => setShow((old) => !old)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            {show ? 'Cancel' : first ? 'New Comment' : 'Reply'}
          </LightButton>
        ) : null}
      </div>
      {show ? (
        <CommentBox
          type="comment"
          onSubmit={(comment, id) => {
            !first && setShow(false)
            dispatch({ type: 'comment', comment, id })
          }}
          replyId={comment.id}
        />
      ) : null}
      {!first ? (
        <div
          className={`ml-4 ${
            !first ? 'pl-4 border-l-2 border-orange-300' : ''
          }`}
        >
          {comment.replies.length > 0
            ? comment.replies.map((reply) => (
                <Comment key={reply.id} comment={reply} dispatch={dispatch} />
              ))
            : null}
        </div>
      ) : null}
    </div>
  )
}

export { Comment }
