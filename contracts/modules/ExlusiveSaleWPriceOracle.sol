pragma solidity ^0.4.8;

import "./Balances.sol";
import "./SafeMath.sol";
import "./PriceOracle.sol";
import "./HumanStandardToken.sol";


contract ExlusiveSale is SafeMath {

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

  function ExlusiveSale(address _balances){


      startTime = block.timestamp + 14 days;

      endTime = startTime + (14 days);


    root = msg.sender;
    payout = 0x6a620a92Ec2D11a70428b45a795909bd28AedA45;
    cost = 8;
    limit = 250000 ether;

    balances = Balances(_balances);
    prices = PriceOracle(0xa265cef3551b389b10001bc876d8c5324ca5c15d);

  }

  function () payable {
    createTokens();
  }

  function createTokens() payable returns(bool){

    if (now < startTime || now > endTime) {throw;}
    if (msg.value == 0) {throw;}

    uint cRate = prices.getConversion(cost);
    uint tokens = safeMult(msg.value, cRate) / 1 ether; // check that we're not over totals

    if((tokens + balances.getTotalSupply()) > limit){throw;}

    balances.incBalance(msg.sender, tokens);
    balances.incTotalSupply(tokens);

    Mint(msg.sender, "exclusive" , tokens, cRate);  // logs token creation

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
