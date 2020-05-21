import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import clsx from 'clsx';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Link} from 'react-router-dom';
import 'emoji-mart/css/emoji-mart.css';
import {Picker} from 'emoji-mart';


export default function PaletteMetaForm(props) {
  const [open, setOpen] = React.useState(false);
  const {savePalette, newPaletteName, handleNewPaletteName,classes} = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button className={clsx(classes.formButton)} variant="contained" color="primary" onClick={handleClickOpen}>
        Save
      </Button>
      <Link to='/'>
        <Button variant='contained' color='secondary'>GO BACK</Button>
      </Link>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={savePalette}>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your new beautiful palette! Make sure it's unique!
          </DialogContentText>

          <Picker/>

          
            <TextValidator name={newPaletteName} 
                            label="Palette Name" 
                            value={newPaletteName}
                            onChange={handleNewPaletteName}
                            fullWidth
                            margin='normal'
                            validators={['required', 'isPaletteNameUnique']}
                            errorMessages={['Enter a palette name', 'Name already in use']}
            />
            
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button variant='contained' type='submit' color='secondary'>Save Palette</Button>    
        </DialogActions>
        
        </ValidatorForm>
      </Dialog>
    </div>
  );
}