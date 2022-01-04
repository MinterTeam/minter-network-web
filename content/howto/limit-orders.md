---
order: 7
title: >-
  Limit Orders in Minter
description: >-
  Guide to limit orders: how to buy and sell cryptocurrency at a specific price with Minter.
---

# Limit Orders in Minter

Minter DEX supports creation and execution of limit buy and sell orders for any asset. Limit orders are located inside liquidity pools. One of the features of this approach is that part of the volume may be automatically filled through a limit order, while the remaining part, via regular AMM inside the pool in question. [More detail >>](https://minterteam.medium.com/minter-2-on-chain-automated-market-maker-with-order-book-e29b19fc365f)

## Characteristics
- The fees for creation and manual cancellation of a limit order are **$0.1** and **$0.01**, respectively;
- The order is automatically canceled in 483,840 blocks (≈25 days);
- If the order is automatically canceled, the fee is not charged;
- Placement, cancellation, and list of your own orders are available in the [Limit Orders](https://console.minter.network/order) section of Minter Console;
- The order's price may be set at: x5 (above) and 1/5 (below) the current in-pool price. *For example, let's take the BIP-USDTE pool where BIP = 0.004 USDTE. The maximum sell price would be 0.02 USDTE, and the minimum buy price, 0.0008 USDTE*;
- Limit orders are placed "on top of" a liquidity pool, extending it ([watch video about AMMOB](https://youtu.be/CnZ9I4eFeOk));
- 0.2% on the volume of the filled order goes into the pool (in both tokens, at the 1:1 ratio), making it "richer." This fee is earned by [liquidity providers](https://www.minter.network/earn/liquidity-providers) (who, at the same time, do not experience any [Impermanent Loss](https://www.minter.network/earn/impermanent-loss) at the moment of fulfillment);
- Partial execution is allowed;
- Order books can be accessed from the pool's page in Minter Explorer.

## How to Place a Limit Order
Go to the [Limit Orders](https://console.minter.network/order) tab in Minter Console. Fill in a form:

![how to create limit order](/img/docs/create-limit-order.png)

- Specify a coin you are willing to sell, its amount, and the price at which you want to sell it
- Specify a coin you are willing to buy. Its amount and the inverted price will be calculated automatically

The only thing left to do is place the limit order by confirming the transaction. In the example below, we are selling 0.1 BTC priced at $54,000. If the order comes through, we will get 5,400 USDTE:

![how to place limit order](/img/docs/place-limit-order.png)

## How to Cancel a Limit Order

The orders are auto-canceled in 483,840 blocks (≈25 days); however, you may also withdraw them manually. For that, click on the "–" button next to the order you've placed on the list of all orders:

![how to cancel limit order](/img/docs/cancel-limit-order.png)

The order's identifier will be fetched into the corresponding field. Now confirm the removal transaction:

![how to remove limit order](/img/docs/remove-limit-order.png)
