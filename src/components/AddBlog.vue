<script setup>
    import { ref, onMounted } from "vue";
    import { Notyf } from "notyf";
    import { useRouter } from "vue-router";
    import { useGlobalStore } from "../stores/global";
    import { Modal } from "bootstrap";
    import api from "../api";

    const { user } = useGlobalStore();
    const notyf = new Notyf();
    const router = useRouter();
    
    const emit = defineEmits(["status-updated"]);

    // Refs
    const modalId = `addProductModal`;
    const modalRef = ref(null);
    let modalInstance = null;
    const isModalOpen = ref(false);

    const title = ref("");
    const content = ref("");

    const isEnabled = ref(false);
    const isLoading = ref(false);


    const openModal = () => {
    	if (!user.email) 
    	{
			notyf.error("Log in to create a blog.");
			router.push({ path: '/login' });
			return;
    	}

        if (!modalInstance) {
            modalInstance = new Modal(modalRef.value);
        }
        modalInstance.show();
        isModalOpen.value = true;
    };

    const hideModal = () => {
        if (modalInstance) modalInstance.hide();
        isModalOpen.value = false;
    };

    async function createBlog () {

    	const blog = {
        	title: title.value,
            content: content.value
    	};

        try {
            isLoading.value = true;
            const response = await api.post("/blogs/createBlog", blog)

            if (response.status === 201)
            {
            	notyf.success("Blog created successfully!");
            }
            else
            {
            	notyf.error("Error creating blog.");
            }
            
            emit("status-updated");
            hideModal();
        } catch (err) {
            console.error(err);
            notyf.error("Failed to create blog.");
        } finally {
            isLoading.value = false;
        }
    };
</script>


<template>
    <div>
        <button id="addBlog" class="btn mb-3" @click="openModal">Create Blog</button>

        <!-- Modal -->
        <div class="modal fade" :id="modalId" tabindex="-1" aria-labelledby="addBlogModalLabel" :inert="!isModalOpen" ref="modalRef">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form id="addMovieForm" @submit.prevent="createBlog">
                        <div class="modal-header">
                            <h5 class="modal-title">Create New Blog</h5>
                            <button type="button" class="btn-close" @click="hideModal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="blogTitle" class="form-label">Title</label>
                                <input
                                    type="text"
                                    id="blogTitle"
                                    class="form-control"
                                    v-model="title"
                                    required
                                />
                            </div>
                            <div class="mb-3">
                                <label for="blogContent" class="form-label"
                                    >Content</label
                                >
                                <textarea
                                    id="blogContent"
                                    class="form-control"
                                    v-model="content"
                                    rows="3"
                                    required
                                ></textarea>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" @click="hideModal">
                                Cancel
                            </button>
                            <button type="submit" class="btn btn-primary" :disabled="isLoading">
                                {{ isLoading ? "Updating..." : "Save Changes" }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>


