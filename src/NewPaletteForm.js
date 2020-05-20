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
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {ChromePicker} from 'react-color';
import { arrayMove } from 'react-sortable-hoc';
import PaletteFormNav from './PaletteFormNav';
// import { withStyles } from '@material-ui/styles';

const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
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
      ValidatorForm.addValidationRule('isColorNameUnique', value => 
        colors.every(({name}) => name.toLowerCase() !== value.toLowerCase())
      );
      ValidatorForm.addValidationRule('isColorUnique', (value) => 
        colors.every(({color}) => color !== currentColor)
      );
      ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => 
        props.palettes.every(({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase())
      );
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
        />
        {/* <CssBaseline />
        <AppBar color='default' position="fixed" className={clsx(classes.appBar, {[classes.appBarShift]: open,})}>
          <Toolbar>
            <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" className={clsx(classes.menuButton, open && classes.hide)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Persistent drawer
            </Typography>
            <ValidatorForm onSubmit={savePalette}>
              <TextValidator name={newPaletteName} 
                              label="Palette Name" 
                              value={newPaletteName}
                              onChange={handleNewPaletteName}
                              validators={['required', 'isPaletteNameUnique']}
                              errorMessages={['Enter a palette name', 'Name already in use']}
              />
              <Button variant='contained' type='submit' color='secondary'>Save Palette</Button>
              <Link to='/'>
                <Button variant='contained' color='secondary'>GO BACK</Button>
              </Link>
            </ValidatorForm>
          </Toolbar>
        </AppBar> */}

        <Drawer className={classes.drawer} variant="persistent" anchor="left" open={open} classes={{ paper: classes.drawerPaper, }}>
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <Typography variant="h4">Design your Palette</Typography>
          <div>
            <Button variant='contained' color='secondary' onClick={clearColors}>Clear Palette</Button>
            <Button variant='contained' color='primary' onClick={addRandomColor} disabled={paletteFull}>Random Color</Button>
          </div>
          <ChromePicker style={{justifyContent: 'center'}}color={currentColor} onChangeComplete={updateColor}/>

          <ValidatorForm onSubmit={addNewColor}>
            <TextValidator  value={newName} 
                            name="newName"
                            onChange={handleNewName}
                            validators={['required', 'isColorNameUnique', 'isColorUnique']}
                            errorMessages={['Enter a color name!', 'Color name must be unique!', 'Color already used!']}
            />
            <Button 
              variant='contained' 
              style={{backgroundColor: paletteFull ? '#CDCDCD' : currentColor}} 
              color='primary' 
              type='submit'
              disabled={paletteFull}
            >
              {paletteFull ? 'PALETTE FULL' : 'Add Color'}
            </Button>
          </ValidatorForm>
        </Drawer>
        <main className={clsx(classes.content, {[classes.contentShift]: open,})}>
            <div className={classes.drawerHeader} />
            <DraggableColorList colors={colors} removeColor={removeColor} axis='xy' onSortEnd={onSortEnd}/>
        </main>
    </div>
  );
}

export default NewPaletteForm;