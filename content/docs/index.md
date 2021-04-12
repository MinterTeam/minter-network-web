---
description: Minter is a global rewards and loyalty points network powered by a fast blockchain. Any brand, community, or blogger can create their own coins and launch their reward or loyalty system in minutes.
---

# Minter blockchain

Minter is a global rewards and loyalty points network powered by a fast blockchain. Any brand, community, or blogger can create their own coins and launch their reward or loyalty system in minutes.

- Github: [https://github.com/MinterTeam/minter-go-node](https://github.com/MinterTeam/minter-go-node)
- Github (all projects): [https://github.com/MinterTeam](https://github.com/MinterTeam)
- Official site: [https://minter.network/](https://minter.network/)

## Install Minter

There are several ways you can install Minter Blockchain Testnet node on your machine.

### Using binary

1. **Download Minter**
   Get [latest binary build](https://github.com/MinterTeam/minter-go-node/releases) suitable for your architecture and unpack it to desired folder.
2. **Run Minter**
   ```bash
   ./minter node
   ```
### From Source

You'll need `golang` installed [https://golang.org/doc/install](https://golang.org/doc/install) and the
required
[environment variables set](https://github.com/tendermint/tendermint/wiki/Setting-GOPATH)

1. **Clone Minter source code to your machine**
  ```bash
  mkdir -p $GOPATH/src/github.com/MinterTeam
  cd $GOPATH/src/github.com/MinterTeam
  git clone https://github.com/MinterTeam/minter-go-node.git
  cd minter-go-node
  ```
2. **Get Tools & Dependencies**
  ```bash
  make get_tools
  make get_vendor_deps
  ```
3. **Compile**
  ```bash
  make install
  ```
  to put the binary in `$GOPATH/bin` or use:
  ```bash
  make build
  ```
  to put the binary in `./build`.
  The latest `minter version` is now installed.
4. **Run Minter**
  ```bash
  ./build/minter node
  ```
  or
  ```bash
  minter node
  ```
## Blockchain Specification

**Tendermint**

Minter Blockchain utilizes `Tendermint Consensus Engine`.

Tendermint is software for securely and consistently replicating an
application on many machines.
By securely, we mean that Tendermint works even if up to 1/3 of machines
fail in arbitrary ways.
By consistently, we mean that every non-faulty machine sees the same
transaction log and computes the same state.
Secure and consistent replication is a fundamental problem in distributed
systems; it plays a critical role in the
fault tolerance of a broad range of applications, from currencies, to
elections, to infrastructure orchestration,
and beyond.

Tendermint is designed to be easy-to-use, simple-to-understand, highly
performant, and useful for a wide variety of
distributed applications.

You can read more about Tendermint Consensus in [official
documentation](https://tendermint.com/docs/)

**Consensus**

In Minter we implemented Delegated Proof of Stake (DPOS) Consensus Protocol.

DPOS is the fastest, most efficient, most decentralized, and most flexible
consensus model available. DPOS leverages the power of stakeholder approval
voting to resolve consensus issues in a fair and democratic way.

**Block speed**

Minter Blockchain is configured to produce `1 block per 5 sec`. Actual block
speed may vary depends on validators count, their computational power,
internet speed, etc.

**Block size**

We limit block size to `10 000 transactions`. Block size in terms of bytes
is not limited.

## Coins and tokens

### Coins

Minter Blockchain is multi-coin system.

Base coin in testnet is `MNT`.  
Base coin in mainnet is `BIP`.

Smallest part of *each* coin is called `pip`.  
1 pip = 1^-18 of any coin. In Blockchain and API we only operating with
pips.

> **Note:** Each coin has its **own** pip. You should treat pip like atomic
part of a coin, not as currency:  
> 1 MNT = 10^18 pip (MNT's pip)  
> 1 ABC = 10^18 pip (ABC's pip)  
> 1 MNT != 1 ABC

### Coin Issuance

Every user of Minter can issue own coin. Each coin is backed by base coin in
some proportion.
Issue own coin is as simple as filling a form with given fields:

- **Coin name** - Name of a coin. Arbitrary string up to 64 letters length.
- **Coin symbol** - Symbol of a coin. Must be unique, alphabetic, uppercase,
3 to 10 letters length.
- **Initial supply** - Amount of coins to issue. Issued coins will be
available to sender account. Should be between 1 and 10^15
coins.
- **Initial reserve** - Initial reserve in base coin. Should be at least 10
bips.
- **Constant Reserve Ratio (CRR)** - uint, should be from 10 to 100.
- **Max supply** - Max amount of coins that are allowed to be issued.
Maximum is 10^15

After coin issued you can send is as ordinary coin using standard wallets.

### Coin Exchange

Each coin in system can be instantly exchanged to another coin. This is
possible because each coin has "reserve" in base
coin.

Here are some formulas we are using for coin conversion:

**CalculatePurchaseReturn**

Given a coin supply (s), reserve balance (r), CRR (c) and a deposit amount
(d), calculates the return for a given conversion (in the base coin):

```go
return s * ((1 + d / r) ^ c - 1);
```

**CalculateSaleReturn**

Given a coin supply (s), reserve balance (r), CRR (c) and a sell amount (a),
calculates the return for a given conversion

```go
return r * (1 - (1 - a / s) ^ (1 / c));
```
### Tokens

Unlike coins, tokens have no reserve in BIP.

### Token Issuance

- **Name** - Full name of a token. Arbitrary string with the length of up to 64 letters.
- **Symbol** - Ticker symbol of a token. Must be unique, alphabetic, uppercase, and 3 to 10 letters long.
- **Initial amount** - Number of tokens to be issued at start. Should fall within the range of 1 to 10^15. They will become available on the sender's address.
- **Max supply** - Maximum amount of tokens that can ever be issued. The upper limit is 10^15.

Allow owner to edit token supply:
- **Mintable**: Ability to gradually increase token supply (cannot exceed Max supply).
- **Burnable**: Ability to burn tokens that are freely available in the owner's wallet.

After the token has been created, users can send it via regular wallets similar to ordinary coins.

### Token Exchange

Since tokens are not backed, their conversion cannot be based on the formulas used with coins. The token is exchangeable only if it is present in liquidity pools.

### Issuance fees for coins and tokens

To issue a coin, Creator should pay a fee that depends on the length of Symbol.

3 letters – 100 000 USD  
4 letters – 10 000 USD  
5 letters – 1 000 USD  
6 letters – 100 USD  
7-10 letters – 10 USD

### Coins and tokens archiving

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

In the case of JS SDK, you can keep using coin tickers. In most cases SDK will replace coin tickers with IDs automatically.

In GO SDK v2, we’ve implemented methods of obtaining coin IDs by their tickers from [HTTP](https://pkg.go.dev/github.com/MinterTeam/minter-go-sdk/v2/api/http_client#Client.CoinID) and [gRPC](https://pkg.go.dev/github.com/MinterTeam/minter-go-sdk/v2/api/grpc_client#Client.CoinID) clients:
```go
client, _ := http_client.New("http://localhost:8843/v2") // or client, _ := grpc_client.New("localhost:8842")
id, _ := client.CoinID("BIP")
dataSend := transaction.NewSendData().SetCoin(id) // ...
```

2.  Each coin now has an owner: `owner_address`. For new coins, addresses that have created them will be set as owners. For old coins, there may be no owner at all (null value).

3.  The owner can reissue the coin. Suppose there is COIN, and its owner sends a transaction to recreate it. At that point, the old coin is renamed to COIN-1, and the new one is issued under the ticker COIN. If recreate again, second coin COIN will be renamed to COIN-2, and third coin will be issued as COIN. See [recreate coin transaction](#recreate-coin-transaction) and [recreate token transaction](#recreate-token-transaction).

4.  The owner can transfer ticker ownership rights to another address. See [edit ticker owner transaction](#edit-ticker-owner-transaction).


### Coins and tokens difference

|Function                        |Coins                |Tokens               |
|--------------------------------|---------------------|---------------------|
|**Reservation**                 |in BIP               |—                    |
|**Min reserve**                 |10000 BIP            |—                    |
|**Name**                        |up to 64 letters long|up to 64 letters long|
|**Symbol**                      |3 to 10 symbols long |3 to 10 symbols long |
|**Initial amount**              |Yes                  |Yes                  |
|**Max supply**                  |Yes                  |Yes                  |
|**CRR**                         |10 - 100%            |—                    |
|**Mintable (by owner)**         |—                    |Yes                  |
|**Burnable (by any address)**   |—                    |Yes                  |
|**Swap (reserves)**             |Yes                  |—                    |
|**Swap (pools)**                |Yes                  |Yes                  |
|**Creation of liquidity pools** |Yes                  |Yes                  |
|**Delegate and receive rewards**|Yes                  |—                    |
|**Ticker symbol fees**          |10 - 100000 USD      |10 - 100000 USD      |
|**Pay fees**                    |Yes                  |Yes                  |
|**Re-creation**                 |Yes                  |Yes                  |

## Liquidity pools

### Introduction

A liquidity pool is a trading pair of coins/tokens with locked-up funds of liquidity providers that guarantee swappability. Buying or selling a coin through a liquidity pool, a trader uses funds that have been locked into the pool. The process is carried out using Automated Market Maker (AMM).

The AMM mechanism implies that when the coin/token is bought, it’s added to the pool; when sold, it’s removed from it. Hence, with the quantity of both coins/tokens inside the pool being balanced, their price changes as well.

> Price for 1 unit of Coin A = Amount of Coin B inside the pool / Amount of Coin A inside the pool
> 
> Price for 1 unit of Coin B = Amount of Coin A inside the pool / Amount of Coin B inside the pool

### Liquidity providers

For users to be able to buy and sell coins/tokens within the pool, these pools should be liquid. That is ensured by liquidity providers who get 0.2% on each swap transaction as a reward. These fees are automatically added into the pool, thereby increasing it.

To add liquidity, the provider needs to make a corresponding transaction by putting both coins/tokens into the pool in equal amounts (50/50). For that, liquidity providers are accrued additionally minted LP tokens expressing their share of the pool’s total liquidity. To withdraw liquidity, the provider needs to have previously accrued LP tokens on their balance that will now be burned, while the corresponding liquidity share will be returned to the user’s balance.

## Transactions

Transactions in Minter are
[RLP-encoded](https://github.com/ethereum/wiki/wiki/RLP) structures.

Example of a signed transaction:
```
f873230101aae98a4d4e540000000000000094a93163fdf10724dc4785ff5cbfb9
ac0b5949409f880de0b6b3a764000080801ba06838db4a2197cfd70ede8d8d184d
bf332932ca051a243eb7886791250e545dd3a04b63fb1d1b5ef5f2cbd2ea12530c
da520b3280dcb75bfd45a873629109f24b29
```

Each transaction has:
-   **Nonce** - int, unique number for each address, used to prevent transaction reply, starts from 1.
-   **ChainID** - id of the network (1 - mainnet, 2 - testnet)
-   **Gas Price** - big int, fee multiplier, should be equal or greater than
current mempool min gas price.
-   **Gas Coin ID** - int, coin id to pay fee
-   **Type** - type of transaction (see below).
-   **Data** - data of transaction (depends on transaction type).
-   **Payload** (arbitrary bytes) - arbitrary user-defined bytes.
-   **Service Data** - reserved field.
-   **Signature Type** - single or multisig transaction.
-   **Signature Data** - digital signature of transaction.

```go
type Transaction struct {
    Nonce         uint64
    ChainID       byte
    GasPrice      *big.Int
    GasCoin       uint32
    Type          byte
    Data          []byte
    Payload       []byte
    ServiceData   []byte
    SignatureType byte
    SignatureData Signature|MultiSignature
}

type Signature struct {
    V           *big.Int
    R           *big.Int
    S           *big.Int
}

type MultiSignature struct {
    MultisigAddress [20]byte
    Signatures      []Signature
}
```

### Signature Types

|Type Name                           |Byte|
|----------------------------------- |----|
|**TypeSingle**                      |0x01|
|**TypeMulti**                       |0x02|

### Types

Type of transaction is determined by a single byte.

|Type Name                           |Byte|
|----------------------------------- |----|
|[TypeSend](#send-transaction)                                          |0x01|
|[TypeSellCoin](#sell-coin-transaction)                                 |0x02|
|[TypeSellAllCoin](#sell-all-coin-transaction)                          |0x03|
|[TypeBuyCoin](#buy-coin-transaction)                                   |0x04|
|[TypeCreateCoin](#create-coin-transaction)                             |0x05|
|[TypeDeclareCandidacy](#declare-candidacy-transaction)                 |0x06|
|[TypeDelegate](#delegate-transaction)                                  |0x07|
|[TypeUnbond](#unbond-transaction)                                      |0x08|
|[TypeRedeemCheck](#redeem-check-transaction)                           |0x09|
|[TypeSetCandidateOnline](#set-candidate-online-transaction)            |0x0A|
|[TypeSetCandidateOffline](#set-candidate-offline-transaction)          |0x0B|
|[TypeCreateMultisig](#create-multisig-address)                         |0x0C|
|[TypeMultisend](#multisend-transaction)                                |0x0D|
|[TypeEditCandidate](#edit-candidate-transaction)                       |0x0E|
|[TypeSetHaltBlock](#set-halt-block-transaction)                        |0x0F|
|[TypeRecreateCoin](#recreate-coin-transaction)                         |0x10|
|[TypeEditTickerOwner](#edit-ticker-owner-transaction)                  |0x11|
|[TypeEditMultisig](#edit-multisig-transaction)                         |0x12|
|[TypePriceVote](#price-vote-transaction)                               |0x13|
|[TypeEditCandidatePublicKey](#edit-candidate-public-key-transaction)   |0x14|
|[TypeAddLiquidity](#add-liquidity-to-swap-pool-transaction)            |0x15|
|[TypeRemoveLiquidity](#remove-liquidity-from-swap-pool-transaction)    |0x16|
|[TypeSellSwapPool](#sell-from-swap-pool-transaction)                   |0x17|
|[TypeBuySwapPool](#buy-from-swap-pool-transaction)                     |0x18|
|[TypeSellAllSwapPool](#sell-all-from-swap-pool-transaction)            |0x19|
|[TypeEditCandidateCommission](#edit-candidate-commission-transaction)  |0x1A|
|[TypeMoveStake](#move-stake-transaction)                               |0x1B|
|[TypeMintToken](#mint-token-transaction)                               |0x1C|
|[TypeBurnToken](#burn-token-transaction)                               |0x1D|
|[TypeCreateToken](#create-token-transaction)                           |0x1E|
|[TypeRecreateToken](#recreate-token-transaction)                       |0x1F|
|[TypeVoteCommission](#vote-for-commission-price-transaction)           |0x20|
|[TypeVoteUpdate](#vote-for-network-update-transaction)                 |0x21|
|[TypeCreateSwapPool](#create-swap-pool-transaction)                    |0x22|
    
### Send transaction

Type: **0x01**

Transaction for sending arbitrary coin.

*Data field contents:*

```go
type SendData struct {
    Coin  uint32
    To    [20]byte
    Value *big.Int
}
```

- **Coin** - ID represents a coin.
- **To** - Recipient address in Minter Network.
- **Value** - Amount of **Coin** to send.

### Sell coin transaction

Type: **0x02**

Transaction for selling one coin (owned by sender) in favour of another coin
in a system.

*Data field contents:*

```go
type SellCoinData struct {
    CoinToSell          uint32
    ValueToSell         *big.Int
    CoinToBuy           uint32
    MinimumValueToBuy   *big.Int
}
```

- **CoinToSell** - ID of a coin to give.
- **ValueToSell** - Amount of **CoinToSell** to give.
- **CoinToBuy** - ID of a coin to get.
- **MinimumValueToBuy** - Minimum value of coins to get.

### Sell all coin transaction

Type: **0x03**

Transaction for selling all existing coins of one type (owned by sender) in
favour of another coin in a system.

CoinToSell will be used as GasCoin to pay fee.

*Data field contents:*

```go
type SellAllCoinData struct {
    CoinToSell          uint32
    CoinToBuy           uint32
    MinimumValueToBuy   *big.Int
}
```

- **CoinToSell** - ID of a coin to give.
- **CoinToBuy** - ID of a coin to get.
- **MinimumValueToBuy** - Minimum value of coins to get.

### Buy coin transaction

Type: **0x04**

Transaction for buy a coin paying another coin (owned by sender).

*Data field contents:*

```go
type BuyCoinData struct {
    CoinToBuy           uint32
    ValueToBuy          *big.Int
    CoinToSell          uint32
    MaximumValueToSell  *big.Int
}
```

- **CoinToBuy** - ID of a coin to get.
- **ValueToBuy** - Amount of **CoinToBuy** to get.
- **CoinToSell** - ID of a coin to give.
- **MaximumValueToSell** - Maximum value of coins to sell.

### Create coin transaction

Type: **0x05**

Transaction for creating new coin in a system.

*Data field contents:*

```go
type CreateCoinData struct {
    Name                 string
    Symbol               [10]byte
    InitialAmount        *big.Int
    InitialReserve       *big.Int
    ConstantReserveRatio uint32
    MaxSupply            *big.Int
}
```

- **Name** - Name of a coin. Arbitrary string up to 64 letters length.
- **Symbol** - Symbol of a coin. Must be unique, alphabetic, uppercase, 3 to
10 symbols length.
- **InitialAmount** - Amount of coins to issue. Issued coins will be available
to sender account.
- **InitialReserve** - Initial reserve in BIP's.
- **ConstantReserveRatio** - CRR, uint, should be from 10 to 100.
- **MaxSupply** - Max amount of coins that are allowed to be issued. Maximum
is 10^15.

### Declare candidacy transaction

Type: **0x06**

Transaction for declaring new validator candidacy.

*Data field contents:*

```go
type DeclareCandidacyData struct {
    Address    [20]byte
    PubKey     []byte
    Commission uint
    Coin       uint32
    Stake      *big.Int
}
```

- **Address** - Address of candidate in Minter Network. This address would be
able to control candidate. Also all rewards will be sent to this address.
- **PubKey** - Public key of a validator.
- **Commission** - Commission percent (from 0% to 100%) from rewards which delegators
will pay to validator.
- **Coin** - ID of coin to stake.
- **Stake** - Amount of coins to stake.

### Delegate transaction

Type: **0x07**

Transaction for delegating funds to validator.

*Data field contents:*

```go
type DelegateData struct {
    PubKey []byte
    Coin   uint32
    Value  *big.Int
}
```

- **PubKey** - Public key of a validator.
- **Coin** - ID of coin to stake.
- **Value** - Amount of coins to stake.

### Unbond transaction

Type: **0x08**

Transaction for unbonding funds from validator's stake.

*Data field contents:*

```go
type UnbondData struct {
    PubKey []byte
    Coin   uint32
    Value  *big.Int
}
```

- **PubKey** - Public key of a validator.
- **Coin** - ID of coin to unbond.
- **Value** - Amount of coins to unbond.

### Redeem check transaction

Type: **0x09**

Transaction for redeeming a check.

*Data field contents:*

```go
type RedeemCheckData struct {
    Check []byte
    Proof [65]byte
}
```

- **Check** - Check received from sender.
- **Proof** - Proof of owning a check: password signed with recipient's
address. [Read
more](https://docs.minter.network/#section/Minter-Check/Check-hijacking-protection)

Note that maximum GasPrice is limited to 1 to prevent fraud, because
GasPrice is set by redeem tx sender but commission is charged from check
issuer.

Tx's GasCoin must be the same as specified in the check.

### Set candidate online transaction

Type: **0x0A**

Transaction for turning candidate on. This transaction should be sent from
address which is set in the "Declare candidacy transaction".

*Data field contents:*

```go
type SetCandidateOnData struct {
    PubKey []byte
}
```

- **PubKey** - Public key of a validator.

### Set candidate offline transaction

Type: **0x0B**

Transaction for turning candidate off. This transaction should be sent from
address which is set in the "Declare candidacy transaction".

*Data field contents:*

```go
type SetCandidateOffData struct {
    PubKey []byte
}
```

- **PubKey** - Public key of a validator.

### Create multisig address

Type: **0x0C**

Transaction for creating multisignature address.

*Data field contents:*

```go
type CreateMultisigData struct {
    Threshold uint32
    Weights   []uint32
    Addresses [][20]byte
}
```

- **Threshold** - minimum addresses weight that are involved in tx signing
- **Weights** - ordered weights array mapped 1:1 to **Addresses**: **Weights\[0]** is weight for **Addresses\[0]**
- **Addresses** - array of multisig addresses

### Multisend transaction

Type: **0x0D**

Transaction for sending coins to multiple addresses.
*MultisendData can contain only 100 items. Therefore, this type of transaction has a limit of 100 recipent addresses.*

*Data field contents:*

```go
type MultisendData struct {
    List []MultisendDataItem
}

type MultisendDataItem struct {
    Coin  uin32
    To    [20]byte
    Value *big.Int
}
```

### Edit candidate transaction

Type: **0x0E**

Transaction for editing existing candidate

*Data field contents:*

```go
type EditCandidateData struct {
    PubKey           []byte
    RewardAddress    [20]byte
    OwnerAddress     [20]byte
    ControlAddress   [20]byte
}
```

- **RewardAddress** - address for acquiring rewards
- **OwnerAddress** - address with full control of the validator
- **ControlAddress** - its functionality is strictly limited to switching masternode on and off (SetCandidateOnline/SetCandidateOffline transactions).


### Set halt block transaction
Type: **0x0F**

Since Minter 1.2 released, validators can now vote for a particular block to stop the blockchain for update.  
For this purpose new transaction SetHaltBlock was introduced.  
If 2/3+ of voting power on a given block voted for halting -blockchain will stop producing new blocks and wait for update.

*Data field contents:*

```go
type SetHaltBlockData struct {
    PubKey [32]byte
    Height uint64
}
```

- **PubKey** - node public key
- **Height** - block number


### Recreate coin transaction

Type: **0x10**

*Data field contents:*

```go
type RecreateCoinData struct {
    Name                 string
    Symbol               [10]byte
    InitialAmount        *big.Int
    InitialReserve       *big.Int
    ConstantReserveRatio uint32
    MaxSupply            *big.Int
}
```

- **Name** - Name of a coin. Arbitrary string up to 64 letters length.
- **Symbol** - Symbol of a coin. Must be unique, alphabetic, uppercase, 3 to
10 symbols length.
- **InitialAmount** - Amount of coins to issue. Issued coins will be available
to sender account.
- **InitialReserve** - Initial reserve in BIP's.
- **ConstantReserveRatio** - CRR, uint, should be from 10 to 100.
- **MaxSupply** - Max amount of coins that are allowed to be issued. Maximum
is 10^15.


<a name="edit-coin-owner-transaction"></a>
### Edit ticker owner transaction

Type: **0x11**

Transaction to change ticker owner address for coins and tokens

*Data field contents:*

```go
type EditTickerOwnerData struct {
    Symbol   [10]byte
    NewOwner [20]byte
}
```

- **Symbol** - Symbol of a coin
- **NewOwner** - Address



### Edit multisig transaction

Type: **0x12**

Transaction for change multisignature address.  
Allows one to make changes to the list of MultiSig owners and threshold without changing the address itself.  
Must be sent from the MultiSig address and signed by the required number of owners.

*Data field contents:*

```go
type EditMultisigData struct {
    Threshold uint32
    Weights   []uint32
    Addresses [][20]byte
}
```

Data is the same as in [Create Multisig Address Transaction](#create-multisig-address)


### Price Vote Transaction

Type: **0x13**

**Disabled transaction, not used anymore**

To be able to run complex smart contracts and services, we need a way to discover the price of BIP on-chain. We will start with introducing a new tx type: PriceVote.

*Data field contents:*

```go
type PriceVoteData struct {
    Price uint
}
```


### Edit Candidate Public Key Transaction

Type: **0x14**

Transaction to change candaite public key.  
To improve validator security, it is proposed to add the public key change feature.  
The transaction must be sent from the validator (OwnerAddress). Once changed, the old public key is blacklisted and cannot be declared again.

*Data field contents:*

```go
type EditCandidatePublicKeyData struct {
    PubKey    [32]byte
    NewPubKey [32]byte
}
```

- **PubKey** - Current Public key
- **NewPubKey** - New Public key


### Since Minter 2.0 released, there are few new transactions added:


### Add liquidity to swap pool transaction

Type: **0x15**

Transaction to add reserves of a pair of coins to the pool.
To create liquidity through this pool.

*Data field contents:*

```go
type AddLiquidityData struct {
	Coin0          uin32
	Coin1          uin32
	Volume0        *big.Int
	MaximumVolume1 *big.Int
}
```

- **Coin0** - ID of first coin to pair
- **Coin1** - ID of second coin to pair
- **Volume0** - Volume to add to reserve of the swap pool of first coin
- **MaximumVolume1** - Maximum volume to add to reserve of the swap pool of second coin

When a new liquidity provider deposits tokens into an existing Uniswap pair, the number
of liquidity tokens minted is computed based on the existing quantity of tokens:

![](https://i.ibb.co/YkQdMLd/image.png)

To see the total supply and balance of the provider, check on [SwapPool](https://redocly.github.io/redoc/?url=https://raw.githubusercontent.com/MinterTeam/node-grpc-gateway/1.3/docs/api.swagger.json#operation/SwapPool) and [SwapPoolProvider](https://redocly.github.io/redoc/?url=https://raw.githubusercontent.com/MinterTeam/node-grpc-gateway/1.3/docs/api.swagger.json#operation/SwapPoolProvider) API v2 endpoints.

### Remove liquidity from swap pool transaction

Type: **0x16**

Transaction to withdraw the reserves of a pair from the pool.

*Data field contents:*

```go
type RemoveLiquidityData struct {
	Coin0          uin32
	Coin1          uin32
	Liquidity      *big.Int
	MinimumVolume0 *big.Int
	MinimumVolume1 *big.Int
}
```

- **Coin0** - ID of coin to pair
- **Coin1** - ID of coin to pair
- **Liquidity** - Volume of shares to be withdrawn from the pool
- **MinimumVolume0** - Minimum expected volume of coin0 to be returned to the account
- **MinimumVolume1** - Minimum expected volume of coin1 to be returned to the account


### Sell from swap pool transaction

Type: **0x17**

Transaction for selling from the swap pool of the pair.

*Data field contents:*

```go
type SellSwapPoolData struct {
    Coins               []uint32
    ValueToSell         *big.Int
    MinimumValueToBuy   *big.Int
}
```

- **Coins** - List of coin IDs from given to received.
- **ValueToSell** - Amount of coin to spend (first coin in **Coins** list).
- **MinimumValueToBuy** - Minimum value of coin to get.

Use [EstimateCoinSell](https://minterteam.github.io/node-gateway-api-v2-doc/#operation/EstimateCoinSell) API v2 endpoint with _swap_from=pool_ parameter to calculate sales price from swap pool.

### Buy from swap pool transaction

Type: **0x18**

Transaction for buying from the swap pool of the pair.

*Data field contents:*

```go
type BuySwapPoolData struct {
    Coins               []uint32
    ValueToBuy          *big.Int
    MaximumValueToSell  *big.Int
}
```

- **Coins** - List of coin IDs from given to received.
- **ValueToBuy** - Amount of coin to get (last coin in **Coins** list).
- **MaximumValueToSell** - Maximum value of coin to spend.

Use API v2 endpoint to calculate purchase price:

Use [EstimateCoinBuy](https://minterteam.github.io/node-gateway-api-v2-doc/#operation/EstimateCoinBuy) API v2 endpoint with _swap_from=pool_ parameter to calculate purchase price from swap pool.


### Sell all from swap pool transaction

Type: **0x19**

Transaction for selling all existing coins from the swap pool of the pair.

Coin to spend (`Coins[0]`) will be used as GasCoin to pay fee.

*Data field contents:*

```go
type SellAllSwapPoolData struct {
    Coins               []uint32
    MinimumValueToBuy   *big.Int
}
```

- **Coins** - List of coin IDs from given to received.
- **MinimumValueToBuy** - Minimum value of coin to get.

Use [EstimateCoinSellAll](https://minterteam.github.io/node-gateway-api-v2-doc/#operation/EstimateCoinSellAll) API v2 endpoint with _swap_from=pool_ parameter to calculate sales price from swap pool.


### Edit candidate commission transaction

Type: **0x1A**

This transaction changes the validator's fee. Only validator owner is allowed to send. The fee cannot be increased by more than 10 units at once and cannot be changed sooner than once in every three UnbondPeriod's. UnbondPeriod = 518400 blocks (177 on testnet).

*Data field contents:*

```go
type EditCandidateCommissionData struct {
    PubKey    [32]byte
    Commission uint32
}
```

- **PubKey** - Public key of a validator.
- **Commission** - Commission percent (from 0% to 100%) from rewards which delegators will pay to validator.

### Move stake transaction

Type: **0x1B**

Reserved transaction, disabled in current version.

*Data field contents:*

```go
type MoveStakeData struct {
    From     [32]byte
    To       [32]byte
    Coin     uint32
    Stake    *big.Int
}
```

```go
const TypeStakeMoveEvent = "minter/StakeMoveEvent"

type StakeMoveEvent struct {
	Address         string `json:"address"`
	Amount          string `json:"amount"`
	Coin            string `json:"coin"`
	ValidatorPubKey string `json:"validator_pub_key"`
	WaitList        bool   `json:"waitlist"`
}
```

### Mint token transaction

Type: **0x1C**

This transaction increases the token's supply. Can be applied to tokens only and is executed from the coin owner address. The new supply must not exceed the MaxSupply value.

*Data field contents:*

```go
type MintTokenData struct {
    Coin     uint32
    Value    *big.Int
}
```

- **Coin** - the token's id
- **Value** - the quantity of coins to be issued
                                        
### Burn token transaction

Type: **0x1D**

This transaction decreases the token's supply. Can be applied to tokens only and is executed from the address of the user who has the necessary amount of this coin. The new supply must be more than or equal to 0.

*Data field contents:*

```go
type BurnTokenData struct {
    Coin     uint32
    Value    *big.Int
}
```


### Create token transaction

Type: **0x1E**

Creation of a token (non-reserve coin).

*Data field contents:*

```go
type CreateTokenData struct {
	Name          string
	Symbol        [10]byte
	InitialAmount *big.Int
	MaxSupply     *big.Int
	Mintable      bool
	Burnable      bool
}
```

- **InitialAmount** - the number of tokens to be created at the start
- **MaxSupply** - the upper limit of the total number of tokens
- **Mintable** - allow new tokens to be issued additionally
- **Burnable** - allow all tokens to be burned

### Recreate token transaction

Type: **0x1F**

This transaction re-creates the coins (both backed and non-reserve).

*Data field contents:*

```go
type RecreateTokenData struct {
	Name          string
	Symbol        [10]byte
	InitialAmount *big.Int
	MaxSupply     *big.Int
	Mintable      bool
	Burnable      bool
}
```

- **InitialAmount** - the number of tokens to be created at the start
- **MaxSupply** - the upper limit of the total number of tokens
- **Mintable** - allow new tokens to be issued additionally
- **Burnable** - allow all tokens to be burned

### Vote for commission price transaction

Type: **0x20**

This transaction enables validators to vote for the fees to be changed. The change comes into force once a two-thirds majority is reached. The vote can be sent from the validator owner address.

*Data field contents:*

```go
type VoteCommissionData struct {
	PubKey                  types.Pubkey
	Height                  uint64
	Coin                    types.CoinID
	PayloadByte             *big.Int
	Send                    *big.Int
	BuyBancor               *big.Int
	SellBancor              *big.Int
	SellAllBancor           *big.Int
	BuyPoolBase             *big.Int
	BuyPoolDelta            *big.Int
	SellPoolBase            *big.Int
	SellPoolDelta           *big.Int
	SellAllPoolBase         *big.Int
	SellAllPoolDelta        *big.Int
	CreateTicker3           *big.Int
	CreateTicker4           *big.Int
	CreateTicker5           *big.Int
	CreateTicker6           *big.Int
	CreateTicker7to10       *big.Int
	CreateCoin              *big.Int
	CreateToken             *big.Int
	RecreateCoin            *big.Int
	RecreateToken           *big.Int
	DeclareCandidacy        *big.Int
	Delegate                *big.Int
	Unbond                  *big.Int
	RedeemCheck             *big.Int
	SetCandidateOn          *big.Int
	SetCandidateOff         *big.Int
	CreateMultisig          *big.Int
	MultisendBase           *big.Int
	MultisendDelta          *big.Int
	EditCandidate           *big.Int
	SetHaltBlock            *big.Int
	EditTickerOwner         *big.Int
	EditMultisig            *big.Int
	EditCandidatePublicKey  *big.Int
	CreateSwapPool          *big.Int
	AddLiquidity            *big.Int
	RemoveLiquidity         *big.Int
	EditCandidateCommission *big.Int
	MintToken               *big.Int
	BurnToken               *big.Int
	VoteCommission          *big.Int
	VoteUpdate              *big.Int
}
```
Once there is a consensus, the event with the information about the new fees will occur at the corresponding block height.

```go
const TypeUpdateCommissionsEvent = "minter/UpdateCommissionsEvent"
type UpdateCommissionsEvent struct {
	Coin                    uint64 `json:"coin"`
	PayloadByte             string `json:"payload_byte"`
	Send                    string `json:"send"`
	BuyBancor               string `json:"buy_bancor"`
	SellBancor              string `json:"sell_bancor"`
	SellAllBancor           string `json:"sell_all_bancor"`
	BuyPoolBase             string `json:"buy_pool_base"`
	BuyPoolDelta            string `json:"buy_pool_delta"`
	SellPoolBase            string `json:"sell_pool_base"`
	SellPoolDelta           string `json:"sell_pool_delta"`
	SellAllPoolBase         string `json:"sell_all_pool_base"`
	SellAllPoolDelta        string `json:"sell_all_pool_delta"`
	CreateTicker3           string `json:"create_ticker3"`
	CreateTicker4           string `json:"create_ticker4"`
	CreateTicker5           string `json:"create_ticker5"`
	CreateTicker6           string `json:"create_ticker6"`
	CreateTicker7_10        string `json:"create_ticker7_10"`
	CreateCoin              string `json:"create_coin"`
	CreateToken             string `json:"create_token"`
	RecreateCoin            string `json:"recreate_coin"`
	RecreateToken           string `json:"recreate_token"`
	DeclareCandidacy        string `json:"declare_candidacy"`
	Delegate                string `json:"delegate"`
	Unbond                  string `json:"unbond"`
	RedeemCheck             string `json:"redeem_check"`
	SetCandidateOn          string `json:"set_candidate_on"`
	SetCandidateOff         string `json:"set_candidate_off"`
	CreateMultisig          string `json:"create_multisig"`
	MultisendBase           string `json:"multisend_base"`
	MultisendDelta          string `json:"multisend_delta"`
	EditCandidate           string `json:"edit_candidate"`
	SetHaltBlock            string `json:"set_halt_block"`
	EditTickerOwner         string `json:"edit_ticker_owner"`
	EditMultisig            string `json:"edit_multisig"`
	EditCandidatePublicKey  string `json:"edit_candidate_public_key"`
	CreateSwapPool          string `json:"create_swap_pool"`
	AddLiquidity            string `json:"add_liquidity"`
	RemoveLiquidity         string `json:"remove_liquidity"`
	EditCandidateCommission string `json:"edit_candidate_commission"`
	MintToken               string `json:"mint_token"`
	BurnToken               string `json:"burn_token"`
	VoteCommission          string `json:"vote_commission"`
	VoteUpdate              string `json:"vote_update"`
}
```

API current prices [PriceCommission](https://redocly.github.io/redoc/?url=https://raw.githubusercontent.com/MinterTeam/node-grpc-gateway/1.3/docs/api.swagger.json#operation/PriceCommission) and votes for update commissions [PriceVotes](https://redocly.github.io/redoc/?url=https://raw.githubusercontent.com/MinterTeam/node-grpc-gateway/1.3/docs/api.swagger.json#operation/PriceVotes)

### Vote for network update transaction

Type: **0x21**

This transaction allows to vote whether to proceed with the network's upgrade to a new version. Can only be sent by a node owner and from the owner address. The upgrade is approved if the two-thirds of the voting power is in favor.

*Data field contents:*

```go
type VoteUpdateData struct {
	Version string
	PubKey  [32]byte
	Height  uint64
}
```
- **Version** - the codename of the upgrade
- **PubKey** - the public key of the validator that's casting a vote
- **Height** - the block in which the upgrade is to take place

Once there is a consensus, the event will occur at the corresponding block height.

```
const TypeUpdateNetworkEvent = "minter/UpdateNetworkEvent"
type UpdateNetworkEvent struct {
	Version string `json:"version"`
}
```


### Create swap pool transaction

Type: **0x22**

This transaction creates a liquidity pool for two coins, in volumes specified within this transaction. The volumes will be withdrawn from your balance according to the figure you've specified in the transaction. When a pool is established, a P-number coin (example: P-123) is created and issued in the amount equal to the amount of pool liquidity. The calculations related to that liquidity are described below.

*Data field contents:*

```go
type CreateSwapPoolData struct {
	Coin0          uin32
	Coin1          uin32
	Volume0        *big.Int
	Volume1        *big.Int
}
```

Number of liquidity tokens equal to the geometric mean of the amounts deposited:

![](https://i.ibb.co/S03qZ1r/image.png)

The above formula ensures that a liquidity pool share will never be worth less than
the geometric mean of the reserves in that pool. However, it is possible for the value of
a liquidity pool share to grow over time, either by accumulating trading fees or through
“donations” to the liquidity pool. In theory, this could result in a situation where the value
of the minimum quantity of liquidity pool shares (1e-18 pool shares) is worth so much that
it becomes infeasible for small liquidity providers to provide any liquidity.

To mitigate this, we burns the first 1e-15 (0.000000000000001) pool shares that
are minted (1000 times the minimum quantity of pool shares), sending them to the zero
address instead of to the minter. This should be a negligible cost for almost any token
pair. But it dramatically increases the cost of the above attack. In order to raise the
value of a liquidity pool share to $100, the attacker would need to donate $100,000 to the
pool, which would be permanently locked up as liquidity.

To see the total supply and balance of the provider, check on [SwapPool](https://redocly.github.io/redoc/?url=https://raw.githubusercontent.com/MinterTeam/node-grpc-gateway/1.3/docs/api.swagger.json#operation/SwapPool) and [SwapPoolProvider](https://redocly.github.io/redoc/?url=https://raw.githubusercontent.com/MinterTeam/node-grpc-gateway/1.3/docs/api.swagger.json#operation/SwapPoolProvider) API v2 endpoints.



## Minter Check

Minter Check is like an ordinary bank check. Each user of network can
issue check with any amount of coins and pass it to another person.
Receiver will be able to cash a check from arbitrary account.

### Introduction

Checks are prefixed with "Mc". Here is example of a Minter Check:

```
Mcf89b01830f423f8a4d4e5400000000000000843b9aca00b8419b3beac2c6ad88a8bd54d24912754bb820e58345731cb1b9bc0885ee74f9e50a58a80aa990a29c98b05541b266af99d3825bb1e5ed4e540c6e2f7c9b40af9ecc011ca0387fd67ec41be0f1cf92c7d0181368b4c67ab07df2d2384192520d74ff77ace6a04ba0e7ad7b34c64223fe59584bc464d53fcdc7091faaee5df0451254062cfb37
```

Each Minter Check has:
-   **Nonce** - unique "id" of the check.
-   **ChainID** - id of the network (1 - mainnet, 2 - testnet).
-   **Coin** - ID of a coin redeem to.
-   **Value** - amount of coins.
-   **GasCoin** - ID of a coin to pay fee.
-   **Due Block** - defines last block height in which the check can
    be used.
-   **Lock** - secret to prevent hijacking.
-   **Signature** - signature of issuer.

### Check hijacking protection

Minter Checks are issued offline and do not exist in blockchain before
"cashing". So we decided to use special passphrase to protect checks
from hijacking by another person in the moment of activation. Hash of
this passphrase is used as private key in ECDSA to prove that sender is
the one who owns the check.

*TODO: describe algorithm*

### How to issue a Minter Check

For issuing Minter Check you can use our
[Console](https://console.minter.network).

You will need to fill a form:
-   **Nonce** - unique "id" of the check.
-   **Coin ID** - ID of coin.
-   **Gas coin** - ID of a coin to pay fee.
-   **Value** - amount of coins.
-   **Pass phrase** - secret phrase which you will pass to receiver
    of the check.

### How to cash a Minter Check

To redeem a check user should send [redeem check transaction](#redeem-check-transaction) with next data:
-   Check itself
-   Secret passphrase

After redeeming, balance of user will be increased instantly.

### Commission

There is no commission for issuing a check because it done offline. In
the moment of cashing issuer will pay commission.

## Multisignatures

Minter has built-in support for multisignature wallets. Multisignatures,
or technically Accountable Subgroup Multisignatures (ASM), are signature
schemes which enable any subgroup of a set of signers to sign any
message, and reveal to the verifier exactly who the signers were.

Suppose the set of signers is of size *n*. If we validate a signature if
any subgroup of size *k* signs a message, this becomes what is commonly
reffered to as a *k* of *n* multisig in Bitcoin.

Minter Multisig Wallets has 2 main goals:
-   Atomic swaps with sidechains
-   Basic usage to manage funds within Minter Blockchain

### Structure of multisig wallet

Each multisig wallet has:
-   Set of signers with corresponding weights
-   Threshold

Transactions from multisig wallets are proceed identically to the K of N
multisig in Bitcoin, except the multisig fails if the sum of the weights
of signatures is less than the threshold.

### How to create multisig wallet

TO BE DESCRIBED

### How to use multisig wallet

TO BE DESCRIBED

## Commissions

For each transaction sender should pay fee. Fees are measured in pip value of commission price coin. It can be base coin of reserveless token. If price coin differs from base coin then needed base coin value will be calculated as "how much base coin will be received if certain amount of price coin will be sold to the swap pool". Actually swap will not occur, it will only calculate needed base coin amount.

Also user has option to pay commission in any coin or reservless token which can be converted to base coin. In such case this custom coin will be converted to base coin automatically. When transaction change blockchain state, first it apply changes from fee coin converted to base coin, second it apply changes from transaction data. E.g. if user performs "buy from swap pool" transaction and pay fee with on of this pool pair token, fee conversion will affect pool parameters, and then received amount for swap will be calculated based on the changed pool parameters.

So in most complicated case there can be three commission values:
- commission coin price value: how validators asses costs of transaction
- base coin value: how much base coins will be spent for validating rewards
- custom coin value: how much coins sender will spend

You can estimate commission value required for transaction in [/v2/estimate_tx_commission/{tx}](https://redocly.github.io/redoc/?url=https://raw.githubusercontent.com/MinterTeam/node-grpc-gateway/1.3/docs/api.swagger.json#operation/EstimateTxCommission] API method.


Since Minter 2.0 there are no standard commissions.  
Commission price may change after validators vote for it. See [list of available fields](#vote-for-commission-price-transaction) to change by vote.

Current commission values can be found in [/v2/price_commissions](https://redocly.github.io/redoc/?url=https://raw.githubusercontent.com/MinterTeam/node-grpc-gateway/1.3/docs/api.swagger.json#operation/PriceCommission) API method.

### How commission is calculated

Needed commission price coin amount consist of several parts:

**1. Base**

Depends on transaction type, each type has it's own base amount field.

**2. Delta**

Some transaction types has delta amount field based on count of something. In this case fee will be calculated as follows: `fee = base_value + (count - 1) * delta_value`.  
For multisend transaction `count` is number of recepients.  
For swap within pool transaction `count` is a number of pools participating in swap chain route.

**3. Ticker length**

To create a coin or token, Coiner should reserve ticker for it. Taking tickers costs extra fee. The shorter ticker length, the more fee amount. 3 letters tickers are most expensive, 7-10 letters tickers are most cheaper.

**4. Payload length**

Sender should pay extra fee per byte in Payload fields


## Validators

### Introduction

The Minter Blockchain is based on Tendermint, which relies on a set of
validators that are responsible for committing new blocks in the
blockchain. These validators participate in the consensus protocol by
broadcasting votes which contain cryptographic signatures signed by each
validator's private key.

Validator candidates can bond their own coins and have coins
"delegated", or staked, to them by token holders. The validators are
determined by who has the most stake delegated to them.

Validators and their delegators will earn base coin BIP as rewards for
blocks and commissions. Note that validators can set commission on the
rewards their delegators receive as additional incentive.

There are two types of penalty for validators:
- If validators double sign, their staked coins will be slashed for 5% (including coins of users that delegated to them).
- If validator skip signing 12 of 24 last blocks, it will be banned for 24 hours.

### Requirements
Minimal requirements for running Validator's Node in testnet are:

-   4GB RAM
-   200GB SSD
-   x64 2.0 GHz 4 vCPUs

SSD disks are preferable for high transaction throughput.

Recommended:

-   4GB RAM
-   200GB SSD
-   x64 3.4 GHz 8 vCPUs
-   HSM

### Validators limitations
Minter Network has limited number of available slots for validators.

At the launch there were `16` slots. `4` slots were added each
`518 400` blocks. Maximum number of validators is `64`.

### Rewards
Rewards for blocks and commissions are accumulated and proportionally
(based on stake value) paid once per `720 blocks` (approx 1 hour) to
all active validators (and their delegators).

Block rewards are configured to decrease from 333 to 0 BIP (MNT) in \~7
years.

Delegators receive their rewards at the same time after paying
commission to their validators (commission value is based on
validator's settings).

`10%` from reward going to DAO account.

`10%` from reward going to Developers.

### Rules and fines

Validators have one main responsibility:
-   Be able to constantly run a correct version of the software:
    validators need to make sure that their servers are always online, and their private keys are not compromised.
    If a validator misbehaves, its bonded stake along with its delegators'
    stake and will be slashed. The severity of the punishment depends on the
    type of fault. There are 2 main faults that can result in slashing of
    funds for a validator and its delegators:

-   **Double signing**: If someone reports on chain A that a validator
    signed two blocks at the same height on chain A and chain B, this
    validator will get slashed on chain A for 5% of stake
-   **Unavailability**: If a validator's signature has not been
    included in the 12 of last 24 blocks, validator will be turned off and banned for 24 hours

Note that even if a validator does not intentionally misbehave, it can
still be slashed if its node crashes, looses connectivity, gets DDOSed,
or if its private key is compromised.

### Becoming validator in testnet

1. Install and run Minter Full Node.
2. Get your validator's public key (`minter show_validator`).
3. Go to [Minter
Console](https://console.testnet.minter.network/masternode/) and send 2
transactions:

  Fill and send `Declare candidacy` and `Set candidate online` forms.
  1. Declare candidacy
      Validators should declare their candidacy, after which users
      can delegate and, if they so wish, unbond. Then declaring
      candidacy validator should fill a form:
      -   Address - You will receive rewards to this address and
          will be able to on/off your validator.
      -   Public Key - Paste public key from step 2 *(Mp...)*.
      -   Commission - Set commission for delegated stakes.
      -   Coin - Enter coin of your stake (i.e. MNT).
      -   Stake - Enter value of your stake in given coin.
  2. Set candidate online
      Validator is **offline** by default. When offline, validator
      is not included in the list of Minter Blockchain validators,
      so he is not receiving any rewards and cannot be punished
      for low availability.
      To turn your validator **on**, you should provide Public Key
      (from step 2 *(Mp...)*).
      *Note: You should send transaction from address you choose
      in Address field in step 3.1*
4. Done.
  Now you will receive reward as long as your node is running and available.
### DDOS protection. Sentry node architecture
Denial-of-service attacks occur when an attacker sends a flood of
internet traffic to an IP address to prevent the server at the IP
address from connecting to the internet.

An attacker scans the network, tries to learn the IP address of various
validator nodes and disconnect them from communication by flooding them
with traffic.

One recommended way to mitigate these risks is for validators to
carefully structure their network topology in a so-called sentry node
architecture.

Validator nodes should only connect to full-nodes they trust because
they operate them themselves or are run by other validators they know
socially. A validator node will typically run in a data center. Most
data centers provide direct links the networks of major cloud providers.
The validator can use those links to connect to sentry nodes in the
cloud. This shifts the burden of denial-of-service from the validator's
node directly to its sentry nodes, and may require new sentry nodes be
spun up or activated to mitigate attacks on existing ones.

Sentry nodes can be quickly spun up or change their IP addresses.
Because the links to the sentry nodes are in private IP space, an
internet based attacked cannot disturb them directly. This will ensure
validator block proposals and votes always make it to the rest of the
network.

It is expected that good operating procedures on that part of validators
will completely mitigate these threats.

#### Practical instructions

To setup your sentry node architecture you can follow the instructions
below:

Validators nodes should edit their `config.toml`:
```toml
# Comma separated list of nodes to keep persistent connections to
# Do not add private peers to this list if you don't want them advertised
persistent_peers = ["list of sentry nodes"]
# Set true to enable the peer-exchange reactor
pex = false
```

Sentry Nodes should edit their `config.toml`:
```toml
# Comma separated list of peer IDs to keep private (will not be gossiped to other peers)
private_peer_ids = "ipaddress of validator nodes"
```

## Delegator FAQ

### What is a delegator?
People that cannot, or do not want to run validator operations, can
still participate in the staking process as delegators. Indeed,
validators are not chosen based on their own stake but based on their
total stake, which is the sum of their own stake and of the stake that
is delegated to them. This is an important property, as it makes
delegators a safeguard against validators that exhibit bad behavior. If
a validator misbehaves, its delegators will move their staked coins away
from it, thereby reducing its stake. Eventually, if a validator's stake
falls under the top addresses with highest stake, it will exit the
validator set.

Delegators share the rewards of their validators, but they also share
the risks. In terms of rewards, validators and delegators differ in that
validators can apply a commission on the rewards that goes to their
delegator before it is distributed. This commission is known to
delegators beforehand and cannot be changed. In terms of risk,
delegators' coins can be slashed if their validator misbehaves. For
more, see Risks section.

To become delegators, coin holders need to send a "Delegate
transaction" where they specify how many coins they want to bond and to
which validator. Later, if a delegator wants to unbond part or all of
its stake, it needs to send an "Unbond transaction". From there, the
delegator will have to wait 30 days to retrieve its coins.

### Directives of delegators
Being a delegator is not a passive task. Here are the main directives of
a delegator:
- Perform careful due diligence on validators before delegating. If a
    validator misbehaves, part of its total stake, which includes the
    stake of its delegators, can be slashed. Delegators should therefore
    carefully select validators they think will behave correctly.
- Actively monitor their validator after having delegated. Delegators
    should ensure that the validators they're delegating to behaves
    correctly, meaning that they have good uptime, do not get hacked and
    participate in governance. If a delegator is not satisfied with its
    validator, it can unbond and switch to another validator.
### Rewards
Validators and delegators earn rewards in exchange for their services. This
rewards is given in two forms:
- Block rewards
- Transaction fees: Each transaction on the Minter Network comes with
    transactions fees. Fees are distributed to validators and delegators
    in proportion to their stake.
### Validator commission
Each validator's staking pool receives rewards in proportion to its
total stake. However, before this rewards is distributed to delegators
inside the staking pool, the validator can apply a commission. In other
words, delegators have to pay a commission to their validators on the
rewards they earn.

`10%` from reward going to DAO account.

`10%` from reward going to Developers.

Let's consider a validator whose stake (i.e. self-bonded stake +
delegated stake) is 10% of the total stake of all validators. This
validator has 20% self-bonded stake and applies a commission of 10%. Now
let us consider a block with the following rewards:
- 111 Bips as block reward (after subtraction taxes of 20%)
- 10 Bips as transaction fees (after subtraction taxes of 20%)

This amounts to a total of 121 Bips to be distributed among all staking
pools.

Our validator's staking pool represents 10% of the total stake, which
means the pool obtains 12.1 bips. Now let us look at the internal
distribution of rewards:
- Commission = 10% * 80% * 12.1 bips = 0.69696 bips
- Validator's rewards = 20% * 12.1 bips + Commission = 3.11696 bips
- Delegators' total rewards = 80% * 12.1 bips - Commission = 8.98304
    bips
Then, each delegator in the staking pool can claim its portion of the
delegators' total rewards.

### Risks
Staking coins is not free of risk. First, staked coins are locked up,
and retrieving them requires a 30 days waiting period called unbonding
period. Additionally, if a validator misbehaves, a portion of its total
stake can be slashed (i.e. destroyed). This includes the stake of their
delegators.

There are 2 main slashing conditions:
- **Double signing**: If someone reports on chain A that a validator
    signed two blocks at the same height on chain A and chain B, this
    validator will get slashed on chain A for 5% of their stake
- **Unavailability**: If a validator's signature has not been
    included in the 12 of last 24 blocks it will be turned off and banned for 24 hours

This is why delegators should perform careful due diligence on
validators before delegating. It is also important that delegators
actively monitor the activity of their validators. If a validator
behaves suspiciously or is too often offline, delegators can choose to
unbond from it or switch to another validator. Delegators can also
mitigate risk by distributing their stake across multiple validators.


## Minter SDKs
### GO SDK
- [minter-go-sdk](https://github.com/MinterTeam/minter-go-sdk) – a pure GO SDK for working with Minter blockchain

### JavaScript SDK
- [minter-js-sdk](https://github.com/MinterTeam/minter-js-sdk) –
    work with transactions, checks, and deeplinks
- [minterjs-wallet](https://github.com/MinterTeam/minterjs-wallet) –
    work with mnemonic, private/public key and address
- [minterjs-tx](https://github.com/MinterTeam/minterjs-tx) –
    low level TX implementation (only for advanced users, use SDK instead)
- [minterjs-util](https://github.com/MinterTeam/minterjs-util) –
    a collection of utility functions for Minter

### iOS SDK
- [minter-ios-core](https://github.com/MinterTeam/minter-ios-core)
  – create, manipulate and sign Minter transactions
- [minter-ios-explorer](https://github.com/MinterTeam/minter-ios-explorer)
  – communicate with the Minter blockchain through Explorer

### PHP SDK
- [minter-php-sdk](https://github.com/MinterTeam/minter-php-sdk)
  – a pure PHP SDK for working with Minter blockchain

### Android SDK
- [minter-android-core](https://github.com/MinterTeam/minter-android-core) - foundation for all Minter blockchain operations
- [minter-android-blockchain](https://github.com/MinterTeam/minter-android-blockchain) - operate with Minter transactions and connect to Node API (rest) using this sdk
- [minter-android-explorer](https://github.com/MinterTeam/minter-android-explorer) - communicate with the Minter blockchain through the Explorer and Gate API

### C++ SDK
- [cpp-minter](https://github.com/MinterTeam/cpp-minter) - build and sign any transaction, generate mnemonic with private and public key
- [example projects](https://github.com/MinterTeam/cpp-minter#examples)

## Node API

### v2 (latest).
- [Documentation](https://minterteam.github.io/node-grpc-gateway/)
- Testnet base url: `https://node-api.testnet.minter.network/v2/`

### v1 (deprecated)
- [Documentation](https://minterteam.github.io/minter-go-node-docs/)
- [openapi.yaml](https://github.com/MinterTeam/minter-go-node-docs/blob/gh-pages/openapi.yaml)
- [openapi.json](https://github.com/MinterTeam/minter-go-node-docs/blob/gh-pages/openapi.json)
- Testnet base url: `https://node-api.testnet.minter.network/`


## Other public services
### Explorer API
- [Documentation](https://app.swaggerhub.com/apis-docs/GrKamil/minter-explorer_api)
- Testnet base url: `https://explorer-api.testnet.minter.network/api/v2/`
- Mainnet base url: `https://explorer-api.minter.network/api/v2/`

### Gate API (v2)
Minter Gate is a service to publish prepared transactions to the Minter Network.
  Prefer to use it instead of node, because it provides load balancing and automatical check of transaction success.

- [Documentation](https://minterteam.github.io/minter-gate-docs/#section/Introduction)
- Testnet base url: `https://gate-api.testnet.minter.network/api/v2/`
- Mainnet base url: `https://gate-api.minter.network/api/v2/`

### bip.dev API
Trade BIP through [bip.dev](https://bip.dev)

- [Documentation](https://minterteam.github.io/bipdev-docs/)
- Base API url: `https://api.bip.dev/api/`
- [Card API documentation (Swagger)](https://app.swaggerhub.com/apis-docs/GrKamil/bipdev-card-api)
- Card API url: `https://card-api.bip.dev/api/v1/`
