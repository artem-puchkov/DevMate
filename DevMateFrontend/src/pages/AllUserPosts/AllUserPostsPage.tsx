import { useLoaderData } from "react-router-dom";
import { AllUserPosts } from "../../components/AllUserPosts/AllUserPosts";
import { PagesLayout } from "../PagesLayout/PagesLayout";
import { PostCardDataArray } from "../../components/PostCard/PostCard.type";

export function AllUserPostsPage() {
    const { posts } = useLoaderData() as PostCardDataArray;

    console.log(posts.length);
    return (
        <PagesLayout>
            <AllUserPosts posts={posts}/>
        </PagesLayout>
    )
}