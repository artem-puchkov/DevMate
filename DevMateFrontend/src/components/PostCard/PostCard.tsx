import { Box, CardMedia, Typography } from "@mui/material";
import { PostCardData } from "./PostCard.type";
import { useNavigate } from "react-router-dom";
import { getLinkOnAvatar } from "../../util/gettingLinkOnAvatar";

interface PostCardProps {
    post: PostCardData
}

export function PostCard({ post }: PostCardProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/post/${post.id}`)
      };

    return (
        <div>
            <Box onClick={handleClick} 
                sx={{position: "relative",
                    width: 910, height: 165, 
                    backgroundColor: "#4B6B52", 
                    borderRadius: 6,
                    cursor: "pointer"
                }}>
                <Box sx={{position: "absolute", 
                        bottom: "5px", right: "5px", 
                        width: 900, height: 155, 
                        backgroundColor: "#ffffff", 
                        borderRadius: 6
                    }}>
                    <Box display={"flex"} alignItems={"center"}>
                        <CardMedia component="img" image={getLinkOnAvatar(post.avatar)} sx={{borderRadius: '50%', height: 45, width: 45, margin: "24px 20px 0 24px"}} alt="Аватар"/>
                        <Typography style={{marginRight: 10, fontSize: 26, fontWeight: 500, marginTop: 20}}>
                            {post.userName}
                        </Typography>
                        {post.techs &&
                            <Typography style={{fontSize: 26, color: "rgba(0, 0, 0, 0.6)", marginTop: 20}}>
                                    / {post.techs.length > 3 ? 
                                          post.techs.slice(0, 3).join(", ") : 
                                          post.techs.join(", ")
                                      }                                   
                            </Typography>
                        }
                    </Box>
                    <Typography sx={{fontSize: 24, marginTop: 2.5, marginLeft: 3}}>
                        {post.title.length < 67 ?
                            post.title :
                            post.title.substring(0, 67) + " ....."
                        }
                    </Typography>
                </Box>
            </Box>
        </div>
    );
}
