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

  function deleteById() {
    props.crudStore.deleteById(props.model.id, router.back);
  }

  async function exportTax() {
    await downloadManager.downloadGet(
      `${props.baseRoute}/exportTax/${props.model.id}`,
      "landa-tax"
    );
  }

  async function exportInsurance() {
    await downloadManager.downloadGet(
      `${props.baseRoute}/exportInsurance/${props.model.id}`,
      "landa-insurance"
    );
  }

  function sendEmail(id) {}
</script>
