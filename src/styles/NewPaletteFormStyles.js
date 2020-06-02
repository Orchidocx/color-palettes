import { makeStyles } from '@material-ui/core/styles';
import sizes from './sizes';
const drawerWidth = 378;

export default makeStyles((theme) => ({
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
      alignItems: 'center'
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
    navBtns: {
      margin: '0px 25px',
      "& a": {
        textDecoration: 'none'
      },
      [sizes.down('xs')]: {
        marginRight: '0'
      },
      "& button": {
        margin: '0 0.5rem',
        [sizes.down('xs')]: {
          margin: '0 0.1rem',
          padding: '0',
        }
      }
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
      display: 'flex',
      alignItems: 'center'
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
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
      width: '50%',
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
    },
    formButton: {
      margin: '0rem 1.5rem'
      
    }
  }));