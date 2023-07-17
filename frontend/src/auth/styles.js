const styles = theme => {
    console.log('theme', theme);
    return {
        main: {
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            margin: '0 auto',
            justifyContent: 'center',
            flexWrap: 'wrap',
            alignContent: 'center',
            [theme.breakpoints.up('751')]: {
                marginLeft: theme.spacing.unit * 3,
                marginRight: theme.spacing.unit * 3,
            },
        },
        paper: {
            display: 'flex',
            width: 600,
            flexDirection: 'column',
            alignItems: 'center',
            [theme.breakpoints.down('751')]: {
                width: '100%',
                boxShadow: 'none',
            },
        },
        avatar: {
            margin: theme.spacing.unit,
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(),
        },
        submit: {
            marginTop: theme.spacing(2),
        },
    }
};

export default styles;
