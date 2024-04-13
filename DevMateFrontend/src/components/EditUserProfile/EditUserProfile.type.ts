import { UserData } from "../UserPost/UserPost.type";

export interface UserDataObject {
    user: UserData;
}

export interface UserUpdateData {
    name: string,
    about: string | null,
    telegram: string,
    avatar: Array<number>
}