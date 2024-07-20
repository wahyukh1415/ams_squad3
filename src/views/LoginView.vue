<script setup>
import LoginHeader from "@/components/LoginHeader.vue";
import LoginForm from "@/components/LoginForm.vue"
</script>

<template>
  <div class="login bg-primary">
    <div class="container col-xl-10 col-xxl-8 px-4">
      <div class="row align-items-center g-lg-5">
        <LoginHeader/>
        <div class="col-md-10 mx-auto col-lg-5">
          <LoginForm/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login {
  height: 100dvh;
  display: flex;
  align-items: center;
}
</style>
