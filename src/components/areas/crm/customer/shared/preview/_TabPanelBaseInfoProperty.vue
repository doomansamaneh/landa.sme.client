<template>
  <div class="q-pa-md">
    <div class="q-gutter-x-sm">
      <custom-button
        icon="o_add"
        title="افزودن فیلد سفارشی"
        @click="add"
      />

      <q-btn
        unelevated
        round
        class="text-on-dark"
        @click="tableStore.reloadData()"
      >
        <q-icon name="o_refresh" size="20px" />
      </q-btn>
    </div>

    <div v-for="property in tableStore.rows.value" :key="property.id">
      <property-item :item="property" :table-store="tableStore" />
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { useQuasar } from "quasar";
  import { formAction, sqlOperator } from "src/constants";
  import { useDataTable } from "src/composables/useDataTable";

  import CustomButton from "src/components/shared/buttons/CustomButton.vue";
  import PropertyItem from "./_PropertyItem.vue";
  import CreateFormDialog from "components/areas/cmn/entityProperty/shared/forms/CreateFormDialog.vue";

  const props = defineProps({
    item: Object,
  });
  const $q = useQuasar();
  const tableStore = useDataTable({
    dataSource: "cmn/entityProperty/getGridData",
  });

  tableStore.setFilterExpression([
    {
      fieldName: "ep.EntityId",
      operator: sqlOperator.equal,
      value: props.item.id,
    },
  ]);

  const loadData = async () => {
    await tableStore.loadData();
  };

  const add = () => {
    $q.dialog({
      component: CreateFormDialog,
      componentProps: {
        customerId: props.item.id,
        action: formAction.create,
      },
    }).onOk(async () => {
      alert("address added");
      await tableStore.reloadData();
    });
  };

  onMounted(() => {
    loadData();
  });
</script>
