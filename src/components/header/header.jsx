import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Button, Typography, Modal } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { colors } from '../../theme'

import { YELD_CONTRACT,
         ADDRESS_INDEX_CHANGED,
         CONNECTION_CHANGED,
         //FILTER_BURNED
       } from '../../stores/constants'

import Store from "../../stores"

const emitter = Store.emitter
//const dispatcher = Store.dispatcher
const store = Store.store

const styles = theme => ({
	root: {
		verticalAlign: 'top',
		width: '100%',
    display: 'flex',
    border: '1px solid #e1e3e6',
		[theme.breakpoints.down('sm')]: {
			marginBottom: '40px',
		},
	},
	headerV2: {
		background: colors.white,
		borderTop: 'none',
		display: 'flex',
		padding: '24px 32px',
		alignItems: 'center',
		justifyContent: 'center',
		width: '391px',
  },
	account: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		width: 'calc(100% - 400px)',
		marginRight: '20px',
		[theme.breakpoints.down('sm')]: {
			display: 'flex',
			flexDirection: 'column-reverse',
			position: 'absolute',
			top: '100px',
			left: '50%',
			transform: 'translateX(-50%)',
			width: '100%',
			border: '1px solid #e1e3e6',
    	padding: '10px',
		},
	},
	versionsContainer: {
		[theme.breakpoints.down('sm')]: {
			margin: '10px 0',
		},
	},
	yieldMechanics: {
		border: '1px solid #376EDC',
		margin: '0 10px',
		[theme.breakpoints.down('sm')]: {
			marginTop: '10px',
		},
	},
	icon: {
		marginTop: '5px',
	},
	brandColor: {
		width: '3px',
		height: '40px',
		marginLeft: '15px',
		backgroundColor: '#2036ff',
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
		backgroundColor: colors.borderBlue,
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
			borderBottom: '3px solid ' + colors.borderBlue,
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
		borderBottom: '3px solid ' + colors.borderBlue,
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
	name: {
		[theme.breakpoints.down('sm')]: {
			display: 'none',
		},
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
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
	yeldMechanicsTitle: {
		borderBottom: '1px solid #e1e3e6',
	},
})

const INITIAL_STATE = {
  v2Selected: true,
  yMechanicsModalOpen: false,
  burnedBalance: null,
}

class Header extends Component {
	constructor(props) {
		super(props)

		this.state = { ...INITIAL_STATE }
  }

	componentDidMount() {
    emitter.on(YELD_CONTRACT, this.onYeldContract)
    emitter.on(ADDRESS_INDEX_CHANGED, this.onAddressIndexChanged)
    emitter.on(CONNECTION_CHANGED, this.onConnectionChanged) //store is ready to handle tx's
	}

	componentWillUnmount() {
    emitter.removeListener(YELD_CONTRACT, this.onYeldContract)
    emitter.removeListener(ADDRESS_INDEX_CHANGED, this.onAddressIndexChanged)
    emitter.removeListener(CONNECTION_CHANGED, this.onConnectionChanged)
	}

	onYeldContract = async (asset) => {
    if (asset.yeldBurned !== undefined)
      this.setState({ burnedBalance: asset.yeldBurned })
	}

	onAddressIndexChanged = async (index) => {
    this.setState({ v2Selected: index > 0 })
	}
  
  onConnectionChanged = async (connection) => {
    if (connection) {
      // price update is already triggered from stakesimple
      //dispatcher.dispatch({ type: YELD_CONTRACT, content: [FILTER_BURNED] })  
    } else {
      this.setState({ ...INITIAL_STATE });  
    }
  }

	render() {
		const { address, classes } = this.props

		var shortAddress = null
		if (address) {
			shortAddress =
				address.substring(0, 6) +
				'...' +
				address.substring(
					address.length - 4,
					address.length
				)
		}

		return (
			<div className={classes.root}>
				<div className={classes.headerV2}>
					<div className={classes.icon}>
						<img
							alt=""
							src={require('../../assets/logo-v2-yeld.png').default}
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
							}}>
							<Typography
								variant={'h3'}
								className={classes.name}
								style={{
									color: '#2036ff',
									fontSize: '16px',
									fontWeight: '500',
								}}
								onClick={() => {
									this.nav('')
								}}>
								YELD.APP{' '}
							</Typography>
							<Typography
								style={{
									marginBottom: '0',
									fontSize: '16px',
									lineHeight: '21px',
									fontWeight: '200',
								}}>
								{'Next-Generation Yield Farming'}
							</Typography>
						</div>
					</div>

					<Modal
						className={classes.modal}
						open={this.state.yMechanicsModalOpen}
						onClose={() => this.setState({ yMechanicsModalOpen: false })}
						aria-labelledby="simple-modal-title"
						aria-describedby="simple-modal-description">
						<div style={this.modalStyle} className={classes.paper}>
							<div className={classes.yeldMechanicsBox}>
								<div className={classes.yeldMechanicsTitle}>
									<div className={classes.icon}>
										<img
											alt=""
											src={require('../../assets/FireYeldMechanic.png').default}
											height={'40px'}
										/>
										<h2
											className={classes.exclusivesTitle}
											style={{ marginLeft: '20px' }}>
											Yeld mechanics
										</h2>
									</div>
								</div>

								<p>
									The V2 and V3 buttons allow you to change the version of the
									contracts used in your staking efforts. Always use the latest
									version, V3.
								</p>

								<p>
									The reason why 2 versions are available is because previous
									beta testers staked funds in the V2 contract. We made some
									improvements to the V3 contracts and we recommend you to use
									them exclusively.
								</p>

								<p>
									Every block you earn YELD tokens based on the stablecoin yield
									generated in addition to your standard yield to boost the APY.
								</p>
								<p>
									A portion of the yield returns will be used for the Buy and
									Burn mechanism to increase the token price.
								</p>
								<p>
									Users that hold YELD tokens can stake their YELD balance and
									redeem Retirement Yield everyday based on their holdings.
								</p>
								<p>To redeem your Retirement Yield follow these steps:</p>
								<ol>
									<li>Click on "Stake Yeld" with the amount to stake.</li>
									<br />
									<li>
										After 1 day or more, you'll be able to click on "Redeem
										Retirement Yield" and get ETH based on how much YELD you
										staked.
									</li>
									<br />
									<li>
										The larger percentage of the total YELD supply you stake,
										the more ETH you'll get from the Retirement Yield pool.
									</li>
								</ol>
							</div>
						</div>
					</Modal>
				</div>

				<div className={classes.account}>
					{/* Burned amount */}
					{!this.state.burnedBalance ? null : (
						<div><b>{Number(this.state.burnedBalance).toFixed(2)} YELD</b> burned&nbsp;</div>
					)}

					{/* Versions */}
					<div className={classes.versionsContainer}>
						<Button
							style={{
								border: this.state.v2Selected ? 'none' : '1px solid #376EDC',
							}}
							variant="outlined"
							color="primary"
              disabled={!this.props.connected}
							onClick={() => store.setYeldAddressIndex(0)}>
							<Typography variant={'h5'} color="secondary">
								V2
							</Typography>
						</Button>
						<Button
							style={{
								border: this.state.v2Selected ? '1px solid #376EDC' : 'none',
							}}
							variant="outlined"
							color="primary"
              disabled={!this.props.connected}
							onClick={() => store.setYeldAddressIndex(1)}>
							<Typography variant={'h5'} color="secondary">
								V3
							</Typography>
						</Button>
					</div>

					{/* Yield Mechanics */}
					<Button
						className={classes.yieldMechanics}
						variant="outlined"
						color="primary"
						onClick={() => this.setState({ yMechanicsModalOpen: true })}>
						<Typography variant={'h5'} color="secondary">
							Yield Mechanics
						</Typography>
					</Button>

					{/* Connect account button */}
					{shortAddress && (
						<Typography
							variant={'h4'}
							className={classes.walletAddress}
							onClick={() => this.props.onDisconnect()}>
							{shortAddress + ' (' + this.props.networkName + ')'}
							<div className={classes.connectedDot}></div>
						</Typography>
					)}
					{!address && (
						<Typography
							variant={'h4'}
							className={classes.walletAddress}
							onClick={() => this.props.onConnect()}>
							Connect your wallet
						</Typography>
					)}
				</div>
			</div>
		)
	}

	getModalStyle = () => {
		const top = 50 + Math.round(Math.random() * 20) - 10
		const left = 50 + Math.round(Math.random() * 20) - 10
		return {
			top: `${top}%`,
			left: `${left}%`,
			transform: `translate(-${top}%, -${left}%)`,
		}
	}

	renderLink = screen => {
		const { classes } = this.props

		return (
			<div
				className={
					window.location.pathname === '/' + screen
						? classes.linkActive
						: classes.link
				}
				onClick={() => {
					this.nav(screen)
				}}>
				<Typography variant={'h4'} className={`title`}>
					{screen}
				</Typography>
			</div>
		)
	}
}

export default withRouter(withStyles(styles)(Header))
