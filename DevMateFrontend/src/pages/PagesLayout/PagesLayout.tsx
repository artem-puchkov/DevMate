import { ThemeProvider } from "@mui/material";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { useState } from "react";
import { SignUpModal } from "../../components/SignUpModal/SignUpModal";
import { SignInModal } from "../../components/SignInModal/SignInModal";
import theme from "../../util/theme";
import { getToken, removeTokenAndId } from "../../util/handleCookies";
import { UserProfileModal } from "../../components/UserProfileModal/UserProfileModal";

interface PagesLayoutProps {
    children: React.ReactNode;
}

export function PagesLayout({ children }: PagesLayoutProps) {
    const [isLogged, setLogged] = useState<boolean>(tokenAvailability());

    const [signUpModal, setSignUpModal] = useState<boolean>(false);
    const [signInModal, setSignInModal] = useState<boolean>(false);
    const [userProfileModal, setUserProfileModal] = useState<boolean>(false);

    const handleLoggedSetTrue = () => setLogged(true);
    const handleLoggedSetFalse = () => {
        setLogged(false);
        removeTokenAndId();

    }

    const handleSignUpOpen = () => setSignUpModal(true);
    const handleSignUpClose = () => setSignUpModal(false);

    const handleSignInOpen = () => setSignInModal(true);
    const handleSignInClose = () => setSignInModal(false);

    const handleUserProfileOpen = () => setUserProfileModal(true);
    const handleUserProfileClose = () => setUserProfileModal(false);

    return (
        <ThemeProvider theme={theme}>
            <Header isLogged={isLogged} handleSignUpOpen={handleSignUpOpen} handleSignInOpen={handleSignInOpen} handleUserProfileOpen={handleUserProfileOpen}/>
                { children }
            <Footer/>
            <SignUpModal open={signUpModal} handleClose={handleSignUpClose} handleLoggedTrue={handleLoggedSetTrue}/>
            <SignInModal open={signInModal} handleClose={handleSignInClose} handleLoggedTrue={handleLoggedSetTrue}/>
            {isLogged &&
                <UserProfileModal open={userProfileModal} handleClose={handleUserProfileClose} handleLoggedFalse={handleLoggedSetFalse}/>
            }
        </ThemeProvider>
    )
}

function tokenAvailability(): boolean {
    if (getToken()) {
        return true;
    } else {
        return false;
    }
}