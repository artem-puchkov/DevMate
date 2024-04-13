import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Button, CardMedia, IconButton, Modal, Tooltip, Typography } from "@mui/material";
import { userProfileModalStyle } from "../../util/ModalStyle";
import { getSpecificUser } from "../../api/users";
import { UserData } from "../UserPost/UserPost.type";
import { useNavigate } from "react-router-dom";
import { getLinkOnAvatar } from '../../util/gettingLinkOnAvatar';
import { getUserId } from '../../util/handleCookies';

interface UserProfileModalProps {
    open: boolean,
    handleClose: () => void,
    handleLoggedFalse: () => void
}

const user: UserData = await getSpecificUser(`${getUserId()}`);

export function UserProfileModal({ open, handleClose, handleLoggedFalse }: UserProfileModalProps) {
    const navigate = useNavigate();

    const handleClickOnEdit = () => {
        navigate("/edit-profile");
    }

    const handleClickOnAllPosts = () => {
        navigate("/all-user-posts");
    }

    const handleClickOnLogout = () => {
        handleLoggedFalse();
        handleClose();
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="Sign Up"
        >
            <Box sx={userProfileModalStyle}>
                <Typography fontSize={30}>
                    Профиль:
                </Typography>
                <CardMedia component="img" image={getLinkOnAvatar(user.avatar)} sx={{borderRadius: '50%', height: 180, width: 180, marginTop: 4}} alt="Аватар"/>
                <Box marginLeft={1}>
                    <Typography sx={{fontSize: 31, marginTop: 3}}>
                        {user.name}
                    </Typography>
                    <Typography sx={{fontSize: 25, marginTop: 4.5}}>
                        О себе:
                    </Typography>
                    {user.about &&
                        <Typography sx={{fontSize: 25, marginTop: 1}}>
                            {user.about} 
                        </Typography>
                    }
                    {!user.about &&
                        <Typography sx={{fontSize: 22, marginTop: 1, color: "rgba(0, 0, 0, 0.6)"}}>
                            Пока ничего нет
                        </Typography>
                    }
                    <Button
                        sx={{
                            backgroundColor: "#6D9469",
                            padding: "10px 18px 10px 18px",
                            marginTop: 7,
                            borderRadius: 2,
                            fontFamily: "Raleway, sans-serif", 
                            fontSize: 21, 
                            color: "white", 
                            textTransform: "none", 
                            '&:hover': {backgroundColor: "#588554"}
                        }}
                        onClick={handleClickOnEdit}
                    >
                        Редактировать профиль
                    </Button>
                    <Button
                        sx={{
                            backgroundColor: "#86BF81",
                            padding: "10px 20px 10px 20px",
                            marginTop: 3,
                            borderRadius: 2,
                            fontFamily: "Raleway, sans-serif", 
                            fontSize: 21, 
                            color: "white", 
                            textTransform: "none", 
                            '&:hover': {backgroundColor: "#A1D69D"}
                        }}
                        onClick={handleClickOnAllPosts}
                    >
                        Посмотреть свои анкеты
                    </Button>
                    <Tooltip
                        title={<span style={{fontSize: '16px'}}>{"Выйти из акканута"}</span>}
                        arrow
                        placement="left"
                    >
                        <IconButton onClick={handleClickOnLogout} sx={{position: "absolute", bottom: 20, right: 16}}>
                            <LogoutIcon sx={{color: "#DE3636", fontSize: 40}}/>
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
        </Modal>
    )
}