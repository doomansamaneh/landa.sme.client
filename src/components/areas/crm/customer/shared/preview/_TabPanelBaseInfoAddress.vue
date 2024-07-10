<template>
  <div class="q-pa-md">
    <div class="q-gutter-x-sm">
      <custom-button
        class="text-body2 no-letter-spacing primary-shadow primary-gradient"
        text-color="white"
        icon="o_add"
        title="افزودن نشانی"
        @click="addAddress"
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

    <div v-for="address in tableStore.rows.value" :key="address.id">
      <address-item :item="address" :table-store="tableStore" />
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { useQuasar } from "quasar";
  import { formAction, sqlOperator } from "src/constants";
  import { useDataTable } from "src/composables/useDataTable";

  import CustomButton from "src/components/shared/buttons/CustomButton.vue";
  import AddressItem from "./_AddressItem.vue";
  import CreateFormDialog from "../../../customerAddress/shared/forms/CreateFormDialog.vue";

  const props = defineProps({
    item: Object,
  });
  const $q = useQuasar();
  const tableStore = useDataTable({
    dataSource: "crm/customerAddress/getGridData",
  });

  tableStore.setFilterExpression([
    {
      fieldName: "ca.customerId",
      operator: sqlOperator.equal,
      value: props.item.id,
    },
  ]);

  const loadData = async () => {
    await tableStore.loadData();
  };

  const addAddress = () => {
    $q.dialog({
      component: CreateFormDialog,
      componentProps: {
        customerId: props.item.id,
        action: formAction.create,
      },
    }).onOk(async () => {
      await tableStore.reloadData();
    });
  };

  onMounted(() => {
    loadData();
  });
</script>
