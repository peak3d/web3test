import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { colors } from '../../theme';

import {
  TOKEN_CONTRACT,
  CONNECTION_CHANGED,
  //FILTER_BURNED
} from '../../stores/constants';

import Store from '../../stores';
const emitter = Store.emitter;
//const dispatcher = Store.dispatcher

const styles = (theme) => ({
  root: {
    verticalAlign: 'top',
    width: '100%',
    display: 'flex',
    border: '1px solid #e1e3e6',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  headerV2: {
    background: colors.white,
    borderTop: 'none',
    display: 'flex',
    padding: '24px 32px',
    alignItems: 'center',
    width: '391px',
  },
  account: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 'calc(100% - 400px)',
    marginRight: '20px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      border: '1px solid #e1e3e6',
      padding: '10px',
      justifyContent: 'center',
    },
  },
  yieldMechanics: {
    border: '1px solid #e1e3e6',
    margin: '0 10px',
  },
  icon: {
    marginTop: '5px',
  },
  brandColor: {
    width: '3px',
    height: '40px',
    marginLeft: '15px',
    backgroundColor: '#e1e3e6',
  },
  brandV2: {
    display: 'flex',
    order: '2',
  },
  divBlock: {
    width: '3px',
    height: '100%',
    marginRight: '15px',
    marginLeft: '15px',
    backgroundColor: colors.borderGrey,
  },
  links: {
    display: 'flex',
  },
  link: {
    padding: '12px 0px',
    margin: '0px 12px',
    cursor: 'pointer',
    '&:hover': {
      paddingBottom: '9px',
      borderBottom: '3px solid ' + colors.borderGrey,
    },
  },
  title: {
    textTransform: 'capitalize',
  },
  actionInput: {
    padding: '0px 0px 12px 0px',
    fontSize: '0.5rem',
  },
  linkActive: {
    padding: '12px 0px',
    margin: '0px 12px',
    cursor: 'pointer',
    paddingBottom: '9px',
    borderBottom: '3px solid ' + colors.borderGrey,
  },
  walletAddress: {
    padding: '12px',
    border: '1px solid rgba(47, 99, 165, .12)',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      border: '1px solid ' + colors.borderBlue,
      background: 'rgba(47, 128, 237, 0.1)',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      border: '1px solid ' + colors.borderBlue,
      background: colors.white,
    },
  },
  walletTitle: {
    flex: 1,
    color: colors.darkGray,
  },
  connectedDot: {
    background: colors.compoundGreen,
    opacity: '1',
    width: '10px',
    height: '10px',
    marginRight: '3px',
    marginLeft: '6px',
  },
  paper: {
    position: 'absolute',
    width: 450,
    height: 600,
    overflow: 'scroll',
    overflowX: 'hidden',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
});

const INITIAL_STATE = {
  burnedBalance: null,
};

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    emitter.on(TOKEN_CONTRACT, this.onTokenContract);
    emitter.on(CONNECTION_CHANGED, this.onConnectionChanged); //store is ready to handle tx's
  }

  componentWillUnmount() {
    emitter.removeListener(TOKEN_CONTRACT, this.onTokenContract);
    emitter.removeListener(CONNECTION_CHANGED, this.onConnectionChanged);
  }

  onTokenContract = async (asset) => {
    if (asset.tokenBurned !== undefined)
      this.setState({ burnedBalance: asset.tokenBurned });
  };

  onConnectionChanged = async (connection) => {
    if (connection) {
      // price update is already triggered from stakesimple
      //dispatcher.dispatch({ type: TOKEN_CONTRACT, content: [FILTER_BURNED] })
    } else {
      this.setState({ ...INITIAL_STATE });
    }
  };

  render() {
    const { address, classes } = this.props;

    var shortAddress = null;
    if (address) {
      shortAddress =
        address.substring(0, 6) +
        '...' +
        address.substring(address.length - 4, address.length);
    }

    return (
      <div className={classes.root}>
        <div className={classes.headerV2}>
          <div className={classes.icon}>
            <img
              alt=""
              src={require('../../assets/logo_wolves.png').default}
              height={'40px'}
            />
          </div>
          <div className={classes.brandColor}></div>
          <div className={classes.brandV2}>
            <div
              className={classes.brand}
              style={{
                alignContent: 'space-around',
                paddingLeft: '23px',
              }}
            >
              <Typography
                variant={'h3'}
                className={classes.name}
                style={{
                  color: 'e1e3e6',
                  fontSize: '16px',
                  fontWeight: '500',
                }}
                onClick={() => {
                  this.nav('');
                }}
              >
                wolves.finance{' '}
              </Typography>
              <Typography
                style={{
                  marginBottom: '0',
                  fontSize: '16px',
                  lineHeight: '21px',
                  fontWeight: '200',
                }}
              >
                {'4 Pillow Yield Farming'}
              </Typography>
            </div>
          </div>
        </div>

        <div className={classes.account}>
          {/* Burned amount */}
          {!this.state.burnedBalance ? null : (
            <div>
              <b>{Number(this.state.burnedBalance).toFixed(2)} Token</b>{' '}
              burned&nbsp;
            </div>
          )}

          {/* Connect account button */}
          {shortAddress && (
            <Typography
              variant={'h4'}
              className={classes.walletAddress}
              onClick={() => this.props.onDisconnect()}
            >
              {shortAddress + ' (' + this.props.networkName + ')'}
              <div className={classes.connectedDot}></div>
            </Typography>
          )}
          {!address && (
            <Typography
              variant={'h4'}
              className={classes.walletAddress}
              onClick={() => this.props.onConnect()}
            >
              Connect your wallet
            </Typography>
          )}
        </div>
      </div>
    );
  }

  nav = () => {};

  renderLink = (screen) => {
    const { classes } = this.props;

    return (
      <div
        className={
          window.location.pathname === '/' + screen
            ? classes.linkActive
            : classes.link
        }
        onClick={() => {
          this.nav(screen);
        }}
      >
        <Typography variant={'h4'} className={`title`}>
          {screen}
        </Typography>
      </div>
    );
  };
}

export default withRouter(withStyles(styles)(Header));
