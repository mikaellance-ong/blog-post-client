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
    const confirmDelete = window.confirm("Admin, are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
        await api.delete(`/blogs/admin/deleteBlog/${props.blogId}`);
        notyf.success("Blog deleted successfully!");

        emit("deleted");
    } catch (err) {
        console.error(err);
        notyf.error("Failed to delete blog.");
    }
};
</script>

<template>
    <button class="btn btn-warning" @click="deleteBlog">
        Admin: Delete Blog
    </button>
</template>
