import React from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import useStyles from './styles/NewPaletteFormStyles';

function NewPaletteForm(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [currentColor, setCurrentColor] = React.useState('#ff6372');
    const [colors, setColors] = React.useState(props.palettes[0].colors);
    const [newName, setNewName] = React.useState('');
    const [newPaletteName, setNewPaletteName] = React.useState('');
    const {maxSize} = props;
    const paletteFull = colors.length >= maxSize;

    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    const updateColor = (newColor) => {
      setCurrentColor(newColor.hex);
    }

    const addNewColor = () => {
      const newColor = {color: currentColor, name: newName}
      setColors([...colors, newColor]);
      setNewName('');
    }

    const handleNewName = (evt) => {
      setNewName(evt.target.value);
    }

    const handleNewPaletteName = (evt) => {
      setNewPaletteName(evt.target.value);
    }

    const savePalette = (newPalette) => {
      const newPaletteResult = {paletteName: newPalette.paletteName,
                          id: newPalette.paletteName.toLowerCase().replace(/ /g, '-'),
                          colors: colors,
                          emoji: newPalette.emoji
      };
      newPalette.id = newPaletteName.toLowerCase().replace(/ /g, '-');
      newPalette.colors = colors;
      props.savePalette(newPaletteResult);
      props.history.push('/');
    }

    const removeColor = (colorName) => {
      setColors(colors.filter(color=>color.name !== colorName));
    }

    const onSortEnd = ({oldIndex, newIndex}) => {
      setColors(arrayMove(colors, oldIndex, newIndex));
    }

    const clearColors = () => {
      setColors([]);
    }

    const addRandomColor = () => {
      const allColors = props.palettes.map(p => p.colors).flat();
      const rand = Math.floor(Math.random() * allColors.length);
      const randomColor = allColors[rand];
      setColors([...colors, randomColor]);
    }
    return (
      <div className={classes.root}>
        <PaletteFormNav open={open} 
                        classes={classes} 
                        handleDrawerOpen={handleDrawerOpen} 
                        savePalette={savePalette} 
                        handleNewPaletteName={handleNewPaletteName} 
                        newPaletteName={newPaletteName}
                        palettes={props.palettes}
        />

        <Drawer className={classes.drawer} variant="persistent" anchor="left" open={open} classes={{ paper: classes.drawerPaper, }}>
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <div className={clsx(classes.container)}>
            <Typography variant="h4" gutterBottom>Design your Palette</Typography>
            <div className={clsx(classes.buttons)}>
              <Button className={clsx(classes.button)} variant='contained' color='secondary' onClick={clearColors}>Clear Palette</Button>
              <Button className={clsx(classes.button)} variant='contained' color='primary' onClick={addRandomColor} disabled={paletteFull}>Random Color</Button>
            </div>

            <ColorPickerForm paletteFull={paletteFull}
                              currentColor={currentColor}
                              updateColor={updateColor}
                              addNewColor={addNewColor}
                              newName={newName}
                              handleNewName={handleNewName}
                              colors={colors}
                              classes={classes}
            />
          </div>
          
        </Drawer>
        <main className={clsx(classes.content, {[classes.contentShift]: open,})}>
            <div className={classes.drawerHeader} />
            <DraggableColorList colors={colors} removeColor={removeColor} axis='xy' onSortEnd={onSortEnd} distance={10}/>
        </main>
    </div>
  );
}

export default NewPaletteForm;