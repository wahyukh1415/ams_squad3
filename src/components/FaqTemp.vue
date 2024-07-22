<script setup></script>
<template>
    <div class="faq-container">
        <div class="faq-title">
            <h1>Frequently Asked Questions (FAQ)</h1>
        </div>
        <div class="faq-body">
            <div class="faq-item">
                <h5>1. What is BidBuddy?</h5>
                <p>
                    BidBuddy is a platform that allows users to bid on auction
                    items. Or you can also sell items through the auction.
                </p>
            </div>
            <div class="faq-item">
                <h5>2. How to use BidBuddy?</h5>
                <p>
                    First, you need to create an account. Then, you can bid on
                    auction items after you logged in to our website as a buyer.
                    Or you can sell items through the auction after logged in to
                    our website as a seller.
                </p>
            </div>
            <div class="faq-item">
                <h5>3. Is BidBuddy safe?</h5>
                <p>
                    BidBuddy is a safe auction platform that does not allow
                    fraudulent activities. BidBuddy also provides a secure
                    payment system so you don't have to worry about online
                    scams.
                </p>
            </div>
            <div class="faq-item">
                <h5>4. Is there any cost to bid on items?</h5>
                <p>
                    In BidBuddy, there is no cost to bid on auction items. You
                    just have to pay for the item that you want to bid on.
                </p>
            </div>
            <div class="faq-item">
                <h5>5. How do I sell items through the auction?</h5>
                <p>
                    After logging in as a seller, click the "Create New Auction"
                    button, fill in the item details to be sold, including
                    description, photos, starting price, and auction duration.
                    Then, click "Submit" to start the auction.
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.faq-container {
    max-width: 100%;
    padding: 20px;
    box-sizing: border-box;
}

.faq-body {
    display: flex;
    flex-direction: column;
    margin-left: 5rem;
}

h1 {
    text-align: center;
}

.faq-item {
    padding: 0;
}

.faq-item h5 {
    margin: 0 0 10px;
}

.faq-item p {
    margin-left: 20px;
    word-wrap: break-word;
    overflow-wrap: break-word;
}
</style>