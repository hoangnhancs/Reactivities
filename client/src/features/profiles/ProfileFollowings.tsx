import { useParams } from "react-router"
import { useProfile } from "../../lib/hooks/useProfile";
import { Box, Divider, Grid2, Typography } from "@mui/material";
import ProfileCard from "./ProfileCard";

type Props = {
    activeTab: number
}

export default function ProfileFollowings({activeTab}: Props) {
    const {id} = useParams()
    const predicate = activeTab === 3 ? 'followers' : 'followings';
    const {profile, followings, loadingFollowings} = useProfile(id, predicate)
    return (
        <Box  
            sx={{ 
                height: "450px",  // Giới hạn chiều cao của Box cha
                 // Ẩn nội dung tràn ra ngoài
                 overflow: "auto",
                display: "flex",
                flexDirection: "column"
            }}
        >
            <Box display={"flex"}>
                <Typography variant="h5">
                    {activeTab === 3 
                        ? `People following ${profile?.displayName}` 
                        : `People ${profile?.displayName} is following`}
                </Typography>
            </Box>
            <Divider sx={{my: 2}} />
            {loadingFollowings ? (
                <Typography>Loading...</Typography>
            ) : (
                <Grid2 
                container 
                spacing={3} 
                sx={{ 
                    overflowY: "auto", // Cho phép cuộn dọc
                    boxSizing: "border-box",
                    maxHeight: "100%",
                    pb: 1,
                    pt: 1,}}  
                >
                    {followings?.map(profile => 
                        (
                            <Grid2 key={profile.id}
                            >
                                <ProfileCard profile={profile} />
                            </Grid2>
                        )
                    )}
                </Grid2>
            )}
        </Box>
    )
}
