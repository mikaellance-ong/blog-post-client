<script setup>
import { Notyf } from "notyf";
import api from "../api";

const props = defineProps({
    blogId: {
        type: String,
        required: true,
    },
});

const emit = defineEmits(["deleted"]);
const notyf = new Notyf();

const deleteBlog = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
        await api.delete(`/blogs/deleteBlog/${props.blogId}`);
        notyf.success("Blog deleted successfully!");

        emit("deleted"); // tell parent to refresh or redirect
    } catch (err) {
        console.error(err);
        notyf.error("Failed to delete blog.");
    }
};
</script>

<template>
    <button class="btn btn-danger" @click="deleteBlog">
        Delete Blog
    </button>
</template>
