<script setup>
    import { ref, reactive } from "vue";
    import { Notyf } from "notyf";
    import api from "../api";

    import { Modal } from "bootstrap";

    
    const props = defineProps({
        blog: {
            type: Object,
            required: true,
        },
    });

    const emit = defineEmits(["status-updated"]);
    const notyf = new Notyf();

    // Refs
    const modalRef = ref(null);
    const modalId = `editProductModal-${props.blog._id}`;
    let modalInstance = null;
    const isModalOpen = ref(false);
    const isLoading = ref(false);

    const form = reactive({
        title: props.blog.title,
        content: props.blog.content,
    });

    const openModal = () => {
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

    const updateBlog = async () => {
        try {
            isLoading.value = true;
            const token = localStorage.getItem("token");

            await api.patch(
                `/blogs/updateBlog/${props.blog._id}`,
                {
                    title: form.title,
                    content: form.content
                },
            );

            notyf.success("Blog updated successfully!");
            emit("status-updated");
            hideModal();
        } catch (err) {
            console.error(err);
            notyf.error("Failed to update blog.");
        } finally {
            isLoading.value = false;
        }
    };
</script>

<template>
    <div>
        <!-- Edit Button -->
        <button class="btn btn-success" @click="openModal">Edit Blog</button>

        <!-- Modal -->
        <div class="modal fade" :id="modalId" tabindex="-1" aria-labelledby="editProductModalLabel" :inert="!isModalOpen" ref="modalRef">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form id="editBlogForm" @submit.prevent="updateBlog">
                        <div class="modal-header">
                            <h5 class="modal-title">Update Blog</h5>
                            <button type="button" class="btn-close" @click="hideModal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="blogTitle" class="form-label">Title</label>
                                <input
                                    type="text"
                                    id="blogTitle"
                                    class="form-control"
                                    v-model="form.title"
                                    required
                                />
                            </div>
                            <div class="mb-3">
                                <label for="blogContent" class="form-label"
                                    >Description</label
                                >
                                <textarea
                                    id="blogContent"
                                    class="form-control"
                                    v-model="form.content"
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