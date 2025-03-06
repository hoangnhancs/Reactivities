import { Box, Container, CssBaseline } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet } from "react-router";

function App() {

  

  return (
    <Box sx={{bgcolor: '#eeeeee', minHeight: '100vh'}}>
      <CssBaseline></CssBaseline>
      <NavBar />
      <Container maxWidth='xl' sx={{pt: 11}}>
        <Outlet/>
      </Container>
    </Box>
  )
}

export default App
