import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from '@mui/material'
import { useActivities } from '../../../lib/hooks/useActivities'
// import React from 'react'

type Props = {
    activity: Activity
    selectActivity: (id: string) => void
    editMode: boolean
    closeForm: () => void
    cancelSelectActivity: () => void
}


export default function ActivityCard({activity, 
  selectActivity, 
  closeForm, 
  cancelSelectActivity} : Props) {
  
  const {deleteActivity} = useActivities();

  const handleDeleteActivity = async () => {
    await deleteActivity.mutateAsync(activity.id);
    closeForm();
    cancelSelectActivity();
  }

  return (
    <Card sx={{borderRadius: 3}}>
        <CardContent>
            <Typography variant='h5'>{activity.title}</Typography>
            <Typography sx={{color: 'text.secondary', md: 1}}>{activity.date}</Typography>
            <Typography variant='body2'>{activity.description}</Typography>
            <Typography variant='subtitle1'>{activity.city} / {activity.venue}</Typography>
        </CardContent>
        <CardActions sx={{display: 'flex', justifyContent: 'space-between', pb: 2}}>
            <Chip label={activity.category} variant='outlined'></Chip>
            <Box display='flex' gap={1}>
              <Button onClick={() => {selectActivity(activity.id); closeForm();}} size='medium' variant='contained'>View</Button>
              <Button 
                onClick={handleDeleteActivity} 
                disabled={deleteActivity.isPending}
                size='medium' 
                variant='contained' 
                color='error'>
              Delete</Button>
            </Box>
        </CardActions>
    </Card>
  )
}

