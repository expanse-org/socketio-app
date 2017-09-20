/*
You should inherit from StandardToken or, for a token like you would want to
deploy in something like Mist, see HumanStandardToken.sol.
(This implements ONLY the standard functions and NOTHING else.
If you deploy this, you won't have anything useful.)

Implements ERC 20 Token standard: https://github.com/ethereum/EIPs/issues/20
.*/
pragma solidity ^0.4.8;

import "./Token.sol";
import "./Balances.sol";

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
