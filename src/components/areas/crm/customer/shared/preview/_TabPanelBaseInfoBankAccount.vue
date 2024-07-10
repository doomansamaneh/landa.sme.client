<template>
  <div class="q-pa-md">
    <div class="q-gutter-x-sm">
      <custom-button
        icon="o_add"
        title="افزودن حساب بانکی"
        @click="addBankAccount"
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

    <div
      v-for="bankAccount in tableStore.rows.value"
      :key="bankAccount.id"
    >
      <bank-account-item
        :item="bankAccount"
        :table-store="tableStore"
      />
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { useQuasar } from "quasar";
  import { helper } from "src/helpers";
  import { formAction, sqlOperator } from "src/constants";
  import { useDataTable } from "src/composables/useDataTable";

  import CustomButton from "src/components/shared/buttons/CustomButton.vue";
  import BankAccountItem from "./_BankAccountItem.vue";
  import CreateFormDialog from "../../../customerBankAccount/shared/forms/CreateFormDialog.vue";

  const props = defineProps({
    item: Object,
  });

  const $q = useQuasar();
  const tableStore = useDataTable({
    dataSource: "crm/customerBankAccount/getGridData",
  });

  tableStore.setFilterExpression([
    {
      fieldName: "cba.CustomerId",
      operator: sqlOperator.equal,
      value: props.item.id,
    },
  ]);

  const loadData = async () => {
    await tableStore.loadData();
  };

  const addBankAccount = () => {
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
