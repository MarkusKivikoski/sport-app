import React, { useState } from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AppBar from "@material-ui/core/AppBar";
import { Link } from "react-router-dom";

export default function TopNav() {
  const appBarStyle = {
    top: "auto",
    bottom: 0
  };
  const [value, setValue] = useState(0);

  return (
    <AppBar position="fixed" style={appBarStyle}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
      >
        <BottomNavigationAction
          to="/customers"
          component={Link}
          label="Customer List"
        />
        <BottomNavigationAction
          to="/trainings"
          component={Link}
          label="Training List"
        />
        <BottomNavigationAction
          to="/calendar"
          component={Link}
          label="Calendar"
        />
      </BottomNavigation>
    </AppBar>
  );
}
