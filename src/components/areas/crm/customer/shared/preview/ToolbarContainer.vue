<template>
  <template v-if="$q.screen.xs">
    <toolbar-mobile :title="title" buttons margin />
  </template>
  <template v-else>
    <toolbar-desktop :title="title" buttons margin />
  </template>
</template>

<script setup>
  import { useI18n } from "vue-i18n";

  import ToolbarDesktop from "./desktop/_Toolbar.vue";
  import ToolbarMobile from "./mobile/_Toolbar.vue";

  const props = defineProps({
    toolbar: Boolean,
  });

  const { t } = useI18n();

  const title = t("main-menu-items.Crm_Customer_View");
</script>
