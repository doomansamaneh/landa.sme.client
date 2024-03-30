import MainLayout from "src/layouts/MainLayout.vue";

export default {
  path: "/",
  component: MainLayout,
  name: "empty",
  children: [
    {
      path: "/settings",
      component: () => import("pages/management/users/settings/IndexPage.vue"),
    },
  ],
};
