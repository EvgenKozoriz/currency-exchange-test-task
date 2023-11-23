import { Input, Button, Box, Modal } from "@mui/material";
import { FC } from "react";

interface IModalComponentProps {
  isOpen: boolean;
  inputValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => void;
  saveDisabled: boolean;
  handleClose: () => void;
}
const ModalComponent: FC<IModalComponentProps> = ({
  isOpen,
  inputValue,
  handleInputChange,
  handleSave,
  saveDisabled,
  handleClose,
}) => {
  return (
    <Modal open={isOpen}>
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "1px solid #000",
          boxShadow: 14,
          p: 4,
        }}
      >
        <Input value={inputValue} onChange={handleInputChange} type="number" />
        <Button onClick={handleSave} disabled={saveDisabled}>
          Save
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
      </Box>
    </Modal>
  );
};

export default ModalComponent;
