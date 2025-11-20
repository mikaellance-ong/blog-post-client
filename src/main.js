import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "notyf/notyf.min.css";
import './style.css';

import { createApp } from 'vue';
import { createPinia } from "pinia";
import App from './App.vue';

import HomePage from "./pages/Home.vue";
import BlogsPage from "./pages/Blogs.vue";
import ViewBlog from "./pages/ViewBlog.vue";
/*import AdminDashboard from "./pages/AdminDashboard.vue";*/
import RegisterPage from "./pages/Register.vue";
import LoginPage from "./pages/Login.vue";
import LogoutPage from "./pages/Logout.vue";

import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Home",
            component: HomePage,
        },
        {
            path: '/blog/:blogId',
            name: "ViewBlog",
            component: ViewBlog,
        },
        {
            path: "/blogs",
            name: "Blogs",
            component: BlogsPage,
        },
        /*{
            path: "/movies",
            name: "AdminDashboard",
            component: AdminDashboard,
        },*/
        {
            path: "/register",
            name: "Register",
            component: RegisterPage,
        },
        {
            path: "/login",
            name: "Login",
            component: LoginPage,
        },
        {
            path: "/logout",
            name: "Logout",
            component: LogoutPage,
        },
        /*{
            path: "/:catchAll(.*)",
            component: ErrorPage,
        }*/
    ]
});

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");