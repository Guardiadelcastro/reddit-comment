import { Post } from '../types/reddit'

export const mockPost: Post = {
  id: '1234gasdgfa',
  title: 'Chapter 76 Discussion',
  body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium voluptas doloribus, quos excepturi expedita ad sapiente porro molestias rem perspiciatis laboriosam dignissimos nemo illo iste. Commodi fugit magni beatae blanditiis!',
  createdAt: new Date().toISOString(),
  updatedAt: null,
  likes: 0,
  dislikes: 0,
  replies: [
    {
      id: 'ghjl3452',
      body: "That's so true",
      createdAt: new Date().toISOString(),
      updatedAt: null,
      likes: 0,
      dislikes: 0,
      replies: [
        {
          id: '35edyjnhw45',
          body: 'I agree',
          createdAt: new Date().toISOString(),
          updatedAt: null,
          replies: [],
          likes: 0,
          dislikes: 0,
        },
      ],
    },
  ],
}
