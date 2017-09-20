pragma solidity ^0.4.8;

import "./Balances.sol";
import "./SafeMath.sol";


contract ExclusiveSale is SafeMath {

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
    payout = 0x704488DEDFC72Dd95277aE4c8F4AA612fA57AA6E;
    tokenExchangeRate = 1000;
    limit = 1000000 ether;

    balances = Balances(_balances);

  }

  function () payable {
    createTokens();
  }

  function createTokens() payable returns(bool){

    if (now < startTime || now > endTime) {throw;}
    if (msg.value == 0) {throw;}

    uint tokens = safeMult(msg.value, tokenExchangeRate); // check that we're not over totals
    if((tokens + balances.getTotalSupply()) > limit){throw;}

    balances.incBalance(msg.sender, tokens);
    balances.incTotalSupply(tokens);

    Mint(msg.sender, "exclusive" , tokens);  // logs token creation

    return true;
  }

  function finalize() onlyRoot returns(bool success){
      if (isFinalized) throw;
      if(now <= endTime) throw;
      // move to operational
      isFinalized = true;
      if(!payout.send(this.balance)) throw;  // send the eth to Borderless Corp
      return true;
  }

  function empty(address _sendTo) onlyRoot { if(!_sendTo.send(this.balance)) throw; }
  function kill() onlyRoot { selfdestruct(root); }
  function transferRoot(address _newOwner) onlyRoot { root = _newOwner; }

}
