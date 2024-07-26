import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
	const router = useRouter();
	const authUser = reactive({});

	function authCheck() {
        if (localStorage.getItem('auth-user')) {
            Object.assign(authUser, JSON.parse(localStorage.getItem('auth-user')));
            getUser(authUser.token);
		} else {
			router.push({ name: 'login' }).then(() => {
				router.go(0);
			});
		}
	}

	async function getUser(token) {
		await axios({
			method: 'get',
			url: 'http://127.0.0.1:8080/secured/user/current',
			headers: {
				Authorization: token,
			},
		}).then(function (response) {
			if (response.data.code == '1100') {
				const user = response.data.data;
				user['token'] = token;
				localStorage.setItem('auth-user', JSON.stringify(user));
			} else {
				logout();
			}
		});
	}

	function logout() {
		localStorage.removeItem('auth-user');

		router.push({ name: 'login' }).then(() => {
			router.go(0);
		});
	}

	return { authUser, authCheck, getUser, logout };
});
