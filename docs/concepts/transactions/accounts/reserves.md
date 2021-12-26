# Reserves

The CALL Ledger applies _reserve requirements_, in CALL, to protect the shared global ledger from growing excessively large as the result of spam or malicious usage. The goal is to constrain the growth of the ledger to match improvements in technology so that a current commodity-level machine can always fit the current ledger in RAM and the full ledger history on disk.

To submit transactions, an address must hold a minimum amount of CALL in the shared global ledger. You cannot send this CALL to other addresses. To fund a new address, you must send enough CALL to meet the reserve requirement.

The current minimum reserve requirement is **0.01 CALL**. (This is the cost of an address that owns no other objects in the ledger.) Each new [account](accounts.html) must set aside this much CALL, which cannot be recovered or sent to others.


## Base Reserve and Owner Reserve

The reserve requirement is divided into two parts:

* The **Base Reserve** is a minimum amount of CALL that is required for every address in the ledger. Currently, this is 0.01 CALL (`10000` drops).
* The **Owner Reserve** is an increase to the reserve requirement for each object that the address owns in the ledger. Currently, this is 0.0001 CALL (`10` drops) per item.


### Owner Reserves

Many objects in the ledger are owned by a particular address, and count toward the reserve requirement of that address. When objects are removed from the ledger, they no longer count against their owner's reserve requirement.

- [Offers](offer.html) are owned by the address that placed them. Transaction processing automatically removes Offers that are fully consumed or found to be unfunded. Alternatively, the owner can cancel an Offer by sending an [OfferCancel transaction][], or by sending an [OfferCreate transaction][] that contains an `OfferSequence` parameter.
- [Issuet Sets](issueset.html) are owned by the address that placed them as [Offers](offer.html).
- [Invoices](invoice.html) are owned by the address that placed them as [Offers](offer.html).
- [Trust lines](callstate.html) are shared between two addresses. The owner reserve can apply to one or both of the addresses, depending on whether the fields that address controls are in their default state. See [Contributing to the Owner Reserve](callstate.html#contributing-to-the-owner-reserve) for details.
- Without the [MultiSignReserve amendment][], a single [SignerList](signerlist.html) counts as 3 to 10 objects for purposes of the owner reserve, depending on how many members it has. With the [MultiSignReserve amendment][] enabled, a single SignerList counts as 1 object for purposes of the owner reserve, regardless of the number of members it has. See also: [SignerLists and Reserves](signerlist.html#signerlists-and-reserves).
- [Owner directories](directorynode.html) list all the ledger objects that contribute to an address's owner reserve. However, the owner directory itself does not count towards the reserve.
- [Smart Contract code and parameters](smart-contract.html) are owned by the contract that place them. Code size nad parameters size will consume **data size / data unit size drops CALL**. 


#### Owner Reserve Edge Cases

The CALL Ledger considers an [OfferCreate transaction][] to be an explicit statement of willingness to hold an asset. Consuming the offer automatically creates a trust line (with limit 0, and a balance above that limit) for the `taker_pays` currency if such a trust line does not exist. However, if the offer's owner does not hold enough CALL to also meet the owner reserve requirement of the new trust line, the offer is considered unfunded. See also: [Lifecycle of an Offer](offers.html#lifecycle-of-an-offer).


## Going Below the Reserve Requirement

During transaction processing, the [transaction cost](transaction-cost.html) deducts some of the sending address's CALL balance. This can cause an address's CALL to go below the reserve requirement.

When an address holds less CALL than its current reserve requirement, it cannot send new transactions that would transfer CALL to others, or increase its own reserve. Even so, the address continues to exist in the ledger and can send other transactions as long as it has enough CALL to pay the transaction cost. The address can become able to send all types of transactions again if it receives enough CALL to meet its reserve requirement again, or if the [reserve requirement decreases](#changing-the-reserve-requirements) to less than the address's CALL holdings.

**Tip:** When an address is below the reserve requirement, it can send new [OfferCreate transactions][] to acquire more CALL, or other currencies on its existing trust lines. These transactions cannot create new [trust lines](callstate.html), or [Offer nodes in the ledger](offer.html), so they can only execute trades that consume Offers that are already in the order books.


## Changing the Reserve Requirements

The CALL Ledger has a mechanism to adjust the reserve requirements for long-term changes in the value of CALL. Any changes have to be approved by the consensus process. See [Fee Voting](fee-voting.html) for more information.

<!--{# common link defs #}-->
{% include '_snippets/calld-api-links.md' %}
{% include '_snippets/tx-type-links.md' %}
{% include '_snippets/calld_versions.md' %}
