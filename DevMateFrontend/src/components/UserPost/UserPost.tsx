
import { Box, CardMedia, IconButton, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { CommunicationWays } from "../../components/CommunicationWays/CommunicationWays";
import { SocialNetworks } from "../../components/CommunicationWays/CommunicationWays.type";
import { UserData, UserPostData } from "./UserPost.type";
import { useNavigate } from "react-router-dom";
import { getLinkOnAvatar } from "../../util/gettingLinkOnAvatar";

interface UserPostPageProps {
    post: UserPostData,
    user: UserData
}

export function UserPost({ post, user }: UserPostPageProps) {
    const navigate = useNavigate();

    const handleButtonBackClick = () => {
        navigate("/posts");
    }

    const SocialNetworks: SocialNetworks = {
        telegram: user.telegram,
        linkedIn: post.linkedIn,
        instagram: post.instagram,
        vk: post.vk,
        gitHub: post.gitHub,
        x: post.x
    }

    return (
        <div style={{width: 1420, margin: "0 auto", marginTop: "70px", paddingBottom: 40, display: "flex"}}>
            <IconButton sx={{marginTop: 13, marginLeft: 3, alignSelf: "flex-start"}} disableRipple onClick={handleButtonBackClick}>
                <ArrowBackIosIcon sx={{fontSize: 55}}/>
            </IconButton>
            <Box style={{marginLeft: 55}}>
                <Box display={"flex"} marginTop={8}>
                    <CardMedia component="img" image={getLinkOnAvatar(user.avatar)} sx={{borderRadius: '50%', height: 150, width: 150, marginRight: 5}} alt="Аватар"/>
                    <div>
                        <Typography sx={{fontSize: 32, fontWeight: 500, marginTop: 2}}>
                            {user.name}
                        </Typography>
                        <Typography sx={{fontSize: 28, color: "rgba(0, 0, 0, 0.6)", marginTop: 3, maxWidth: 800}}>
                            Технологии: {post.techs ?
                                            post.techs.join(", ") :
                                            "Пользователь не указывал технологий"      
                                        }           
                        </Typography>
                    </div>
                </Box>
                <Box sx={{display: "flex", gap: 3, marginTop: 3}}>
                    <Typography fontSize={22}>
                        Способы связи и соц сети:
                    </Typography>
                    <CommunicationWays networks={SocialNetworks}/>
                </Box>
                <Typography sx={{fontSize: 28, marginTop: 9, maxWidth: 1050}}>
                    {post.title}
                </Typography>
                <Box sx={{width: 1050, border: "3px solid #777777", borderRadius: 5, marginTop: 8, padding: 4}}>
                    <Typography sx={{fontSize: 26, whiteSpace: "pre-wrap"}}>
                        {post.description}
                    </Typography>
                </Box>
            </Box>
        </div>
    );
}