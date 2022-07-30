import { Box, Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { SituationDescriptionTable } from '../SituationDescriptionTable/SituationDescriptionTable';
import { TransformationDescriptionTable } from '../TransformationDescriptionTable/TransformationDescriptionTable';

export const ProcessContainer = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate('/');
  };

  return (
    <Box className={classes.root}>
      <Box>
        <Box className={classes.content}>
          <SituationDescriptionTable />
          <TransformationDescriptionTable />
        </Box>
        <Box>
          <Button
            variant='contained'
            size='medium'
            color='primary'
            startIcon={<ArrowBackIcon />}
            onClick={handleBackButton}
          >
            Go Back
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
    backButton: {
      display: 'flex',
      justifyContent: 'center',
    },
  }),
);
