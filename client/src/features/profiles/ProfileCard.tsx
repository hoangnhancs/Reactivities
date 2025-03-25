import { Person } from "@mui/icons-material";
import { Box, Card, CardContent, CardMedia, Chip, Divider, Typography } from "@mui/material";

import { Link } from "react-router";
import { motion } from "framer-motion";

type Props = {
    profile: Profile
}

export default function ProfileCard({profile}: Props) {
 
    console.log("Profile Bio:", profile?.bio);
    return (
        <Link to={`/profiles/${profile?.id}`} style={{textDecoration: 'none'}}>
            <Card 
                sx={{
                    borderRadius: 3, 
                    p: 1, 
                    width: 350, 
                    textDecoration: 'none',
                    display: 'flex'}}
            >
                <CardMedia 
                    component='img' 
                    src={profile?.imageUrl || '/images/user.png'}
                    sx={{width: 120, height: 120, mr: 1}}
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
                        <Box 
                            
                            sx=
                            {{ 
                                flex: 6, 
                                display: 'flex', 
                                flexDirection: 'column' , 
                                alignItems: 'left', 
                                gap: 0.1,
                                // overflow: "hidden",
                            }}
                        >
                            <Typography variant="h6" sx={{ flex: 1 }}>{profile.displayName}</Typography>
                           
                            <Box
                                
                                sx={{
                                    position: "relative",
                                    overflow: "hidden", // Không cho chữ chạy ra ngoài
                                    width: "100%",
                                    height: "1.5rem", // Giữ chiều cao của chữ
                                }}
                            >   
                                {profile.bio && (
                                    <Typography
                                    variant="body2"
                                    component={motion.div}
                                    initial={{ x: "50%" }}
                                    animate={{ x: "-100%" }}
                                    transition={{ 
                                        repeat: Infinity, 
                                        duration: profile.bio.length / 8, // Điều chỉnh tốc độ dựa vào độ dài text
                                        ease: "linear" 
                                    }}
                                    sx={{
                                        display: "inline-block",
                                        whiteSpace: "nowrap",
                                        position: "absolute",                                    
                                    }}
                                >
                                    {profile.bio ? profile.bio : ''}
                                </Typography>
                                )}        
                            </Box>                            
                            {profile.following && (
                                <Chip
                                    size="small"
                                    label="Following"
                                    color="secondary"
                                    variant="outlined"
                                    sx={{minHeight: 25}}
                                />
                            )}
                        </Box>

                        <Divider sx={{mb: 1, mt: 1}}/>

                        {/* Followers */}
                        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', maxHeight:25 }}>
                            <Person />
                            <Typography sx={{ ml: 1 }}>{profile?.followersCount} Followers</Typography>
                        </Box>
                    </CardContent>
                </Box>
            </Card>
        </Link>
    )
}
