import React from 'react';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import {Button} from "@mui/material";
import styles from './Navbar.module.css';

function Navbar(props) {
  return (
    <div className={styles.navContainer}>
      <HomeIcon onClick={() => window.location.href = '/'} />
      <Button variant="contained" color="success"><ChatIcon /> Chat</Button>
    </div>
  )
}

export default Navbar;