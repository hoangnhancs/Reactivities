import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"
import NavBar from "./NavBar";
import AcitivityDashboard from "../../features/activities/dashboard/AcitivityDashboard";

function App() {
  // const [count, setCount] = useState(0)
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/activities')
    .then(response => setActivities(response.data))

    return () => {}
  }, [])  //[] (dependency array rỗng) có nghĩa là chỉ chạy một 
          // lần duy nhất khi component mount.

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(x => x.id === id));
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
    <Box sx={{bgcolor: '#eeeeee'}}>
      <CssBaseline></CssBaseline>
      <NavBar openForm={handleOpenForm}/>
      <Container maxWidth='xl' sx={{pt: 11}}>
        <AcitivityDashboard activities={activities} 
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleCloseForm}/>
      </Container>
    </Box>
  )
}

export default App
