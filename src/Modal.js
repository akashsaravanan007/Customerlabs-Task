import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Modal from "@mui/material/Modal";
import Task from "./Task.js";
import { Toolbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1500,
  height: 650,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <AppBar position="absolute">
        <Toolbar></Toolbar>
      </AppBar>
      <Button
        onClick={handleOpen}
        variant="contained"
        style={{ marginTop: "20%" }}
      >
        Save segment
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Task />
          <Button
            onClick={handleClose}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "transparent",
            }}
          >
            <CloseIcon />
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
