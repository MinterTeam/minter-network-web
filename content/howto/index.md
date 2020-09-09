---
order: 1
title: Blockchain Loyalty Points: The Definitive Guide (2020)
description: How to create blockchain loyalty points and rewards on the Minter network? How to implement them into your platform, and what are the possible use cases?
---

# Blockchain Loyalty Points
With Minter, you can create a highly flexible and customizable loyalty program or reward system for your community. It can be either built specifically for the ecosystem within which your audience interacts or poised for international expansion.

This guide will take you step-by-step through the process of using the Minter network to create blockchain loyalty points.

## Choose a Type of Coin
Depending on the logic of your reward system, first you need to pick the type of coin: local or global.

### Local Coins
Can only be used and have value within your ecosystem, platform, or community. They lack liquidity—i.e., the ability to be exchanged for other coins—and market price. Technically, there’s only one actual type of transaction available for these coins: `Send` (transfer from one address to another).

Pros:
- You can build your own use-case scenarios *(for example, members only get coins for performing useful actions)*
- Independence from external factors *(no one but your users will be able to receive the coins or affect the total number of coins)*
- No market price *(that is, no exchange rate volatility)*
- As a brand, you can set a controllable value *(for example, 1 coin = 1 cup of coffee/1 point of reputation)*

Cons:
- Can’t be spent on any goods or services anywhere in the world *(coins have no value outside of your brand or system)*
- No market price *(the rate of your coin will not be able to rise or fall, there simply won’t be one)*
- Inability to swap your coin for a coin of another brand
- No point in delegation *(since your coin will be practically non-backed, its staking does not make sense)*

### Global Coins
Can be exchanged for other global coins outside of your ecosystem, platform, or community, as well as spent on any available good or service anywhere in the world. Not only your users can own this type of coin, but also any other person. These coins have internal liquidity and market value.

Pros:
- The ability to spend coins on goods and services
- Market price *(exchange rate may or may not rise or fall)*
- Free conversion of your coins (blockchain loyalty points) into coins of other brands or vice versa directly from the wallet
- The possibility of delegation *(depending on the size of stake, parameters of the coin, and, as a result, the price of delegation, the user can receive share of block rewards)*

Cons:
- The coin rate will be volatile, more or less, depending on the parameters
- Inability to prohibit anyone from buying and selling a coin on the free market

Local coins are better suited for reputation systems, rankings and ratings, internal stores (souvenirs, merchandise, etc.), awarding access to premium functionality, participating in events, and anything else where market value is not needed.

Global coins are best used to reward the audience for activity and actions (likes, subscriptions, reposts, comments), donation systems, and cashback and loyalty programs. Wherever value is important along with the ability to quickly spend a reward, sell it, or exchange it for another value.

## Create a Coin
Any custom coin on the Minter network is backed by BIP. When creating a coin, you reserve the required amount of BIP and also pay the network fee for the ticker:

- 3 characters: 1,000,000 BIP
- 4 characters: 100,000 BIP
- 5 characters: 10,000 BIP
- 6 characters: 1,000 BIP
- 7–10 characters: 100 BIP

The minimum reserve for any custom coin is 10,000 BIP. For local coins, the maximum reserve is equal to the minimum, that is, 10,000 BIP.

Global coins can be exchanged for one another or for BIP, which is why a BIP reserve is required. When you buy a coin inside Minter, its supply and reserve increase; when you sell it, they decrease. To provide instant liquidity when converting one coin into another, they must be backed by a sufficient number of BIPs. This is not possible with local coins because their reserve is constant and always equal to 10,000 BIP.

The most user-friendly way to create a coin is through <a href="https://console.minter.network" rel="nofollow">Console</a> (the interface that offers more advanced features than <a href="https://www.bip.to" rel="nofollow">BIP Wallet</a>). You can use the web version or download the local one from <a href="https://github.com/MinterTeam/minter-console-web/releases" rel="nofollow">GitHub</a>.

Create an address by generating a seed phrase:

![Blockchain Loyalty Points Creation Step 1: Create Minter Address](/img/docs/create-wallet.jpg)

After pressing the corresponding button, you will see the address itself and a 12-word seed phrase:

![Blockchain Loyalty Points Creation Step 2: Save Seed Phrase](/img/docs/create-wallet2.jpg)

Make sure to keep the seed phrase in a safe place that no one can access except you. It is the key to all funds in your wallet, and it is impossible to restore or change it!

To sign in to your wallet, enter the seed phrase you got. Since any custom Minter-based coin is backed by the network’s native digital token, you need to have BIP on your balance (see <a href="https://bip.dev" rel="nofollow">here</a> for reference).

Once you have the necessary amount of BIP, proceed to the <a href="https://console.minter.network/coiner" rel="nofollow">Coiner</a> section from the sidebar menu.

![Blockchain Loyalty Points Creation Step 3: Create Coin](/img/docs/create-coin2.jpg)

- `Coin name`. The full name of the coin, up to 64 characters (spaces, upper and lower case, emojis are allowed). Uniqueness is not required;
- `Coin symbol`, also known as ticker. Must be unique, uppercase, and 3 to 10 symbols long. May contain numbers;
- `Initial amount`. The number of units you want to issue (up to 1,000,000,000,000,000);
- `Initial reserve`. The number of BIPs to back your coin. Specified amount must be on your balance, the minimum is 10,000 BIP;
- `Constant reserve ratio (CRR)`. The higher the coefficient, the higher the reserves and thus the lower the volatility. And vice versa. The value should be integer and fall in the range from 10 to 100;
- `Max supply`. Once this number is reached, no new coins can be issued (up to 1,000,000,000,000,000);
- `Message`. Acts as an extended description of the coin (optional). Up to 1,024 characters;
- `Coin to pay fee`. A coin to pay a network commission for creating a ticker (BIP by default);
- `Multisig address` is an address that requires multiple signatures to confirm a transaction. Multisig means two or more users have access to the address. <a href="https://www.minter.network/docs#multisignatures" rel="nofollow">Learn more</a>.

The main parameters you can use to customize the coin’s characteristics are:
- `Initial amount`: For example, 1 million;
- `Max supply`: Once reached, it will no longer be possible to buy your coin. For example, 10 million;
- `Initial reserve`: The more it is, the higher the value of each created coin and the less the volatility relative to BIP during the exchange;
- `CRR`: The higher it is, the lower the volatility and the higher the delegation price, all other things being equal.

You can use the <a href="https://calculator.minter.network" rel="nofollow">calculator</a> to model and predict the behavior of a coin with different parameters when buying and selling.

Unlike global coins, local ones only have one template when created:
- `Initial amount` = for example, 10,000;
- `Max supply` = **same** as the initial amount, 10,000;
- `Initial reserve` = **10,000 BIP**
- `CRR` = **100%**

## Blockchain Loyalty Points Minted as Coins on the Minter Network: Use Cases
Having created a coin with its own unique ticker and required parameters, you can start turning it into blockchain loyalty points for your program. Here are some examples of how you can use them in practice:
- Access to premium features
- Tips to the authors of posts and comments
- Transfers between users
- Reputation systems
- Votes and polls
- Likes and reposts
- Cashbacks and discounts
- and much more, depending on the functionality of the platform and your imagination

Read this article to explore a case study of [Reddit blockchain rewards](https://medium.com/@MinterTeam/blockchain-reward-system-99be560b3c42).

Pleae note that in order to integrate blockchain loyalty points into your platform, you will need a programmer or team of programmers (if you are not one yourself). Some of the implementation cases are presented below for informational purposes only:

### 1. Accept Your Coin for Goods and Services
1. On the product page, the user clicks the ‘Pay with BIP’ button.
2. The seller sets the coin’s price for a specific good or service. For example, 1 pint of beer = 16 BEER.
```
$price = 16; // BEER
```
*(Change `BEER` with the ticker of your coin.)*

3. The system generates a Minter network address. For that, the `MinterWallet::create()` method is used. It returns an array of data related to a given address: seed, mnemonic phrase, private key, and the address itself. Save the private key and address to a database and display the address to the user so that they can transfer the amount required.
```
use Minter\SDK\MinterWallet;
$wallet = MinterWallet::create();
$address = $wallet[‘address’];
$privateKey = $wallet[‘private_key’];
```
<a href="https://github.com/MinterTeam/minter-php-sdk#minter-wallet" rel="nofollow">https://github.com/MinterTeam/minter-php-sdk#minter-wallet</a>

4. The system checks if the payment has been made. Implementation options:

**a.** Request the balance of a generated address every 30 seconds for 20 minutes. Once there is a required amount on the balance, consider the payment completed. Otherwise, stop checking and consider the payment canceled.

**b.** Use MinterAPI.
```
use Minter\MinterAPI;
$api = new MinterAPI(‘https://testnet.node-api.minter.network/v2’);
$response = $api->getBalance($address);
$balance = $response->result->balance->BIP;
if ($balance >= $price) {
// success payment
}
```

### 2. Cashback in Your Coin
1. Assume we have an address where we created `BONUS` coins and its private key.
```
$marketAddress = ‘Mx31e61a05adbd13c6b625262704bc305bf7725026’;
$marketPrivateKey = ‘07bc17abdcee8b971bb8723e36fe9d2523306d5ab2d683631693238e0f9df142’;
```
2. Install Minter PHP SDK.
```
composer require minter/minter-php-sdk
https://github.com/MinterTeam/minter-php-sdk#installing
```
3. Generate a Minter address for the user upon sign-up. For that, the `MinterWallet::create()` method is used. It returns an array of data related to a given address: seed, mnemonic phrase, private key, and the address itself. Save the private key and address to a database.
```
use Minter\SDK\MinterWallet;
$wallet = MinterWallet::create();
$userAddress = $wallet[‘address’];
$userPrivateKey = $wallet[‘private_key’];
```
<a href="https://github.com/MinterTeam/minter-php-sdk#minter-wallet" rel="nofollow">https://github.com/MinterTeam/minter-php-sdk#minter-wallet</a>

4. Once the user has made the payment, credit `BONUS` coins. To do that, you need to create a transaction and send it to the Minter network.

5. First, initialize the `MinterAPI` class. You can use any open node.
```
use Minter\MinterAPI;
$nodeUrl = ‘https://testnet.node-api.minter.network/v2'; // example of a node url
$api = new MinterAPI($nodeUrl);
```
<a href="https://github.com/MinterTeam/minter-php-sdk#using-minterapi" rel="nofollow">https://github.com/MinterTeam/minter-php-sdk#using-minterapi</a>

6. Then, we need to create a `Send` transaction.

Get nonce for the address where `BONUS` coins are stored.
```
$nonce = $api->getNonce($marketAddress);
```
Assume we want to send 10 `BONUS` coins.
```
$amount = 10;
```
Create a transaction.
```
use Minter\SDK\MinterTx;
use Minter\SDK\MinterCoins\MinterSendCoinTx;
$tx = new MinterTx([
‘nonce’ => $nonce,
‘chainId’ => MinterTx::MAINNET_CHAIN_ID,
‘gasPrice’ => 1,
‘gasCoin’ => ‘BIP’,
‘type’ => MinterSendCoinTx::TYPE,
‘data’ => [
‘coin’ => ‘BONUS’,
‘to’ => $userAddress,
‘value’ => $amount
],
‘payload’ => ‘’,
‘serviceData’ => ‘’,
‘signatureType’ => MinterTx::SIGNATURE_SINGLE_TYPE
]);
```
Sign a transaction with your private key (for the address where `BONUS` coins are stored).
```
$transaction = $tx->sign($marketPrivateKey);
```
<a href="https://github.com/MinterTeam/minter-php-sdk#example-3" rel="nofollow">https://github.com/MinterTeam/minter-php-sdk#example-3</a>

7. Send a signed transaction to the network.
```
use GuzzleHttp\Exception\RequestException;
try {
 $response = $api->send($transaction);
} catch(RequestException $exception) {
// short exception message
$message = $exception->getMessage();
// error response in json
$content = $exception->getResponse()
->getBody()
->getContents();
// error response as array
$error = json_decode($content, true);
}
```
### 3. Exclusive Access
1. Assume we have an address where we created `VIP` coins and its private key.
```
$mainAddress = ‘Mx31e61a05adbd13c6b625262704bc305bf7725026’;
$mainAddressPrivateKey = ‘07bc17abdcee8b971bb8723e36fe9d2523306d5ab2d683631693238e0f9df142’;
```
2. Now, we want to restrict access to our system. To gain access to the system or a specific action, the user will need to send the `N` amount of `VIP`. For that, we generate a special address that they will be able to transfer `VIP` coins to in order to get access (or invitation).
```
use Minter\SDK\MinterWallet;
$wallet = MinterWallet::create();
$address = $wallet[‘address’];
$privateKey = $wallet[‘private_key’];
```
3. Specify the required amount of `VIP`.
```
$requiredCoinAmount = 5;
```
4. Verify if the user has transferred the coins. For that, we can check the balance of a generated address once every 15 seconds for 20 minutes.
```
use Minter\MinterAPI;
$api = new MinterAPI(‘https://testnet.node-api.minter.network/v2');
$response = $api->getBalance($address);
$balance = $response->result->balance;
if (isset($balance->VIP) && $balance >= $requiredCoinAmount) {
// open access to the system
}
```
5. We can also send out the coins to the users we want to have access to the system.

Assume we have the following array of addresses:
```
$addresses = [
‘Mx0a2bbda12c7b4660930d8a4d05b4c4d66abed1fc’,
‘Mx6041bb9afa46eea000129fb4a7ad56fa770c549c’,
‘Mx6af840f4108c6ba127301b9f631052d501c4c221’
];
```
In one transaction, we can send the coins to several addresses simultaneously.
```
use Minter\SDK\MinterTx;
use Minter\SDK\MinterCoins\MinterMultiSendTx;
$data = [];
for($addresses as $address) {
$data[] = [
‘coin’ => ‘VIP’,
‘to’ => $address,
‘value’ => ‘10’
];
}
$tx = new MinterTx([
‘nonce’ => $api->getNonce($mainAddress),
‘chainId’ => MinterTx::MAINNET_CHAIN_ID,
‘gasPrice’ => 1,
‘gasCoin’ => ‘BIP’,
‘type’ => MinterMultiSendTx::TYPE,
‘data’ => [
‘list’ => $data
],
‘payload’ => ‘’,
‘serviceData’ => ‘’,
‘signatureType’ => MinterTx::SIGNATURE_SINGLE_TYPE
]);
$transaction = $tx->sign($mainAddressPrivateKey)
```
6. Send a signed transaction to the network.
```
use GuzzleHttp\Exception\RequestException;
try {
 $response = $api->send($transaction);
} catch(RequestException $exception) {
// short exception message
$message = $exception->getMessage();
// error response in json
$content = $exception->getResponse()
->getBody()
->getContents();
// error response as array
$error = json_decode($content, true);
}
```
### 4. User Rating
1. Assume we have the user who’s just signed up for our website. Generate a new address for them and save it to a database.
```
use Minter\SDK\MinterWallet;
$wallet = MinterWallet::create();
$userAddress = $wallet[‘address’];
$userPrivateKey = $wallet[‘private_key’];
```
2. For specific actions on the website, we credit the coins (or blockchain loyalty points) to the user. To do that, we need to form and transmit a `Send` transaction.

Get nonce for the address where `RATING` coins are stored.
```
$nonce = $api->getNonce($mainAddress);
```
Assume we want to send 10 `RATING` coins.
```
$amount = 10;
```
Create a transaction.
```
use Minter\SDK\MinterTx;
use Minter\SDK\MinterCoins\MinterSendCoinTx;
$tx = new MinterTx([
‘nonce’ => $nonce,
‘chainId’ => MinterTx::MAINNET_CHAIN_ID,
‘gasPrice’ => 1,
‘gasCoin’ => ‘BIP’,
‘type’ => MinterSendCoinTx::TYPE,
‘data’ => [
‘coin’ => ‘RATING’,
‘to’ => $userAddress,
‘value’ => $amount
],
‘payload’ => ‘’,
‘serviceData’ => ‘’,
‘signatureType’ => MinterTx::SIGNATURE_SINGLE_TYPE
]);
```
Sign a transaction with a private key (for the address where `RATING` coins are stored).
```
$transaction = $tx->sign($mainAddressPrivateKey);
```
<a href="https://github.com/MinterTeam/minter-php-sdk#example-3" rel="nofollow">https://github.com/MinterTeam/minter-php-sdk#example-3</a>

3. Send a signed transaction to the network.
```
use GuzzleHttp\Exception\RequestException;
try {
 $response = $api->send($transaction);
} catch(RequestException $exception) {
// short exception message
$message = $exception->getMessage();
// error response in json
$content = $exception->getResponse()
->getBody()
->getContents();
// error response as array
$error = json_decode($content, true);
}
```
4. We can obtain the rating and category of a user (for example, to provide a Silver, Gold, or Platinum subscription) by the number of coins on the balance of their address. To do that, we can retrieve the balance.
```
use Minter\MinterAPI;
$nodeUrl = ‘https://testnet.node-api.minter.network/v2';
$api = new MinterAPI($nodeUrl);
$response = $api->getBalance($address);
$balance = $response->result->balance;
$ratingAmount = $balance->RATING ?? 0;
$userCategory = ‘Junior’;
if ($ratingAmount >= 10) {
$userCategory = ‘Middle’;
}
if ($ratingAmount >= 30) {
$userCategory = ‘Senior’;
}
echo $userCategory;
```
In this article, you can learn how to use Minter to build a [blockchain loyalty program for Twitter](https://medium.com/@danillashin/blockchain-loyalty-program-in-one-day-bcee6060fe7e) in one day.

## Re-Creation of Coins
You can re-issue the local coins while preserving the old ticker. It may be necessary if, for example, your reward system or loyalty program involves a one-time use of blockchain loyalty points:
- An event where only coin owners will participate *(1 coin = 1 ticket)*
- Marketing campaign that involves user acquisition *(1 coin = 1 user)*
- Raffle or draw among coin holders *(1 coin = 1 lottery ticket)*
- Cinema tickets *(1 coin = 1 ticket)*
- etc.

One-time use of coins is relevant when the user should not participate in an event more than once. If you need to preserve the ticker of your coin (for example, for the brand name) and want to re-use the coin in other one-off events, you can re-issue the coin under the same ticker.

Suppose 100 units are issued under the ticker of your local `FILM` coin. You, as a brand, have given away or sold tickets for the premiere of a new movie. 100 of your users received 1 `FILM` coin each. After the session ends, you archive this coin with it getting the `FILM-1` ticker. Its parameters remain the same, and upon re-creation, you set the new parameters for 200 `FILM` coins for 200 visitors. Thus, the ticker is saved, and the parameters can be adjusted for each specific movie, promo, presentation, etc.

> The coin archiving feature is currently being developed and will be introduced with the <a href="https://medium.com/@danillashin/minter-1-2-b015670c6ae4" rel="nofollow">Minter 1.2 upgrade</a>. This how-to is subject to change without notice.
