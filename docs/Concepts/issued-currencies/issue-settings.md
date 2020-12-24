# Issue Settings

All currencies in Callchain should be do issue settting before it can be issue to anyone. Unlike Ripple or stellar, Callchain uses `IssueSet` to track one account's one currency issuing. By issue setting, Callchain user can do limit issue or unlimit issue, and track issued amount, also user can do additional issuing if issue setting allowed.

In Ethereum and other contract like blockchain, if you need to issue currency you need to write contract such as some 20 proposal contract. But in Callchain all you need is to do one common transaction. Callchain can issue fungible currencies and also non-fungible collections, all is one-click.

In one [Issue Set](issueset.html), it tracks user's `total issuing amount`, `issued amount`, `follower fans` and `issuing options`. The main issuing options is additional option and non-fungible option. Default option is both additional option and non-fungible option not set.

Account can get total issued currencies by [account-issues](account-issues.html).

## Invoice Issue

In Callchain we name non-fungible assets as invoice. In other blockchain invoice is 721 proposal contract, but in Callchian user can do non-fungible asset issuing by one common transaction.

Invoice is one currency but with one unique id for each unit curreny. Each invoice is stored as [IssueRoot](issueroot.html) in Callchain, and [IssueRoot](issueroot.html) can be transfered between users.

Account owner's invoices can be queried by [account-invoices](account-invoices.html).
