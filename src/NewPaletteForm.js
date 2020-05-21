import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
// import { withStyles } from '@material-ui/styles';

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '64px',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  navBtns: {},
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    display: 'flex',
    alignItems: 'center'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    height: 'calc(100vh - 64px)',
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  container: {
    width:'90%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  buttons: {
    width: '100%'
  },
  button: {
    width: '50%'
  },
  picker: {
    width: '100% !important',
    marginTop: '2rem'
  },
  addColor: {
    width: '100%',
    padding: '1rem',
    marginTop: '1rem',
    fontSize: '2rem'
  },
  colorNameInput: {
    width: '100%',
    height: '70px'
  }
}));

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
    React.useEffect(() => {
  
    });

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

    const savePalette = () => {
      let newName = newPaletteName;
      const newPalette = {paletteName: newName, id: newName.toLowerCase().replace(/ /g, '-'), colors: colors};
      props.savePalette(newPalette);
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
      //pick random color by existing palettes;
      // need to check whether or not it exists in current palette ****
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
            <DraggableColorList colors={colors} removeColor={removeColor} axis='xy' onSortEnd={onSortEnd}/>
        </main>
    </div>
  );
}

export default NewPaletteForm;