import { Box, Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import { TransformationDescriptionTable } from '../TransformationDescriptionTable/TransformationDescriptionTable';
import { SituationDescriptionTable } from '../SituationDescriptionTable/SituationDescriptionTable';
import CachedIcon from '@material-ui/icons/Cached';
import { useNavigate } from 'react-router-dom';

export const HomeContainer = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleProcessButton = () => {
    navigate('/process');
  };

  return (
    <Box className={classes.root}>
      <Box>
        <Box className={classes.content}>
          <SituationDescriptionTable />
          <TransformationDescriptionTable />
        </Box>
        <Box className={classes.processButton}>
          <Button
            variant='contained'
            size='medium'
            color='primary'
            endIcon={<CachedIcon />}
            onClick={handleProcessButton}
          >
            Process
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(25),
    },
    content: {
      width: '1440px',
      display: 'flex',
      gap: '40px',
      marginBottom: theme.spacing(10),
    },
    processButton: {
      display: 'flex',
      justifyContent: 'center',
    },
  }),
);
