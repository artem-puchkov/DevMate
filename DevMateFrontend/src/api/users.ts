import { UserUpdateData } from "../components/EditUserProfile/EditUserProfile.type";
import { SignInDto } from "../components/SignInModal/SignInModal.type";
import { SignUpDto } from "../components/SignUpModal/SignUpModal.type";
import { UserData } from "../components/UserPost/UserPost.type";
import { JwtResponse } from "../util/ResponseWithJwt";
import { getRequestLayout, postRequestLayout } from "./apiRequestLayouts";
import { token } from "./jwt";

const signUpUrl: string = "http://localhost:8080/api/v1/auth/registration";

const signInUrl: string = "http://localhost:8080/api/v1/auth/authentication";

const getUserUrl: string = `http://localhost:8080/api/v1/user/getUser/`;

const updateUserUrl: string = `http://localhost:8080/api/v1/user/updateUser/`

const getUserByEmailUrl: string = `http://localhost:8080/api/v1/user/getUserByEmail/`


export async function createUser(signUpUserData: SignUpDto) {
    const data: JwtResponse = await postRequestLayout(signUpUrl, JSON.stringify(signUpUserData));

    return data;
}

export async function authenticateUser(signInUserData: SignInDto) {
    const data: JwtResponse = await postRequestLayout(signInUrl, JSON.stringify(signInUserData));

    return data;
}

export async function getSpecificUser(id?: string) {
    const data: UserData = await getRequestLayout(`${getUserUrl}${id}`);

    return data;
}

export async function updateUser(updatedUser: UserUpdateData, id: number) {
    await postRequestLayout(`${updateUserUrl}${id}`, JSON.stringify(updatedUser), token)
}

export async function getSpecificUserByEmail(email: string) {
    const data: UserData = await getRequestLayout(`${getUserByEmailUrl}${email}`);

    return data;
}