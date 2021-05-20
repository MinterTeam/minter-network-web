---
title: Validator metadata
description: >-
  How to set validator's name, description, and logo icon
---

# Validator metadata

All validator data, including metadata, is stored in the blockchain  
Send transaction to address:

`Mxa62da2d2714f23738a4d1658909eb6c920669b0e`

"Message" field must be filled with JSON, example:

```json
{
"PK": "Mp...",
"title": "Your cool title",
"www": "Website URL",
"icon": "Icon URL",
"description": "Your cool description"
}
```
Transaction must be sent from owner address. Amount of BIP can be any. To change metadata just send a new transaction filled the same format with desired changes. Metadata updates every 10 minutes.
