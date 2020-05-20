import React, { Component } from 'react';
import clsx from 'clsx';
import {Link} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

class PaletteFormNav extends Component {
    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => 
            this.props.palettes.every(({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase())
        );
    }

    render() {
        const {classes, open, handleDrawerOpen, handleNewPaletteName, savePalette, newPaletteName} = this.props;

        return (
            <div className={clsx(classes.root)}>
                <CssBaseline />
                <AppBar color='default' position="fixed" className={clsx(classes.appBar, {[classes.appBarShift]: open,})}>
                <Toolbar>
                    <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" className={clsx(classes.menuButton, open && classes.hide)}>
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Create A Palette
                    </Typography>
                    
                </Toolbar>
                <div className={clsx(classes.navBtns)}>
                    <ValidatorForm onSubmit={savePalette}>
                    <TextValidator name={newPaletteName} 
                                    label="Palette Name" 
                                    value={newPaletteName}
                                    onChange={handleNewPaletteName}
                                    validators={['required', 'isPaletteNameUnique']}
                                    errorMessages={['Enter a palette name', 'Name already in use']}
                    />
                    <Button variant='contained' type='submit' color='secondary'>Save Palette</Button>
                    
                    </ValidatorForm>
                    <Link to='/'>
                        <Button variant='contained' color='secondary'>GO BACK</Button>
                    </Link>
                </div>
                </AppBar>
            </div>
        )
    }
}


export default PaletteFormNav;