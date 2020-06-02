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
    setOpen(1);
  };

  const handleEmojiOpen = () => {
      setOpen(2);
  }

  const handleClose = () => {
    setOpen(0);
  };

  const saveEmojiPalette = (emoji) => {
      const newPalette = {
          paletteName: newPaletteName,
          emoji: emoji.native
      };
        savePalette(newPalette);
        setOpen(0);
  }

  return (
    <div>
        <Dialog open={open===2} onClose={handleClose}>
          <DialogTitle id="form-dialog-title">Pick a Palette Emoji</DialogTitle>  
          <Picker title='Pick an emoji' onSelect={saveEmojiPalette}/>
        </Dialog>
      <Button styles={clsx(classes.formButton)} variant="contained" color="primary" onClick={handleClickOpen}>
        Save
      </Button>
      <Link to='/'>
        <Button className={clsx(classes.formButton)} variant='contained' color='secondary'>BACK</Button>
      </Link>
      <Dialog open={open===1} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={handleEmojiOpen}>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your new beautiful palette! Make sure it's unique!
          </DialogContentText>
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