<template>
  <tool-bar-desktop
    v-if="$q.screen.gt.sm"
    :inside="inside"
    :title="title"
    :model="model"
    :base-route="baseRoute"
    :crud-store="crudStore"
    @export-tax="exportTax"
    @export-insurance="exportInsurance"
    @download-pdf="downloadPdf"
    @send-email="sendEmail"
    @delete-by-id="deleteById"
  />

  <tool-bar-mobile
    v-else
    :inside="inside"
    :title="title"
    :model="model"
    :base-route="baseRoute"
    :crud-store="crudStore"
    @export-tax="exportTax"
    @export-insurance="exportInsurance"
    @download-pdf="downloadPdf"
    @send-email="sendEmail"
    @delete-by-id="deleteById"
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
    crudStore: Object,
  });

  const router = useRouter();

  function deleteById(id) {
    crudStore.deleteById(id);
    //invoiceStore.state.firstLoad.value = false;
    router.back();
  }

  function downloadPdf(id) {
    downloadManager.downloadGet(
      `${props.baseRoute}/GeneratePdf/${id}`,
      "landa-payroll"
    );
  }

  function exportTax(id) {
    downloadManager.downloadGet(
      `${props.baseRoute}/exportTax/${id}`,
      "landa-tax"
    );
  }

  function exportInsurance(id) {
    downloadManager.downloadGet(
      `${props.baseRoute}/exportInsurance/${id}`,
      "landa-insurance"
    );
  }

  function sendEmail(id) {}
</script>
