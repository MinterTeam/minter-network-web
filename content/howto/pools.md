---
order: 2
title: How to Create and Use a Liquidity Pool
description: >-
  How to create a liquidity pool? How to add liquidity or remove it?
---

# How to Use Minter's Liquidity Pools

## What's a Liquidity Pool?

A liquidity pool is a trading pair of coins/tokens with locked-up funds of liquidity providers that guarantee swappability. Buying or selling through a liquidity pool, a trader uses funds that have been locked into the pool. The process is carried out using Automated Market Maker (AMM). You can view all liquidity pools that have been created on the Minter network [here](https://explorer.minter.network/pools).

## How to Create a Liquidity Pool

You can create a new pool via [Minter Console](https://console.minter.network/pool) by sending a special transaction in the Pools section.

![LP creation](/img/docs/pool1.jpg)

To do that:
1. Choose two coins or tokens that will form a trading pair
2. Specify the necessary amounts of both coins/tokens. These values will determine the pool's starting liquidity
3. Check the initial prices for each direction, make sure the proportions are correct
4. Press 'Create' and confirm the transaction

A liquidity pool will be created upon tx confirmation. Any user will now be able to make swaps within it and supply their own liquidity.

## How to Add Liquidity

To provide liquidity into an existing pool, fill out a special form in the Console:

![Provide liquidity](/img/docs/pool2.jpg)

1. Pick a pair of coins or tokens participating in a given pool
2. Specify the amount of either of them
3. Check the estimated amount of the second coin/token and make sure there's enough of it on your balance
4. If needed, you may also specify the maximum amount of the second coin/token to account for possible slippage at the moment of liquidity addition
5. Click 'Add' and confirm the transaction

The liquidity you've supplied will start participating in a given pool upon tx confirmation. For that, you'll receive LP tokens that will represent your share of pool.

## How to Remove Liquidity

To withdraw liquidity from a pool, you need to have its LP tokens (which are accrued upon creation and liquidity addition). Fill out a special form in the Console:

![Withdraw liquidity](/img/docs/pool3.jpg)

1. Specify the coins or tokens of a pool you want to remove liquidity from
2. Enter the percentage (with 100% meaning withdrawal of all liquidity you provide)
3. Check the number of coins/tokens to return
4. Press 'Remove' and confirm the transaction

Your liquidity will be withdrawn from a given pool upon tx confirmation. The coins/tokens will return to your balance and become freely available.
