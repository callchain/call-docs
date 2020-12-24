# Invoice Payment

When do invoice payment, the Amount field of the payment transaction is fixed one amount. Invoice is one unique unit asset. And invoice payment transaction can not be charged with transfer fee now. Maybe it will be supported in future.

Invoice payment works as normal payment except it include invoice id for invoice transsfering. Invoice payment is as follow.


```json
{
  "TransactionType": "Payment",
  "account": "cf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
  "Destination": "ca5nK24KXen9AHvsdFTKHSANinZseWnPcX",
  "Amount":
  {
      "value": "1",
      "currency": "TEA",
      "issuer": "cnn5Nd2fYEgPynh6foPApSrw3vVqDT9wW7"
  },
  "InvoiceID": "110"
}
```
