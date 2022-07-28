import { Button, createStyles, makeStyles } from '@material-ui/core';

interface PrimaryContainedButtonProps {
  text: string;
  onClick: (event?: any) => void;
}

export const PrimaryContainedButton = ({ text, onClick }: PrimaryContainedButtonProps) => {
  const classes = useStyles();

  return (
    <Button classes={{ root: classes.root }} variant='contained' color='primary' onClick={onClick} size='small'>
      {text}
    </Button>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '30px',
    },
  }),
);
