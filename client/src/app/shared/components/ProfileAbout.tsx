import { useParams } from "react-router"
import { useProfile } from "../../../lib/hooks/useProfile";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useAccount } from "../../../lib/hooks/useAccount";


export default function ProfileAbout() {

    const {id} = useParams();
    const {profile} = useProfile(id);
    const {currentUser} = useAccount();
    console.log(profile)
  return (
    <Box>
        <Box display={'flex'} justifyContent={'space-between'}>
            <Typography variant="h5">About {profile?.displayName}</Typography>
            {(id === currentUser?.id) && 
                <Button>
                    Edit Profile
                </Button>          
            }
        </Box>
        <Divider sx={{my: 2}} />
        <Box sx={{overflow: 'auto', maxHeight: 350}}>
            <Typography variant="body1" sx={{whiteSpace: 'pre-wrap'}} >
                {profile?.bio || 'No description yet'}
            </Typography>
        </Box>
    </Box>
  )
}
