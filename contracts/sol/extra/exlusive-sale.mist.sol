pragma solidity ^0.4.8;

contract Balances {
  // GLOBAL VARS
  address public root;

  uint public totalSupply;

  // EVENTS
  event BalanceAdj(address indexed Module, address indexed Account, uint Amount, string Polarity);
  event ModuleSet(address indexed Module, bool indexed Set);

  // MAPPINGS
  mapping(address=>bool) public modules;
  mapping(address=>uint) public balances;
  mapping (address => mapping (address => uint256)) allowed;

  // MODIFIERS
  modifier onlyModule(){
    if(modules[msg.sender] == true){ _ ;} else { throw; }
  }

  modifier onlyRoot(){
    if(root == msg.sender){ _ ;} else { throw; }
  }

  function Balances(){
    root = msg.sender;
  }

  // GET BALANCE
  function getBalance(address _acct) returns(uint balance){
    return balances[_acct];
  }

  // UPDATE BALANCE FUNCTIONS
  function incBalance(address _acct, uint _val) onlyModule returns(bool success){
    balances[_acct]+=_val;
    BalanceAdj(msg.sender, _acct, _val, "+");
    return true;
  }

  function decBalance(address _acct, uint _val) onlyModule returns(bool success){
    balances[_acct]-=_val;
    BalanceAdj(msg.sender, _acct, _val, "-");
    return true;
  }

  // ALLOWED
  function getAllowance(address _owner, address _spender) returns(uint remaining){
    return allowed[_owner][_spender];
  }

  function setApprove(address _sender, address _spender, uint256 _value) onlyModule returns (bool success) {
      allowed[_sender][_spender] = _value;
      return true;
  }

  function decApprove(address _from, address _spender, uint _value) onlyModule returns (bool success){
    allowed[_from][_spender] -= _value;
    return true;
  }

  // GET MODULE
  function getModule(address _acct) returns (bool){
    return modules[_acct];
  }

  // SET MODULE
  function setModule(address _acct, bool _set) onlyRoot returns(bool success, address module, bool set){
    modules[_acct] = _set;
    ModuleSet(_acct, _set);
    return (true, _acct, _set);
  }

  function getTotalSupply() returns(uint){
      return totalSupply;
  }

  function incTotalSupply(uint _val) onlyModule returns(bool success){
      totalSupply+=_val;
      return true;
  }

  function decTotalSupply(uint _val) onlyModule returns(bool success){
      totalSupply-=_val;
      return true;
  }

  /* Administration Functions */

 function empty(address _sendTo) onlyRoot { if(!_sendTo.send(this.balance)) throw; }
 function kill() onlyRoot { selfdestruct(root); }
 function transferRoot(address _newOwner) onlyRoot { root = _newOwner; }

}

contract SafeMath {

    function assert(bool assertion) internal {
       if (!assertion) {
         throw;
       }
     }      // assert no longer needed once solidity is on 0.4.10 */

    function safeAdd(uint256 x, uint256 y) internal returns(uint256) {
      uint256 z = x + y;
      assert((z >= x) && (z >= y));
      return z;
    }

    function safeSubtract(uint256 x, uint256 y) internal returns(uint256) {
      assert(x >= y);
      uint256 z = x - y;
      return z;
    }

    function safeMult(uint256 x, uint256 y) internal returns(uint256) {
      uint256 z = x * y;
      assert((x == 0)||(z/x == y));
      return z;
    }
}

contract ExlusiveSale is SafeMath {

  event Mint(address indexed User, string Action, uint Amount);

  address public root; // address that creates the contract
  address public payout; // address that recieves the ico payout

  uint public startTime; // when the ico starts
  uint public endTime; // when the ico ends
  uint public tokenExchangeRate; // exchange rate (not in wei)
  uint public limit;

  bool public isFinalized;

  Balances public balances;

  modifier onlyRoot(){
    if(root == msg.sender){ _ ;} else { throw; }
  }

  function ExlusiveSale(address _balances){


      startTime = block.timestamp;



      endTime = block.timestamp + (7 days);


    root = msg.sender;
    payout = msg.sender;
    tokenExchangeRate = 100;
    limit = 100000000 ether;

    balances = Balances(_balances);

  }

  function () {
    createTokens();
  }

  function createTokens() payable returns(bool){

    if (now < startTime || now > endTime) {throw;}
    if (msg.value == 0) {throw;}

    uint tokens = safeMult(msg.value, tokenExchangeRate); // check that we're not over totals
    if((tokens + balances.getTotalSupply()) > limit){throw;}

    balances.incBalance(msg.sender, tokens);
    balances.incTotalSupply(tokens);

    Mint(msg.sender, "exlusive-ico" , tokens);  // logs token creation

    return true;
  }

  function finalize() onlyRoot returns(bool success){
      if (isFinalized) throw;
      if(block.timestamp <= (endTime + 30 days)) throw;
      // move to operational
      isFinalized = true;
      if(!payout.send(this.balance)) throw;  // send the eth to Borderless Corp
      return true;
  }

  function empty(address _sendTo) onlyRoot { if(!_sendTo.send(this.balance)) throw; }
  function kill() onlyRoot { selfdestruct(root); }
  function transferRoot(address _newOwner) onlyRoot { root = _newOwner; }

}
