export interface UserPostData {
    id: number,
    title: string,
    description: string,
    techs: string[] | null,
    linkedIn: string,
    instagram: string,
    vk: string,
    gitHub: string,
    x: string,
    userId: number
}

export interface UserData {
    id: number,
    name: string,
    email: string,
    about: string,
    telegram: string,
    avatar: string
}

export interface UserPostAndUserDataObject {
    userPost: UserPostData,
    user: UserData
}