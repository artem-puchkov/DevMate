import { Box, IconButton, Typography } from "@mui/material";
import { PostCardData } from "../PostCard/PostCard.type";
import { PostCard } from "../PostCard/PostCard";
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteUserPost } from "../../api/userPosts";
import { useState } from "react";

interface AllPostsProps {
    posts: PostCardData[]
}

export function AllUserPosts({ posts }: AllPostsProps) {
    const [allPosts, setAllPosts] = useState<PostCardData[]>(posts);

    const handleDeleteButtonClick = async(id: number): Promise<void> => {
        try {
            await deleteUserPost(id);
            setAllPosts(allPosts.filter(post => post.id !== id));
        } catch (error: any) {
            console.error(error);
        }
    }

    return (
        <div style={{width: 1420, margin: "0 auto", marginTop: "70px", marginBottom: 40}}>
            <Typography fontSize={32} marginTop={18}>
                Все ваши анкеты:
            </Typography>
            {!allPosts.length &&
                <Typography sx={{fontSize: 26, marginTop: 3, marginLeft: 2, color: "rgba(0, 0, 0, 0.6)"}}>
                    Нет созданных вами анкет
                </Typography>
            }
            <Box sx={{display: "flex", flexDirection: "column", gap: "40px", marginTop: "80px"}}>
                {allPosts.slice().reverse().map((post: PostCardData) => (
                    <Box display={"flex"}>
                        <PostCard key={post.id} post={post}/>
                        <IconButton sx={{marginLeft: 4}} disableRipple onClick={() => handleDeleteButtonClick(post.id)}>
                            <DeleteIcon sx={{color: "#DE3636", fontSize: 45}}/>
                        </IconButton>
                    </Box>
                ))}
            </Box>
        </div>
    );
}