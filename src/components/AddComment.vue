<script setup>
    import { ref } from 'vue';
    import api from '../api.js';
    import { useGlobalStore } from '../stores/global.js';
    import { Notyf } from "notyf";

    const { user } = useGlobalStore();

    const props = defineProps({
        blogId: {
            type: String,
            required: true
        }
    });

    const emit = defineEmits(['commentAdded']);

    const newComment = ref("");
    const notyf = new Notyf();

    // Submit comment function
    const submitComment = async () => {
        if (!newComment.value.trim()) return;

        try {
            const response = await api.patch(
                `/blogs/addComment/${props.blogId}`,
                { comment: newComment.value }
            );

            notyf.success("Comment added.");
            emit('commentAdded', response.data.updatedBlog.comments);

            newComment.value = '';
        } catch (error) {
          console.error('Error adding comment:', error);
          notyf.error('Failed to add comment.');
        }
    };
</script>

<template>
    <div class="add-comment-container">
        <textarea class="commentText"
            v-model="newComment"
            rows="1"
            placeholder="Add a comment..."
        ></textarea>
      <button class="commentBtn" @click="submitComment">Comment</button>
    </div>
</template>
