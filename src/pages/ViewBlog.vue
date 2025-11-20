<script setup>
    import { ref, onMounted, watch } from "vue";
    import { useRoute, useRouter } from "vue-router";
    import { Notyf } from "notyf";
    import { useGlobalStore } from '../stores/global';
    import api from "../api";

    import EditBlog from "../components/EditBlog.vue";
    import DeleteBlog from "../components/DeleteBlog.vue";
    import AdminDeleteBlog from "../components/AdminDeleteBlog.vue";
    import AddComment from "../components/AddComment.vue";
    import DeleteComment from "../components/DeleteComment.vue";
    import AdminDeleteComment from "../components/AdminDeleteComment.vue";

    const { getUserDetails, user } = useGlobalStore();
    const emit = defineEmits(["status-updated"]);
    const router = useRouter();
    const route = useRoute();
    const notyf = new Notyf();

    const blog = ref(null);
    const isLoading = ref(true);

    const fetchBlog = async (id) => {
        isLoading.value = true;

        try {
            const response = await api.get(`/blogs/getBlog/${id}`);
            blog.value = response.data;
        } catch (err) {
            console.error(err);
            notyf.error("Blog not found.");
        } finally {
            isLoading.value = false;
        }
    };

    onMounted(() => {
        if (!user.token) {
            notyf.error("Log in to view blog details.");
            router.push({ path: "/login" });
            return;
        }

        fetchBlog(route.params.blogId);
    });

    watch(() => route.params.blogId, (newId) => {
        if(newId) fetchBlog(newId);
    });
</script>

<template>
    <div class="container mt-4">
        <router-link to="/blogs" class="btn btn-secondary">
            <i class="bi bi-arrow-left"></i>
        </router-link>

        <div v-if="blog" class="card mt-3">
            <div id="blog-header" class="card-header">
                <span class="d-flex align-items-center justify-content-between mb-1">
                    <span class="d-flex align-items-center justify-content-start mb-1">
                        <p id="blogCardUsername" class="card-name text-dark"><i class="bi bi-person-circle me-2"></i><strong>{{ blog.author }}</strong></p>
                        <p class="mx-2" id="blogCardDate"><small class="text-muted">{{ blog.dateCreated }}</small></p>
                    </span>
                    <EditBlog v-if="user.id === blog.userId" class="btn" :blog="blog" @status-updated="fetchBlog(route.params.blogId)" />
                </span>
            </div>
            <div class="card-body p-4">
                <h5 id="blogCardTitle" class="card-title mb-4 text-dark">{{ blog.title }}</h5>
                <p>{{ blog.content }}</p>

                
            </div>
            
            <div class="d-flex gap-2 mx-auto align-items-center mb-1">
                <DeleteBlog v-if="user.id === blog.userId" :blogId="blog._id" @deleted="router.push('/blogs')" />
                <AdminDeleteBlog v-if="user.isAdmin" :blogId="blog._id" @deleted="router.push('/blogs')" />
            </div>

            <div class="card-footer mt-3">
                <AddComment :blogId="blog._id" @commentAdded="blog.comments = $event" />

                <div v-if="blog.comments.length > 0" class="mt-3">
                    <p>Comments:</p>
                    <div v-for="(comment, index) in [...blog.comments].reverse()" :key="comment._id" class="card mb-2 shadow-sm">
                        <div class="card-body p-2">
                            <span class="d-flex align-items-center justify-content-between mb-1">
                                <strong>
                                    <i class="bi bi-person-circle me-2"></i>{{ comment.username }}
                                </strong>

                                <span class="d-flex align-items-center justify-content-end mb-1">
                                    <DeleteComment v-if="comment.userId === user.id" :blogId="blog._id" :commentId="comment._id" @deleted="blog.comments = $event" />
                                    <AdminDeleteComment v-if="user.isAdmin" :blogId="blog._id" :commentId="comment._id" @deleted="blog.comments = $event" />
                                </span>
                            </span>
                            <p class="mb-0">{{ comment.comment }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>