<template>
  <template v-if="$q.screen.lt.sm">
    <mobile
      :title="title"
      :grid-store="gridStore"
      :crud-store="crudStore"
      :data-source="dataSource"
      :base-route="baseRoute"
      :create-url="createUrl"
      :columns="columns"
    />
  </template>
  <template v-else>
    <desktop
      :title="title"
      :grid-store="gridStore"
      :crud-store="crudStore"
      :data-source="dataSource"
      :base-route="baseRoute"
    ></desktop>
  </template>
</template>

<script setup>
  import { useCustomerState } from "src/components/areas/crm/_composables/useCustomerState";
  import { useFormActions } from "src/composables/useFormActions";

  import Desktop from "src/components/areas/crm/customer/desktop/index/DataGrid.vue";
  import Mobile from "src/components/areas/crm/customer/mobile/index/DataGrid.vue";

  const props = defineProps({
    toolbar: Boolean,
    visibleColumns: Array,
    title: String,
  });

  const gridStore = useCustomerState();

  const dataSource = "crm/customer/GetGridData";
  const baseRoute = "crm/customer";
  const crudStore = useFormActions(baseRoute);
</script>
