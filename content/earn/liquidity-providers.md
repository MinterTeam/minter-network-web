---
order: 8
title: Who Are Liquidity Providers?
---

# Who Are LPs?

In order for [traders](/earn/trading) to be able to buy and sell via [pools](/earn/liquidity-pools), the pools need liquidity. That liquidity is supplied by LPs, who receive a share of [swap fees](/earn/lp-fees) standing at 0.2% on the volume of token sold. This fee is paid by traders for each transaction they make inside the pool. The provider's rewards go straight into the pool, enriching it.

## How to Add Liquidity into a Pool

By adding liquidity, users provide their own funds into a pool. Thanks to those funds, traders can make transactions, while AMM controls the ratio of coins/tokens and regulates the price depending on direction (*buy or sell*).

Liquidity can be added into a pool that already exists. To do that, go to [Minter Console](https://console.minter.network/pool), tab **Pools**. Find the **ADD LIQUIDITY TO SWAP POOL** section and fill in the form:

![Add liquidity](/img/docs/l-add.png)

- First coin: ticker of the first coin/token to be added into a pool
- First coin amount: quantity of the first coin/token to be added into a pool
- Second coin: ticker of the second coin/token to be added into a pool
- Second coin amount: quantity of the second coin/token to be added into a pool
- Slippage tolerance: acceptable change in the number of coins/tokens at the time of sending tx (expressed in %)
- Max amount to spend: upper bound of the number of coins/tokens in case of slippage

Make sure that all fields are filled in correctly and confirm the transaction. Your liquidity will be added into a pool right after.

## How to Remove Liquidity from a Pool

To withdraw liquidity you've added before, use [Minter Console](https://console.minter.network/pool) as well. Tab **Pools**, section **REMOVE LIQUIDITY FROM SWAP POOL**:

![Remove liquidity](/img/docs/l-remove.png)

- First coin: ticker of the first coin/token in a pool
- First coin amount: quantity of the first coin/token to be withdrawn from a pool
- Second coin: ticker of the second coin/token in a pool
- Second coin amount: quantity of the second coin/token to be withdrawn from a pool
- Slippage tolerance: acceptable change in the number of coins/tokens at the time of sending tx (expressed in %)
- Minimum amount to spend: lower bound of the number of coins/tokens in case of slippage
- Liquidity: how much of your liquidity you want back (expressed in %)
- Pool tokens amount: number of LP tokens to be burned

*This material serves educational purposes only. The information contained herewithin does not constitute an investment, financial, legal, or tax advice, and it is not an offer or solicitation to purchase or sell any financial instrument.*
