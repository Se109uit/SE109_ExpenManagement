import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { de } from 'date-fns/locale';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const style = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export function BasicModal(props) {
    // const [openM, setOpenM] = useState(false);
    // const handleOpenM = () => setOpenM(true);
    // const handleCloseM = () => setOpenM(false);

    return (
      <div>
        <Modal
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {props.title}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {props.text}
            </Typography>
            <Typography>
                <div className='d-flex justify-content-between mt-3'>
                    <Button onClick={props.handleClose} color='error' variant="contained">{props.textBtnOut}</Button>
                    <Button onClick={props.handleConfirm} variant="contained">{props.textBtnOk}</Button>
                </div>
            </Typography>
          </Box>
        </Modal>
      </div>
    );
  }

  export default BasicModal;