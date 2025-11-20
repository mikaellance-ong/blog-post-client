<script setup>
	import { ref, onMounted, onBeforeMount } from 'vue';
    import { useGlobalStore } from '../stores/global.js';
    import { useRouter } from 'vue-router';
    import { Notyf } from "notyf";
    import api from '../api.js';

    import AddBlog from "../components/AddBlog.vue"
    import BlogCard from "../components/BlogCard.vue";

    const router = useRouter();

    const { user } = useGlobalStore();

    const blogs = ref([]);

    const notyf = new Notyf();

    const refetchBlogs = async () => {
        const { data } = await api.get('/blogs/getBlogs');
        blogs.value = data.blogs.sort((a, b) => {
            const dateA = new Date(a.dateCreated);
            const dateB = new Date(b.dateCreated);
            return dateB - dateA;
        });
    };

    onMounted(async () => {
        try {
            const { data } = await api.get('/blogs/getBlogs');
            blogs.value = data.blogs.sort((a, b) => {
            const dateA = new Date(a.dateCreated);
            const dateB = new Date(b.dateCreated);
            return dateB - dateA;
        });
        } catch (err) {
            console.error(err);
            notyf.error('Failed to fetch blogs.');
        }
    });
</script>


<template>
	<h1 id="blog-page-title" class="mt-5 text-center">Bloggle the Mind</h1>

	<div class="col-12 d-flex justify-content-center gap-2 mb-3">
		<AddBlog class="dashboardBtn btn" @status-updated="refetchBlogs" />
	</div>

    <div v-if="blogs.length > 0" class="row mt-3">
        <BlogCard v-for="blog in blogs" :key="blog._id" :blogData="blog" @status-updated="refetchBlogs" />
    </div>

	<div v-else>
		<h2 class="py-2">No blogs available.</h2>
	</div>
</template>