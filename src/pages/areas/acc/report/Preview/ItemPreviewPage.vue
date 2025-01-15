<template>
  <toolbar :title="title" />
  <index-view />
</template>

<script setup>
  import IndexView from "src/components/areas/acc/report/shared/ItemPreview/IndexView.vue";
  import Toolbar from "./PreviewToolbar.vue";

  const title = "تراز آزمایشی - ریز گردش";
</script>
