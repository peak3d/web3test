pragma solidity 0.6.0;

interface IERC20 {
  function totalSupply() external view returns (uint256);
  function balanceOf(address account) external view returns (uint256);
  function transfer(address recipient, uint256 amount) external returns (bool);
  function allowance(address owner, address spender) external view returns (uint256);
  function approve(address spender, uint256 amount) external returns (bool);
  function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}

interface Compound {
  function mint ( uint256 mintAmount ) external returns ( uint256 );
  function redeem(uint256 redeemTokens) external returns (uint256);
  function exchangeRateStored() external view returns (uint);
  function supplyRatePerBlock() external view returns (uint256);
}

library SafeMath {
  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    require(b <= a, "SafeMath: Sub failed");
    uint256 c = a - b;
    return c;
  }
}

contract CompoundLender {
  using SafeMath for uint256;
  /*// rinkeby
  address constant usdc = 0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b;
  address constant cusdc = 0x5B281A6DdA0B271e91ae35DE655Ad301C976edb1;
  */
  // ropsten
  address constant usdc = 0x07865c6E87B9F70255377e024ace6630C1Eaa37F;
  address constant cusdc = 0x8aF93cae804cC220D1A608d4FA54D1b6ca5EB361;
  address constant dai = 0x31F42841c2db5173425b5223809CF3A38FEde360;
  address constant cdai = 0x8354C3a332FFB24E3A27be252E01aCFE65A33B35;
  address constant usdt = 0x516de3a7A567d81737e3a46ec4FF9cFD1fcb0136;
  address constant cusdt = 0x135669c2dcBd63F639582b313883F101a4497F76;

  function invest(address token, uint256 assetAmount) public returns(uint256) {
    address cToken = _token2cToken(token);
    require(cToken != address(0));
    // mint cToken
    uint256 poolTokens = IERC20(cToken).balanceOf(address(this));
    require(Compound(cToken).mint(assetAmount) == 0, "COMPOUND: mint failed");
    return IERC20(cToken).balanceOf(address(this)).sub(poolTokens);
  }

  function redeem(address token, uint256 poolAmount) public returns (uint256) {
    address cToken = _token2cToken(token);
    require(cToken != address(0));
    // redeem tokens to this contract
    uint256 assetTokens = IERC20(token).balanceOf(address(this));
    require(Compound(cToken).redeem(poolAmount) == 0, "COMPOUND: redeem failed");
    return IERC20(token).balanceOf(address(this)).sub(assetTokens);
  }
  
  // return the ratio asset / poolToken in 1E-18 decimals
  function getExchangeRate(address token) public view returns (uint256) {
    return Compound(_token2cToken(token)).exchangeRateStored();
  }
  
  function getApr(address token) public view returns (uint256) {
    return Compound(_token2cToken(token)).supplyRatePerBlock() * 2102400;
  }
  
  function getPoolToken(address token) public pure returns (address) {
    return _token2cToken(token);
  }
  
  function _token2cToken(address asset) internal pure returns (address){
    if (asset == usdc)
      return cusdc;
    if (asset == dai)
      return cdai;
    if (asset == usdt)
      return cusdt;
    return address(0);
  }
}
