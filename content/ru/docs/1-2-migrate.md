---
order: 2
title: Minter 1.2 Migration Guide
---

# Minter 1.2 Migration Guide

**1. Архивация монет**

1. Начиная с версии 1.2 монеты имеют уникальный числовой ID.

```json
{
   "id": 1,
   "name": "Test Coin",
   ...
}
```

В ответах API теперь передается структура (вместо символа монеты):
```json
{
   "id": 1,
   "symbol": "TEST"
}
```

Все транзакции с указанием монеты изменены таким образом, чтобы обращение происходило по ID:
```go
type SendData struct {  
  Coin  types.CoinID  
  To    types.Address  
  Value *big.Int  
}
```

В JS SDK можно продолжать использовать тикеры монет в коде, но заменять их на ID с помощью метода `replaceCoinSymbol`, который сделает запрос в апи за ID переданных монет и подставит их обратно в переданный объект.
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

В GO SDK v2 реализованы методы получения ID монет по их тикерам у [HTTP](https://pkg.go.dev/github.com/MinterTeam/minter-go-sdk/v2/api/http_client#Client.CoinID) и [gRPC](https://pkg.go.dev/github.com/MinterTeam/minter-go-sdk/v2/api/grpc_client#Client.CoinID) клиентов:
```go
client, _ := http_client.New("http://localhost:8843/v2") // or client, _ := grpc_client.New("localhost:8842")
id, _ := client.CoinID("BIP")
dataSend := transaction.NewSendData().SetCoin(id) // ...
```

2.  У монет появился владелец: `owner_address`. Владельцами для новых монет будут являться адреса, с которых они были созданы. Для старых монет владелец может отсутствовать (быть null).

3.  Владелец сможет пересоздать монету. Предположим, что существует монета COIN и владелец отправляет транзакцию для ее пересоздания. В этот момент старая монета переименовывается в COIN-1 и создается новая с тикером COIN.

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
Комиссия: 10000000 units (10k BIP)

4.  Владелец сможет передавать права на тикер другому адресу.

```go
type EditCoinOwnerData struct {
  Symbol   types.CoinSymbol
  NewOwner types.Address
}
```

Type: `0x11`
Комиссия: 10000000 units (10k BIP)

----------

**2. Изменение формулы расчёта стейка**

Новый вариант расчета стейка кастомной монеты:

`bipValue = (reserve-CalculateSaleReturn(nonDelegatedSupply)) * value / totalDelegatedValue`

старый вариант:

`bipValue = CalculateSaleReturn(totalDelegatedSupply) * value / totalDelegatedValue`

----------

**3. Ограничение количества валидаторов**

Валидаторы с небольшими стейками (менее 1% силы голоса) не влияют на процесс принятия решений и децентрализацию сети, но значительно замедляют ее, будучи равноправными участниками консенсуса.

Чтобы максимизировать эффективность Minter, было предложено ограничить максимальное количество валидаторов до 64.

----------

**4. Добавление третьего (контролирующего) адреса для валидатора**

Для повышения безопасности валидаторов, предлагается ввести третий адрес управления: ControlAddress. Функциональность этого адреса ограничена включением и выключением валидатора  
(транзакции SetCandidateOnline / SetCandidateOffline).

Изменения в транзакции EditCandidate:
```go
type EditCandidateData struct {  
  PubKey         types.Pubkey  
  RewardAddress  types.Address  
  OwnerAddress   types.Address  
  ControlAddress types.Address  
}
```

----------

**5. Новая транзакция: EditCandidatePublicKey**

```go
type EditCandidatePublicKeyData struct {  
  PubKey    types.Pubkey  
  NewPubKey types.Pubkey  
}
```

Type: `0x14`
Комиссия: 100 000 000 units (100k BIP)

Транзакция может быть отправлена с адреса владельца валидатора (OwnerAddress). После изменения старый публичный ключ добавляется в черный список и не может быть задекларирован повторно.

**6. Новая транзакция: EditMultisig**

Транзакция EditMultisig позволяет изменять список владельцев и порог мультисига без изменения адреса. 

```go
type EditMultisigData struct {  
  Threshold uint  
  Weights   []uint  
  Addresses []types.Address  
}
```

Type: `0x12`
Комиссия: 1000 units (1 BIP)

Транзакция должна быть отправлена с Multisig адреса и подписана достаточным количеством его владельцев.

**7. Новая транзакция: PriceVote**

Чтобы иметь возможность запускать сложные смарт контракты и сервисы, нужно индикатор рыночной цены BIP в самом блокчейна. Разработку мы начнем с введения нового типа транзакций — PriceVote. Валидаторы будут транслировать текущую рыночную цену BIP в сеть и по их голосам будет формироваться средневзвешенная цена, которую смогут использовать сервисы.

Type: `0x13`
Комиссия: 10 units (0.01 BIP)

**8. Wait List**

Стейки, не вошедшие в топ-1000 слотов валидатора, теперь не возвращаются автоматически. Они попадают в WaitList с событием `minter/StakeKickEvent`.

```go
type StakeKickEvent struct {  
  Address         types.Address `json:"address"`  
  Amount          string        `json:"amount"`  
  Coin            types.CoinID  `json:"coin"`  
  ValidatorPubKey types.Pubkey  `json:"validator_pub_key"`  
}
```

Пользователь может заделегировать дополнительные монеты, чтобы стейк снова оказался в топ-1000, либо произвести Unbond.

Pеализован метод API для вывода стейков попавших в WaitList по адресу владельца, публичный адрес ноды является опциональным параметром: ```/v2/waitlist/{address}?public_key=```. Подробное описание метода можно увидеть на странице [/v2/openapi-ui](https://minterteam.github.io/node-grpc-gateway/).

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

В CLI появилась команда для удаления блоков

На вход принимаются параметры первого и последнего блока для удаления:
```console
$ ./minter console
>>> prune_blocks --from=1 --to=10000
```
