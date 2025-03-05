import { Box, Container, CssBaseline, Typography } from "@mui/material";

import { useState } from "react"
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

import { useActivities } from "../../lib/hooks/useActivities";

function App() {
  // const [count, setCount] = useState(0)
  // const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  // useEffect(() => {
  //   axios.get<Activity[]>('https://localhost:5001/api/activities')
  //   .then(response => setActivities(response.data))

  //   return () => {}
  // }, [])  
          //[] (dependency array rỗng) có nghĩa là chỉ chạy một 
          // lần duy nhất khi component mount.

  const {activities, isPending} = useActivities();

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities!.find(x => x.id === id));
  }

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined)
  }

  const handleOpenForm = (id?: string) => {
    if (id) handleSelectActivity(id);
    else handleCancelSelectActivity();
    setEditMode(true);
  }

  const handleCloseForm = () => {
    setEditMode(false);
  }

  return (
    <Box sx={{bgcolor: '#eeeeee', minHeight: '100vh'}}>
      <CssBaseline></CssBaseline>
      <NavBar openForm={handleOpenForm}/>
      <Container maxWidth='xl' sx={{pt: 11}}>
        {!activities || isPending ? (
          <Typography>Loading...</Typography>
        ) : 
          <ActivityDashboard activities={activities} 
            selectActivity={handleSelectActivity}
            cancelSelectActivity={handleCancelSelectActivity}
            selectedActivity={selectedActivity}
            editMode={editMode}
            openForm={handleOpenForm}
            closeForm={handleCloseForm}
            />
        }
      </Container>
    </Box>
  )
}

export default App
