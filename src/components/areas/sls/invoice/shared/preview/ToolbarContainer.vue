<template>
  <tool-bar-desktop
    v-if="$q.screen.gt.sm"
    :inside="inside"
    :margin="!inside"
    :title="title"
    :menu-items="menuItems"
    back-button
  />
  <tool-bar-mobile
    v-else
    :inside="inside"
    :title="title"
    :model="model"
    :menu-items="menuItems"
    back-button
  />
</template>

<script setup>
  import { computed } from "vue";
  import { useInvoiceModel } from "../../../_composables/useInvoiceModel";
  import { useInvoiceState } from "../../../_composables/useInvoiceState";
  import { usePreviewMenuContext } from "src/components/areas/_shared/menus/usePreviewMenuContext";
  import { useInvoicePreviewMenu } from "../../../_menus/useInvoicePreviewMenu";

  import ToolBarDesktop from "src/components/shared/toolbars/DynamicToolbarDesktop.vue";
  import ToolBarMobile from "src/components/shared/toolbars/MobilePreviewToolbar.vue";

  const props = defineProps({
    model: Object,
    title: String,
    inside: Boolean,
    margin: Boolean,
    baseRoute: String,
  });

  const invoiceStore = useInvoiceState();
  const formStore = useInvoiceModel({ baseRoute: props.baseRoute });
  const context = usePreviewMenuContext(
    props.model,
    props.baseRoute,
    {
      onDeleteSuccess: () => invoiceStore.reset(),
      cancelInvoice: () => {
        formStore.cancelInvoice(props.model.id, invoiceStore.reset());
      },
    }
  );

  const menuItems = computed(() =>
    useInvoicePreviewMenu(context.value)
  );
</script>
