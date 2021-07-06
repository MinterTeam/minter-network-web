---
order: 17
title: How to Make a Cross-Chain Transfer
---

# How to Make a Cross-Chain Transfer

A cross-chain transfer means moving the same token between different blockchains. Such transfers are processed by the [Minter Hub](/earn/minter-hub) bridge in a completely decentralized way.

## How to Transfer Tokens from Ethereum to Minter (Deposit)

1. Generate a new address using [Minter Console](https://console.minter.network/) or sign in with the seed phrase if you already have one
2. Go to the [Deposit & Withdraw](https://console.minter.network/hub) section
3. In the **Deposit** form, log in with the wallet where you have tokens
4. Specify the receiver address (the address with which you logged in to Minter Console is set by default)
5. Choose the token available for deposit
6. Enter the number of tokens to be transferred. For simplicity, you may click on **USE MAX**
7. Now you need to unlock the amount you've specified for a smart contract (if you want to make all of your tokens readily available, tick the **Infinite unlock** box). Hit **Unlock** and confirm the transaction using the Ethereum wallet you've connected (you'll be charged a fee in ETH)
8. Once the Approve transaction has been confirmed by the Ethereum network, you'll see the amount of unlocked tokens ready to be deposited in the Deposit form. The only thing left to do is press **Send**, and your tokens will move from Ethereum to Minter. You'll be charged an ETH fee for this transaction as well

After the transaction has been validated by the network and the bridge, its status will change to Success. Now the tokens are spendable from your Mx address.

## How to Transfer Tokens from Minter to Ethereum (Withdrawal)

1. Enter an Ethereum address to which you want to receive tokens
2. Select a token for cross-chain transfer
3. Specify necessary amount
4. Click **Withdraw**

**Beware!**

- Withdraw to your personal address only;
- Do not withdraw to smart contracts, accounts on exchanges, or addresses that you don't have direct access to (seed phrase);
- Always take into account Ethereum and Minter Hub fees;
- Minter Hub is [open-source](https://github.com/MinterTeam/minter-hub), meaning you can examine its code if needed.

## Which Tokens Are Available to Be Transferred Cross-Chain?

You may find the up-to-date list of tokens with enabled cross-chain transfer feature in [Minter Console](https://console.minter.network/hub) (the **DEPOSIT & WITHDRAW** menu).

![Cross-chain tokens](/img/docs/cross.png)

More on [how support is added for new tokens](/earn/new-tokens).

*This material serves educational purposes only. The information contained herewithin does not constitute an investment, financial, legal, or tax advice, and it is not an offer or solicitation to purchase or sell any financial instrument.*
