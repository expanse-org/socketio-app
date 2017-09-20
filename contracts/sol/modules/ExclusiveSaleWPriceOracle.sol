pragma solidity ^0.4.8;

import "./Balances.sol";
import "./SafeMath.sol";
import "./PriceOracle.sol";


contract ExclusiveSale is SafeMath {

  event Mint(address indexed User, string Action, uint Amount, uint Rate);

  address public root; // address that creates the contract
  address public payout; // address that recieves the ico payout

  uint public startTime; // when the ico starts
  uint public endTime; // when the ico ends
  uint public cost; // exchange rate (not in wei)
  uint public limit;

  bool public isFinalized;

  Balances public balances;
  PriceOracle public prices;

  modifier onlyRoot(){
    if(root == msg.sender){ _ ;} else { throw; }
  }

  function ExclusiveSale(address _balances, address _priceOracle){


      startTime = block.timestamp;

      endTime = startTime + (14 days);


    root = msg.sender;
    payout = 0x15656715068aB0dBdF0AB00748a8A19e40F28192;
    cost = 8;
    limit = 12500000 ether; // $1m

    balances = Balances(_balances);
    prices = PriceOracle(_priceOracle);

  }

  function () payable {
    createTokens();
  }

  // EXPANSE
  function createTokens() payable returns(bool){

    if (now < startTime || now > endTime) {throw;}
    if (msg.value == 0) {throw;}

    uint price = prices.getPrice() / 1 ether;
    uint tokens = safeMult(msg.value, price) / cost; // check that we're not over totals

    if((tokens + balances.getTotalSupply()) > limit){throw;}

    balances.incBalance(msg.sender, tokens);
    balances.incTotalSupply(tokens);

    Mint(msg.sender, "expanse-contribution" , tokens, price);  // logs token creation

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
