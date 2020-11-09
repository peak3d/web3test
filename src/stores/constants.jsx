// Events (used in dispatcher and emitter)
export const ERROR = 'ERROR'
export const YELD_CONTRACT = 'YELD_CHANGED' //includes some or all of: YELD wallet, total supply, burned
export const YELD_RETIREMENT = 'YELD_RETIREMENT' //includes stake snapshot and ETH balance
export const YELD_STAKE = 'YELD_STAKE' //perform stake
export const YELD_UNSTAKE = 'YELD_UNSTAKE' //perform unstake
export const ADDRESS_INDEX_CHANGED = 'ADDRESS_INDEX_CHANGED'
export const CONNECTION_CHANGED = 'CONNECTION_CHANGED'

// Filter for TX
export const FILTER_AMOUNT = 'AMOUNT'
export const FILTER_BURNED = 'BURNED'
export const FILTER_SUPPLY = 'SUPPLY'
export const FILTER_BALANCE = 'BALANCE'
export const FILTER_STAKE = 'STAKE'
