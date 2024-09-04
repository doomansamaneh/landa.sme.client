<template>
  <tool-bar
    :inside="inside"
    :title="title"
    :id="id"
    :form-store="formStore"
    :base-route="baseRoute"
  />

  <mobile class="q-mb-sm" v-if="$q.screen.xs" />
  <desktop :title="title" />
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { useRouter } from "vue-router";
  import { useInvoiceState } from "components/areas/sls/_composables/useInvoiceState";
  import { useInvoiceModel } from "components/areas/sls/_composables/useInvoiceModel";
  import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";

  import ToolBar from "src/components/areas/sls/_shared/invoice/shared/preview/ToolBar.vue";

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
