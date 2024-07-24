<script setup>
import faq from '@/assets/data/faq.json'
import { reactive } from 'vue';
import IllustrationFaq from './illustrations/IllustrationFaq.vue';

const faqs = reactive(faq)
</script>
<template>
    <section id="faq" class="py-5">
        <div class="container">
            <div class="heading text-center text-white mb-4">
                <h5 class="section-sub-title mb-0 text-primary-500">What do you wan't to ask?</h5>
                <h1 class="section-title my-0 text-primary-950">
                Frequently Asked Questions
                </h1>
            </div>
    
            <div class="row">
                <div class="col-6">
                    <IllustrationFaq class="illustration text-primary"/>
                </div>
                <div class="col-6">
                    <div class="accordion accordion-flush">
                        <div v-for="faq in faqs" :key="faq.id" class="accordion-item py-2">
                            <h2 class="accordion-header">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="`#${faq.id}`"
                                    aria-expanded="true" :aria-controls="faq.id">
                                    {{ faq.question }}
                                </button>
                            </h2>
                            <div :id="faq.id" class="accordion-collapse collapse" data-bs-parent="#faq">
                                <div class="accordion-body pt-0 text-secondary pe-5">
                                    {{ faq.answer }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>



    <!-- <div class="faq-container">
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
    </div> -->
</template>

<style scoped>
.heading {
  margin: 0 50px;
}

.section-title {
  font-weight: 800;
  letter-spacing: 0.2px;
}

.section-sub-title {
  font-weight: 700;
  letter-spacing: 0.2px;
}

.illustration {
    width: 100%;
    height: 100%;
}

.accordion-button {
    font-weight: 700;
}

.accordion-button:focus {
    box-shadow: none;
}

.accordion-button:not(.collapsed) {
    background-color: transparent;
    box-shadow: none;
}
</style>