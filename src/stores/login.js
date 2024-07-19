import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export const useLoginStore = defineStore('login', () => {
	const email = ref('');
	const password = ref('');
	const hidePassword = ref(true);
	const emailError = ref('');
	const passwordError = ref('');
	const loading = ref(false);
	const token = ref('');
	const router = useRouter();

	const passwordFieldIcon = computed(() =>
		hidePassword.value ? 'bi-eye' : 'bi-eye-slash'
	);
	const passwordFieldType = computed(() =>
		hidePassword.value ? 'password' : 'text'
	);

	function login() {
		if ((!emailError.value || emailError.value == 'Email atau password salah') && !passwordError.value) {
			authenticate();
		}
	}

	async function authenticate() {
		loading.value = true;

		const body = {};

		body.email = email.value;
		body.password = password.value;

		await axios({
			method: 'post',
			url: 'http://localhost:8080/login',
			data: body,
		})
			.then(function (response) {
				// handle success
				if (response.data.code == '0800') {
					console.log(response.data.message);
					token.value = response.data.data.token;
					localStorage.setItem('token', token.value);

					getUser();

					router.push({ name: 'home' }).then(() => { router.go(0) });
				} else {
					emailError.value = response.data.message;
					password.value = '';
				}
				loading.value = false;
			})
			.catch(function (error) {
				// handle error
			});
	}

	async function getUser() {
		await axios({
			method: 'get',
			url: 'http://127.0.0.1:8080/secured/user/current',
			headers: {
				Authorization: `Bearer ${token.value}`,
			},
		}).then(function (response) {
			// handle success
			localStorage.setItem('auth-user', JSON.stringify(response.data.data));
		});
	}

	return {
		loading,
		email,
		password,
		hidePassword,
		passwordFieldIcon,
		passwordFieldType,
		emailError,
		passwordError,
		login,
	};
});
