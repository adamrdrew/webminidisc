import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { pair } from '../redux/actions';

import { useShallowEqualSelector } from '../utils';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

import { AboutDialog } from './about-dialog';
import { TopMenu } from './topmenu';
import ChromeIconPath from '../images/chrome-icon.svg';
import { W95Welcome } from './win95/welcome';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
    main: {
        position: 'relative',
        flex: '1 1 auto',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        marginTop: theme.spacing(3),
        minWidth: 150,
    },
    spacing: {
        marginTop: theme.spacing(1),
    },
    spacing2: {
        marginTop: theme.spacing(2),
    },
    chromeLogo: {
        marginTop: theme.spacing(1),
        width: 96,
        height: 96,
    },
    why: {
        alignSelf: 'flex-start',
        marginTop: theme.spacing(3),
    },
    headBox: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    connectContainer: {
        flex: '1 1 auto',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },
    supportContainer: {
        flex: '1 1 auto',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

export const Welcome = (props: {}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { browserSupported, pairingFailed, pairingMessage, vintageMode } = useShallowEqualSelector(state => state.appState);
    if (pairingMessage.toLowerCase().match(/denied/)) {
        // show linux instructions
    }
    // Access denied.

    const [showWhyUnsupported, setWhyUnsupported] = useState(false);
    const handleLearnWhy = (event: React.SyntheticEvent) => {
        event.preventDefault();
        setWhyUnsupported(true);
    };

    if (vintageMode) {
        const p = {
            dispatch,
            pairingFailed,
            pairingMessage,
        };
        return <W95Welcome {...p}></W95Welcome>;
    }

    return (
        <React.Fragment>
            <Box className={classes.headBox}>
                <Typography component="h1" variant="h4">
                    Web MiniDisc
                </Typography>
                <TopMenu />
            </Box>
            <Typography component="h2" variant="body2">
                Brings NetMD Devices to the Web
            </Typography>
            <Box className={classes.main}>
                {browserSupported ? (
                    <React.Fragment>
                        <div className={classes.connectContainer}>
                            <Typography component="h2" variant="subtitle1" align="center" className={classes.spacing}>
                                Press the button to connect to a NetMD device
                            </Typography>

                            <Button variant="contained" color="primary" onClick={() => dispatch(pair())} className={classes.button}>
                                Connect
                            </Button>

                            <FormControl
                                error={true}
                                className={classes.spacing}
                                style={{ visibility: pairingFailed ? 'visible' : 'hidden' }}
                            >
                                <FormHelperText>{pairingMessage}</FormHelperText>
                            </FormControl>

                            <Alert severity="warning" className={classes.spacing2}>
                                Want an updated version of Web Minidisc? Try{' '}
                                <Link href="https://web.minidisc.wiki/">Web MiniDisc Pro.</Link>
                            </Alert>
                        </div>
                        <div>
                            <Typography component="h2" variant="subtitle1" align="center" className={classes.spacing}>
                                <Link
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    href="https://github.com/cybercase/webminidisc/wiki/Support-and-FAQ"
                                >
                                    <span style={{ verticalAlign: 'middle' }}>Support and FAQ</span>{' '}
                                    <OpenInNewIcon style={{ verticalAlign: 'middle' }} fontSize="inherit" />
                                </Link>
                            </Typography>
                        </div>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography component="h2" variant="subtitle1" align="center" className={classes.spacing}>
                            This Web browser is not supported.&nbsp;
                            <Link rel="noopener noreferrer" href="#" onClick={handleLearnWhy}>
                                Learn Why
                            </Link>
                        </Typography>

                        <Link rel="noopener noreferrer" target="_blank" href="https://www.google.com/chrome/">
                            <img alt="Chrome Logo" src={ChromeIconPath} className={classes.chromeLogo} />
                        </Link>

                        <Typography component="h2" variant="subtitle1" align="center" className={classes.spacing}>
                            Try using{' '}
                            <Link rel="noopener noreferrer" target="_blank" href="https://www.google.com/chrome/">
                                Chrome
                            </Link>{' '}
                            instead
                        </Typography>

                        {showWhyUnsupported ? (
                            <>
                                <Typography component="p" variant="body2" className={classes.why}>
                                    Web MiniDisc requires a browser that supports both{' '}
                                    <Link rel="noopener noreferrer" target="_blank" href="https://wicg.github.io/webusb/">
                                        WebUSB
                                    </Link>{' '}
                                    and{' '}
                                    <Link rel="noopener noreferrer" target="_blank" href="https://webassembly.org/">
                                        WebAssembly
                                    </Link>
                                    .
                                </Typography>
                                <ul>
                                    <li>WebUSB is needed to control the NetMD device via the USB connection to your computer.</li>
                                    <li>WebAssembly is used to convert the music to a MiniDisc compatible format</li>
                                </ul>
                            </>
                        ) : null}
                    </React.Fragment>
                )}
            </Box>
            <AboutDialog />
        </React.Fragment>
    );
};
