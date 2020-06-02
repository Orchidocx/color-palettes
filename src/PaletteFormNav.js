import React, { Component } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Create from '@material-ui/icons/Create';
import PaletteMetaForm from './PaletteMetaForm';
import {ValidatorForm} from 'react-material-ui-form-validator';

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
                    <Create />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Create Palette
                    </Typography>
                    
                </Toolbar>
                <div className={clsx(classes.navBtns)}>
                    <PaletteMetaForm classes={classes} newPaletteName={newPaletteName} handleNewPaletteName={handleNewPaletteName} savePalette={savePalette}/>
                </div>
                </AppBar>
                
                    
            </div>
        )
    }
}


export default PaletteFormNav;