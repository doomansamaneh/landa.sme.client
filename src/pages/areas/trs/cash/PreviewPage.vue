<template>
  <tool-bar
    :model="model"
    :title="`${model?.title}`"
    :inside="inside"
    :base-route="baseRoute"
    :crud-store="crudStore"
    buttons
  >
    <template #buttons>
      <q-btn
        v-if="$q.screen.gt.sm"
        flat
        round
        dense
        icon="o_file_download"
        @click="exportToExcel"
      >
        <q-tooltip>تبدیل به اکسل</q-tooltip>
      </q-btn>
      <q-btn
        flat
        round
        dense
        icon="o_print"
        @click="printStore.handlePrint()"
      >
        <q-tooltip>چاپ</q-tooltip>
      </q-btn>
      <q-btn flat round dense icon="o_refresh" @click="refreshPage">
        <q-tooltip>تازه سازی</q-tooltip>
      </q-btn>
      <!-- Add other buttons like edit, copy, delete if needed here -->
    </template>
  </tool-bar>

  <q-card flat bordered class="overflow-hidden">
    <card-title :title="model?.title" />
    <div :ref="printStore.printRef" v-if="model">
      <q-card-section>
        <header-section :model="model" />
      </q-card-section>
      <q-separator />
      <account-item
        flat
        :columns="accountItemColumns"
        :filter-expression="filterExpression"
        :title="model.title"
        :sub-title="model.code"
      />
    </div>
  </q-card>

  <data-grid-item-sheet
    v-model:status="dataGridItemSheetStatus"
    :item="model"
    :base-route="baseRoute"
    :delete-call-back="deleteCallBack"
    :crud-store="crudStore"
    :print-store="printStore"
  />
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";

  import { usePrint } from "src/composables/usePrint";
  import { useFormActions } from "src/composables/useFormActions";
  import { accountItemDLColumns } from "src/components/areas/acc/_composables/constants";
  import { sqlOperator } from "src/constants";

  import ToolBar from "src/components/areas/trs/cash/shared/preview/ToolBar.vue";
  import HeaderSection from "src/components/areas/trs/cash/shared/preview/_HeaderSection.vue";
  import AccountItem from "src/components/areas/acc/report/desktop/AccountItem.vue";
  import DataGridItemSheet from "src/components/areas/trs/cash/mobile/index/DataGridItemSheet.vue";
  import CardTitle from "src/components/shared/CardTitle.vue";

  const props = defineProps({
    item: Object,
    title: String,
    inside: Boolean,
  });

  const dataGridItemSheetStatus = ref(false);
  const model = ref(null);
  const baseRoute = "trs/cash";
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

  function deleteCallBack() {
    router.back();
  }

  function exportToExcel() {
    // Implement export to excel logic here
    console.log("Exporting to Excel");
  }

  function refreshPage() {
    crudStore.getById(id.value);
  }

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
