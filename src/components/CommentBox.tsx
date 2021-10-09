/**
 * CommentBox
 * This component consists of the textarea and the submit button.
 * As it stands to grow into a bigger component with other actions, markdown support, etc I saw fit to make it its own component and not add it to the Comment.tsx component
 */
import * as React from 'react'
import { Button } from './Buttons'
import { useForm } from 'react-hook-form'

type CommentBoxProps = {
  type: 'comment' | 'reply'
  onSubmit: (comment: string, replyId: string) => void
  replyId: string
}

type CommentForm = {
  comment: string
}

function CommentBox({ type, onSubmit, replyId }: CommentBoxProps): JSX.Element {
  const { register, handleSubmit, watch, reset } = useForm<CommentForm>({
    defaultValues: { comment: '' },
  })
  const isDisabled = watch('comment').length === 0

  const handleCommentSubmit = (data: CommentForm): void => {
    onSubmit(data.comment, replyId)
    reset()
  }
  return (
    <form onSubmit={handleSubmit(handleCommentSubmit)}>
      <div className=" flex flex-col border-2 border-gray-300 overflow-hidden focus-within:border-gray-500 rounded">
        <label className="flex">
          <span className="sr-only">Comment</span>
          <textarea
            placeholder={
              type === 'comment' ? 'Leave a comment' : 'Reply to a comment'
            }
            className="w-full p-2 m-0 focus:outline-none"
            rows={4}
            {...register('comment')}
          ></textarea>
        </label>
        <div className="flex justify-end gap-2 px-2 py-3 bg-gray-100">
          <Button type="submit" disabled={isDisabled}>
            {type === 'comment' ? 'Comment' : 'Reply'}
          </Button>
        </div>
      </div>
    </form>
  )
}

export { CommentBox }
