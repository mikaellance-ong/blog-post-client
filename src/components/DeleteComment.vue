<script setup>
	import { Notyf } from "notyf";
	import api from "../api";

	const props = defineProps({
		blogId: {
			type: String,
			required: true,
		},
		commentId: {
			type: String,
			required: true,
		},
	});

	const emit = defineEmits(["deleted"]);
	const notyf = new Notyf();

	const deleteComment = async () => {
		const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
		if (!confirmDelete) return;

		try {
			const response = await api.delete(`/blogs/deleteComment/${props.blogId}/${props.commentId}`);
			notyf.success("Comment deleted successfully!");


			emit("deleted", response.data.updatedBlog.comments);
		} catch (err) {
			console.error(err);
			notyf.error("Failed to delete comment.");
		}
	};
</script>

<template>
	<button id="deleteComment" class="btn btn-danger btn-sm ms-2" @click="deleteComment">
		Delete
	</button>
</template>

<style scoped>
	
</style>
