import { Box, Button, Modal, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { InputField } from "../InputField/InputField";
import { modalStyle } from "../../util/ModalStyle";
import { SignUpDto } from "./SignUpModal.type";
import { createUser } from "../../api/users";
import { ErrorsDisplay } from "../ErrorsDisplay/ErrorsDisplay";
import { JwtResponse } from "../../util/ResponseWithJwt";
import { PasswordInputField } from "../PasswordInputField/PasswordInputField";
import { setTokenAndId } from "../../util/handleCookies";
import { getAvatarBytesArray } from "../../util/defaultAvatarBytesArray";

interface SignUpModalProps {
    open: boolean,
    handleClose: () => void,
    handleLoggedTrue: () => void
}

export function SignUpModal({ open, handleClose, handleLoggedTrue }: SignUpModalProps) {
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [telegram, setTelegram] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");

    const [errors, setErrors] = useState<string[]>([]);

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value);
    };

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setUsername(event.target.value);
    };

    const handleTelegramChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setTelegram(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value);
    };

    const handlePasswordConfirmChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setPasswordConfirm(event.target.value);
    };

    const handleSignUpButtonClick = async(): Promise<void> => {
        const avatar: Array<number> = await getAvatarBytesArray();

        const user: SignUpDto = {
            email: email,
            name: username,
            telegram: telegram,
            avatar: avatar,
            password: password
        }

        if (password === passwordConfirm) {
            try {
                const response: JwtResponse = await createUser(user);
                setTokenAndId(response.token, email);

                setErrors([]);
                handleLoggedTrue();
                handleClose();
            } catch (error: any) {
                const errorResponse = JSON.parse(error.message);
                setErrors(errorResponse.details);
            }
        } else {
            setErrors(["Пароли не совпадают"])
        }
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="Sign Up"
        >
            <Box sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                    Регистрация:
                </Typography>
                <Box sx={{marginTop: 3, marginLeft: 8}}>
                    <InputField title="Электронная почта" width={250} value={email} marginT={3} handleChange={handleEmailChange}/>
                    <InputField title="Имя пользователя" width={250} value={username} marginT={3} marginL={1.4} handleChange={handleUsernameChange}/>
                    <InputField title="Телеграм (ссылка)" width={250} value={telegram} marginT={3} marginL={1.7} handleChange={handleTelegramChange}/>
                    <PasswordInputField title="Пароль" width={250} value={password} marginT={3} marginL={15.2} handleChange={handlePasswordChange}/>
                    <PasswordInputField title="Подтверждение пароля" width={250} value={passwordConfirm} marginT={3} marginL={-5.7} handleChange={handlePasswordConfirmChange}/>
                </Box>
                {errors &&
                    <ErrorsDisplay errors={errors} marginL={2.3}/>
                }
                <Button
                    sx={{
                        backgroundColor: "#6D9469",
                        padding: "10px 25px 10px 25px",
                        marginLeft: 61,
                        marginTop: 5.2,
                        borderRadius: 2,
                        fontFamily: "Raleway, sans-serif", 
                        fontSize: 18, 
                        color: "white", 
                        textTransform: "none", 
                        '&:hover': {backgroundColor: "#88BE82"}
                    }}
                    onClick={handleSignUpButtonClick}
                >
                    Зарегестрироваться
                </Button>
            </Box>
        </Modal>
    )
}