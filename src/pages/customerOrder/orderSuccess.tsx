import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Slide,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { TransitionProps } from "@mui/material/transitions";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface OrderSuccessDialogProps {
  open: boolean;
  orderId: string;
}

const OrderSuccessDialog: React.FC<OrderSuccessDialogProps> = ({
  open,
  orderId,
}) => {
  const navigate = useNavigate();
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="order-success-title"
      aria-describedby="order-success-description"
    >
      <DialogTitle
        id="order-success-title"
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <CheckCircleOutlineIcon sx={{ color: "green", fontSize: 30 }} />
        <Typography variant="h6" fontWeight="bold">
          Order Placed Successfully!
        </Typography>
      </DialogTitle>
      <DialogTitle
        id="order-success-title"
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <Typography fontSize={12} fontWeight="bold">
          Order Id: {orderId}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" id="order-success-description">
          Thank you for your order. Our team will contact you soon for
          confirmation.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => navigate("/")}
          color="primary"
          variant="contained"
        >
          Go TO Home
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderSuccessDialog;
