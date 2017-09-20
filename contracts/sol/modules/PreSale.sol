// Presale
// Any account with admin priveldges can trigger the mint tokens function
pragma solidity ^0.4.8;

import "./Balances.sol";
import "./SafeMath.sol";
import "./PriceOracle.sol";


contract PreSale is SafeMath {

  event Mint(address indexed User, string Action, uint Amount, uint Rate);
  event AdminMint(address indexed User, string Action, string Coin, string TXID, uint USD, uint Tokens);

  address public root; // address that creates the contract
  address public payout; // address that recieves the ico payout

  uint public startTime; // when the ico starts
  uint public endTime; // when the ico ends
  uint public cost; // exchange rate (not in wei)
  uint public limit;

  bool public isFinalized;

  Balances public balances;
  PriceOracle public prices;

  mapping(address=>bool) public admins;

  modifier onlyRoot(){
    if(root == msg.sender){ _ ;} else { throw; }
  }

  modifier onlyRootOrAdmin(){
    if(root == msg.sender || admins[msg.sender] == true){ _ ;} else { throw; }
  }

  function PreSale(address _balances, address _priceOracle){


      startTime = block.timestamp;

      endTime = startTime + (28 days);


    root = msg.sender;
    payout = 0x15656715068aB0dBdF0AB00748a8A19e40F28192;
    cost = 9;
    limit = 11111111 ether;

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

  // OTHER CURRENCIES
  // _usdValue == $xx.xx * 100
  function adminCreateTokens(address _receiver, string _coin, string _txid, uint _usdValue) payable onlyRootOrAdmin returns(bool){

    if (now < startTime || now > endTime) {throw;}

    // dollar amount in cents EX. $25 == 2500
    // convert cents into 2500.000000000000000000 for accuracy
    uint usd = (_usdValue * 1 ether);

    // $25.00 / ($0.09) == 277.7778
    // 2500 / 9 = 277.7778
    uint tokens = usd/cost;

    if((tokens + balances.getTotalSupply()) > limit){throw;}

    balances.incBalance(_receiver, tokens);
    balances.incTotalSupply(tokens);

    AdminMint(_receiver, "offchain-contribution", _coin, _txid, usd, tokens);

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
