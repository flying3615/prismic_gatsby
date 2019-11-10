import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'gatsby'
import styled from '@emotion/styled'
import Search from './search'
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.background,
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  AppBar: {
    background: theme.background
  }
}));




export default function Header() {

  const classes = useStyles();

  return (
    <AppBar position="sticky" className={classes.AppBar}>
      <Toolbar>
        <Typography variant="h5" className={classes.title}>
          <Link to="/" aria-label="Back to Home">
            Frontend Developer
          </Link>
        </Typography>

        <Search collapse hitsAsGrid/>
      </Toolbar>
    </AppBar>
  )

}
