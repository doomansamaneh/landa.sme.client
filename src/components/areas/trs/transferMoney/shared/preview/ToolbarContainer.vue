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
  import { useTransferMoneyState } from "../../../_composables/useTransferMoneyState";
  import { usePreviewMenuContext } from "src/components/areas/_shared/menus/usePreviewMenuContext";
  import { useTransferMoneyPreviewMenu } from "src/components/areas/trs/_menus/useTransferMoneyPreviewMenu.js";

  import ToolBarDesktop from "src/components/shared/toolbars/DynamicToolBarDesktop.vue";
  import ToolBarMobile from "src/components/shared/toolbars/MobilePreviewToolbar.vue";

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
  const transferMoneyStore = useTransferMoneyState();
  const context = usePreviewMenuContext(
    props.model,
    props.baseRoute,
    {
      onDeleteSuccess: () => transferMoneyStore.reset(),
    }
  );

  const menuItems = computed(() =>
    useTransferMoneyPreviewMenu(context.value)
  );
</script>
