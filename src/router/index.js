import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UserView from "../views/UserProfile.vue";
import ResetPassword from "@/views/ResetPassword.vue";
import LoginView from "../views/LoginView.vue";
import Dashboard from "../views/DashboarAdmin.vue";
import RegisterBuyer from "../views/RegisterBuyer.vue";
import RegisterSeller from "../views/RegisterSeller.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/user-profile",
      name: "profile",
      component: UserView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register-seller",
      name: "register seller",
      component: RegisterSeller,
    },
    {
      path: "/register-buyer",
      name: "register buyer",
      component: RegisterBuyer,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
    },
    {
      path: "/reset-password",
      name: "reset-password",
      component: ResetPassword,
    },
  ],
});

export default router;
