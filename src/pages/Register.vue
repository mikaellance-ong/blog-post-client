<script setup>
	import { watch, ref, onBeforeMount } from 'vue';
	import { Notyf } from 'notyf';
	import { useRouter } from 'vue-router';
	import { useGlobalStore } from '../stores/global';
	import axios from 'axios';
	import api from '../api';

	const username = ref("");
	const email = ref("");
	const password = ref("");
	const confirmPass = ref("");
	const isEnabled = ref(false);

	const notyf = new Notyf();
	const router = useRouter()

	const { user } = useGlobalStore();

	watch([username, email, password, confirmPass], (currentValue, oldValue) => {
		if(currentValue.every(input => input !== "") && currentValue[2] === currentValue[3])
		{
			isEnabled.value = true;
		}
		else
		{
			isEnabled.value = false;
		}
	})

	async function handleSubmit() {
		try {
			const response = await api.post('/users/register', {
				username: username.value,
				email: email.value,
				password: password.value
			})

			if(response.status === 201)
			{
				notyf.success(response.data.message);

				username.value = "";
				email.value = "";
				password.value = "";
				confirmPass.value = "";

				router.push({path: '/login'});
			}
		} catch (error) {
			console.error(error);
			notyf.error("Registration failed. Please contact your administrator.");
		}
	}

	onBeforeMount(() => {
		if(user.token)
		{
			notyf.error("Already registered.");
			router.push({path: '/login'});
		}
	})
</script>

<template>
	<form id="registerForm" v-on:submit.prevent="handleSubmit">
	    <h1 class="registerTitle my-4 text-center">Register</h1>
	    <div id="registerCard" class="container-fluid border rounded-3 m-3 p-3 w-75 mx-auto">
	        <div class="mb-3">
	            <label for="registerEmail" class="form-label">Username</label>
	            <input 
	                type="text" 
	                id="registerUsername" 
	                class="form-control" 
	                placeholder="Enter Username" 
	                v-model="username"  
	            />
	        </div>

	        <div class="mb-3">
	            <label for="registerEmail" class="form-label">Email</label>
	            <input 
	                type="email" 
	                id="registerEmail" 
	                class="form-control" 
	                placeholder="Enter Email" 
	                v-model="email"  
	            />
	        </div>

	        <div class="mb-3">
	            <label for="registerPassword" class="form-label">Password</label>
	            <input 
	                type="password" 
	                id="registerPassword" 
	                class="form-control" 
	                placeholder="Enter Password" 
	                v-model="password"
	            />
	        </div>

	        <div class="mb-3">
	            <label for="registerConfirmPassword" class="form-label">Confirm Password</label>
	            <input 
	                type="password" 
	                id="registerConfirmPassword" 
	                class="form-control" 
	                placeholder="Confirm Password"
	                v-model="confirmPass"
	            />
	        </div>        

	        <button id="registerBtn" type="submit" class="btn w-100" v-if="isEnabled">Submit</button>
	        <button id="registerBtnDanger" type="submit" class="btn btn-danger w-100" disabled v-else>Please Enter Your Registration Details</button>
	    </div>
	</form>
</template>