---
order: 2
title: How to Securely Store User Funds in Multisig Wallets
description: >-
  A guideline to safe storage of user funds on multi-signature addresses.
---

# How to Securely Store User Funds in Multisig Wallets

## Concept
This integration option is optimal for achieving the following goals:
- high security of the solution with reasonable complexity of implementation
- maximum simplicity for users as they do not have to worry about seed phrases and may not even know that everything runs on blockchain

We will securely store user funds in [multisig](/docs#multisignatures) wallets. Each multisig wallet will have three owner wallets (or three signers) with two signatures required to confirm the transaction.

1. The **hot** owner wallet is unique for each multi-signature address and stored in a database on a separate server
2. The so-called **cool** owner wallet, single for all users, is stored both on the server and "on paper"
3. **Cold** owner wallet is stored only "on paper"

Hot and cool wallets will be used to sign transactions during normal service operation.

Cool and cold wallets will be used to transfer funds into a safe place in case security has been compromised. To do that, one will also need to implement a system monitoring server logs and movement of funds between wallets so that the exact moment of hack can be established. A script for automatic or semi-automatic withdrawal of funds to a safe place will also be needed.

## Structure
In general, the system will consist of the following services:
- App, a backend with business logic responsible for when and how many coins to transfer from user to user
- MQ, a message broker for other services
- Keeper, a service that stores seed phrases of hot wallets
- Cooler, a service that stores a cool wallet

### App
- stores information about users
- when creating a new user, it sends the "-> MQ -> Keeper" request to create a hot wallet, creates a multisig address with the obtained address, and saves the multisig address
- initiates sending a transaction: prepares a transaction and sends a request to MQ to sign the generated transaction
- waits for two signatures and uses them to send a transaction to the blockchain

### MQ
[NATS](https://docs.nats.io/whats_new_20) would be a good choice because it knows how to sign messages.
- responsible for communication between services
- openly available on the web
- the authenticity of messages is ensured by the signature https://docs.nats.io/nats-server/configuration/securing_nats/auth_intro/nkey_auth

### Keeper
- stores users' seeds
- can create a seed for a new user upon App's request
- signs the transaction with the user's private key upon App's request

### Cooler
- stores our cool wallet
- signs the transaction upon App's request

## Features
Keeping wallets on separate servers protects against seed database leakage.
Communication via MQ with signature authorization leads to App and MQ not knowing the physical locations of Keeper and Cooler. Accordingly, their identification and hacking become more difficult.
App carries the most vulnerability. In case an attacker gains full access to this server, they will be able to send transactions to transfer funds.

### Points to consider
- the seeds in the Keeper and Cooler databases should be additionally encrypted, for example, using [Vault](https://www.vaultproject.io)
- Keeper and Cooler should be each located in a separate data center to exclude simultaneous physical access to both servers
- the system should be monitored and funds should be automatically or semi-automatically transferable in case of danger
- the App database should be backed up so as not to lose the connection between user id's and their funds on the blockchain
- cool and cold wallets should be safeguarded

### Alternatives
- *(normal, complication)* you can complicate the system in various ways, which will increase safety and make it more difficult for an intruder to hijack it. It will also, however, increase the complexity and cost of maintaining the service
- *(normal, simplification)* you can encrypt seeds in the database not with Vault, but with the user's password from the App or with a separate `uuid` stored in the App as an encryption key. In this scenario, with each request for a signature, you will need to transmit that key to the Keeper
- *(normal, simplification)* you can move hot wallets from the Keeper to the App, encrypt them there with a password, and leave only a cool wallet on a separate server
- *(bad, simplification)* funds can be stored not on multi-signature addresses, but on ordinary ones. In this scenario, however, the database breach would be enough to steal funds
- *(bad, simplification)* you can give seed phrases to users instead of storing their funds yourself. This would be the safest solution, but very difficult for users
