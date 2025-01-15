<template>
  <toolbar :title="title" />
  <index-view />
</template>

<script setup>
  import IndexView from "src/components/areas/acc/report/shared/GLPreview/IndexView.vue";
  import Toolbar from "./PreviewToolbar.vue";

  const title = "تراز آزمایشی - حساب کل";
</script>
