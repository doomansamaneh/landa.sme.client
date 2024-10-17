<template>
  <tool-bar-desktop
    v-if="$q.screen.gt.sm"
    :inside="inside"
    :title="title"
    :model="model"
    :base-route="baseRoute"
    @send-email="sendEmail"
  />

  <tool-bar-mobile
    v-else
    :inside="inside"
    :title="title"
    :model="model"
    :base-route="baseRoute"
    @send-email="sendEmail"
  />
</template>

<script setup>
  import { useRouter } from "vue-router";
  import { downloadManager } from "src/helpers";

  import ToolBarDesktop from "../../desktop/preview/PreviewToolbar.vue";
  import ToolBarMobile from "../../mobile/preview/PreviewToolbar.vue";

  const props = defineProps({
    model: Object,
    title: String,
    inside: Boolean,
    margin: Boolean,
    baseRoute: String,
  });

  const router = useRouter();

  function deleteById(id) {
    //invoiceStore.state.firstLoad.value = false;
    router.back();
  }

  function sendEmail(id) {}
</script>
