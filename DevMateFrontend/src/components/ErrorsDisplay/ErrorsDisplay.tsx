import { Box, Typography } from "@mui/material"

interface ErrorsDisplayProps {
    errors: string[],
    marginL?: number
}

export function ErrorsDisplay({ errors, marginL = 0 }: ErrorsDisplayProps) {
    return (
        <Box 
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                marginLeft: marginL,
                marginTop: errors.length == 0 ? 0 : 6
            }}
        >
            {errors.map((message: string) => {
                return <Typography sx={{color: "red", fontSize: 20}} key={message}> {message} </Typography>
            })}
        </Box>
    )
}