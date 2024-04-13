import { useLoaderData } from "react-router-dom";
import { UserPost } from "../../components/UserPost/UserPost";
import { UserPostAndUserDataObject } from "../../components/UserPost/UserPost.type";
import { PagesLayout } from "../PagesLayout/PagesLayout";

export function UserPostPage() {
    const { userPost, user } = useLoaderData() as UserPostAndUserDataObject;
        
    return (
        <PagesLayout>
            <UserPost post={userPost} user={user}/>
        </PagesLayout>
    )
}
