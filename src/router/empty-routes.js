import MainLayout from "src/layouts/MainLayout.vue";

export default {
  path: "/",
  component: MainLayout,
  name: "empty",
  children: [
    {
      path: "/settings",
      component: () =>
        import("src/pages/management/users/SettingPage.vue"),
    },
  ],
};
