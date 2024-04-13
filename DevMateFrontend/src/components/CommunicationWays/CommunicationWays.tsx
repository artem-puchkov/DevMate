import vk from "../../../pictures/vk.png";
import instagram from "../../../pictures/instagram.png";
import linkedin from "../../../pictures/LinkedIn.png";
import gitHub from "../../../pictures/github.png";
import x from "../../../pictures/x.png";
import telegram from "../../../pictures/Telegram.png";
import { Box, CardMedia } from "@mui/material"
import { SocialNetworks } from "./CommunicationWays.type"

interface CommunicationWaysProps {
    networks: SocialNetworks
}

export function CommunicationWays({ networks }: CommunicationWaysProps) {
    return (
        <Box sx={{display: "flex", alignItems: "center", gap: 3}}>
            <a href={networks.telegram}>
                <CardMedia component="img" image={telegram} style={{height: 27, width: 27}} alt="Линкедин"/>
            </a>
            { networks.linkedIn &&
                <a href={networks.linkedIn}>
                    <CardMedia component="img" image={linkedin} style={{height: 27, width: 27}} alt="Линкедин"/>
                </a>
            }
            { networks.instagram &&
                <a href={networks.instagram}>
                    <CardMedia component="img" image={instagram} style={{height: 27, width: 27}} alt="Инстаграм"/>
                </a>
            }
            { networks.vk &&
                <a href={networks.vk}>
                    <CardMedia component="img" image={vk} style={{height: 29, width: 29}} alt="Вк"/>
                </a>
            }
            { networks.gitHub &&
                <a href={networks.gitHub}>
                    <CardMedia component="img" image={gitHub} style={{height: 27, width: 27}} alt="Гитхаб"/>
                </a>
            }
            { networks.x &&
                <a href={networks.x}>
                    <CardMedia component="img" image={x} style={{height: 25, width: 25}} alt="Икс (твиттер)"/>
                </a>   
            }
        </Box>
    )
}