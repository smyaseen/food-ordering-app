import React from 'react';

import { Drawer, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function SideMenu() {
  // const drawerWidth = 300;
  const useStyles = makeStyles(() => ({
    drawer: {
      // position: 'relative',
      // width: '100%',
      // height: '100%',
      // flexShrink: 0,
      // top: 0,
      // bottom: 0,
      overflow: 'hidden',
    },
    drawerPaper: {
      position: 'relative',
      height: '100vh',
      backgroundColor: '#F0F0F0',
    },

    logo: {
      textAlign: 'center',
      marginTop: '30px',
    },
    logoNisum: {
      color: '#e91e63',
      fontWeight: '600',
    },
    navigation: {
      marginTop: '100px',
      padding: '0 50px',
    },
    list: {
      fontSize: '22px',
      paddingBottom: '40px',
    },
  }));
  const classes = useStyles();
  const { drawer, drawerPaper, logo, logoNisum, navigation, list } = classes;
  return (
    <div style={{ width: '100%' }}>
      <Drawer
        anchor="left"
        classes={{
          paper: drawerPaper,
        }}
        className={drawer}
        variant="permanent"
      >
        <div className={logo}>
          <Typography variant="h2">
            <span className={logoNisum}>Nisum Foods</span>
          </Typography>
        </div>
        <div className={navigation} style={{ position: 'relative', wordWrap: 'break-word' }}>
          <p className={list}>Dashboard</p>
          <p className={list}>Menu</p>
          <p className={list}>Dining Areas</p>
        </div>
      </Drawer>
    </div>
  );
}

export default SideMenu;
