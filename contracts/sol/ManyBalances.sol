// This Contract stores ALL of the verified token balances in one place.
// The root account cannot change any balances, but can kill and replace issuance modules

pragma solidity ^0.4.8;

contract ManyBalances {
  // GLOBAL VARS
  address public owner;

  //uint public totalSupply;

  // EVENTS
  event BalanceAdj(bytes32 indexed Token, address indexed Module, address indexed Account, uint Amount, string Polarity);
  event ModuleSet(bytes32 indexed Token, address indexed Module, bool indexed Set);
  event NewToken(bytes32 indexed Token);
  event AdminSet(bytes32 indexed Token, address indexed Admin);

  // MAPPINGS
  mapping(address=>bool) public root;
  mapping(bytes32=>bool) public tokens;

  mapping(bytes32=>mapping(address=>bool)) public modules;
  mapping(bytes32=>mapping(address=>uint)) public balances;
  mapping(bytes32=>mapping(address => mapping (address => uint256))) allowed;
  mapping(bytes32=>uint) public totalSupply;
  mapping(bytes32=>mapping(address=>bool)) public admins;

  // MODIFIERS
  modifier onlyModule(bytes32 _token){
    if(modules[_token][msg.sender] == true){ _ ;} else { throw; }
  }

  modifier onlyOwner(){
    if(owner == msg.sender){ _ ;} else { throw; }
  }

  modifier onlyRoot(){
    if(root[msg.sender] == true || owner == msg.sender){ _ ;} else { throw; }
  }

  modifier onlyRootOrAdmin(bytes32 _token){
    if(root[msg.sender] == true || admins[_token][msg.sender] == true) || owner == msg.sender{ _ ;} else { throw; }
  }

  function () {
      //if ether is sent to this address, send it back.
      throw;
  }

  function Balances(){
    owner = msg.sender;
  }

  function newToken(bytes32 _token, address _admin) onlyRoot() returns(bool success){
    if(tokens[_token] == true){throw;}

    tokens[_token] = true;
    admins[_token][_admin] = true;

    NewToken(_token);
    return true;
  }

  function setTokenAdmin(bytes32 _token, address _admin, bool _set) onlyRoot() returns(bool success){
      admins[_token][_admin] = _set;
      AdminSet(_token, _admin);
      return true;
  }

  // GET BALANCE
  function getBalance(bytes32 _token, address _acct) returns(uint balance){
    return balances[_token][_acct];
  }

  // UPDATE BALANCE FUNCTIONS
  function incBalance(bytes32 _token, address _acct, uint _val) onlyModule(_token) returns(bool success){
    balances[_token][_acct]+=_val;
    BalanceAdj(_token, msg.sender, _acct, _val, "+");
    return true;
  }

  function decBalance(bytes32 _token, address _acct, uint _val) onlyModule(_token) returns(bool success){
    balances[_token][_acct]-=_val;
    BalanceAdj(_token, msg.sender, _acct, _val, "-");
    return true;
  }

  // ALLOWED
  function getAllowance(bytes32 _token, address _owner, address _spender) returns(uint remaining){
    return allowed[_token][_owner][_spender];
  }

  function setApprove(bytes32 _token, address _sender, address _spender, uint256 _value) onlyModule(_token) returns (bool success) {
      allowed[_token][_sender][_spender] = _value;
      return true;
  }

  function decApprove(bytes32 _token, address _from, address _spender, uint _value) onlyModule(_token) returns (bool success){
    allowed[_token][_from][_spender] -= _value;
    return true;
  }

  // GET MODULE
  function getModule(bytes32 _token, address _acct) returns (bool success){
    return modules[_token][_acct];
  }

  // SET MODULE
  function setModule(bytes32 _token, address _acct, bool _set) onlyRootOrAdmin(_token) returns(bool success){
    modules[_token][_acct] = _set;
    ModuleSet(_token, _acct, _set);
    return true;
  }

  function getTotalSupply(bytes32 _token) returns(uint){
      return totalSupply[_token];
  }

  function incTotalSupply(bytes32 _token, uint _val) onlyRootOrAdmin(_token) returns(bool success){
      totalSupply[_token]+=_val;
      return true;
  }

  function decTotalSupply(bytes32 _token, uint _val) onlyRootOrAdmin(_token) returns(bool success){
      totalSupply[_token]-=_val;
      return true;
  }

  /* Administration Functions */
 function setAdmin(){

 }

 function empty(address _sendTo) onlyRoot { if(!_sendTo.send(this.balance)) throw; }
 function kill() onlyOwner { selfdestruct(owner); }
 function addRoot(address _newRoot) onlyOwner() { root[_newRoot] = true; }
 function transferRoot(address _newRoot) onlyRoot() { root[_newRoot] = true; root[msg.sender] == false; }

}
