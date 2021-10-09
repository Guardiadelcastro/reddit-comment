export type Comment = {
  id: string
  body: string
  replies: Comment[]
  createdAt: string
  updatedAt: string | null
  likes: number
  dislikes: number
}

export type Post = {
  id: string
  title: string
  body: string
  replies: Comment[]
  createdAt: string
  updatedAt: string | null
  likes: number
  dislikes: number
}
