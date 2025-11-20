<script setup>
	import { watch, ref, onBeforeMount } from 'vue';
    import { Notyf } from 'notyf';
    import { useRouter } from 'vue-router';
    import { useGlobalStore } from '../stores/global';
    import axios from 'axios';
    import api from '../api';

    const notyf = new Notyf();
  	const router = useRouter();

	const { getUserDetails, user } = useGlobalStore();

    const email = ref("");
    const password = ref("");
    const isEnabled = ref(false);

    watch([email,password], (currentValue, oldValue) => {
        if(currentValue.every(input => input !== "")){
            isEnabled.value = true;
        } else {
            isEnabled.value = false;
        }
    });

    async function handleSubmit() {
    	try {
    		const response = await api.post('/users/login', {
    			email: email.value,
    			password: password.value
    		})

    		if(response.data.access)
    		{
    			notyf.success("Login Successful");

    			localStorage.setItem("token", response.data.access);

    			getUserDetails(response.data.access);

    			email.value = "";
    			password.value = "";

    			router.push({path: '/'})
    		}
    	} catch (error) {
    		if (error.response.status === 401 || error.response.status === 404)
    		{
    			notyf.error(error.response.data.message);
    		}
    		else
    		{
    			console.error(error);
                notyf.error("Login Failed. Please contact administrator.");
    		}
    	}
    }

    onBeforeMount (() => {
    	if(user.token)
    	{
    		notyf.error("User already logged in.");
    		router.push({path: '/'});
    	}
    })
</script>

<template>
	<form id="loginForm" v-on:submit.prevent="handleSubmit">
		<h1 class="my-4 text-center">Login</h1>
		<div class="container-fluid border rounded-3 m-3 p-3 w-75 mx-auto">
			<div class="mb-3">
				<label for="userEmail" class="form-label">Email address</label>
				<input 
				type="text"
				class="form-control"
				id="userEmail"
				placeholder="Enter email"
				v-model="email"
				/>
			</div>

			<div class="mb-3">
				<label for="password" class="form-label">Password</label>
				<input 
				type="password"
				class="form-control"
				id="password"
				placeholder="Password"
				v-model="password"
				>
			</div>

			<button type="submit" class="btn btn-primary w-100"  v-if="isEnabled">Login</button>
			<button type="submit" class="btn btn-danger w-100" disabled v-else>Login</button>
		</div>
	</form>
</template>