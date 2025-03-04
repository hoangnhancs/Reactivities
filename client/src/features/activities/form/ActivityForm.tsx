import { Box, Button, Paper, TextField, Typography } from '@mui/material'
// import React from 'react'

type Props = {
    closeForm: () => void
    activity?: Activity
}

export default function ActivityForm({closeForm, activity}: Props) {
  return (
    <Paper sx={{borderRadius: 3, padding: 3}}>
        <Typography variant='h5' gutterBottom color='primary'>
            Create Activity
        </Typography>
        <Box component='form' display='flex' flexDirection='column' gap={3}>
            <TextField label='Title' value={activity?.title}/>
            <TextField label='Description' value={activity?.description} multiline rows={3}/>
            <TextField label='Category' value={activity?.category}/>
            <TextField label='Date' type='date' value={activity?.date}/>
            <TextField label='City' value={activity?.city}/>
            <TextField label='Venue' value={activity?.venue}/>
            <Box display='flex' justifyContent='end' gap={3}>
                <Button color='inherit' onClick={closeForm}> Cancel</Button>
                <Button color='success' variant='contained'> Submit</Button>
            </Box>
        </Box>
    </Paper>
  )
}
