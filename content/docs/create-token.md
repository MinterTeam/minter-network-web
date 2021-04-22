---
order: 6
---

# How to Create Your Own Token on Minter

Unlike [coins](/en/docs/create-coin), tokens have no BIP reserve and are, in fact, "empty." This leads to a number of restrictions (e.g., tokens can't be delegated), but makes it possible to:
- Mint (owner)
- Burn (anyone)

Within the Minter network, tokens can be swapped via liquidity pools they participate in.


## Token Parameters

To create a token, go to the [corresponding section in Console](https://console.minter.network/coiner):

![Create token](/img/docs/create-token-en.png)

- **Name** - full name of the token, up to 64 characters long (you may use spaces, mix upper and lower cases, insert emojis). Doesn't necessarily have to be unique;
- **Symbol** - short, unique name of the token (also known as ticker symbol) that consists of numbers and uppercase English letters. Must be 3 to 10 characters long;
- **Initial amount** - the number of tokens to be issued at first (up to 1 000 000 000 000 000 units);
- **Max. supply** - total supply of your token will never be more than a number specified here (up to 1 000 000 000 000 000 units);
- **Mintable** – feature allowing for issuance of additional tokens from owner address;
- **Burnable** – feature allowing for burn of freely circulating tokens from any address;
- **Message** - can be used to provide a more detailed description of the token. An arbitrary string (up to 1 024 symbols);
- **Coin to pay fee** - self-explanatory.

Depending on the length of the ticker, the creator will be charged a fee that will be then distributed among validators and therefore, their delegators:

- 3 characters — 1 000 000 BIP
- 4 characters — 100 000 BIP
- 5 characters — 10 000 BIP
- 6 characters — 1 000 BIP
- 7–10 characters — 100 BIP

You can send tokens to other addresses but can't delegate them. You can swap them for other tokens and coins of the network through liquidity pools they are part of. If no pair has been created with a given token, you won't be able to buy or sell it.
