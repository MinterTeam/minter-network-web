---
order: 5
---

# How to Create Your Own Coin on Minter

Any participant of the Minter network can create a coin with the parameters they need. Each custom coin implies being backed by BIP at a chosen ratio (CRR). That way, the instant liquidity principle is maintained, meaning any coin can be swapped for any other coin in any volume.

## Coin Parameters

To create a coin, go to the [corresponding section in Console](https://console.minter.network/coiner):

![Create coin](/img/docs/create-coin-en.png)

- **Coin name** - full name of the coin, up to 64 characters long (you may use spaces, mix upper and lower cases, insert emojis). Doesn't necessarily have to be unique;
- **Coin symbol** - short, unique name of the coin (also known as ticker symbol) that consists of numbers and uppercase English letters. Must be 3 to 10 characters long;
- **Initial amount** - the number of coins to be issued at first (up to 1 000 000 000 000 000 units);
- **Initial reserve** - you need to have this amount on your balace. Must be more than or equal to 10 000 BIP;
- **CRR** *(Constant Reserve Ratio)* - the higher the ratio, the lower the price volatility. A number from 10 to 100 (in %);
- **Max. supply** - total supply of your coin will never be more than a number specified here (up to 1 000 000 000 000 000 units);
- **Message** - can be used to provide a more detailed description of the coin. An arbitrary string (up to 1 024 symbols);
- **Coin to pay fee** - self-explanatory.

Depending on the length of the ticker, the creator will be charged a fee that will be then distributed among validators and therefore, their delegators:

- 3 characters — 1 000 000 BIP
- 4 characters — 100 000 BIP
- 5 characters — 10 000 BIP
- 6 characters — 1 000 BIP
- 7–10 characters — 100 BIP

## Supply

Supply refers to the number of issued coins. When creating a coin, you set initial supply. It increases when someone buys the coin and decreases when someone sells it. By default, the maximum supply is set to 1 000 000 000 000 000 units, but you can impose your own limit manually in the process of creation.

## Reserve

Reserve refers to a custom coin being backed by the base coin, which is BIP. It can't be lower than 10 000 BIP (neither at the start, nor after the coin has entered circulation). The minimum mandatory reserve approach allows for avoiding the liquidation of coins, which was possible up to Minter version 1.1. This means reduced risks for potential buyers and fewer opportunities for scammers. Transactions (sell, pay fee) causing the coin's reserve to fall below this level will be rejected by the network.

## CRR

To ensure that each coin on the Minter network is absolutely and instantly liquid, all of them have a BIP reserve. The initial reserve is set during creation and can later increase or decrease depending on a given operation.

The CRR *(Constant Reserve Ratio)* value determines the degree of liquidity—i.e., how much each coin in the total supply is reserved. The higher the CRR, the bigger the backing, the more resistance to fluctuations. For example, with a CRR of 100%, the coin's price will always remain the same. For more examples of coins with different CRRs and an in-depth description of the instant & absolute liquidity mechanism, check out [this document](https://about.minter.network/Minter_PCO.pdf).
