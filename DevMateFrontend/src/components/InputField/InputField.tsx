import { TextField, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";

interface InputFieldProps {
    title: string,
    width: number,
    value: string,
    marginT: number,
    marginL?: number,
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export function InputField({ title, width, value, marginT, marginL = 0, handleChange }: InputFieldProps) {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            setIsFocused(false);
        }
    };

    return (
        <div>
            <Typography sx={{fontSize: 21, marginTop: marginT, marginLeft: marginL, display: "inline-block"}}>
                {title}:
            </Typography>
            <TextField
                variant="standard"
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={value}
                onChange={handleChange}
                sx={{marginTop: isFocused ? marginT : marginT - 0.7, marginLeft: 3, width: width}}
            />
        </div>
    )
}