import { SyntheticEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";
import { Box, Card, CardContent, CardMedia, Grid2, Tab, Tabs, Typography } from "@mui/material";
import { useActivities } from "../../lib/hooks/useActivities";
import { format } from "date-fns";

export default function ProfileActivities() {
    const [valueTab, setValueTab] = useState(0);
    const {id} = useParams();
    const {userActivities, loadingUserActivities, setFilter} = useProfile(id);
    useEffect(() => {
        setFilter('future')
        }, [setFilter]
    )
    const tabContent = [
        {label: "Future Events", key: "future" },
        {label: "Past Events", key: "past" },
        {label: "Hosting", key: "hosting" },
    ]
    const handleTabChange = (_: SyntheticEvent, newValue: number) => {
        setValueTab(newValue);
        setFilter(tabContent[newValue].key);
    };
    return (
        <Box
            sx={{ 
                height: "450px",  // Giới hạn chiều cao của Box cha
                 // Ẩn nội dung tràn ra ngoài
                 overflowY: "auto",
                display: "flex",
                flexDirection: "column"
            }}
        >
            <Grid2 container spacing={2}>
                <Grid2 size={12}>
                    <Tabs
                        value={valueTab}
                        onChange={handleTabChange}
                    >
                        {tabContent.map((tab, index) => (
                            <Tab label={tab.label} key={index} />
                        ))}
                    </Tabs>
                </Grid2>
            </Grid2>
            {(!useActivities || userActivities?.length === 0) && !loadingUserActivities ? (
                <Typography>No activities found</Typography>
            ) : null}
            <Grid2
                container
                spacing={2}
                sx={{ marginTop: 2, height: "450px", overflow: 'auto' }}
            >
                {userActivities && userActivities.map((activity: Activity) => (
                    <Grid2 key={activity.id}  gap={2} mb={2}>
                        <Link  
                            to={`/activities/${activity.id}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <Card 
                                elevation={4}
                                sx={{width: "350px", height: '250px'}}
                            >
                                <CardMedia
                                    component="img"
                                    width="350px"
                                    alt={activity.title}
                                    sx={{ objectFit: 'cover' }}
                                    image={`/images/categoryImages/${activity.category}.jpg`}
                                />
                                <CardContent>
                                    <Typography variant="h6" textAlign="center" mb={1}>
                                        {activity.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        textAlign="center"
                                        display='flex'
                                        flexDirection='column'
                                    >
                                        <span>
                                            {format(activity.date, 'do LLL yyyy')}
                                        </span>
                                        <span>{format(activity.date, 'h:mm a')}</span>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid2>  
                ))}        
            </Grid2>
        </Box>
    )
}
