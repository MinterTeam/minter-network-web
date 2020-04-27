---
order: 100
title: SDK и другие полезные сервисы Минтера
---

# SDK и другие полезные сервисы Минтера

## Minter API

**Minter Api** - Сервис для получения и работы с блокчейном минтер через http интерфейс. Поможет вам найти баланс вашего счета и отправить транзакцию в сеть.
[Первая нода](http://api-01.minter.store:8841) [Вторая нода](http://api-02.minter.store:8841)

Всего 21 метод для получение информации. Это:

[/genesis](http://api-01.minter.store:8841/genesis) Получает genesis.json

[/min_gas_price](http://api-01.minter.store:8841/min_gas_price) Получает минимальный газ на данном блоке

[/net_info](http://api-01.minter.store:8841/net_info) Получает данные о соеденение данной ноды с другими нодами

[/status](http://api-01.minter.store:8841/status) Получает статус блокчейна

[/address?address=_&height=_](http://api-01.minter.store:8841/address?address=_&height=_) Получает данные об адресе

[/addresses?addresses=_&height=_](http://api-01.minter.store:8841/addresses?addresses=_&height=_) Получает данные об адресах

[/block?height=_](http://api-01.minter.store:8841/block?height=_) Получает информацию о блоке

[/candidate?pub_key=_&height=_](http://api-01.minter.store:8841/candidate?pub_key=_&height=_) Получает информацию о кандидате

[/candidates?height=_&include_stakes=_](http://api-01.minter.store:8841/candidates?height=_&include_stakes=_) Получает информацию о кандидатах

[/coin_info?symbol=_&height=_](http://api-01.minter.store:8841/coin_info?symbol=_&height=_) Получает информацию о монете

[/estimate_coin_buy?coin_to_sell=_&coin_to_buy=_&value_to_buy=_&height=_](http://api-01.minter.store:8841/estimate_coin_buy?coin_to_sell=_&coin_to_buy=_&value_to_buy=_&height=_) Расчитывает покупку монеты

[/estimate_coin_sell?coin_to_sell=_&coin_to_buy=_&value_to_sell=_&height=_](http://api-01.minter.store:8841/estimate_coin_sell?coin_to_sell=_&coin_to_buy=_&value_to_sell=_&height=_) Расчитывает продажу монет

[/estimate_coin_sell_all?coin_to_sell=_&coin_to_buy=_&value_to_sell=_&gas_price=_&height=_](http://api-01.minter.store:8841/estimate_coin_sell_all?coin_to_sell=_&coin_to_buy=_&value_to_sell=_&gas_price=_&height=_) Расчитывает продажу всех монет

[/estimate_tx_commission?tx=_&height=_](http://api-01.minter.store:8841/estimate_tx_commission?tx=_&height=_) Рассчитывает коммисию

[/events?height=_](http://api-01.minter.store:8841/events?height=_) Получает информацию о событиях (Штрафы, Реварды)

[/max_gas?height=_](http://api-01.minter.store:8841/max_gas?height=_) Получает информацию о максимальном газе

[/missed_blocks?pub_key=_&height=_](http://api-01.minter.store:8841/missed_blocks?pub_key=_&height=_) Получает информацию о пропущеных блоках у валидатора

[/send_transaction?tx=_](http://api-01.minter.store:8841/send_transaction?tx=_) Отправляет транзакцию в сеть

[/transaction?hash=_](http://api-01.minter.store:8841/transaction?hash=_) Получает информацию о транзакции по hash

[/transactions?query=_&page=_&perPage=_](http://api-01.minter.store:8841/transactions?query=_&page=_&perPage=_) Получает информацию о транзакциях по query

[/unconfirmed_txs?limit=_](http://api-01.minter.store:8841/unconfirmed_txs?limit=_) Получает информацию о не подтвержденных транзакциях

[/validators?height=_&page=_&perPage=_](http://api-01.minter.store:8841/validators?height=_&page=_&perPage=_) Получает информацию о валидаторах

query - Набор имен и их значений которые должны быть у транзакций которые будут возвращены. К примеру "tx.from='ADDRESS_WITHOUT_PREFIX' AND tx.type='01' AND tx.height=1316904"
