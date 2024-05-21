<template>
  <template v-if="$q.screen.lt.sm">
    <toolbar-mobile
      buttons
      :title="title"
      :table-store="mobileGrid?.tableStore"
      :crud-store="crudStore"
      :base-route="baseRoute"
    ></toolbar-mobile>

    <mobile
      :title="title"
      :grid-store="gridStore"
      :crud-store="crudStore"
      :data-source="dataSource"
      :base-route="baseRoute"
      ref="mobileGrid"
    />
  </template>
  <template v-else>
    <toolbar-desktop
      :title="title"
      :table-store="desktopGrid?.tableStore"
      :crud-store="crudStore"
      :base-route="baseRoute"
      buttons
      margin
    ></toolbar-desktop>
    <desktop
      :title="title"
      :grid-store="gridStore"
      :crud-store="crudStore"
      :data-source="dataSource"
      :base-route="baseRoute"
      ref="desktopGrid"
    />
  </template>
</template>

<script setup>
  import { ref } from "vue";
  import { useBaseInfoGrid } from "components/areas/_shared/_composables/useBaseInfoGrid";
  import { useCloseOrderState } from "../../../_composables/useCloseOrderState";
  import { useFormActions } from "src/composables/useFormActions";

  //const closeOrderStore = useCloseOrderState()
  const gridStore = useBaseInfoGrid(useCloseOrderState());

  import ToolbarDesktop from "components/shared/ToolBarDesktop.vue";
  import ToolbarMobile from "components/shared/ToolBarMobile.vue";
  import Desktop from "../../desktop/index/DataGrid.vue";
  import Mobile from "../../desktop/index/DataGrid.vue";

  const dataSource = "inv/closeOrder/getGridData";
  const baseRoute = "inv/closeOrder";
  const crudStore = useFormActions(baseRoute);
  const desktopGrid = ref(null);
  const mobileGrid = ref(null);
</script>
