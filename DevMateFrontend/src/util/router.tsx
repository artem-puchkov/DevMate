import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "../pages/Main/MainPage";
import { ContactsPage } from "../pages/Contacts/ContactsPage";
import { CreatePostPage } from "../pages/CreatePost/CreatePostPage";
import { getAllUserPosts, getAllUserPostsByUser, getSpecificUserPost } from "../api/userPosts";
import { PostCardData } from "../components/PostCard/PostCard.type";
import { AllPostsPage } from "../pages/AllPosts/AllPostsPage";
import { EditUserProfilePage } from "../pages/EditUserProfile/EditUserProfilePage";
import { UserData, UserPostData } from "../components/UserPost/UserPost.type";
import { getSpecificUser } from "../api/users";
import { getUserId } from "./handleCookies";
import { UserPostPage } from "../pages/UserPost/UserPostPage";
import { AllUserPostsPage } from "../pages/AllUserPosts/AllUserPostsPage";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />
    },
    {
        path: "/posts",
        element: <AllPostsPage />,
        loader: async () => {
            const posts: PostCardData[] = await getAllUserPosts();

            return { posts };
        }
    },
    {
        path: "/crete-post",
        element: <CreatePostPage />
    },
    {
        path: "/contacts",
        element: <ContactsPage />
    },
    {
        path: "/edit-profile",
        element: <EditUserProfilePage />,
        loader: async () => {
            const user: UserData = await getSpecificUser(`${getUserId()}`);

            return { user };
        }
    },
    {
        path: "/post/:postId",
        element: <UserPostPage />,
        loader: async ({ params }) => {
            const userPost: UserPostData = await getSpecificUserPost(params.postId);
            const user: UserData = await getSpecificUser(`${userPost.userId}`);

            return { userPost, user };
        }
    },
    {
        path: "/all-user-posts",
        element: <AllUserPostsPage />,
        loader: async () => {
            const posts: PostCardData[] = await getAllUserPostsByUser(getUserId());

            return { posts };
        }
    }
]);