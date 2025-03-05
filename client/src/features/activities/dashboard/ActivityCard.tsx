import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from '@mui/material'
// import React from 'react'

type Props = {
    activity: Activity
    selectActivity: (id: string) => void
    editMode: boolean
    closeForm: () => void
    deleteActivity: (id: string) => void
    cancelSelectActivity: () => void
}


export default function ActivityCard({activity, 
  selectActivity, 
  closeForm,
  deleteActivity, 
  cancelSelectActivity} : Props) {
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
              <Button onClick={() => {deleteActivity(activity.id); closeForm(); cancelSelectActivity();}} size='medium' variant='contained' color='error'>Delete</Button>
            </Box>
        </CardActions>
    </Card>
  )
}
