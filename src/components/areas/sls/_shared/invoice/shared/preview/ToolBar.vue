<template>
  <tool-bar-desktop
    v-if="$q.screen.gt.sm"
    :inside="inside"
    :title="title"
    :id="id"
    :form-store="formStore"
    :base-route="baseRoute"
  >
    <template #toolbar-custom="{ formStore }">
      <slot name="toolbar-custom" :form-store="formStore"></slot>
    </template>
  </tool-bar-desktop>

  <tool-bar-mobile
    v-if="$q.screen.lt.md"
    :inside="inside"
    :title="title"
    :id="id"
    :form-store="formStore"
    :base-route="baseRoute"
  >
    <template #toolbar-custom="{ formStore }">
      <slot name="toolbar-custom" :form-store="formStore"></slot>
    </template>
  </tool-bar-mobile>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { useRouter } from "vue-router";
  import { useInvoiceState } from "components/areas/sls/_composables/useInvoiceState";
  import { useInvoiceModel } from "components/areas/sls/_composables/useInvoiceModel";
  import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";

  import ToolBarDesktop from "src/components/areas/sls/_shared/invoice/desktop/preview/PreviewToolbar.vue";
  import ToolBarMobile from "src/components/areas/sls/_shared/invoice/mobile/preview/PreviewToolbar.vue";
  import Mobile from "components/areas/sls/_shared/invoice/mobile/preview/IndexView.vue";
  import Desktop from "components/areas/sls/_shared/invoice/desktop/preview/IndexView.vue";

  const props = defineProps({
    item: Object,
    title: String,
    inside: Boolean,
    margin: Boolean,
  });

  const formStore = useInvoiceModel({
    baseRoute: "sls/invoice",
    preview: true,
  });

  const route = useRoute();
  const router = useRouter();
  const invoiceStore = useInvoiceState();

  function deleteCallBack() {
    invoiceStore.state.firstLoad.value = false;
    router.back();
  }

  const id = computed(() => props.item?.id ?? route.params.id);
  const appConfigStore = useAppConfigModel();

  onMounted(() => {
    formStore.getById(id.value);
  });
</script>
