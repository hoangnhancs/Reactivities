import { Person } from "@mui/icons-material";
import { Box, Button, Card, CardContent, CardMedia, Chip, Divider, Typography } from "@mui/material";
import { Link, useParams } from "react-router";
import { motion } from "framer-motion";
import { useAccount } from "../../lib/hooks/useAccount";
import { useProfile } from "../../lib/hooks/useProfile";
import { useMutation, useQueryClient } from "@tanstack/react-query";



type Props = {
    profile: Profile
}

export default function ProfileCard({profile}: Props) {
    
    const queryClient = useQueryClient();
    const {id} = useParams() //profile dang xem
    const {currentUser} = useAccount() //user dang login
    const {updateFollowing} = useProfile(profile.id) //update card minh click
    const handleUpdateFollowing =  useMutation({
        mutationFn: async () => {
            return updateFollowing.mutateAsync() //update card minh click
        },
        onSuccess: async () => {
            
            await queryClient.setQueryData(["followings", id, "followers"], (oldData: Profile[] | undefined) => {
                if (oldData)
                    return oldData.map((user) => //update followers list cua profile dang xem
                        user.id === profile.id ? { ...profile, //neu la card minh click thi moi update
                        following: !user.following,
                        followersCount: user.following 
                            ? (user.followersCount && user.followersCount - 1)
                            : (user.followersCount && user.followersCount + 1) } : user
                    );
            });
            await queryClient.setQueryData(["followings", id, "followings"], (oldData: Profile[] | undefined) => {
                
                if (oldData)
                    return oldData.map((user) =>
                        user.id === profile.id ? { ...profile,
                        following: !user.following,
                        followersCount: user.following 
                            ? (user.followersCount && user.followersCount - 1)
                            : (user.followersCount && user.followersCount + 1) } : user
                );
            });

            await queryClient.setQueryData(["profile", currentUser?.id], (oldData: Profile | undefined) => {
                if (oldData) 
                    return {
                        ...oldData,
                        followingCount: profile.following 
                            ? (oldData.followingCount && oldData.followingCount - 1)
                            : (oldData.followingCount && oldData.followingCount + 1)
                    }
            });
            await queryClient.refetchQueries({ queryKey: ["followings", id, "followers"] });
            await queryClient.refetchQueries({ queryKey: ["followings", id, "followings"] }); 
        },
    });
    
    return (

        <Card 
            sx={{
                borderRadius: 3, 
                p: 1, 
                width: 350, 
                textDecoration: 'none',
                display: 'flex'}}
        >
            <Link to={`/profiles/${profile?.id}`} style={{textDecoration: 'none'}}>
                <CardMedia 
                    component='img' 
                    src={profile?.imageUrl || '/images/user.png'}
                    sx={{width: 120, height: 120, mr: 1}}
                    alt={profile.displayName + ' image'}
                />
            </Link>
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
                        
                        sx={{ 
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
                        {(currentUser?.id != profile.id) ? 
                            (profile.following ? 
                                (
                                    <Box 
                                        display={'flex'} 
                                        alignItems={'center'} 
                                        gap={1}>
                                        <Chip
                                        size="small"
                                        label="Following"
                                        color="secondary"
                                        variant="outlined"
                                        sx={{height: 25, width: 100, borderRadius: 6}}
                                        />
                                        <Button 
                                            onClick={
                                                () => handleUpdateFollowing.mutate()
                                            }
                                            sx =
                                            {{
                                                p: 0, 
                                                height: 25, 
                                                width: 100,
                                                borderRadius: 6, 
                                                backgroundColor: "#007BFF",
                                                color: "white",
                                                display: "flex",
                                                alignItems: 'center',
                                                justifyContent: "center",
                                                textTransform: "none", 
                                                "&:hover": { backgroundColor: "#0056b3" }
                                                
                                            }}
                                            disabled={updateFollowing.isPending}
                                        >
                                            Unfollow
                                        </Button>
                                    </Box>          
                                ) : (
                                    <Button 
                                        onClick={
                                            () => handleUpdateFollowing.mutate()
                                        }
                                        sx =
                                        {{
                                            p: 0, 
                                            height: 25, 
                                            borderRadius: 6, 
                                            backgroundColor: "#007BFF",
                                            color: "white",
                                            display: "flex",
                                            alignItems: 'center',
                                            justifyContent: "center",
                                            textTransform: "none", 
                                            "&:hover": { backgroundColor: "#0056b3" }
                                        }}
                                        disabled={updateFollowing.isPending}
                                    >
                                        Follow
                                    </Button>
                                )
                            ) : (
                                <Typography>Your profile</Typography>
                            )
                        }
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
    )
}
