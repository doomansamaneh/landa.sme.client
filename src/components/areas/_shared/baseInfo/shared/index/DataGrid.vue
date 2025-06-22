<template>
  <toolbar-container
    v-if="toolbar"
    buttons
    :title="title"
    :table-store="tableStore"
    :base-route="baseRoute"
    :crud-store="crudStore"
    :permission-prefix="permissionPrefix"
  />

  <template v-if="$q.screen.lt.sm">
    <mobile
      :title="title"
      :table-store="tableStore"
      :crud-store="crudStore"
      :data-source="dataSource"
      :base-route="baseRoute"
      :createUrl="`/${baseRoute}/create`"
      :preview-page="previewPage"
    >
      <template
        v-for="(slot, name) in $slots"
        :key="slot"
        #[name]="{ item }"
      >
        <slot :name="name" :item="item" />
      </template>
    </mobile>
  </template>
  <template v-else>
    <desktop
      :title="title"
      :icon="icon"
      :table-store="tableStore"
      :crud-store="crudStore"
      :data-source="dataSource"
      :base-route="baseRoute"
      :expandable="expandable"
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
  import { useDataTable } from "src/composables/useDataTable";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { useFormActions } from "src/composables/useFormActions";

  import Desktop from "src/components/areas/_shared/baseInfo/desktop/index/DataGrid.vue";
  import Mobile from "src/components/areas/_shared/baseInfo/mobile/index/DataGrid.vue";
  import ToolbarContainer from "./ToolbarContainer.vue";

  const props = defineProps({
    title: String,
    icon: String,
    baseRoute: String,
    permissionPrefix: String,
    dataSource: String,
    createUrl: String,
    gridStore: Object,
    columns: Array,
    visibleColumns: Array,
    sortColumn: String,
    toolbar: Boolean,
    expandable: Boolean,
    previewPage: Boolean,
  });

  const crudStore = useFormActions(props.baseRoute);

  const tableStore = useDataTable({
    dataSource: props.dataSource,
    store:
      props.gridStore ||
      useBaseInfoGrid({
        columns: props.columns,
        visibleColumns: props.visibleColumns,
        sortColumn: props.sortColumn,
      }),
  });
</script>
