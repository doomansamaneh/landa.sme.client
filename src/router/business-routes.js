export default {
  path: "/business",
  component: () => import("layouts/BusinessLayout.vue"),
  children: [
    { path: "", component: () => import("pages/business/IndexPage.vue") }
  ]
}
