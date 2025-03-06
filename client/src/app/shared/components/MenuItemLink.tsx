import { MenuItem } from "@mui/material";
import { ReactNode } from "react";
import { NavLink } from "react-router";

export default function MenuItemLink(
    {children, to}: 
    {children: ReactNode, to: string}) {
  return (
    <MenuItem 
        component={NavLink}
        to={to}
        sx={{
            fontSize: '1.2rem', 
            textTransform: 'uppercase', 
            fontWeight: 'bold',
            color: 'inherit',
            //position: "relative", // Giúp định vị hiệu ứng underline
            transition: "all 0.3s ease-in-out",
            '&.active': {
                color: 'yellow',
                transform: "scale(1.1)",
                fontWeight: "bolder", // Tăng độ đậm chữ để nổi bật
                textShadow: "2px 2px 8px rgba(255, 255, 255, 0.8)", // Hiệu ứng phát sáng nhẹ
            },
            "&:hover": {
                //color: "#5FFFD6",
                transform: "scale(1.1)",
            },
        }}
    >
        {children}
    </MenuItem>
  )
}
