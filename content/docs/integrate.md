---
order: 1
title: Integration Guide
---

# Integration Guide

## How to deposit and withdraw Minter coins

### Deposit coins
1. Generate `deposit address` for user and store its mnemonic phrase somewhere.
2. Scan blocks `https://api.minter.one/block?height=N` and check if there exists any tx on `deposit address`
	- Once found you should check:
	1. Transaction type is `Send`: tx.type == 1.
	2. `Value` and `Coin` (tx.data.value, tx.data.coin) are equal to expected values.
	3. Transaction has no `code` field or it's equal to `0`. Otherwise transaction is failed and funds are not transferred. [Here is an example](https://api.minter.one/transaction?hash=Mtdb61b938cbb06cd1bca01d99dd3a03963795bef121e503c4da566710a2daec8d) of failed tx. 
3. Send coins from `deposit address` to `master address` using mnemonic phrase from step 1.
4. Deposit coins to user account.

*Note:* Minter is based on Tendermint Consensus Engine, which has instant finality property. It means what once block is committed by ⅔ validators of network it cannot be reverted. As a result – there is no need to wait more than 1 confirmation of incoming transaction.

### Withdraw coins
1. Generate `Send` (or `Multisend`, if you expect to have multiple addresses as recipients) transaction.
2. Send transaction.
3. Wait for tx to be included in block.
4. Check that `code` field is missing or equal to `0`. 
