import { Alert, IconButton } from "@mui/material";
import { FC } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface IAlertprops {
  closeIsAdded: () => void;
}

const AddedAlert: FC<IAlertprops> = ({ closeIsAdded }) => {
  return (
    <Alert
      severity="success"
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={closeIsAdded}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
    >
      Currency added to converter
    </Alert>
  );
};

export default AddedAlert;
