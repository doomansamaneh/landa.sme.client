<template>
  <toolbar :title="title" />
  <index-view />
</template>

<script setup>
  import IndexView from "src/components/areas/acc/report/shared/CustomerAccountPreview/IndexView.vue";
  import Toolbar from "./PreviewToolbar.vue";

  const title = "گزارش حساب شخص";
</script>
