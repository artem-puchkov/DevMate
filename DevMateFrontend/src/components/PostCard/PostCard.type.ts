export interface PostCardData {
    id: number,
    title: string,
    techs: string[] | null,
    userName: string,
    avatar: string
}

export interface PostCardDataArray {
    posts: PostCardData[]
}