<script setup>
import Logo from '../components/logo/Logo.vue';
</script>
<template>
    <footer class="bg-primary-100 text-center text-md-start">
        <div class="container p-4">
            <div class="row">
                <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
                    <Logo class="w-50 text-primary-600" />
                    <p>
                        Jln. jalan yang ga jauh tapi deket, Jakarta, 1110 <br />
                        <a href="mailto: emailfiktifgan@email.com"> bidbuddy@email.com </a>
                    </p>
                </div>
                <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                    <h5 class="fw-bold">Link Sosial Media</h5>
                    <ul class="list-unstyled mb-0 d-flex gap-4">
                        <li>
                            <a href="#!" class="text-body"><i class="bi bi-instagram"></i></a>
                        </li>
                        <li>
                            <a href="#!" class="text-body"><i class="bi bi-twitter-x"></i></a>
                        </li>
                        <li>
                            <a href="#!" class="text-body"><i class="bi bi-snapchat"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                    <p class="fs-6">BidBuddy dilindungi dan diawasi oleh Otoritas Jasa Keuangan</p>
                    <img src="../assets/images/OJK_logo.png" alt="ojk logo.pbg" class="w-50" />
                </div>
            </div>
        </div>
        <div class="text-center p-3 bg-primary-600">
            <p class="text-light">&copy; 2024 Copyright BidBuddy.Ltd</p>
        </div>
    </footer>
</template>

<style scoped>
.bi {
    font-size: 32px;
}
</style>
