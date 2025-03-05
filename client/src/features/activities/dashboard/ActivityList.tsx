import { Box } from '@mui/material'
import ActivityCard from './ActivityCard'
// import React from 'react'
// import React from 'react'

type Props = {
    activities : Activity[]
    selectActivity: (id: string) => void
    editMode: boolean
    closeForm: () => void
}

export default function ActivityList({activities, selectActivity, 
  editMode,
  closeForm} : Props) {
  return (
    <Box sx={{display:'flex', flexDirection:'column', gap:3}}>
        {activities.map(activity => (
            <ActivityCard key={activity.id} activity={activity}
             selectActivity={selectActivity} editMode={editMode}
             closeForm={closeForm}/>
        ))}
    </Box>
  )
}
