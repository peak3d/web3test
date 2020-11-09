import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { TextField, Button, Typography, Modal, Box } from '@material-ui/core'

//import betaTesting from '../../betaTesting'

import { withTranslation } from 'react-i18next'
import { colors } from '../../theme'

import { YELD_CONTRACT,
         YELD_RETIREMENT,
         YELD_STAKE,
         CONNECTION_CHANGED,
         FILTER_AMOUNT,
         FILTER_BURNED,
         FILTER_SUPPLY,
         FILTER_BALANCE,
         FILTER_STAKE,
       } from '../../stores/constants'

//import UnlockModal from '../unlock/unlockModal.jsx'

import Store from '../../stores'
const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

const styles = theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		maxWidth: '1200px',
		width: '100%',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginTop: '30px',
		marginBottom: '30px',
		[theme.breakpoints.down('sm')]: {
			marginTop: '200px',
		},
		[theme.breakpoints.up('md')]: {
			minWidth: '1000px',
		},
		[theme.breakpoints.up('lg')]: {
			minWidth: '1000px',
		},
	},
	buttonModalBox: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	separatorStakeContainer: {
		width: '100%',
		display: 'flex',
		borderBottom: '1px solid #e1e3e6',
		paddingBottom: '30px',
		borderTop: 'none',
		alignItems: 'center',
		justifyContent: 'center',
		background: colors.white,
		[theme.breakpoints.down('sm')]: {
			justifyContent: 'space-between',
			padding: '16px 24px',
		},
	},
	stakeContainer: {
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		minWidth: '100%',
		[theme.breakpoints.up('md')]: {
			minWidth: '1000px',
		},
		[theme.breakpoints.up('lg')]: {
			minWidth: '1000px',
		},
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
		},
	},
	titleStake: {
		margin: '15px 0 15px',
	},
	stakeOptions: {
		display: 'flex',
		maxWidth: '100%',
		[theme.breakpoints.down('sm')]: {
			display: 'flex',
			flexDirection: 'column',
			width: '100%',
		},
	},
	icon: {
		display: 'flex',
		alignItems: 'center',
		flex: 1,
		cursor: 'pointer',
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
	account: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		flex: 1,
		[theme.breakpoints.down('sm')]: {
			flex: '0',
		},
	},
	walletAddress: {
		padding: '12px',
		border: '2px solid rgb(174, 174, 174)',
		borderRadius: '50px',
		display: 'flex',
		alignItems: 'center',
		cursor: 'pointer',
		'&:hover': {
			border: '2px solid ' + colors.borderBlue,
			background: 'rgba(47, 128, 237, 0.1)',
		},
		[theme.breakpoints.down('sm')]: {
			display: 'flex',
			position: 'absolute',
			top: '90px',
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
		borderRadius: '10px',
		width: '10px',
		height: '10px',
		marginRight: '3px',
		marginLeft: '6px',
	},
	name: {
		paddingLeft: '24px',
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
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	twoColumns: {
		display: 'grid',
		gridTemplateColumns: '1fr',
		gridColumnGap: '0',
		[theme.breakpoints.up('lg')]: {
			gridTemplateColumns: 'repeat(2, 1fr)',
			gridColumnGap: '24px',
		},
		[theme.breakpoints.up('xl')]: {
			gridTemplateColumns: 'repeat(9, 1fr)',
			gridColumnGap: '24px',
		},
	},
	iconStake: {
		display: 'flex',
		justifyContent: 'center',
		[theme.breakpoints.down('sm')]: {
			margin: '20px 0 20px',
			alignItems: 'center',
		},
	},
	boxUnstake: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		border: '1px solid rgba(47, 99, 165, .12)',
		marginBottom: '12px',
		marginRight: '12px',
		minWidth: '200px',
		[theme.breakpoints.down('sm')]: {
			margin: '0 100px  0 100px',
		},
	},
	BoxUnstakeLast: {
		display: 'flex',
	},
	boxRetirement: {
		minWidth: '400px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		border: '1px solid rgba(47, 99, 165, .12)',
		marginBottom: '12px',
		marginRight: '12px',
	},
	boxRetirementYeldAvailable: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		border: '1px solid rgba(47, 99, 165, .12)',
		marginBottom: '12px',
		marginRight: '12px',
		[theme.breakpoints.down('sm')]: {
			marginTop: '12px',
		},
	},
})

const INITIAL_STATE = {
  modalOpen: false,
  yeldBalance: 0,
  yeldTotalSupply: null,
  yeldBurned: null,
  yeldStakeAmount: 0,
  stakeTimestamp: 0,
  ethRetirementBalance: null,
  hoursPassedAfterStaking: '00m 00s',
  stakeModalOpen: false,
  unstakeModalOpen: false,
  stakeProcessing: false,
  stakeAmount: 0,
  unStakeAmount: 0,
};


class StakeSimple extends Component {
	constructor(props) {
		super()

		this.state = {
      ...INITIAL_STATE
		}
	}

  componentDidMount(prevProps) {
    emitter.on(YELD_CONTRACT, this.onYeldContract)
    emitter.on(YELD_RETIREMENT, this.onYeldRetirement)
    emitter.on(YELD_STAKE, this.onYeldStake)
    emitter.on(CONNECTION_CHANGED, this.onConnectionChanged)
    if (store.isConnected())
      this._requestData()
  }

  componentWillUnmount() {
    emitter.removeListener(YELD_CONTRACT, this.onYeldContract)
    emitter.removeListener(YELD_RETIREMENT, this.onYeldRetirement)
    emitter.removeListener(YELD_STAKE, this.onYeldStake)
    emitter.removeListener(CONNECTION_CHANGED, this.onConnectionChanged)
  }

  onYeldContract = async (asset) => {
    var newState = {}
    if (asset.yeldAmount !== undefined)
      newState.yeldBalance = asset.yeldAmount
    if (asset.totalSupply !== undefined)
      newState.yeldTotalSupply = asset.totalSupply
    if (asset.yeldBurned !== undefined)
      newState.yeldBurned = asset.yeldBurned
    this.setState(newState)
  }

  onYeldRetirement = async (asset) => {
    var newState = {}
    if (asset.stake !== undefined) {
      newState.yeldStakeAmount = store.fromWei(asset.stake.yeldBalance)
      newState.stakeTimestamp = asset.stake.timestamp.toNumber()
    }
    if (asset.balance !== undefined)
      newState.ethRetirementBalance = store.fromWei(asset.balance);
    this.setState(newState)
  }

  onConnectionChanged = async (connection) => {
    if (connection) {
      this._requestData()
    } else {
      this.setState({ ...INITIAL_STATE });
    }
  }

  onYeldStake = async () => {
    this.setState({stakeProcessing: false})
  }

  _requestData() {
    // Request yeld contract data
    dispatcher.dispatch({ type: YELD_CONTRACT, content: [FILTER_AMOUNT, FILTER_BURNED, FILTER_SUPPLY] })
    // Request requirement contract data
    dispatcher.dispatch({ type: YELD_RETIREMENT, content: [FILTER_BALANCE, FILTER_STAKE] })
  }

  getRetirement = () => {
    const {yeldStakeAmount, stakeTimestamp, yeldTotalSupply, yeldBurned, ethRetirementBalance} = this.state
    const now = Math.floor(Date.now() / 1000)

    //nothing staked -> disable
    if (yeldStakeAmount <= 0
    //no stake information available so far
    || stakeTimestamp === 0 || stakeTimestamp > now
    // information from yeld contract not available
    || (yeldTotalSupply === null || yeldBurned === null || ethRetirementBalance === null))
      return {}

    // do we have to wait?
    const timeElapsed = now - stakeTimestamp
    if (timeElapsed < 86400) {
      const timeLeft = 86400 - timeElapsed;
      return {timer: Math.trunc(timeLeft / 3600).toString() + ':' + Math.floor((timeLeft % 3600) / 60).toString()}
    }
		const userPercentage = yeldStakeAmount / (yeldTotalSupply - yeldBurned)
    return {value: (ethRetirementBalance * userPercentage) / 100}
  }

	render() {
		const { classes } = this.props
    const retirement = this.getRetirement()

		return (
			<div className={classes.root}>
				<div className={classes.twoColumns}>
					<div className={classes.iconStake}>
						<img
							alt="Yeld Pension"
							src={require('../../assets/Exclusion-1.svg').default}
							height={'65px'}
						/>
					</div>
					<div className={classes.stakeContainer}>
						<Typography
							variant={'h3'}
							className={classes.titleStake}
							style={{ textAlign: 'left' }}>
							Your Retirement Stake
						</Typography>
						<div className={classes.stakeOptions}>
							<Box
								color="text.secundary"
								className={classes.boxBalance}
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									border: '1px solid rgba(47, 99, 165, .12)',
									marginBottom: '12px',
									marginRight: '12px',
								}}>
								<Button
									color="primary"
									disabled={this.state.yeldBalance <= 0}
									onClick={() => this.setState({ stakeModalOpen: true })}>
									<Typography variant={'h5'} color="secondary">
										Stake Yeld Tokens ({this.state.yeldBalance.toFixed(2)} YELD)
										<br />
										<i>
											{this.state.yeldStakedAmount <= 0
												? ''
												: 'Currently Staked: ' + this.state.yeldStakeAmount +' YELD'}
										</i>
									</Typography>
								</Button>
							</Box>
							<Box
								color="text.secundary"
								className={classes.boxUnstake}
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									border: '1px solid rgba(47, 99, 165, .12)',
									marginBottom: '12px',
									marginRight: '12px',
								}}>
								<Button
									color="primary"
									disabled={this.state.yeldStakeAmount <= 0}
									onClick={() => this.setState({ unstakeModalOpen: true })}>
									<Typography variant={'h5'} color="secondary">
										Unstake Wallet
									</Typography>
								</Button>
							</Box>
							<Box className={classes.boxRetirementYeldAvailable}>
								<Button
									disabled={!retirement.value}
									onClick={async () => {
										if (true /*await betaTesting()*/) {
											//await this.props.retirementYeld.methods.redeemETH().send({
											//	from: window.web3.eth.defaultAccount,
											//})
										} else {
											alert(
												"You can't use the dapp during the beta testing period if you hold less than 5 YELD"
											)
										}
									}}>
									<Typography
										variant={'h5'}
										color="secondary"
										style={{ color: '#000000' }}>
										{!retirement.value ? (
											<span>
												No ETH to Redeem Yet
												<br />
												<i>
													{retirement.timer
														? `Redeem unlocked in: ${retirement.timer} hours`
                          : ''}
												</i>
											</span>
										) : (
											<span>
												Redeem Retirement Yield ({retirement.value} ETH)
											</span>
										)}
									</Typography>
								</Button>
							</Box>

							{/* this goes in the other component */}
							<Modal
								className={classes.modal}
								open={this.state.stakeModalOpen}
								onClose={() => this.setState({ stakeModalOpen: false })}
								aria-labelledby="simple-modal-title"
								aria-describedby="simple-modal-description">
								<div style={this.modalStyle} className={classes.paper}>
									<Typography variant="h4" className={classes.title}>
										Enter how much YELD you want to stake. Warning: leave at
										least 5 YELD in your wallet to keep using the beta!"
									</Typography>
									<br />
									<TextField
										fullWidth
										type="number"
										InputProps={{
											inputProps: {
												min: 0,
												max: this.state.yeldBalance,
											},
										}}
										className={classes.actionInput}
										value={this.state.stakeAmount}
										onChange={e =>
											this.setState({ stakeAmount: e.target.value })
										}
										placeholder="0"
										variant="outlined"
										error={
											Number(this.state.stakeAmount) >
											Number(this.state.yeldBalance)
										}
										helperText={
											Number(this.state.stakeAmount) >
											Number(this.state.yeldBalance)
												? `Enter a number less than ${this.state.yeldBalance} (Yeld Balance)`
												: ''
										}
									/>
									<br /> <br />
									<div>
										<Button
											variant="outlined"
											color="primary"
											disabled={
												Number(this.state.stakeAmount) <= 0 ||
												Number(this.state.stakeAmount) >
													Number(this.state.yeldBalance)
											}
											onClick={ async () => {
                        if (!this.state.stakeProcessing) {
                          this.setState({ stakeProcessing: true })
                          dispatcher.dispatch({ type: YELD_STAKE, content: Number(this.state.stakeAmount) })
                        }
                      }
                      }>
											<Typography variant={'h5'} color="secondary">
												{!this.state.stakeProcessing ? (
													<div>Stake Amount</div>
												) : (
													<div className="d-flex align-items-center">
														<span>Processing </span>
														<span className="loading ml-2"></span>
													</div>
												)}
											</Typography>
										</Button>

										<Button
											style={{ marginLeft: '35%' }}
											variant="outlined"
											color="primary"
											onClick={() => this.setState({ stakeModalOpen: false })}>
											<Typography variant={'h5'} color="secondary">
												Cancel
											</Typography>
										</Button>
									</div>
								</div>
							</Modal>
							<Modal
								className={classes.modal}
								open={this.state.unstakeModalOpen}
								onClose={() => this.setState({ unstakeModalOpen: false })}
								aria-labelledby="simple-modal-title"
								aria-describedby="simple-modal-description">
								<div style={this.modalStyle} className={classes.paper}>
									<Typography variant="h4" className={classes.title}>
										Enter how much YELD you want to unstake:
									</Typography>
									<br />
									<TextField
										fullWidth
										type="number"
                    disabled={!this.props.connected}
										InputProps={{
											inputProps: {
												min: 0,
												max: this.state.yeldBalance,
											},
										}}
										className={classes.actionInput}
										value={this.state.unStakeAmount}
										onChange={e =>
											this.setState({ unStakeAmount: e.target.value })
										}
										placeholder="0"
										variant="outlined"
										error={
											this.state.unStakeAmount > this.state.yeldStakeAmount
										}
										helperText={
											this.state.unStakeAmount > this.state.yeldStakeAmount
												? 'Enter a number less than ' + store.fromWei(
														String(this.state.retirementYeldCurrentStaked)
												  ) + ' (Current Stake)'
												: ''
										}
									/>
									<br /> <br />
									<div>
										<Button
											variant="outlined"
											color="primary"
											disabled={
												this.state.unStakeAmount <= 0 ||
												this.state.unStakeAmount >
                          store.fromWei(
                            String(this.state.retirementYeldCurrentStaked)
                          )
											}
											onClick={async () => {
												/*await this.props.retirementYeld.methods
													.unstake(
														window.web3.utils.toWei(
															String(this.state.unStakeAmount)
														)
													)
													.send({
														from: window.web3.eth.defaultAccount,
													})
													.on('transactionHash', () => {
														this.setState({ unstakeProcessing: true })
													})
													.on('receipt', () => {
														this.setState({ unstakeProcessing: false })
														window.location.reload()
													})
													.catch(_ => {
														this.setState({ unstakeProcessing: false })
													})*/
											}}>
											<Typography variant={'h5'} color="secondary">
												{!this.state.unstakeProcessing ? (
													<div>UnStake Amount</div>
												) : (
													<div className="d-flex align-items-center">
														<span>Processing </span>
														<span className="loading ml-2"></span>
													</div>
												)}
											</Typography>
										</Button>

										<Button
											style={{ marginLeft: '31%' }}
											variant="outlined"
											color="primary"
											onClick={() =>
												this.setState({ unstakeModalOpen: false })
											}>
											<Typography variant={'h5'} color="secondary">
												Cancel
											</Typography>
										</Button>
									</div>
								</div>
							</Modal>
							{/* end this goes in the other component */}
						</div>
					</div>
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

	closeModal = () => {
		this.setState({ modalOpen: false })
	}
}

export default withTranslation()(withRouter(withStyles(styles)(StakeSimple)))
