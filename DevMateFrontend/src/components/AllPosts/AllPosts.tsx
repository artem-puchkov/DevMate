import { Box, IconButton, TextField, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { PostCard } from "../../components/PostCard/PostCard";
import { TechsAutocomplete } from "../../components/TechsAutocomplete/TechsAutocomplete";
import { PostCardData } from "../../components/PostCard/PostCard.type";
import { getAllUserPostsWithTitle } from "../../api/userPosts";

interface AllPostsProps {
    posts: PostCardData[]
}

export function AllPosts({ posts }: AllPostsProps) {
    const [allPosts, setAllPosts] = useState<PostCardData[]>(posts);

    const [postTitle, setTitle] = useState<string>("");

    const [techs, setTechs] = useState<string[]>([]);

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleTechsChange = (newValue: string[]) => {
        setTechs(newValue);
    };

    const handleSearchButtonClick = async () => {
        const postsWithSpecificTitle: PostCardData[] = await getAllUserPostsWithTitle(postTitle);

        setAllPosts(postsWithSpecificTitle);
    }

    const handleCloseButtonClick = () => {
        setAllPosts(posts);
        setTitle("");
    }

    return (
        <div style={{width: 1420, margin: "0 auto", marginTop: "70px"}}>
            <Box style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 150}}>
                <Typography fontSize={32}>
                    Все анкеты:
                </Typography>
                <Box display={"flex"}>
                    <Typography sx={{fontSize: 22, marginTop: "22px", marginRight: 3}}>
                        Поиск по названию: 
                    </Typography>
                    <TextField
                        variant="standard"
                        value={postTitle}
                        onChange={handleTitleChange}
                        sx={{marginTop: "20px", fontFamily: "Raleway, sans-serif"}}
                    />
                    {postTitle &&
                        <IconButton style={{marginTop: 15, marginLeft: 15}} onClick={handleCloseButtonClick}>
                            <CloseIcon style={{fontSize: 30}}/>
                        </IconButton>
                    }
                    <IconButton style={{marginTop: 15, marginLeft: 10}} onClick={handleSearchButtonClick}>
                        <SearchIcon style={{fontSize: 30}}/>
                    </IconButton>
                </Box>
            </Box>
            <Box sx={{display: "flex", justifyContent: "space-between", marginBottom: 4}}>
                <Box>
                    <Typography sx={{fontSize: 22, width: 300, marginTop: 12, marginBottom: 2}}>
                        Основные технологии пользователей
                    </Typography>
                    <TechsAutocomplete value={techs} handleChange={handleTechsChange}/>
                </Box>
                <Box sx={{display: "flex", flexDirection: "column", gap: "40px", marginTop: "100px"}}>
                    {allPosts.filter(post => techs.every(tech => post.techs?.includes(tech))).slice().reverse().map((post: PostCardData) => (
                        <PostCard key={post.id} post={post}/>
                    ))}
                </Box>
            </Box>
        </div>
    );
}