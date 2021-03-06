import React from 'react';
import {withStyles} from '@material-ui/styles';
import styles from "./styles/MiniPaletteStyles";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

function MiniPalette(props) {
    const {classes, paletteName, emoji, colors,id} = props;
    const miniColorBoxes = colors.map(color => (
        <div className={classes.miniColor} style={{backgroundColor:color.color}} key={color.name}></div>
    ));

    const deletePalette = (e) => {
        e.stopPropagation();
        props.openDialog(props.id);
    }

    return (
        <div className={classes.root} onClick={() => props.handleClick(id)}>
            <DeleteForeverIcon className={classes.deleteIcon}
                                onClick={deletePalette}
            />
            <div className={classes.colors}>
                {miniColorBoxes}
            </div>
        <h5 className={classes.title}>
        {paletteName} 
        <span className={classes.emoji}>
            {emoji}
        </span>
    </h5>
        </div>
    );
}

export default withStyles(styles)(MiniPalette); // higher order component