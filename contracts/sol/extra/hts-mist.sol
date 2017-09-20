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

  function Balances(uint initialSupply){
    root = msg.sender;
    totalSupply+=initialSupply;
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

contract Token {
    /* This is a slight change to the ERC20 base standard.
    function totalSupply() constant returns (uint256 supply);
    is replaced with:
    uint256 public totalSupply;
    This automatically creates a getter function for the totalSupply.
    This is moved to the base contract since public getter functions are not
    currently recognised as an implementation of the matching abstract
    function by the compiler.
    */
    /// total amount of tokens
    uint256 public totalSupply;

    /// @param _owner The address from which the balance will be retrieved
    /// @return The balance
    function balanceOf(address _owner) constant returns (uint256 balance);

    /// @notice send `_value` token to `_to` from `msg.sender`
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return Whether the transfer was successful or not
    function transfer(address _to, uint256 _value) returns (bool success);

    /// @notice send `_value` token to `_to` from `_from` on the condition it is approved by `_from`
    /// @param _from The address of the sender
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return Whether the transfer was successful or not
    function transferFrom(address _from, address _to, uint256 _value) returns (bool success);

    /// @notice `msg.sender` approves `_spender` to spend `_value` tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @param _value The amount of tokens to be approved for transfer
    /// @return Whether the approval was successful or not
    function approve(address _spender, uint256 _value) returns (bool success);

    /// @param _owner The address of the account owning tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @return Amount of remaining tokens allowed to spent
    function allowance(address _owner, address _spender) constant returns (uint256 remaining);

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}

contract StandardToken is Token {

  Balances public balances;

    function transfer(address _to, uint256 _value) returns (bool success) {
        //Default assumes totalSupply can't be over max (2^256 - 1).
        //If your token Zxleaves out totalSupply and can issue more tokens as time goes on, you need to check if it doesn't wrap.
        //Replace the if with this one instead.
        if (balances.getBalance(msg.sender) >= _value && balances.getBalance(_to) + _value > balances.getBalance(_to) && _value > 0) {
        //if (balances[msg.sender] >= _value && _value > 0) {
            balances.decBalance(msg.sender, _value);
            balances.incBalance(_to, _value);
            Transfer(msg.sender, _to, _value);
            return true;
        } else { return false; }
    }

    function transferFrom(address _from, address _to, uint256 _value) returns (bool success) {
        //same as above. Replace this line with the following if you want to protect against wrapping uints.
        //if (balances[_from] >= _value && allowed[_from][msg.sender] >= _value && balances[_to] + _value > balances[_to]) {
        if (balances.getBalance(msg.sender) >= _value && balances.getBalance(_to) + _value > balances.getBalance(_to) && _value > 0) {
            balances.incBalance(_to, _value);
            balances.decBalance(msg.sender, _value);
            balances.decApprove(_from, msg.sender, _value);
            Transfer(_from, _to, _value);
            return true;
        } else { return false; }
    }

    function balanceOf(address _owner) constant returns (uint256 balance) {
        return balances.getBalance(_owner);
    }

    function approve(address _spender, uint256 _value) returns (bool success) {
        //allowed[msg.sender][_spender] = _value;
        balances.setApprove(msg.sender, _spender, _value);
        Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address _owner, address _spender) constant returns (uint256 remaining) {
      return balances.getAllowance(_owner, _spender);
    }

    function totalSupply() returns(uint256){
      return balances.getTotalSupply();
    }

}

contract HumanStandardToken is StandardToken {

    function () {
        //if ether is sent to this address, send it back.
        throw;
    }

    /* Public variables of the token */

    /*
    NOTE:
    The following variables are OPTIONAL vanities. One does not have to include them.
    They allow one to customise the token contract & in no way influences the core functionality.
    Some wallets/interfaces might not even bother to look at this information.
    */
    string public name;                   //fancy name: eg Simon Bucks
    uint8 public decimals;                //How many decimals to show. ie. There could 1000 base units with 3 decimals. Meaning 0.980 SBX = 980 base units. It's like comparing 1 wei to 1 ether.
    string public symbol;                 //An identifier: eg SBX
    string public version = 'H0.2';       //human 0.1 standard. Just an arbitrary versioning scheme.

    function HumanStandardToken(
        string _tokenName,
        uint8 _decimalUnits,
        string _tokenSymbol,
        address _balancesAccount
        ) {
        balances = Balances(_balancesAccount);                 // Update total supply
        name = _tokenName;                                   // Set the name for display purposes
        decimals = _decimalUnits;                            // Amount of decimals for display purposes
        symbol = _tokenSymbol;                               // Set the symbol for display purposes
    }

    /* Approves and then calls the receiving contract */
    function approveAndCall(address _spender, uint256 _value, bytes _extraData) returns (bool success) {
        balances.setApprove(msg.sender, _spender, _value);
        Approval(msg.sender, _spender, _value);

        //call the receiveApproval function on the contract you want to be notified. This crafts the function signature manually so one doesn't have to include a contract in here just for this.
        //receiveApproval(address _from, uint256 _value, address _tokenContract, bytes _extraData)
        //it is assumed that when does this that the call *should* succeed, otherwise one would use vanilla approve instead.
        if(!_spender.call(bytes4(bytes32(sha3("receiveApproval(address,uint256,address,bytes)"))), msg.sender, _value, this, _extraData)) { throw; }
        return true;
    }
}
