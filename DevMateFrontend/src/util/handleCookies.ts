import Cookies from "universal-cookie";
import { UserData } from "../components/UserPost/UserPost.type";
import { getSpecificUserByEmail } from "../api/users";

const cookies = new Cookies();

export async function setTokenAndId(token: string, email: string): Promise<void> {
    const currentDate = new Date();
    const expirationDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000); 
    const user: UserData = await getSpecificUserByEmail(email);

    cookies.set("user_id", user.id, { expires: expirationDate })
    cookies.set("token", token, { expires: expirationDate })
}

export function getToken(): string {
    return cookies.get("token");
}

export function getUserId(): number {
    return cookies.get("user_id");
}

export function removeTokenAndId() {
    cookies.remove("token");
    cookies.remove("user_id");
}