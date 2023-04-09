import { useAppDispatch } from "@hooks/useAppDispatch";
import { useAppSelector } from "@hooks/useAppSelector";
import { Box, Modal } from "@mui/material";
import { changeProfileModalState } from "@slice/appSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  borderRadius: "10px",
};

interface IModalProps {
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export const ModalBox = (props: IModalProps) => {
  const { children } = props;
  const { profileModalOpen } = useAppSelector((state) => state.appData);
  const dispatch = useAppDispatch();

  const handleClose = () => dispatch(changeProfileModalState(false));

  return (
    <div>
      <Modal
        keepMounted
        open={profileModalOpen}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
};
