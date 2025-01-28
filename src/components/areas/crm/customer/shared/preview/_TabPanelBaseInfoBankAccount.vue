<template>
  <div class="q-pa-md">
    <div class="q-gutter-x-sm">
      <custom-button
        class="text-body2 no-letter-spacing primary-shadow primary-gradient"
        text-color="white"
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
  import { onMounted } from "vue";
  import { formAction, sqlOperator } from "src/constants";
  import { useDataTable } from "src/composables/useDataTable";
  import { useDialog } from "src/composables/useDialog";

  import CustomButton from "src/components/shared/buttons/CustomButton.vue";
  import BankAccountItem from "./_BankAccountItem.vue";
  import CreateForm from "../../../customerBankAccount/shared/forms/CreateForm.vue";

  const props = defineProps({
    item: Object,
  });

  const dialogStore = useDialog();
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
    dialogStore.openDialog({
      title: "افزودن حساب بانکی",
      component: CreateForm,
      actionBar: true,
      props: { customerId: props.item.id, action: formAction.create },
      okCallback: async (response) => {
        await tableStore.reloadData();
      },
    });
  };

  onMounted(() => {
    loadData();
  });
</script>
