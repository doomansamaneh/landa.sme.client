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
    :menu-items="menuItems"
  />
</template>

<script setup>
  import { computed } from "vue";
  import { usePreviewMenuContext } from "src/components/areas/_shared/menus/usePreviewMenuContext";
  import { useInvoiceState } from "../../../_composables/useInvoiceState";
  import { useInvoicePreviewMenu } from "../../../_menus/useInvoicePreviewMenu";

  import ToolBarDesktop from "src/components/shared/DynamicToolBarDesktop.vue";
  import ToolBarMobile from "src/components/shared/DynamicToolBarMobile.vue";

  const props = defineProps({
    model: Object,
    title: String,
    inside: Boolean,
    margin: Boolean,
    baseRoute: String,
  });

  const invoiceStore = useInvoiceState();
  const context = usePreviewMenuContext(
    props.model,
    props.baseRoute,
    {
      onDeleteSuccess: () => invoiceStore.reset(),
    }
  );

  const menuItems = computed(() =>
    useInvoicePreviewMenu(context.value)
  );
</script>
