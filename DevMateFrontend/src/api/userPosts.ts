import { CreateUserPostDto } from "../components/CreatePost/CreatePost.type";
import { PostCardData } from "../components/PostCard/PostCard.type";
import { UserPostData } from "../components/UserPost/UserPost.type";
import { deleteRequestLayout, getRequestLayout, postRequestLayout } from "./apiRequestLayouts";
import { token } from "./jwt";

const getAllUserPostsUrl: string = "http://localhost:8080/api/v1/post/getAllUserPosts";

const getSpecificUserPostUrl: string = "http://localhost:8080/api/v1/post/getUserPost/";

const createUserPostUrl: string = "http://localhost:8080/api/v1/post/createUserPost";

const getAllUserPostsWithTitleUrl: string = `http://localhost:8080/api/v1/post/getAllUserPostsWithTitle/`;

const getAllUserPostsByUserUrl: string = `http://localhost:8080/api/v1/post/getAllUserPostsByUser/`;

const deleteUserPostUrl: string = `http://localhost:8080/api/v1/post/deleteUserPost/`;


export async function getAllUserPosts() {
    const data: PostCardData[] = await getRequestLayout(getAllUserPostsUrl);

    return data;
}

export async function getSpecificUserPost(id?: string) {
    const data: UserPostData = await getRequestLayout(`${getSpecificUserPostUrl}${id}`);

    return data;
}

export async function createUserPost(userPostData: CreateUserPostDto) {
    await postRequestLayout(createUserPostUrl, JSON.stringify(userPostData), token);
}

export async function getAllUserPostsWithTitle(title: string) {
    const data: PostCardData[] = await getRequestLayout(`${getAllUserPostsWithTitleUrl}${title}`);

    return data;
}

export async function getAllUserPostsByUser(id: number) {
    const data: PostCardData[] = await getRequestLayout(`${getAllUserPostsByUserUrl}${id}`, token);

    return data;
}

export async function deleteUserPost(id: number) {
    await deleteRequestLayout(`${deleteUserPostUrl}${id}`, token);
}