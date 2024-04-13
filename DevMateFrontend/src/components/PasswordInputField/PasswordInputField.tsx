import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";

interface PasswordInputFieldProps {
    title: string,
    width: number,
    value: string,
    marginT: number,
    marginL?: number,
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export function PasswordInputField({ title, width, value, marginT, marginL = 0, handleChange }: PasswordInputFieldProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            setIsFocused(false);
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    }

    return (
        <div>
            <Typography sx={{fontSize: 21, marginTop: marginT, marginLeft: marginL, display: "inline-block"}}>
                {title}:
            </Typography>
            <TextField
                type={showPassword ? 'text' : 'password'}
                variant="standard"
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={value}
                onChange={handleChange}
                sx={{marginTop: isFocused ? marginT : marginT - 0.7, marginLeft: 3, width: width}}
                InputProps={{
                    endAdornment:
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                            >
                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                }}
            />
        </div>
    )
}