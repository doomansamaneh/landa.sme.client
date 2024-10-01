<template>
  <tool-bar-desktop
    v-if="$q.screen.gt.sm"
    :inside="inside"
    :title="title"
    :model="model"
    :form-store="formStore"
    :base-route="baseRoute"
  >
    <template #toolbar-custom-desktop>
      <slot name="toolbar-custom-desktop"></slot>
    </template>
  </tool-bar-desktop>

  <tool-bar-mobile
    v-else
    :inside="inside"
    :title="title"
    :model="model"
    :form-store="formStore"
    :base-route="baseRoute"
  >
    <template #toolbar-custom-mobile>
      <slot name="toolbar-custom-mobile"></slot>
    </template>
  </tool-bar-mobile>
</template>

<script setup>
  import { useRouter } from "vue-router";
  import { useInvoiceState } from "components/areas/sls/_composables/useInvoiceState";
  import { useInvoiceModel } from "components/areas/sls/_composables/useInvoiceModel";

  import ToolBarDesktop from "../../desktop/preview/PreviewToolbar.vue";
  import ToolBarMobile from "../../mobile/preview/PreviewToolbar.vue";

  const props = defineProps({
    model: Object,
    title: String,
    inside: Boolean,
    margin: Boolean,
    baseRoute: String,
  });

  const formStore = useInvoiceModel({
    baseRoute: props.baseRoute,
    preview: true,
  });

  const router = useRouter();
  const invoiceStore = useInvoiceState();

  function deleteCallBack() {
    invoiceStore.state.firstLoad.value = false;
    router.back();
  }
</script>
