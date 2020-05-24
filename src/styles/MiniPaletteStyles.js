export default {
    root: {
        backgroundColor: 'white',
        border: '1px solid black',
        borderRadius: '5px',
        padding: '0.5rem',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        '&:hover $deleteIcon': {
            opacity: 1
        },
        lineHeight: 1
    },
    colors: {
        backgroundColor: '#DAE1E4',
        height: '150px',
        width: '100%',
        borderRadius: '5px',
        overflow: 'hidden'
    },
    title: {
        display:'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '0',
        color: 'black',
        paddingTop: '0.5rem',
        fontSize: '1rem',
        position: 'relative'
    },
    emoji: {
        marginLeft: '0.5rem',
        fontSize: '1.5rem'
    },
    miniColor: {
        height: '25%',
        width: '20%',
        display: 'inline-block',
        margin: '0 auto',
        position: 'relative',
        marginBottom: '-3.5px',
    },
    delete: {

    },
    deleteIcon: {
        color: 'white',
        backgroundColor: '#eb3d30',
        height: '30px',
        width: '30px',
        position: 'absolute',
        right: '3px',
        top: '3px',
        padding: '3px',
        zIndex: 2,
        opacity: 0,
        borderRadius: '100%',
        transition: 'all 0.2s 0s ease-in'
    }
};