import { Post } from "@prisma/client"

export type PostWithOutId = Omit<Post, "id">
