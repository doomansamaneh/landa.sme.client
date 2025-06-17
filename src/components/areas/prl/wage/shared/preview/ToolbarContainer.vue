<template>
  <tool-bar-desktop
    v-if="$q.screen.gt.sm"
    :inside="inside"
    :margin="!inside"
    :title="title"
    :menu-items="menuItems"
  />
  <tool-bar-mobile
    v-else
    :inside="inside"
    :title="title"
    :model="model"
    :base-route="baseRoute"
    :menu-items="menuItems"
  />
</template>

<script setup>
  import { computed } from "vue";
  import { useQuasar } from "quasar";
  import { useWageState } from "../../../_composables/useWageState";
  import { usePreviewMenuContext } from "src/components/areas/_shared/menus/usePreviewMenuContext";
  import { useWagePreviewMenu } from "src/components/areas/prl/_menus/useWagePreviewMenu.js";
  import { downloadManager } from "src/helpers";

  import ToolBarDesktop from "src/components/shared/DynamicToolBarDesktop.vue";
  import ToolBarMobile from "src/components/shared/DynamicToolBarMobile.vue";

  const props = defineProps({
    model: {
      type: Object,
      required: true,
    },
    title: String,
    inside: Boolean,
    margin: Boolean,
    baseRoute: String,
  });

  const $q = useQuasar();
  const wageStore = useWageState();

  function downloadPdf() {
    downloadManager.downloadGet(
      `${props.baseRoute}/GeneratePdf/${props.model?.id}`,
      "landa-wage"
    );
  }

  function exportTax() {
    downloadManager.downloadGet(
      `${props.baseRoute}/exportTax/${props.model?.id}`,
      "landa-tax"
    );
  }

  function exportInsurance() {
    downloadManager.downloadGet(
      `${props.baseRoute}/exportInsurance/${props.model?.id}`,
      "landa-insurance"
    );
  }

  const context = usePreviewMenuContext(
    props.model,
    props.baseRoute,
    {
      onDeleteSuccess: () => wageStore.reset(),
      downloadPdf,
      exportTax,
      exportInsurance,
    }
  );

  const menuItems = computed(() => useWagePreviewMenu(context.value));
</script>
