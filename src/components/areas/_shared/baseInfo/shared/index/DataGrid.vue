<template>
  <template v-if="$q.screen.xs">
    <toolbar-mobile
      v-if="toolbar"
      buttons
      :title="title"
      :table-store="mobileGrid?.tableStore"
      :crud-store="crudStore"
      :base-route="baseRoute"
      activation
    >
    </toolbar-mobile>

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
      v-if="toolbar"
      :title="title"
      :table-store="desktopGrid?.tableStore"
      :crud-store="crudStore"
      :base-route="baseRoute"
      activation
      buttons
    >
    </toolbar-desktop>
    <desktop
      :title="title"
      :grid-store="gridStore"
      :crud-store="crudStore"
      :data-source="dataSource"
      :base-route="baseRoute"
      ref="desktopGrid"
    >
      <template #cell-title="{ item }">
        <slot name="cell-title" :item="item"></slot>
      </template>
    </desktop>
  </template>
</template>

<script setup>
import { ref } from "vue";
import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
import { useFormActions } from "src/composables/useFormActions";

import ToolbarDesktop from "components/shared/ToolBarDesktop.vue";
import ToolbarMobile from "components/shared/ToolBarMobile.vue";
import Desktop from "src/components/areas/_shared/baseInfo/desktop/index/DataGrid.vue";
import Mobile from "src/components/areas/_shared/baseInfo/mobile/index/DataGrid.vue";

const props = defineProps({
  toolbar: Boolean,
  title: String,
  baseRoute: String,
  dataSource: String,
  columns: Array,
});

const gridStore = useBaseInfoGrid(props.columns);
const crudStore = useFormActions(props.baseRoute);
const desktopGrid = ref(null);
const mobileGrid = ref(null);
</script>
