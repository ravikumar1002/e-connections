

export interface IPost {
    userId: number;
    id: number;
    name: string;
    title: string;
    body: string;
    email: string;
}

export interface IComment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

export interface IUserPost {
    userId: number
    id: number;
    title: string;
    body: string;
}


export type CreateNewPostData = Omit<IPost, 'id'|'email' | 'name'>