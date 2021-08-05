---
order: 5
title: >-
  How to Earn on USDT and USDC Stablecoins with Minter
description: >-
  Step-by-step guide to staking USDT and USDC stablecoins on Minter Network that will help you make money from farming programs and liquidity pool fees.
---

## Getting Started

The whole process takes five minutes at most and consists of two main steps:

1. Transferring USDT and USDC from Ethereum to Minter
2. Adding tokens into a liquidity pool

Once done, the only thing left is receive rewards every day.

When supplying liquidity, keep in mind that:

- Tokens are added in the same proportions (e.g., 100 USDT and 100 USDC), you can't provide only one of them
- Liquidity can be added and [removed](/earn/liquidity-providers#how-to-remove-liquidity-from-a-pool) at any time

### Step 1. Transferring tokens from Ethereum to Minter

First of all, you need to move your USDT and USDC tokens from Ethereum network to Minter. To do that, make a cross-chain transfer, meaning your tokens will be withheld on the one network *(Ethereum)* and accrued on the other *(Minter)*. The vice-versa operation (*withdrawal from Minter to Ethereum*) is just as easy. Don't worry about your funds as user-friendly cross-chain transfers are powered by an independent chain called Minter Hub (you may learn more about it here: https://www.minter.network/hub).

So, Minter-based stablecoins have the following tickers:

- [USDTE](https://chainik.io/token/USDTE) (Tether USD) — [USDT](https://etherscan.io/token/0xdac17f958d2ee523a2206206994597c13d831ec7) token, mirrored from Ethereum
- [USDCE](https://chainik.io/token/USDCE) (USD Coin) — [USDC](https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48) token, mirrored from Ethereum

Letter **E** at the end means that the token has been mirrored from Ethereum.

Go to [Minter Console](https://console.minter.network) (advanced wallet for managing tokens and pools).

If you already have a personal address on Ethereum and a seed phrase to it, it will do here as well. Minter has the same standard, just sign in.

![Minter Console](/img/docs/usdt-usdc-1.png)

Alternatively, you can create a new wallet by clicking "generate seed phrase." Write it down somewhere safe and log in.

Head to [Deposit & Withdraw](https://console.minter.network/hub) tab. In **Deposit** section, sign in with a wallet of your choice—for example, MetaMask or Trust Wallet.

![Minter Console](/img/docs/usdt-usdc-2.png)

Enter Minter address to deposit to (the one you're logged in to Minter Console with is used by default), pick token for deposit (USDTE or USDCE), and specify its amount. Tokens need to be transferred one at a time.

![Minter Console](/img/docs/usdt-usdc-3.png)

Now, you need to allow a smart contract to send tokens from your address. For that, use the "Unlock" button, or "Infinite unlock" in case you don't want to repeat this transaction every time you transfer the token in the future. Confirm the transaction from within the wallet.

Almost there! Hit **Send**.

![Minter Console](/img/docs/usdt-usdc-4.png)

Before sending, make sure all the fields are filled in correctly and pay attention to the fees:

- `Total spend`: final sum to be withdrawn from the wallet (all fees included)
- `Bridge fee`: commission payment charged by the bridge, which stands at 1%
- `Token balance`: how many tokens you have on your balance
- `Token unlocked`: how many tokens on your balance are available for sending to the Minter network

Once you have transferred one of the tokens (e.g., USDT), you need to transfer the other one (e.g., USDC) in the same amount. To do that, pick the second token, unlock it, and send.

### Step 2. Adding to a liquidity pool

After both tokens have been moved, they'll show up on your balance.

Now you can add them into the pool to supply liquidity and become an LP. In Minter Console, switch to [Pools](https://console.minter.network/pool) tab.

Locate the **ADD LIQUIDITY TO SWAP POOL** section and fill out the form.

![Minter Console](/img/docs/usdt-usdc-5.png)

- `First coin` – pick USDTE
- `First coin amount` – quantity of USDTE to be added to the pool
- `Second coin` – pick USDCE
- `Second coin amount` – quantity of USDCE to be added to the pool
- `Slippage tolerance` – slippage; acceptable change in the number of tokens at the time of sending tx (expressed in %)
- `Max amount to spend` – upper bound of the number of tokens in case of slippage

Make sure that all fields are filled in correctly and confirm the transaction. Your liquidity in USDTE and USDCE will be added into the pool right after.

Congrats! You're now a USDTE-USDCE pool's LP and will start receiving daily farming rewards as well as share of fees collected for trades made inside the pool.

## Size and Frequency of Rewards

Any participant of the network can provide their USDT and USDC stablecoins into the liquidity pool in order to generate earnings that consist of:

1. **Farming**: 0.1% and up (daily; or 36.5% yearly). This one is constant and limited by duration only
2. **Pool fees**: 0.2% on each trade. Depends on trading volumes

**Farming** means that on top of a share of fee charged for every trade (*0.2%*), you also get an additional reward for the very fact of locking your assets into the pool.

Until October 1, 2021, Minter offers a farming program for the [USDCE-USDTE](https://chainik.io/pool/USDCE/USDTE) pool:
- Everyday payouts = 0.1% on provider's total liquditiy (or 36.5% in APR)
- Accrued in BIP coin (according to the rate at the time of accrual)

*This section serves educational purposes only. The information contained herewithin does not constitute an investment, financial, legal, or tax advice, and it is not an offer or solicitation to purchase or sell any financial instrument.*
