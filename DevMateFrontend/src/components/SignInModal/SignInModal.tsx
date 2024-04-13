import { Box, Button, Modal, Typography } from "@mui/material";
import { InputField } from "../InputField/InputField";
import { modalStyle } from "../../util/ModalStyle";
import { ChangeEvent, useState } from "react";
import { ErrorsDisplay } from "../ErrorsDisplay/ErrorsDisplay";
import { SignInDto } from "./SignInModal.type";
import { JwtResponse } from "../../util/ResponseWithJwt";
import { authenticateUser } from "../../api/users";
import { PasswordInputField } from "../PasswordInputField/PasswordInputField";
import { setTokenAndId } from "../../util/handleCookies";

interface SignInModalProps {
    open: boolean,
    handleClose: () => void,
    handleLoggedTrue: () => void
}

export function SignInModal({ open, handleClose, handleLoggedTrue }: SignInModalProps) {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [errors, setErrors] = useState<string[]>([]);

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value);
    };

    const handleSignInButtonClick = async(): Promise<void> => {
        const user: SignInDto = {
            email: email,
            password: password
        }

        try {
            const response: JwtResponse = await authenticateUser(user);
            setTokenAndId(response.token, email);

            setErrors([]);
            handleLoggedTrue();
            handleClose();
        } catch (error: any) {
            const errorResponse = JSON.parse(error.message);
            setErrors(errorResponse.details);
        }

    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="Sign In"
        >
            <Box sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                    Вход:
                </Typography>
                <Box sx={{marginTop: 3, marginLeft: 8}}>
                    <InputField title="Электронная почта" width={250} value={email} marginT={3} handleChange={handleEmailChange}/>
                    <PasswordInputField title="Пароль" width={250} value={password} marginT={3} marginL={15.2} handleChange={handlePasswordChange}/>
                </Box>
                {errors &&
                    <ErrorsDisplay errors={errors} marginL={2.3}/>
                }
                <Button
                    sx={{
                        backgroundColor: "#6D9469",
                        padding: "10px 25px 10px 25px",
                        marginLeft: 76.5,
                        marginTop: 5.2,
                        borderRadius: 2,
                        fontFamily: "Raleway, sans-serif", 
                        fontSize: 18, 
                        color: "white", 
                        textTransform: "none", 
                        '&:hover': {backgroundColor: "#88BE82"}
                    }}
                    onClick={handleSignInButtonClick}
                >
                    Войти
                </Button>
            </Box>
        </Modal>
    )
}