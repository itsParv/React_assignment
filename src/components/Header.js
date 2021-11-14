import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from './Navbar.module.css';


function Header(props) {
  const {text} = props;
  return (
    <div className={styles.headerContainer}>
      <div onClick={() => window.history.back()}><ArrowBackIcon /></div>
      <h1 className={styles.heading}>Select {text}.</h1>
    </div>
  )
}

export default Header;
