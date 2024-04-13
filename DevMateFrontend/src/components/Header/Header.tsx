import { AppBar, Box, Button, Divider, IconButton, Toolbar, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";

const buttonStyles = {
    color: "black",
    fontFamily: "Red Hat Display, sans-serif",
    fontSize: 17,
    textTransform: "none",
    "&:hover": {
        backgroundColor: "transparent"
    },
    marginRight: 2
};

const slashStyle = {
    userSelect: "none",
    fontFamily: "Red Hat Display, sans-serif",
    alignSelf: "center",
    color: "black",
    marginRight: 0.9
}

const alertMessage: string = "Пожалуйста, зарегестрируйтесь или войдите в акканут, чтобы иметь возможность создавать анкеты!";

interface HeaderProps {
    isLogged: boolean,
    handleSignUpOpen: () => void,
    handleSignInOpen: () => void,
    handleUserProfileOpen: () => void
}

export function Header({ isLogged, handleSignUpOpen, handleSignInOpen, handleUserProfileOpen }: HeaderProps) {
    const navigate = useNavigate();

    const handleClickOnLogo = () => {
        navigate("/");
    }

    const handleClickOnPosts = () => {
        navigate("/posts");
    }

    const handleClickOnCreate = () => {
        if (isLogged) {
            navigate("/crete-post");
        } else {
            alert(alertMessage);
        }
    }

    const handleClickOnContacts = () => {
        navigate("/contacts");
    }

    return (
        <AppBar
            elevation={0}
            sx={{position: "fixed", backgroundColor: "#A8D8A4", height: 70}}
        >
            <Toolbar
                sx={{width: 1480, margin: "auto auto"}}
            >
                <Box display={"flex"} flexGrow={1} gap={2}>
                    <Button sx={buttonStyles} style={{fontSize: 24}} onClick={handleClickOnLogo} disableRipple>DevMate</Button>
                    <Divider
                        orientation="vertical" 
                        variant="middle" 
                        flexItem
                        sx={{backgroundColor: "rgba(0, 0, 0, 0.5)", marginRight: 2, marginTop: 1.5}}    
                    />
                    <Button sx={buttonStyles} onClick={handleClickOnPosts} disableRipple>Анкеты</Button>
                    <Button sx={buttonStyles} onClick={handleClickOnCreate} disableRipple>Создать анкету</Button>
                    <Button sx={buttonStyles} onClick={handleClickOnContacts} disableRipple>Контакты</Button>
                </Box>
                {isLogged ||
                    <Box display={"flex"}>
                        <Button sx={buttonStyles} onClick={handleSignUpOpen}>Регистрация</Button>
                        <Typography sx={slashStyle}>/</Typography>
                        <Button sx={buttonStyles} onClick={handleSignInOpen}>Вход</Button>
                    </Box>
                }
                {isLogged &&
                    <IconButton onClick={handleUserProfileOpen}>
                        <AccountCircleIcon fontSize="large"/>
                    </IconButton>
                }
            </Toolbar>
        </AppBar>
    );
};