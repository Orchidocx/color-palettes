import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import PaletteIcon from '@material-ui/icons/Palette';
import {withStyles} from '@material-ui/styles';

import 'rc-slider/assets/index.css';
import styles from './styles/NavbarStyles';
// import './Navbar.css';


class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {format: "hex", open: false};
        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);

    }
    
    handleFormatChange(e) {
        this.setState({format: e.target.value, open:true});
        this.props.handleChange(e.target.value);
    }

    closeSnackbar() {
        this.setState(this.setState({open: false}));
    }
    render() {
        const {level, changeLevel, showingAllColors, classes} = this.props;
        const {format} = this.state;
        return (
            <header className={classes.Navbar}>
                <div className={classes.logo}>
                    
                    <Link to="/">palettes</Link>
                    
                </div>
                <div className={classes.xsLogo}>
                    <Link to='/'>
                    <PaletteIcon/>
                    </Link>
                </div>
                {showingAllColors && (
                <div>
                    <span>Level:{level}</span>
                    <div className={classes.slider}>
                        <Slider defaultValue={level} min={100} max={900} step={100} onAfterChange={changeLevel}/>
                    </div>
                </div>)
                }
                
                <div className={classes.selectContainer}>
                    <Select value={format} onChange={this.handleFormatChange}>
                        <MenuItem value="hex">HEX - #ffffff</MenuItem>
                        <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
                        <MenuItem value="rgba">RGBA - rgba(255,255,255,1)</MenuItem>
                    </Select>
                </div>
                <Snackbar anchorOrigin={{vertical: "bottom", horizontal: "left"}} open={this.state.open} autoHideDuration={3000}
                message={<span id="message-id">Format Changed to {format.toUpperCase()}</span>}
                ContentProps={{"aria-describedby":"message-id"}}
                onClose={this.closeSnackbar}
                action={[
                    <IconButton>
                        <CloseIcon onClick={this.closeSnackbar} color="inherit" key="close" aria-label="close"/>
                    </IconButton>
                ]}
                />
            </header>
        )
    }
}

export default withStyles(styles)(Navbar);