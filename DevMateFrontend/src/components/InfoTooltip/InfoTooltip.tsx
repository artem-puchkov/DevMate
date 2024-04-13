import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

interface InfoTooltipProps {
    text: string
}

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 375,
    },
  });

export function InfoTooltip({ text }: InfoTooltipProps) {
    return (
        <CustomWidthTooltip 
            title={<span style={{fontSize: '14px', whiteSpace: "pre-wrap"}}>{text}</span>} 
            arrow
            placement="right"
        >
            <IconButton>
                <HelpOutlineRoundedIcon style={{fontSize: 33}}/>
            </IconButton>
        </CustomWidthTooltip>
    )
}