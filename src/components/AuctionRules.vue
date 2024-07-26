<script setup>
import PrivacyPolicy from "./PrivacyPolicy.vue";
</script>

<template>
    <div id="auction-rules" class="rules-container">
        <div class="rules-title">
            <h1 class="section-title mb-3 text-primary-950">Auction Rules</h1>
        </div>
        <div class="rules-body">
            <div class="rules-item">
                <p>
                    1. All participants must register and create an account on
                    BidBuddy to participate in any auctions. Only registered
                    users are allowed to place bids or create auctions.
                </p>
            </div>
            <div class="rules-item">
                <p>
                    2. Bidders must place bids that are higher than the current
                    highest bid. All bids are legally binding, and the highest
                    bidder at the end of the auction is obligated to purchase
                    the item.
                </p>
            </div>
            <div class="rules-item">
                <p>
                    3. Each auction has a specified duration. The auction will
                    automatically close at the end of this period, and the
                    highest bid at that time will be declared the winner.
                </p>
            </div>
            <div class="rules-item">
                <p>
                    4. Winning bidders must complete the payment process within
                    48 hours of the auction ending. Failure to do so may result
                    in account suspension or a permanent ban from the platform.
                </p>
            </div>
            <div class="rules-item">
                <p>
                    5. Sellers must accurately describe auction items and
                    provide clear images. Any misrepresentation of items may
                    result in penalties, including suspension or ban from
                    BidBuddy.
                </p>
            </div>
            <div class="rules-item">
                <p>
                    6. Any disputes between buyers and sellers should be
                    resolved amicably. If a resolution cannot be reached,
                    BidBuddy's support team will mediate to find a fair
                    solution.
                </p>
            </div>
            <div class="rules-item">
                <p>
                    7. The sale of illegal, counterfeit, or prohibited items is
                    strictly forbidden on BidBuddy. Any such listings will be
                    removed, and the seller's account may be suspended or
                    banned.
                </p>
            </div>
            <div class="rules-item">
                <p>
                    8. All users must adhere to BidBuddy's
                    <span
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        >PRIVACY POLICY</span
                    >, which protects user data and ensures a secure transaction
                    environment. Personal information will not be shared without
                    user consent.
                </p>
            </div>
        </div>
    </div>
    <PrivacyPolicy />
</template> 

<style scoped>
.rules-container {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 30px;
    margin: 20px auto;
    max-width: 800px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.rules-title h1 {
    text-align: center;
    font-weight: 800;
    letter-spacing: 0.2px;
    margin-bottom: 30px;
}
.rules-item p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 15px;
    color: #343a40;
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