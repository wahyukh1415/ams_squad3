<script></script>

<template>
    <div class="registerContainer">
        <div class="cardRegister">
            <div class="back d-flex flex-column">
                <router-link class="homeLink" to="/"><i class="bi bi-arrow-left-circle-fill"></i></router-link>
                <img src="../assets/register.svg" alt="Register Icon" />
            </div>
            <form action="" class="formRegister form-1">
                <h4>Tambah Akun Seller</h4>
                <div class="inputWrapper">
                    <div for="nama" class="labelForm">Nama Seller: <span class="required">*</span></div>
                    <input type="text" class="inputForm" name="namaSeller" id="namaSeller" placeholder="Masukkan Nama" />
                </div>
                <div class="inputWrapper">
                    <div for="email" class="labelForm">Email Seller: <span class="required">*</span></div>
                    <input type="email" class="inputForm" name="emailSeller" id="emailSeller" placeholder="Masukkan Email" />
                </div>
                <div class="inputWrapper">
                    <div for="password" class="labelForm">Password Seller: <span class="required">*</span></div>
                    <input type="password" class="inputForm" name="passwordSeller" id="passwordSeller" placeholder="Masukkan Password" />
                </div>
                <button type="submit" class="btn btn-primary">Buat Akun Seller</button>
                <div class="divider">atau</div>
                <router-link to="/register-buyer"><a class="nav-link" href="">Buat Akun Buyer</a> </router-link>
            </form>
        </div>
    </div>
</template>

<style scoped>
.registerContainer {
    background-color: #1c5fa8;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
}

.cardRegister {
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    border-radius: 15px;
    background-color: #f8f9fb;
    padding: 50px;
    height: 600px;
    width: 1000px;
    box-sizing: border-box;
    box-shadow: 5px 5px 5px 5px;
}

.homeLink {
    left: 0;
    width: 50px;
    text-align: left;
    cursor: pointer;
    font-size: 30px;
}

img {
    width: 450px;
    height: 450px;
}

.formRegister {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 50px;
    gap: 10px;
    height: 450px;
    width: 450px;
}

h4 {
    font-weight: 700;
    color: #1c5fa8;
}

a {
    text-decoration: none;
}

.labelForm {
    text-align: left;
    padding-left: 3px;
}

.required {
    color: red;
}

.inputWrapper {
    padding: 5px;
    border: 1px solid #b6b6b6;
    border-radius: 13px;
}

.inputForm {
    width: 100%;
    border: none;
    background-color: #f8f9fb;
    border-radius: 10px;
}

.buttonDaftar {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
}

.btn {
    margin-top: 30px;
    width: 100%;
}

@media (min-width: 1024px) {
    .home {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}
</style>
