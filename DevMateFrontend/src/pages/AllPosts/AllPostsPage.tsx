import { useLoaderData } from "react-router-dom";
import { AllPosts } from "../../components/AllPosts/AllPosts";
import { PagesLayout } from "../PagesLayout/PagesLayout";
import { PostCardDataArray } from "../../components/PostCard/PostCard.type";

export function AllPostsPage() {
    const { posts } = useLoaderData() as PostCardDataArray;

    return (
        <PagesLayout>
            <AllPosts posts={posts}/>
        </PagesLayout>
    )
}

