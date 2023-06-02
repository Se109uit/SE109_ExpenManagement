import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { de } from 'date-fns/locale';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {TextField} from '@mui/material';

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

export function InputModal(props) {
    // const [openI, setOpenI] = useState(false);
    // const handleOpenI = () => setOpenI(true);
    // const handleCloseI = () => setOpenI(false);
    // const [valueTF, setValueTF] = React.useState('');
    // const handleChangeTF = (event) => {
    //     setValueTF(event.target.value);
    // };

    return (
      <>
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
            {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}> */}
                <Box className='d-flex justify-content-center mt-3'>
                    <TextField
                    error={props.errorTF}
                    id="outlined-basic"
                    label={props.text}
                    variant="standard"
                    onChange={props.handleChangeTF}
                    value={props.valueTF}
                    placeholder='100.000'
                    required
                    />
                    <Box className='p-1'></Box>
                    <Box className="d-flex align-items-end pl-2" sx={{fontWeight: 'Bold', fontSize: '1.2rem'}}>
                        VND
                    </Box>
                </Box>
            {/* </Typography> */}
            {/* <Typography> */}
                <Box className='d-flex justify-content-center mt-3'>
                    <Button onClick={props.handleConfirm} variant="contained">{props.textBtnOk}</Button>
                </Box>
            {/* </Typography> */}
          </Box>
        </Modal>
      </>
    );
  }

  export default InputModal;