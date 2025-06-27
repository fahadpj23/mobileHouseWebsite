import { toast } from "react-toastify";

export const showToast = () => {
  toast.success("added successfully ", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
