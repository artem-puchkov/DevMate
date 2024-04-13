import { Box, Typography } from "@mui/material";

export function Footer() {
    return (
        <Box sx={{
            textAlign: "center",
            paddingBottom: 5,
            paddingTop: 5
        }}>
            <Typography fontSize={16}>
                🍀 DevMate by <a style={{color: "inherit", textDecoration: "none"}} href="https://t.me/LaoMaoy">
                                    Артём Пучков
                                </a>
            </Typography>
        </Box>
    )
}