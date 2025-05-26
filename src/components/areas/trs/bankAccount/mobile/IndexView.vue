<template>
  <tool-bar
    :model="model"
    :title="`${model?.bankTitle}`"
    :inside="inside"
    :base-route="baseRoute"
    :crud-store="crudStore"
  />

  <q-card flat bordered class="overflow-hidden">
    <div :ref="printStore.printRef" v-if="model">
      <q-card-section>
        <header-section :model="model" />
      </q-card-section>
      <q-separator />
      <account-item
        flat
        :columns="accountItemColumns"
        :filter-expression="filterExpression"
        :title="model.bankTitle"
        :sub-title="model.bankBranchTitle"
      />
    </div>
  </q-card>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";

  import { usePrint } from "src/composables/usePrint";
  import { useFormActions } from "src/composables/useFormActions";
  import { accountItemDLColumns } from "src/components/areas/acc/_composables/constants";
  import { sqlOperator } from "src/constants";

  import ToolBar from "../shared/preview/ToolBar.vue";
  import HeaderSection from "../shared/preview/_HeaderSection.vue";
  import AccountItem from "src/components/areas/acc/report/desktop/AccountItem.vue";

  const props = defineProps({
    item: Object,
    title: String,
    inside: Boolean,
  });

  const model = ref(null);
  const baseRoute = "trs/bankAccount";
  const crudStore = useFormActions(baseRoute, model);
  const printStore = usePrint();
  const accountItemColumns = accountItemDLColumns;
  const filterExpression = computed(() => [
    {
      fieldName: "vi.dlId",
      operator: sqlOperator.equal,
      value: model?.value.dlId,
    },
  ]);

  const route = useRoute();
  const router = useRouter();

  const id = computed(() => props.item?.id ?? route.params.id);

  onMounted(() => {
    crudStore.getById(id.value);
  });
</script>

<style scoped>
  .q-card {
    margin: 8px;
    border-radius: 8px;
  }

  .q-card-section {
    padding: 12px;
  }
</style>
