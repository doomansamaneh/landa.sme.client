<template>
  <div class="q-pa-md">
    <div class="q-gutter-x-sm">
      <custom-button
        class="text-body2 no-letter-spacing primary-shadow primary-gradient"
        text-color="white"
        icon="o_add"
        title="افزودن نشانی"
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

    <div v-for="address in tableStore.rows.value" :key="address.id">
      <address-item :item="address" :table-store="tableStore" />
    </div>
  </div>
</template>

<script setup>
  import { onMounted } from "vue";
  import { formAction, sqlOperator } from "src/constants";
  import { useDataTable } from "src/composables/useDataTable";
  import { useDialog } from "src/composables/useDialog";

  import CustomButton from "src/components/shared/buttons/CustomButton.vue";
  import AddressItem from "./_AddressItem.vue";
  import CreateForm from "../../../customerAddress/shared/forms/CreateForm.vue";

  const props = defineProps({
    item: Object,
  });
  const dialogStore = useDialog();
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

  const add = () => {
    dialogStore.openDialog({
      title: "shared.contactType.address",
      component: CreateForm,
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
