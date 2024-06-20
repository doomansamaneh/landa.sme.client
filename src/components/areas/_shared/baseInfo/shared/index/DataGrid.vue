<template>
  <toolbar
    v-if="toolbar"
    buttons
    :title="title"
    :table-store="mobileGrid?.tableStore ?? desktopGrid?.tableStore"
    :base-route="baseRoute"
    activation
  />

  <template v-if="$q.screen.lt.sm">
    <mobile
      :title="title"
      :grid-store="localGridStore"
      :crud-store="crudStore"
      :data-source="dataSource"
      :base-route="baseRoute"
      :create-url="createUrl"
      :columns="columns"
      ref="mobileGrid"
    />
  </template>
  <template v-else>
    <desktop
      :title="title"
      :grid-store="localGridStore"
      :crud-store="crudStore"
      :data-source="dataSource"
      :base-route="baseRoute"
      :expandable="expandable"
      ref="desktopGrid"
    >
      <template
        v-for="(slot, name) in $slots"
        :key="slot"
        #[name]="{ item }"
      >
        <slot :name="name" :item="item" />
      </template>
    </desktop>
  </template>
</template>

<script setup>
  import { ref } from "vue";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { useFormActions } from "src/composables/useFormActions";

  import Desktop from "src/components/areas/_shared/baseInfo/desktop/index/DataGrid.vue";
  import Mobile from "src/components/areas/_shared/baseInfo/mobile/index/DataGrid.vue";
  import Toolbar from "./BaseInfoToolbar.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    baseRoute: String,
    dataSource: String,
    createUrl: String,
    gridStore: Object,
    columns: Array,
    visibleColumns: Array,
    sortColumn: String,
    expandable: Boolean,
    activation: Boolean,
  });

  const localGridStore =
    props.gridStore ??
    useBaseInfoGrid({
      columns: props.columns,
      visibleColumns: props.visibleColumns,
      sortColumn: props.sortColumn,
    });
  const crudStore = useFormActions(props.baseRoute);
  const desktopGrid = ref(null);
  const mobileGrid = ref(null);
</script>
