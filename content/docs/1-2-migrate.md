---
order: 2
title: Minter 1.2 Migration Guide
---

# Minter 1.2 Migration Guide

**1. Coin Archiving**

1. Starting from version 1.2, coins will have unique numerical IDs.
```json
{
   "id": 1,
   "name": "Test Coin",
   ...
}
```

API responses now return structure (instead of a ticker symbol):
```json
{
   "id": 1,
   "symbol": "TEST"
}
```

All coin-related transactions are modified so that queries use IDs:
```go
type SendData struct {  
  Coin  types.CoinID  
  To    types.Address  
  Value *big.Int  
}
```

In the case of JS SDK, you can keep using coin tickers in the code but you’ll have to replace them with IDs through the `replaceCoinSymbol` method, which will send a request to API asking for IDs of transferred coins and insert them back into the transferred object.
```js
import {Minter, TX_TYPE} from "minter-js-sdk";

const minter = new Minter({apiType: 'gate', baseURL: 'https://gate-api.testnet.minter.network/api/v2/'});
const symbolTxParams = {
    chainId: 1,
    type: TX_TYPE.SEND,
    data: {
        to: 'Mx7633980c000139dd3bd24a3f54e06474fa941e16',
        value: 10,
        coin: 'BIP', // <= coin symbol
    },
    gasCoin: 'MYCOIN', // <= coin symbol
};

// replace coin symbols in tx params with coin ids
const idTxParams = await minter.replaceCoinSymbol(symbolTxParams);
console.log(idTxParams);
// {
//     chainId: 1,
//     type: 1,
//     data: {
//         to: 'Mx7633980c000139dd3bd24a3f54e06474fa941e16',
//         value: 10,
//         coin: 0, <= replaced with ID
//     },
//     gasCoin: 987 <= replaced with ID
// }
minter.postTx(idTxParams, {privateKey: '0x123...'})
```

In GO SDK v2, we’ve implemented methods of obtaining coin IDs by their tickers from [HTTP](https://pkg.go.dev/github.com/MinterTeam/minter-go-sdk/v2/api/http_client#Client.CoinID) and [gRPC](https://pkg.go.dev/github.com/MinterTeam/minter-go-sdk/v2/api/grpc_client#Client.CoinID) clients:
```go
client, _ := http_client.New("http://localhost:8843/v2") // or client, _ := grpc_client.New("localhost:8842")
id, _ := client.CoinID("BIP")
dataSend := transaction.NewSendData().SetCoin(id) // ...
```

2.  Each coin now has an owner: `owner_address`. For new coins, addresses that have created them will be set as owners. For old coins, there may be no owner at all (null value).

3.  The owner can reissue the coin. Suppose there is COIN, and its owner sends a transaction to recreate it. At that point, the old coin is renamed to COIN-1, and the new one is issued under the ticker COIN.
```go
type RecreateCoinData struct {
  Name                 string
  Symbol               types.CoinSymbol
  InitialAmount        *big.Int
  InitialReserve       *big.Int
  ConstantReserveRatio uint
  MaxSupply            *big.Int
}
```

Type: `0x10`
Fee: 10 000 000 units (10k BIP)

4.  The owner can transfer ticker ownership rights to another address.
```go
type EditCoinOwnerData struct {
  Symbol   types.CoinSymbol
  NewOwner types.Address
}
```

Type: `0x11`
Fee: 10 000 000 units (10k BIP)

----------

**2. Stake Calculation Formula Change**

The new way of calculating the stake of a custom coin:

`bipValue = (reserve-CalculateSaleReturn(nonDelegatedSupply)) * value / totalDelegatedValue`

The old one:

`bipValue = CalculateSaleReturn(totalDelegatedSupply) * value / totalDelegatedValue`

----------

**3. Limiting the No. of Validators**

Validators with small stakes (less than 1% of voting power) do not affect the decision-making process and decentralization of the network, but they slow it down significantly being equal participants of the consensus.

To maximize the Minter Network’s efficiency, we’re bringing the maximum number of validators down to 64.

----------

**4. Adding Third (Control) Address for a Validator**

To safeguard the validators, we’re introducing the third managing address: ControlAddress. Its functionality is strictly limited to switching masternode on and off (SetCandidateOnline/SetCandidateOffline transactions).

Changes in the EditCandidate transaction:
```go
type EditCandidateData struct {  
  PubKey         types.Pubkey  
  RewardAddress  types.Address  
  OwnerAddress   types.Address  
  ControlAddress types.Address  
}
```

----------

**5. New transaction: EditCandidatePublicKey**

```go
type EditCandidatePublicKeyData struct {  
  PubKey    types.Pubkey  
  NewPubKey types.Pubkey  
}
```

Type: `0x14`
Fee: 100 000 000 units (100k BIP)

The transaction must be sent from the validator (OwnerAddress). Once changed, the old public key is blacklisted and cannot be declared again.

**6. New transaction: EditMultisig**

The transaction allows one to make changes to the list of MultiSig owners and threshold without changing the address itself. 
```go
type EditMultisigData struct {  
  Threshold uint  
  Weights   []uint  
  Addresses []types.Address  
}
```

Type: `0x12`
Fee: 1 000 units (1 BIP)

The transaction must be sent from the MultiSig address and signed by the required number of owners.

**7. New transaction: PriceVote**

To run complex smart contracts and services, we need a way to discover the price of BIP on-chain. We’ll start development with introducing a new type of transaction: PriceVote. Validators will broadcast the current market price of BIP onto the network, and their votes will form the weighted average price that the services will be able to use.

Type: `0x13`
Fee: 10 units (0.01 BIP)

**8. WaitList**

Stakes that drop out of the top 1,000 slots of a validator will no longer be returned automatically. From now on, they will get into WaitList with the `minter/StakeKickEvent` event.
```go
type StakeKickEvent struct {  
  Address         types.Address `json:"address"`  
  Amount          string        `json:"amount"`  
  Coin            types.CoinID  `json:"coin"`  
  ValidatorPubKey types.Pubkey  `json:"validator_pub_key"`  
}
```

The user can delegate extra coins or make an unbond tx.

We’ve rolled out the API method for retrieving WaitList stakes by owner address, the node’s public address is optional: ```/v2/waitlist/{address}?public_key=```. You can see detailed description of the method here: [/v2/openapi-ui](https://minterteam.github.io/node-grpc-gateway/).
```json
{
  "list": [
    {
      "public_key": "string",
      "coin": {
        "id": "0",
        "symbol": "BIP"
      },
      "value": "string"
    }
  ]
}
```

**9. Prune Blocks**

There’s now a CLI command for deleting blocks.

Use parameters of the first and last blocks to be removed as input:
```console
$ ./minter console
>>> prune_blocks --from=1 --to=10000
```
