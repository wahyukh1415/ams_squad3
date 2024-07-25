<script setup>
import faq from '@/assets/data/faq.json'
import { reactive } from 'vue';
import IllustrationFaq from './illustrations/IllustrationFaq.vue';

const faqs = faq
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
                <div class="col-12 col-md-6">
                    <IllustrationFaq class="illustration text-primary mb-4 mb-md-0"/>
                </div>
                <div class="col-12 col-md-6">
                    <div class="accordion accordion-flush">
                        <div v-for="(faq, index) in faqs" :key="faq.id" class="accordion-item py-2">
                            <h2 class="accordion-header">
                                <button class="accordion-button" :class="{ 'collapsed': index !== 0 }" type="button" data-bs-toggle="collapse" :data-bs-target="`#${faq.id}`"
                                    :aria-controls="faq.id">
                                    {{ faq.question }}
                                </button>
                            </h2>
                            <div :id="faq.id" class="accordion-collapse collapse" :class="{ 'show': index === 0 }" data-bs-parent="#faq">
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