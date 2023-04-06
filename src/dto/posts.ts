
export type IPosts = Ipost[]

export interface Ipost {
    userId: number
    id: number
    title: string
    body: string
}


export type IComments = IComment[]

export interface IComment {
    postId: number
    id: number
    name: string
    email: string
    body: string
}


export type IUserPosts = IuserPost[]

export interface IuserPost {
    userId: number
    id: number
    title: string
    body: string
}
