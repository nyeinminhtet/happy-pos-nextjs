import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import React from "react";

interface Props {
  title: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  deleteFun: () => void;
}

const DeleteDialog = ({ open, setOpen, title, deleteFun }: Props) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ fontWeight: 700, fontFamily: "monospace" }}>
        Are You Sure You Want to delete this {title}?
      </DialogTitle>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancle</Button>
        <Button
          onClick={deleteFun}
          sx={{
            ":hover": { bgcolor: "#E21818", color: "white" },
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
