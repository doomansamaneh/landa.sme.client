<template>
  <toolbar-desktop
    v-if="$q.screen.gt.sm"
    :inside="inside"
    :margin="!inside"
    :title="title"
    :menu-items="menuItems"
  />
  <toolbar-mobile
    v-else
    :inside="inside"
    :title="title"
    :menu-items="menuItems"
  />
</template>

<script setup>
  import { computed } from "vue";
  import { usePreviewMenuContext } from "src/components/areas/_shared/menus/usePreviewMenuContext";
  import { useQuotePreviewMenu } from "../../../_menus/useQuotePreviewMenu";
  import { useQuoteState } from "../../../_composables/useQuoteState";

  import ToolbarDesktop from "src/components/shared/toolbars/DynamicToolBarDesktop.vue";
  import ToolbarMobile from "src/components/shared/toolbars/MobilePreviewToolbar.vue";

  const props = defineProps({
    model: Object,
    title: String,
    inside: Boolean,
    margin: Boolean,
    baseRoute: String,
  });

  const quoteStore = useQuoteState();
  const context = usePreviewMenuContext(
    props.model,
    props.baseRoute,
    {
      onDeleteSuccess: () => quoteStore.reset(),
    }
  );

  const menuItems = computed(() =>
    useQuotePreviewMenu(context.value)
  );
</script>
