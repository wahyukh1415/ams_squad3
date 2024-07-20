<script setup>
import Logo from './logo/Logo.vue';
import IllustrationLogin from './illustrations/IllustrationLogin.vue';
</script>

<template>
    <div class="position-relative col-lg-7 text-center text-white text-lg-start">
          <Logo class="logo" />
          <p class="col-lg-10 fs-4 mb-3 mb-lg-0">
            Elevate Your Bidding Experience
          </p>
          <div class="d-flex align-items-center justify-content-center">
            <IllustrationLogin class="illustration" />
          </div>
        </div>
</template>

<style scoped>
.logo {
  max-width: 350px;
  width: 100%;
  max-height: 92.5px;
  height: 100%;
}

.illustration {
  display: none;
}

@media (min-width: 992px) {
  .illustration {
    display: block;
    height: 340px;
    width: 340px;
  }
}
</style>