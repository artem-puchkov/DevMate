import { Box, Button, CardMedia, TextField, Typography } from "@mui/material";
import { TechsAutocomplete } from "../../components/TechsAutocomplete/TechsAutocomplete";
import manImage from "../../../pictures/beardedManAtThePC.png";
import { InputField } from "../../components/InputField/InputField";
import { InfoTooltip } from "../../components/InfoTooltip/InfoTooltip";
import { ChangeEvent, useState } from "react";
import { createUserPost } from "../../api/userPosts";
import { ErrorsDisplay } from "../../components/ErrorsDisplay/ErrorsDisplay";
import { CreateUserPostDto } from "./CreatePost.type";
import { getUserId } from "../../util/handleCookies";

const techsInfoText = "   Если вы выбрали более трех технологий, то на странице со всеми анкетами в карточке будут показываться только первые три. " +
                      "\n   Весь выбранный стек будет показан пользователю если он перейдет на вашу анкету";

export function CreatePost() {
    const [postTitle, setPostTitle] = useState<string>("");
    const [linkedIn, setLinkedIn] = useState<string>("");
    const [instagram, setInstagram] = useState<string>("");
    const [vk, setVk] = useState<string>("");
    const [gitHub, setGitHub] = useState<string>("");
    const [x, setX] = useState<string>("");

    const [description, setDescription] = useState<string>("");

    const [techs, setTechs] = useState<string[]>([]);

    const [errors, setErrors] = useState<string[]>([]);

    const [success, setSuccess] = useState<boolean>(false);

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setPostTitle(event.target.value);
    };

    const handleLinkedInChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setLinkedIn(event.target.value);
    };

    const handleInstagramChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setInstagram(event.target.value);
    };

    const handleVkChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setVk(event.target.value);
    };

    const handleGitHubChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setGitHub(event.target.value);
    };

    const handleXChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setX(event.target.value);
    };

    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setDescription(event.target.value);
    }

    const handleTechsChange = (newValue: string[]) => {
        setTechs(newValue);
    };

    const handleCreateButtonClick = async(): Promise<void> => {
        const userPost: CreateUserPostDto = {
            title: postTitle,
            description: description,
            techs: techs,
            linkedIn: linkedIn,
            instagram: instagram,
            vk: vk,
            gitHub: gitHub,
            x: x,
            userId: getUserId()
        }

        try {
            await createUserPost(userPost);
            setErrors([]);
            setSuccess(true);
        } catch (error: any) {
            setSuccess(false);
            const errorResponse = JSON.parse(error.message);
            setErrors(errorResponse.details);
        }
    }

    return (
        <div style={{width: 1420, margin: "0 auto", marginTop: "70px", marginBottom: 40}}>
            <Typography sx={{fontSize: 30, marginTop: 17}}>
                Создание анкеты:
            </Typography>
            <Box marginLeft={18}>
                <InputField title="Название анкеты" width={400} value={postTitle} marginT={6} handleChange={handleTitleChange}/>
                <Typography sx={{fontSize: 21, marginTop: 6, marginBottom: 2}}>
                    Ваш основной стек технологий: 
                </Typography>
                <Box display={"flex"} gap={2.5}>
                    <TechsAutocomplete value={techs} handleChange={handleTechsChange}/>
                    <InfoTooltip text={techsInfoText}/>
                </Box>
                <Typography sx={{fontSize: 21, marginTop: 6, marginBottom: 2}}>
                    Содержание:
                </Typography>
                <TextField
                    placeholder="Расскажите о себе и сообщите о том, кого вы ищите"
                    multiline
                    minRows={7}
                    value={description}
                    onChange={handleDescriptionChange}
                    sx={{width: 800}}
                />
                <Typography sx={{fontSize: 21, marginTop: 6, whiteSpace: "pre-line"}}>
                    Дополнительные способы связи и соц сети, помимо Telegram. Заполните по желанию
                </Typography>
                <Typography sx={{fontSize: 19, color: "rgba(0, 0, 0, 0.6)"}}>
                    В каждом поле оставьте ссылку на свой профиль
                </Typography>
                <Box display={"flex"}>
                    <Box sx={{display: "flex", flexDirection: "column"}}>
                        <InputField title="LinkedIn" width={300} value={linkedIn} marginT={6} handleChange={handleLinkedInChange}/>
                        <InputField title="Instagram" width={300} value={instagram} marginT={6} handleChange={handleInstagramChange}/>
                        <InputField title="ВКонтакте" width={300} value={vk} marginT={6} handleChange={handleVkChange}/>
                        <InputField title="GitHub" width={300} value={gitHub} marginT={6} handleChange={handleGitHubChange}/>
                        <InputField title="X (Twitter)" width={300} value={x} marginT={6} handleChange={handleXChange}/>
                    </Box>
                    <CardMedia component="img" image={manImage} style={{height: 400, width: 400, marginLeft: 260, marginTop: 10}} alt="Картинка"/>
                </Box>
                {errors &&
                    <ErrorsDisplay errors={errors}/>
                }
                <Box display={"flex"}>
                    <Button 
                        sx={{
                            backgroundColor: "#A8D8A4",
                            padding: 2.5,
                            marginTop: 8,
                            fontFamily: "Raleway, sans-serif", 
                            fontSize: 18, 
                            color: "rgba(0, 0, 0, 0.8)", 
                            textTransform: "none", 
                            '&:hover': {backgroundColor: "#B9E3B5"}
                        }}
                        onClick={handleCreateButtonClick}
                    >
                        Создать анкету
                    </Button>
                    {success && 
                        <Typography sx={{color: "#32CD32", fontSize: 22, marginTop: 10.4, marginLeft: 5}}>
                            Анкета успешно создана!
                        </Typography>
                    }
                </Box>
            </Box>
        </div>
    );
}