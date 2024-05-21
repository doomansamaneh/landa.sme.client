<template>
  <template v-if="$q.screen.lt.sm">
    <toolbar-mobile
      buttons
      :title="title"
      :table-store="mobileGrid?.tableStore"
      :crud-store="crudStore"
      :base-route="baseRoute"
      activation
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
      activation
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
  import { contractColumns } from "components/areas/doc/_composables/constants";
  import { useFormActions } from "src/composables/useFormActions";

  const gridStore = useBaseInfoGrid({ columns: contractColumns });

  import ToolbarDesktop from "components/shared/ToolBarDesktop.vue";
  import ToolbarMobile from "components/shared/ToolBarMobile.vue";
  import Desktop from "../../desktop/index/DataGrid.vue";
  import Mobile from "../../desktop/index/DataGrid.vue";

  const dataSource = "doc/contract/getGridData";
  const baseRoute = "doc/contract";
  const crudStore = useFormActions(baseRoute);
  const desktopGrid = ref(null);
  const mobileGrid = ref(null);
</script>
