<script setup>
    import { ref } from "vue";
    import { Notyf } from 'notyf';
    import { useRouter } from "vue-router";
    import api from '../api.js';
    const router = useRouter()

    const notyf = new Notyf();

    /*const emit = defineEmits(["status-updated"]);*/

    const props = defineProps({
        blogData: { 
            type: Object, 
            required: true 
        }
    });

    function goToDetails(id) {
        router.push(`/blog/${id}`);
    }
</script>

<template>
    <div class="col-12 col-sm-6 col-md-6 col-lg-4 mb-4">
        <div class="card d-flex flex-column h-100">
            <div class="card-body">
                <p id="blogCardUsername" class="card-name text-dark"><i class="bi bi-person-circle me-2"></i><strong>{{ blogData.author }}</strong></p>
                <p id="blogCardDate" class="card-date mb-4 text-muted"><small>{{ blogData.dateCreated }}</small></p>
                <h5 id="blogCardTitle" class="card-title mb-4 text-dark">{{ blogData.title }}</h5>
            </div>
            <div class="card-footer d-flex justify-content-center">
                <button class="btn btn-primary w-100" @click="goToDetails(blogData._id)">View Blog</button>
            </div>
        </div>
    </div>
</template>