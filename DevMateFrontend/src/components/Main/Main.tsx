import { Box, CardMedia, Typography } from "@mui/material";
import { mainPageText } from "../../util/texts";
import laptopImage from "../../../pictures/laptopWithCode.png"

export function Main() {
    return (
        <div style={{width: 1420, margin: "0 auto", marginTop: "70px", paddingBottom: 139}}>
            <Box display={"inline-block"}>
                <Typography variant="h4" sx={{width: 500, display: "flex", flexDirection: "column", fontWeight: 450, paddingTop: "90px"}}>
                    <span>Найди напарника</span>
                    <span>для совместной разработки</span>
                </Typography>
                <Typography sx={{fontSize: 22, width: 500, lineHeight: 2, marginTop: 8}}>
                    {mainPageText}
                </Typography>
            </Box>
            <CardMedia component="img" image={laptopImage} style={{float: "right", marginTop: 60, height: 630, width: 750}} alt="Фото"/>
        </div>
    )
}