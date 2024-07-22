<script setup>
</script>
<template>
    <div class="rules-container">
        <div class="rules-title">
            <h1>Auction Rules</h1>
        </div>
        <div class="rules-body">
            <div class="rules-item">
                <h5>1. Registration</h5>
                <p>
                    All participants must register and create an account on
                    BidBuddy to participate in any auctions. Only registered
                    users are allowed to place bids or create auctions.
                </p>
            </div>
            <div class="rules-item">
                <h5>2. Bidding</h5>
                <p>
                    Bidders must place bids that are higher than the current
                    highest bid. All bids are legally binding, and the highest
                    bidder at the end of the auction is obligated to purchase
                    the item.
                </p>
            </div>
            <div class="rules-item">
                <h5>3. Auction Duration</h5>
                <p>
                    Each auction has a specified duration. The auction will
                    automatically close at the end of this period, and the
                    highest bid at that time will be declared the winner.
                </p>
            </div>
            <div class="rules-item">
                <h5>4. Payment</h5>
                <p>
                    Winning bidders must complete the payment process within 48
                    hours of the auction ending. Failure to do so may result in
                    account suspension or a permanent ban from the platform.
                </p>
            </div>
            <div class="rules-item">
                <h5>5. Seller Responsibilities</h5>
                <p>
                    Sellers must accurately describe auction items and provide
                    clear images. Any misrepresentation of items may result in
                    penalties, including suspension or ban from BidBuddy.
                </p>
            </div>
            <div class="rules-item">
                <h5>6. Dispute Resolution</h5>
                <p>
                    Any disputes between buyers and sellers should be resolved
                    amicably. If a resolution cannot be reached, BidBuddy's
                    support team will mediate to find a fair solution.
                </p>
            </div>
            <div class="rules-item">
                <h5>7. Prohibited Items</h5>
                <p>
                    The sale of illegal, counterfeit, or prohibited items is
                    strictly forbidden on BidBuddy. Any such listings will be
                    removed, and the seller's account may be suspended or
                    banned.
                </p>
            </div>
            <div class="rules-item">
                <h5>8. Privacy Policy</h5>
                <p>
                    All users must adhere to BidBuddy's
                    <span>PRIVACY POLICY</span>, which protects user data and
                    ensures a secure transaction environment. Personal
                    information will not be shared without user consent.
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.rules-container {
    max-width: 100%;
    padding: 20px;
    box-sizing: border-box;
}

.rules-body {
    display: flex;
    flex-direction: column;
    margin-left: 5rem;
}
h1 {
    text-align: center;
    font-weight: 700;
}

.rules-item {
    padding: 0;
}

.rules-item h5 {
    margin: 0 0 10px;
}

.rules-item p {
    margin-left: 20px;
    word-wrap: break-word;
    overflow-wrap: break-word;
}

span {
    color: var(--color-primary-800);
    font-weight: bold;
    cursor: pointer;
}

span:hover {
    color: var(--color-primary-600);
    text-decoration: underline;
    font-weight: bold;
}
</style>