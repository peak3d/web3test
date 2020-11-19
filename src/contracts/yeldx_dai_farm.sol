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

contract Context {
    constructor () internal { }
    // solhint-disable-previous-line no-empty-blocks

    function _msgSender() internal view returns (address payable) {
        return msg.sender;
    }

    function _msgData() internal view returns (bytes memory) {
        this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
        return msg.data;
    }
}

contract Ownable is Context {
    address payable private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    constructor () internal {
        _owner = _msgSender();
        emit OwnershipTransferred(address(0), _owner);
    }
    function owner() public view returns (address payable) {
        return _owner;
    }
    modifier onlyOwner() {
        require(isOwner(), "Ownable: caller is not the owner");
        _;
    }
    function isOwner() public view returns (bool) {
        return _msgSender() == _owner;
    }
    function renounceOwnership() public onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }
    function transferOwnership(address payable newOwner) public onlyOwner {
        _transferOwnership(newOwner);
    }
    function _transferOwnership(address payable newOwner) internal {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}

contract ERC20 is Context, IERC20 {
    using SafeMath for uint256;

    mapping (address => uint256) _balances;

    mapping (address => mapping (address => uint256)) private _allowances;

    uint256 _totalSupply;
    function totalSupply() override public view returns (uint256) {
        return _totalSupply;
    }
    function balanceOf(address account) override public view returns (uint256) {
        return _balances[account];
    }
    function transfer(address recipient, uint256 amount) override public returns (bool) {
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
    function allowance(address owner, address spender) override public view returns (uint256) {
        return _allowances[owner][spender];
    }
    function approve(address spender, uint256 amount) override public returns (bool) {
        _approve(_msgSender(), spender, amount);
        return true;
    }
    function transferFrom(address sender, address recipient, uint256 amount) override public returns (bool) {
        _transfer(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: transfer amount exceeds allowance"));
        return true;
    }
    function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }
    function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue, "ERC20: decreased allowance below zero"));
        return true;
    }
    function _transfer(address sender, address recipient, uint256 amount) internal {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        emit Transfer(sender, recipient, amount);
    }
    function _mint(address account, uint256 amount) internal {
        require(account != address(0), "ERC20: mint to the zero address");

        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }
    function _burn(address account, uint256 amount) internal {
        require(account != address(0), "ERC20: burn from the zero address");

        _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
    }
    function _approve(address owner, address spender, uint256 amount) internal {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }
    function _burnFrom(address account, uint256 amount) internal {
        _burn(account, amount);
        _approve(account, _msgSender(), _allowances[account][_msgSender()].sub(amount, "ERC20: burn amount exceeds allowance"));
    }
}

abstract contract ERC20Detailed is IERC20 {
    string private _name;
    string private _symbol;
    uint8 private _decimals;

    constructor (string memory name, string memory symbol, uint8 decimals) public {
        _name = name;
        _symbol = symbol;
        _decimals = decimals;
    }
    function name() public view returns (string memory) {
        return _name;
    }
    function symbol() public view returns (string memory) {
        return _symbol;
    }
    function decimals() public view returns (uint8) {
        return _decimals;
    }
}

library SafeMath {
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        // Solidity only automatically asserts when dividing by 0
        require(b > 0, errorMessage);
        uint256 c = a / b;

        return c;
    }
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return mod(a, b, "SafeMath: modulo by zero");
    }
    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b != 0, errorMessage);
        return a % b;
    }
}

library Address {
    function isContract(address account) internal view returns (bool) {
        bytes32 codehash;
        bytes32 accountHash = 0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470;
        // solhint-disable-next-line no-inline-assembly
        assembly { codehash := extcodehash(account) }
        return (codehash != 0x0 && codehash != accountHash);
    }
    function toPayable(address account) internal pure returns (address payable) {
        return address(uint160(account));
    }
    function sendValue(address payable recipient, uint256 amount) internal {
        require(address(this).balance >= amount, "Address: insufficient balance");

        // solhint-disable-next-line avoid-call-value
        (bool success, ) = recipient.call.value(amount)("");
        require(success, "Address: unable to send value, recipient may have reverted");
    }
}

library SafeERC20 {
    using SafeMath for uint256;
    using Address for address;

    function safeTransfer(IERC20 token, address to, uint256 value) internal {
        callOptionalReturn(token, abi.encodeWithSelector(token.transfer.selector, to, value));
    }

    function safeTransferFrom(IERC20 token, address from, address to, uint256 value) internal {
        callOptionalReturn(token, abi.encodeWithSelector(token.transferFrom.selector, from, to, value));
    }

    function safeApprove(IERC20 token, address spender, uint256 value) internal {
        require((value == 0) || (token.allowance(address(this), spender) == 0),
            "SafeERC20: approve from non-zero to non-zero allowance"
        );
        callOptionalReturn(token, abi.encodeWithSelector(token.approve.selector, spender, value));
    }

    function safeIncreaseAllowance(IERC20 token, address spender, uint256 value) internal {
        uint256 newAllowance = token.allowance(address(this), spender).add(value);
        callOptionalReturn(token, abi.encodeWithSelector(token.approve.selector, spender, newAllowance));
    }

    function safeDecreaseAllowance(IERC20 token, address spender, uint256 value) internal {
        uint256 newAllowance = token.allowance(address(this), spender).sub(value, "SafeERC20: decreased allowance below zero");
        callOptionalReturn(token, abi.encodeWithSelector(token.approve.selector, spender, newAllowance));
    }
    function callOptionalReturn(IERC20 token, bytes memory data) private {
        require(address(token).isContract(), "SafeERC20: call to non-contract");

        // solhint-disable-next-line avoid-low-level-calls
        (bool success, bytes memory returndata) = address(token).call(data);
        require(success, "SafeERC20: low-level call failed");

        if (returndata.length > 0) { // Return data is optional
            // solhint-disable-next-line max-line-length
            require(abi.decode(returndata, (bool)), "SafeERC20: ERC20 operation did not succeed");
        }
    }
}

interface IInvestor {
  function invest(address token, uint256 assetAmount) external returns(uint256);
  function redeem(address token, uint256 poolAmount) external returns (uint256);
  function getExchangeRate(address token) external view returns (uint256);
  function getApr(address token) external view returns (uint256);
  function getPoolToken(address token) external view returns (address);
}

contract yUSDC is ERC20, ERC20Detailed, Ownable {
  using SafeERC20 for IERC20;
  using Address for address;
  using SafeMath for uint256;

  address[] investors;
  address public currentInvestor;
  address currentPoolToken;
  //address public assetToken = 0x6B175474E89094C44Da98b954EedeAC495271d0F; //mainnet
  address public assetToken = 0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa; //rinkeby
  //address public assetToken = 0x31F42841c2db5173425b5223809CF3A38FEde360; //ropsten

  // marketing
  struct UserData {
    uint256 investedAsset;
    uint256 depositStartBlock;
  }
  mapping(address => UserData) userData;
  uint256 public marketingRate = 0; //0% marketing
  uint256 public investedAsset = 0;

  event Invest(address token, uint256 amountIn, uint256 amountOut);
  event Redeem(address token, uint256 amountIn, uint256 amountOut);

  constructor () public ERC20Detailed("YELD DAI", "yDAI", 18) {
    // Initialize totalSupply with 1 to avoid 0 conditions
  }

  // To receive ETH after converting it from USDC
  fallback () external payable{}
  receive() external payable {}

  function withdrawAll() public onlyOwner {
    // ASSETS
    if (currentInvestor != address(0)) {
      _redeem(IERC20(currentPoolToken).balanceOf(address(this)));
      // tranfer all of them back to holders (/*todo*/)
      IERC20(assetToken).transfer(msg.sender, IERC20(assetToken).balanceOf(address(this)));
    }
    // ETH
    owner().transfer(address(this).balance);
  }

  function deposit(uint256 _amount) external {
    require(_amount > 0, "deposit must be greater than 0");
    require(currentInvestor != address(0), "deposit: No Investor");
    uint256 shares = _totalSupply > 0 ? (_amount.mul(_totalSupply.add(getMarketingFee()))).div(_getAssetAmount()) : _amount; //y
    _mint(msg.sender, shares);

    UserData storage data = userData[msg.sender];
    data.investedAsset = data.investedAsset.add(_amount);
    data.depositStartBlock = block.number;
    investedAsset = investedAsset.add(_amount);

    // Transfer asset from user to this contract
    IERC20(assetToken).safeTransferFrom(msg.sender, address(this), _amount);
    // Invest using delegate
    _invest(_amount);
  }

  function withdraw(uint256 _shares) external
  {
    require(_shares > 0, "withdraw must be greater than 0");
    require(currentInvestor != address(0), "withdraw: No Investor");

    // pool tokens to withdraw
    uint256 poolAmount = (IERC20(currentPoolToken).balanceOf(address(this)).mul(_shares)).div(_totalSupply.add(getMarketingFee()));

    _burn(msg.sender, _shares); // will throw in case sender has insufficient shares

    uint256 assetAmount = _redeem(poolAmount);

    // how much does this refer to medium invested asset?
    UserData storage data = userData[msg.sender];
    uint256 withdrawAsset = (data.investedAsset.mul(_shares)).div(_shares.add(balanceOf(msg.sender)));
    data.investedAsset = data.investedAsset.sub(withdrawAsset);
    investedAsset = investedAsset.sub(withdrawAsset);

    // Send assets back to sender
    IERC20(assetToken).safeTransfer(msg.sender, assetAmount);
  }

  function addInvestor(address investor) external onlyOwner {
    address newPoolToken = IInvestor(investor).getPoolToken(assetToken);
    require(newPoolToken != address(0), "Invalid Investor");

    // Check if we simply replace / update
    for (uint i=0;i<investors.length; i++){
      if (newPoolToken == IInvestor(investors[i]).getPoolToken(assetToken)){
        investors[i] = investor;
        return;
      }
    }

    investors.push(investor);
    // Approve: allow investor ctoken to withdraw assetTokens owned by this
    IERC20(assetToken).safeApprove(newPoolToken, uint(-1));
    if (investors.length == 1){
      currentInvestor = investor;
      currentPoolToken = newPoolToken;
      // invest all assets
      _invest(IERC20(assetToken).balanceOf(address(this)));
    }
  }

  function removeInvestor(address investor) external onlyOwner {
    // Find the investor, fill gap.
    uint numInserted = 0;
    for (uint i=0;i<investors.length; i++){
      if (investor != investors[i]){
        if (numInserted != i)
          investors[numInserted] = investors[i];
        ++numInserted;
      }
    }

    require(investors.length > numInserted);
    investors.pop();

    if (investor == currentInvestor) {
      _redeem(IERC20(currentPoolToken).balanceOf(address(this)));
      if (investors.length > 0) {
          currentInvestor = investors[0];
          currentPoolToken = IInvestor(currentInvestor).getPoolToken(assetToken);
          _invest(IERC20(assetToken).balanceOf(address(this)));
      } else {
          currentInvestor = address(0);
      }
    }
  }

  function setMarketingRate(uint256 _marketingRate) external onlyOwner{
    marketingRate = _marketingRate;
  }

  function getPricePerFullShare() public view returns (uint256) {
    return _totalSupply > 0 ? (_getAssetAmount().mul(1e18)).div(_totalSupply.add(getMarketingFee())) : 0;
  }

  // returns #shares earned
  function getMarketingFee() public view returns (uint256) {
    uint256 assetAmount = _getAssetAmount();
    return (((assetAmount.sub(investedAsset)).mul(marketingRate).mul(_totalSupply)).div(assetAmount)).div(1e18);
  }

  function getUserData() public view returns (uint256 assetIn, uint256 blockStart) {
    return (userData[msg.sender].investedAsset, userData[msg.sender].depositStartBlock);
  }

  function getApr() public view returns(uint256) {
    return IInvestor(currentInvestor).getApr(assetToken);
  }

  // return total amount of underlying asset (assetToken)
  function _getAssetAmount() public view returns (uint256)
  {
    uint256 assetAmount = (IERC20(currentPoolToken).balanceOf(address(this))
      .mul(IInvestor(currentInvestor).getExchangeRate(assetToken))).div(1e18);
    // Fix muldiv inaccuraties
    return assetAmount >= investedAsset ? assetAmount : investedAsset;
  }

  function _invest(uint256 assetAmount) private returns (uint256) {
    if (assetAmount > 0) {
      (bool success, bytes memory result) = currentInvestor.delegatecall(
        abi.encodeWithSelector(IInvestor(currentInvestor).invest.selector, assetToken, assetAmount));
      require(success, "Invest failed");
      uint256 poolAmount = abi.decode(result, (uint256));
      emit Invest(currentInvestor, assetAmount, poolAmount);
      return poolAmount;
    }
    return 0;
  }

  function _redeem(uint256 poolAmount) private returns (uint256) {
    if (poolAmount > 0) {
      (bool success, bytes memory result) = currentInvestor.delegatecall(
        abi.encodeWithSelector(IInvestor(currentInvestor).redeem.selector, assetToken, poolAmount));
      require(success, "Redeem failed");
      uint256 assetAmount = abi.decode(result, (uint256));
      emit Redeem(currentInvestor, poolAmount, assetAmount);
      return assetAmount;
    }
    return 0;
  }
}
