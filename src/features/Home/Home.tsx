import { Box, createStyles, makeStyles } from '@material-ui/core';

export const Home = () => {
  const classes = useStyles();

  return <Box className={classes.root}>Home page</Box>;
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  }),
);
