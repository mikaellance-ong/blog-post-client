<script setup>
	import { onBeforeMount } from 'vue';
	import { useGlobalStore } from '../stores/global';
	import { useRouter } from 'vue-router';

    const router = useRouter();

	const { getUserDetails }  = useGlobalStore();

	onBeforeMount(()=>{
		getUserDetails(null);
		localStorage.clear();

		router.push({path: "/"});
	})
</script>

<template>
</template>