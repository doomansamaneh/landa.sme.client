<template>
  <div class="q-pa-md">
    <div class="q-gutter-x-sm">
      <custom-button
        class="text-body2 primary-shadow primary-gradient"
        text-color="white"
        icon="o_add"
        title="افزودن فیلد سفارشی"
        @click="add"
      />

      <q-btn
        no-caps
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
  import { onMounted, watch } from "vue";
  import { formAction, sqlOperator } from "src/constants";
  import { useDialog } from "src/composables/useDialog";
  import { useDataTable } from "src/composables/useDataTable";

  import CustomButton from "src/components/shared/buttons/CustomButton.vue";
  import PropertyItem from "./_PropertyItem.vue";
  import CreateForm from "components/areas/cmn/entityProperty/shared/forms/CreateForm.vue";

  const props = defineProps({
    item: Object,
  });
  const dialogStore = useDialog();
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
    dialogStore.openDialog({
      title: "افزودن فیلد سفارشی",
      component: CreateForm,
      actionBar: true,
      props: {
        entityId: props.item.id,
        entityName: "crm.[Customer]",
        action: formAction.create,
      },
      okCallback: async (response) => {
        await tableStore.reloadData();
      },
    });
  };

  onMounted(() => {
    loadData();
  });

  watch(
    () => props.item.id,
    async (newId) => {
      if (newId) {
        await loadData();
      }
    },
    { immediate: true }
  );
</script>
