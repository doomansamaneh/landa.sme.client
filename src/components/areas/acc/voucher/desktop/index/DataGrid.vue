<template>
  <div class="q-mb-lg">
    <advanced-search
      :grid-store="gridStore"
      @apply-search="reloadData"
    />
  </div>

  <data-grid
    ref="dataGrid"
    :data-source="dataSource"
    :grid-store="gridStore"
    separator="horizontal"
    flat_
    multiSelect
    numbered
    bordered
    wrapCells
    dense_
    expandable
    @row-dbl-click="gotoPreview"
  >
    <template #filter-typeId="{ col }">
      <custom-select
        v-model="col.value"
        :options="helper.getEnumOptions(voucherType, 'voucherType')"
        @update:model-value="reloadData"
      />
    </template>
    <template #filter-systemId="{ col }">
      <custom-select
        v-model="col.value"
        :options="helper.getEnumOptions(subSystem, 'subSystem')"
        @update:model-value="reloadData"
      />
    </template>

    <template #cell-subject="{ item }">
      {{ item.subject }}
      <div>
        <small>{{ item.summary }}</small>
      </div>
    </template>

    <template #cell-amount="{ item }">
      {{ item.amount.toLocaleString() }}
    </template>

    <template #cell-typeId="{ item }">
      {{
        $t(
          `shared.voucherType.${helper.getEnumType(
            item.typeId,
            voucherType
          )}`
        )
      }}
    </template>

    <template #cell-systemId="{ item }">
      {{
        $t(
          `shared.subSystem.${helper.getEnumType(
            item.systemId,
            subSystem
          )}`
        )
      }}
    </template>

    <template #expand="{ item }">
      <preview inside :item="item" />
    </template>
  </data-grid>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted } from "vue";
  import { useRouter } from "vue-router";
  import { helper, bus } from "src/helpers";
  import { subSystem, voucherType } from "src/constants";

  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import Preview from "../../shared/preview/IndexView.vue";
  import AdvancedSearch from "./AdvancedSearch.vue";

  const props = defineProps({
    gridStore: Object,
    dataSource: String,
    baseRoute: String,
  });

  const router = useRouter();
  const dataGrid = ref(null);

  async function reloadData() {
    await tableStore.value.reloadData();
  }

  const tableStore = computed(() => dataGrid?.value?.tableStore);

  function gotoPreview(row) {
    router.push(`/acc/voucher/preview/${row.id}`);
  }

  onMounted(() => {
    bus.on("apply-search", reloadData);
  });

  onUnmounted(() => {
    bus.off("apply-search", reloadData);
  });

  defineExpose({
    tableStore,
  });
</script>
