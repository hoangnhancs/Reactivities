import { Button, ButtonProps } from "@mui/material";
import { LinkProps } from "react-router";

// import { styled } from "@mui/material";

type StyledButtonProps = ButtonProps & Partial<LinkProps>

// const StyledButton = styled(Button)<StyledButtonProps>(({theme}) => ({
//     '&.Mui-disable': {
//         backgroundColor: theme.palette.grey[600],
//         color: theme.palette.text.disabled
//     }
// }))

// export default StyledButton



export default function StyledButton(props: StyledButtonProps) {
  return (
    <Button
      {...props} 
      sx={(theme) => ({
        "&.Mui-disabled": {
          backgroundColor: theme.palette.grey[600],
          color: theme.palette.text.disabled,
        },
      })}
    />
  );
}

