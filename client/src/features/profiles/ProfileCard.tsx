import { Person } from "@mui/icons-material";
import { Box, Card, CardContent, CardMedia, Chip, Divider, Typography } from "@mui/material";
import { Link } from "react-router";

type Props = {
    profile: Profile
}

export default function ProfileCard({profile}: Props) {
    const following = false;
    return (
        <Link to={`/profiles/${profile.id}`} style={{textDecoration: 'none'}}>
            <Card 
                sx={{
                    borderRadius: 3, 
                    p: 1, 
                    width: 300, 
                    textDecoration: 'none',
                    display: 'flex'}}
            >
                <CardMedia 
                    component='img' 
                    src={profile?.imageUrl || '/images/user.png'}
                    sx={{width: 100, height: 100, mr: 1}}
                    alt={profile.displayName + ' image'}
                />
                <Box sx={{flex: 1}}>
                    <CardContent
                        sx={{
                            p: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            height: 100 // Giữ nội dung cùng chiều cao với avatar
                        }}
                    >
                        {/* DisplayName + Following */}
                        <Box sx={{ flex: 6, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="h6" sx={{ flex: 1 }}>{profile.displayName}</Typography>
                            {following && (
                                <Chip
                                    size="small"
                                    label="Following"
                                    color="secondary"
                                    variant="outlined"
                                />
                            )}
                        </Box>

                        <Divider sx={{mb: 1}}/>

                        {/* Followers */}
                        <Box sx={{ flex: 5, display: 'flex', alignItems: 'center' }}>
                            <Person />
                            <Typography sx={{ ml: 1 }}>20 Followers</Typography>
                        </Box>
                    </CardContent>
                </Box>
            </Card>
        </Link>
    )
}
