import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { NavLink, useNavigate, useParams } from 'react-router';
import { useActivities } from '../../../lib/hooks/useActivities';

export default function ActivityDetail() {
  
  const navigate = useNavigate(); //auto route
  const {id} = useParams();
  const {activity, isLoadingActivity} = useActivities(id);

  // const {activities} = useActivities();

  if (isLoadingActivity) return <Typography>Loading...</Typography>

  if (!activity) return <Typography>Activity not found</Typography>

  return (
    <Card sx={{borderRadius: 3}}>
        <CardMedia component='img' src={`/public/images/categoryImages/${activity.category}.jpg`}>

        </CardMedia>
        <CardContent>
            <Typography variant='h5'>{activity.title}</Typography>
            <Typography variant='subtitle1' fontWeight='light'>{activity.date}</Typography>
            <Typography variant='body1'>{activity.description}</Typography>
        </CardContent>
        <CardActions>
            <Button component={NavLink} to={`/manage/${activity.id}`}
              color='primary'>Edit</Button>
            <Button color='inherit' onClick={() => navigate('/activities')}>Cancel</Button>
        </CardActions>
    </Card>
  )
}
