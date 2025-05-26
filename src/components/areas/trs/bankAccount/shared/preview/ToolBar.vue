<template>
  <tool-bar-desktop
    v-if="$q.screen.gt.sm"
    :inside="inside"
    :title="title"
    :model="model"
    :crud-store="crudStore"
    :base-route="baseRoute"
  ></tool-bar-desktop>

  <tool-bar-mobile
    v-else
    :inside="inside"
    :title="title"
    :model="model"
    :crudStore="crudStore"
    :base-route="baseRoute"
  ></tool-bar-mobile>
</template>

<script setup>
  import { useQuasar } from "quasar";
  import ToolBarDesktop from "../../desktop/PreviewToolbar.vue";
  import ToolBarMobile from "../../mobile/PreviewToolbar.vue";

  const $q = useQuasar();

  const props = defineProps({
    model: Object,
    title: String,
    inside: Boolean,
    margin: Boolean,
    baseRoute: String,
    crudStore: Object,
  });
</script>
