import React from "react";
import {Button, Box, Container} from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Container>
      <Box display="flex" flexDirection="column">
        <label style={{marginTop:"20px", fontSize:"27px"}}>What would you like to do today ?</label>
        <label style={{marginTop:"25px", fontSize:"15px"}} >Welcome to Airboxr. Let's start with the task you want to accomplish
        today.</label>
        <Link to="/source">
          <Button variant="outlined" color="error" style={{width: '100%', margin: '100px 0 0 0'}}>
            Import Data
          </Button>
        </Link>
        <Link to="/source">
          <Button variant="outlined" color="success" style={{width: '100%', margin: '12px 0'}}>
            Lookup Data
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
