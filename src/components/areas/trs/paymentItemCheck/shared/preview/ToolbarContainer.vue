<template>
  <toolbar-desktop
    v-if="$q.screen.gt.sm"
    :inside="inside"
    :title="title"
    :menu-items="menuItems"
    :margin="!inside"
    back-button
  />
  <toolbar-mobile
    v-else
    :inside="inside"
    :title="title"
    :model="model"
    :base-route="baseRoute"
    :menu-items="menuItems"
    back-button
  />
</template>

<script setup>
  import { computed } from "vue";
  import { useDialog } from "src/composables/useDialog";

  import { usePreviewMenuContext } from "src/components/areas/_shared/menus/usePreviewMenuContext";
  import { usePaymentItemCheckPreviewMenu } from "../../../_menus/usePaymentItemCheckPreviewMenu";

  import TransferToBankForm from "../forms/TransferToBankForm.vue";
  import CashCheckPayedForm from "../forms/CashCheckPayedForm.vue";
  import CashCheckReceiptForm from "../forms/CashCheckReceiptForm.vue";
  import BounceCheckPayedForm from "../forms/BounceCheckPayedForm.vue";
  import BounceCheckReceiptForm from "../forms/BounceCheckReceiptForm.vue";

  import ToolbarDesktop from "src/components/shared/toolbars/DynamicToolbarDesktop.vue";
  import ToolbarMobile from "src/components/shared/toolbars/MobilePreviewToolbar.vue";

  const props = defineProps({
    model: {
      type: Object,
      required: true,
    },
    title: String,
    inside: Boolean,
    margin: Boolean,
    baseRoute: { type: String, default: "trs/paymentItemCheck" },
  });

  const dialogStore = useDialog();
  const context = usePreviewMenuContext(
    props.model,
    props.baseRoute,
    {
      openForm: (title, component) => {
        dialogStore.openDialog({
          title: `shared.labels.${title}`,
          component: getComponent(component),
          actionBar: true,
          props: {
            id: props.model.id,
            item: props.model,
          },
          okCallback: async (responseData) => {},
        });
      },
    }
  );

  function getComponent(componentName) {
    const componentMap = {
      TransferToBankForm,
      CashCheckPayedForm,
      CashCheckReceiptForm,
      BounceCheckPayedForm,
      BounceCheckReceiptForm,
    };

    const component = componentMap[componentName];
    if (!component) {
      console.warn(`Component "${componentName}" not found.`);
      return null;
    }

    return component;
  }

  const menuItems = computed(() =>
    usePaymentItemCheckPreviewMenu(context.value)
  );
</script>
