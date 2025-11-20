<script setup>
  import { useGlobalStore } from "../stores/global";

  const { user } = useGlobalStore();
</script>

<template>
    <!-- Navbar for website navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
            <!-- Website name on navbar -->
            <a class="navbar-brand" href="/">MindBloggle</a>

            <!-- Collapse hamburger button -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Collapsed version of hamburger containing links to other features of the store -->
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto">
                    <!-- Home Link -->
                    <router-link :to="{ name: 'Home' }" class="nav-link">Home</router-link>
                    
                    <router-link :to="{ name: 'Blogs' }" class="nav-link">Blogs</router-link> 

                    <!-- <router-link :to="{ name: 'AdminDashboard' }" class="nav-link" v-if="user.email && user.isAdmin">Admin Dashboard</router-link> -->

                    <router-link :to="{ name: 'Login' }" class="nav-link" v-if="!user.email">Login</router-link>
                    <router-link :to="{ name: 'Register' }" class="nav-link" v-if="!user.email">Register</router-link>

                    <router-link :to="{ name: 'Logout' }" class="nav-link" v-else>Logout</router-link>
                </ul>
            </div>
        </div>
    </nav>
</template>