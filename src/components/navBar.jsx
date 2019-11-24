import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TypoGraphy from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
class NavBar extends Component {
  state = {};
  render() {
    return (
      <div>
        <AppBar color="primary" position="static">
          <Toolbar>
            <TypoGraphy variant="title" color="inherit">
              <List component="nav">
                <ListItem component="div">
                  <ListItemText inset>
                    <TypoGraphy color="inherit" variant="title">
                      <NavLink to="/home">Home</NavLink>
                    </TypoGraphy>
                  </ListItemText>

                  <ListItemText inset>
                    <TypoGraphy color="inherit" variant="title">
                      <NavLink to="/host">Host</NavLink>
                    </TypoGraphy>
                  </ListItemText>

                  <ListItemText inset>
                    <TypoGraphy color="inherit" variant="title">
                      <NavLink to="/visitors">Visitors</NavLink>
                    </TypoGraphy>
                  </ListItemText>
                </ListItem>
              </List>
            </TypoGraphy>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default NavBar;
