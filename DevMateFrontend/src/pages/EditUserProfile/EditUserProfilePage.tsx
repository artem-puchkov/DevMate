import { useLoaderData } from "react-router-dom";
import { EditUserProfile } from "../../components/EditUserProfile/EditUserProfile";
import { PagesLayout } from "../PagesLayout/PagesLayout";
import { UserDataObject } from "../../components/EditUserProfile/EditUserProfile.type";

export function EditUserProfilePage() {
    const { user } = useLoaderData() as UserDataObject;

    return (
        <PagesLayout>
            <EditUserProfile user={user}/>
        </PagesLayout>
    )
}