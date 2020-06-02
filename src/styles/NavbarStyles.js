import sizes from './sizes';
export default {
    Navbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '6vh',
    },
    
    logo: {
        marginRight: '15px',
        padding: '0 13px',
        fontSize: '22px',
        backgroundColor: '#ECEFF1',
        fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        "& a": {
            textDecoration: 'none',
            color: 'black'
        },
        [sizes.down('xs')]: {
            display: 'none'
        }
    },


    xsLogo: {
        marginRight: '15px',
        padding: '0 13px',
        backgroundColor: '#ECEFF1',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'none',
       top: '10px',
       "& a": {
        textDecoration: 'none',
        color: 'black',
        fontSize: '2rem'
        },
       [sizes.down('xs')]: {
        display: 'inline-block'
    }
    },
    
    slider: {
        width: '340px',
        margin: '0 10px',
        display: 'inline-block',
        "& .rc-slider-rail": {
            height: '8px'
        },
        "& .rc-slider-track": {
            backgroundColor: 'transparent'
        },
        "& .rc-slider-handle, .rc-slider-handle:hover, .rc-slider-handle:active, .rc-slider-handle:focus": {
            backgroundColor: 'green',
            outline: 'none',
            border: '2px solid green',
            boxShadow: 'none',
            width: '13px',
            height: '13px',
            marginLeft: '-7px',
            marginTop: '-3px',
        },
        [sizes.down('xs')]: {
            width: '100px'
        }
    },
    selectContainer: {
        marginLeft: 'auto',
        marginRight: '1rem'
    }
    
};