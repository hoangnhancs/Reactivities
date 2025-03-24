import { Person } from "@mui/icons-material";
import { Box, Card, CardContent, CardMedia, Chip, Divider, keyframes, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

type Props = {
    profile: Profile
}

export default function ProfileCard({profile}: Props) {
    const marquee = keyframes`
  0% { transform: translateX(100%); }
  50% { transform: translateX(-100%); }
  50.1% { transform: translateX(100%); } 
  100% { transform: translateX(-100%); } 
`;
    const textRef = useRef<HTMLSpanElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isOverflow, setIsOverflow] = useState(false);
    const [animationDuaration, setAnimationDuaration] = useState(0);
    const following = false;



    useEffect(() => {
        const checkOverflow = () => {
            if (textRef.current && containerRef.current) {
                
                const textWidth = textRef.current.scrollWidth;
                const containerWidth = containerRef.current.clientWidth;
                setIsOverflow(textWidth > containerWidth);
                const animationTime = (textWidth + containerWidth) / 60;
                setAnimationDuaration(animationTime);
                console.log("scrollWidth:", textRef.current.scrollWidth, "clientWidth:", containerRef.current.clientWidth, "Animation duaration: ", animationDuaration);
            }
            else 
            {
                console.log("khong check")
            }
        }
        checkOverflow();
        window.addEventListener("resize", checkOverflow);
        return () => window.removeEventListener("resize", checkOverflow)
    }, [profile.bio, animationDuaration])
    console.log("Profile Bio:", profile.bio);
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
                            {profile.bio && (
                                <Box
                                    ref={containerRef}
                                    sx={{
                                        position: "relative",
                                        overflow: "hidden", // Không cho chữ chạy ra ngoài
                                        width: "100%",
                                        height: "1.5rem", // Giữ chiều cao của chữ
                                    }}
                                >          
                                    <Typography
                                        ref={textRef}
                                        sx={{
                                            display: "inline-block",
                                            whiteSpace: "nowrap",
                                            position: "absolute",
                                            //400px chạy trong 10s là vừa kịp nhìn 
                                            //vậy thì trước tiên tính tổng px/40
                                            animation: isOverflow ? `${marquee} ${animationDuaration}s linear infinite` : "none",
                                        }}
                                    >
                                        {profile.bio}
                                    </Typography>
                                </Box>
                            )}
                            
                            {following && (
                                <Chip
                                    size="small"
                                    label="Following"
                                    color="secondary"
                                    variant="outlined"
                                />
                            )}
                        </Box>

                        <Divider sx={{mb: 1, mt: 1}}/>

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
