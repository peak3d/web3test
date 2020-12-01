// Events (used in dispatcher and emitter)
export const ERROR = 'ERROR';
export const TOKEN_CONTRACT = 'TOKEN_CHANGED'; // includes some or all of: token in wallet, total supply, burned
export const CONNECTION_CHANGED = 'CONNECTION_CHANGED';

export const POOL_BALANCES = 'POOL_BALANCES';
export const POOL_INVEST = 'POOL_INVEST';
export const POOL_REDEEM = 'POOL_REDEEM';
export const POOL_HASH = 'POOL_HASH';

// Filter for TX
export const FILTER_AMOUNT = 'AMOUNT';
export const FILTER_BURNED = 'BURNED';
export const FILTER_SUPPLY = 'SUPPLY';
export const FILTER_BALANCE = 'BALANCE';
export const FILTER_STAKE = 'STAKE';
