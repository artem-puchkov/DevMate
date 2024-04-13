import { Box, Button, CardMedia, TextField, Typography } from "@mui/material";
import { UserData } from "../UserPost/UserPost.type";
import { ChangeEvent, useState } from "react";
import { UserUpdateData } from "./EditUserProfile.type";
import { updateUser } from "../../api/users";
import { decode } from "../../util/byteArrayDecoding";
import { ErrorsDisplay } from "../ErrorsDisplay/ErrorsDisplay";
import { getUserId } from "../../util/handleCookies";

interface EditUserProfileProps {
    user: UserData
}

export function EditUserProfile({ user }: EditUserProfileProps) {
    const [username, setUsername] = useState<string>(user.name);
    const [telegram, setTelegram] = useState<string>(user.telegram);
    const [about, setAbout] = useState<string | null>(user.about);
    const [byteArrayPic, setByteArrayPic] = useState<Uint8Array>(decode(user.avatar));

    const [errors, setErrors] = useState<string[]>([]);

    const [success, setSuccess] = useState<boolean>(false);

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setUsername(event.target.value);
    };

    const handleTelegramChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setTelegram(event.target.value);
    };

    const handleAboutChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setAbout(event.target.value);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];
        if (selectedFile) {            
            const reader = new FileReader();
    
            reader.onload = () => {
                const arrayBuffer = reader.result as ArrayBuffer;
                const byteArray: Uint8Array = new Uint8Array(arrayBuffer);
                setByteArrayPic(byteArray);
            };
            reader.readAsArrayBuffer(selectedFile);
        }
    }

    const handleUpdateButtonClick = async(): Promise<void> => {
        const byteArray = byteArrayPic as Uint8Array;
        const avatarByteArray: Array<number> = Array.from(byteArray);

        const updatedUser: UserUpdateData = {
            name: username,
            about: about,
            telegram: telegram,
            avatar: avatarByteArray
        }

        try {
            setErrors([]);
            setSuccess(true);
            await updateUser(updatedUser, getUserId());
        } catch (error: any) {
            const errorResponse = JSON.parse(error.message);
            setErrors(errorResponse.details);
            setSuccess(false);
        }
    }

    function getLinkOnAvatar(arrayBuffer: Uint8Array): string {
        const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
        return URL.createObjectURL(blob);
      }

    return (
        <div style={{width: 1420, margin: "0 auto", marginTop: "70px", marginBottom: "30px"}}>
            <Typography fontSize={30} marginTop={15}>
                Редактировать профиль:
            </Typography>
            <Box marginLeft={4} marginTop={5}>
                <Typography fontSize={23} marginBottom={2}>
                    Фото профиля:
                </Typography>
                <Box display={"flex"}>
                    <CardMedia component="img" image={getLinkOnAvatar(byteArrayPic)} sx={{borderRadius: '50%', height: 150, width: 150, marginTop: 4}} alt="Аватар"/>
                    <input type="file" id="input" accept="image/*" onChange={handleFileChange} style={{alignSelf: "flex-end", marginBottom: 10, marginLeft: 20}}/>
                </Box>
                <Typography sx={{fontSize: 23, marginTop: 5, marginBottom: 2}}>
                    Имя пользователя:
                </Typography>
                <TextField value={username} onChange={handleUsernameChange}/>
                <Typography sx={{fontSize: 23, marginTop: 5, marginBottom: 2}}>
                    Телеграм:
                </Typography>
                <TextField value={telegram} onChange={handleTelegramChange}/>
                <Typography sx={{fontSize: 23, marginTop: 5, marginBottom: 2}}>
                    О себе:
                </Typography>
                <TextField
                    placeholder="Расскажите о себе"
                    multiline
                    minRows={4}
                    value={about}
                    onChange={handleAboutChange}
                    sx={{width: 500}}
                />
                {errors &&
                    <ErrorsDisplay errors={errors}/>
                }
                <Box display={"flex"}>
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
                            '&:hover': {backgroundColor: "#86BF81"}
                        }}
                        onClick={handleUpdateButtonClick}
                    >
                        Применить изменения
                    </Button>
                    {success && 
                        <Typography sx={{color: "#32CD32", fontSize: 22, marginTop: 8.3, marginLeft: 5}}>
                            Изменения приняты!
                        </Typography>
                    }
                </Box>
            </Box>
        </div>
    )
}