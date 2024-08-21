<template>
  <q-inner-loading
    :showing="tableStore.showLoader.value"
    class="transparent z-max"
  >
    <q-spinner size="52px" color="primary" />
  </q-inner-loading>

  <!-- <div
    class="row items-center justify-between q-gutter-md q-px-md q-py-lg"
  >
    <div class="col">
      <q-input
        inputmode="search"
        color="grey-5"
        outlined
        v-model="tableStore.pagination.value.searchTerm"
        :placeholder="$t('shared.labels.contactSearch')"
        dense
        clearable
        clear-icon="o_clear"
        rounded
        @keydown.enter="loadData"
        class="text-body2 no-letter-spacing"
      >
        <template v-slot:prepend>
          <q-icon name="o_search" color="primary" />
        </template>
      </q-input>
    </div>
  </div> -->

  <template
    v-for="(item, index) in gridStore.rows.value"
    :key="item.Id"
  >
    <slot name="item" :item="item" :index="index"></slot>
  </template>

  <div v-if="noDataFound" class="text-on-dark">
    <no-data-found />
  </div>

  <div class="row justify-center" v-if="hasMoreData">
    <q-btn
      rounded
      unelevated
      @click="gotoNext"
      class="primary-shadow q-ma-lg primary-gradient text-white"
    >
      <span class="text-body3">
        {{ $t("shared.labels.loadMore") }} ...
      </span>
    </q-btn>
  </div>
</template>

<script setup>
  import { computed, onMounted } from "vue";
  import { useDataTable } from "src/composables/useDataTable";

  import NoDataFound from "src/components/shared/dataTables/NoDataFound.vue";

  const props = defineProps({
    dataSource: String,
    gridStore: Object,
  });

  const dataGridStore = computed(() => props.gridStore);

  const beforeLoadData = () => {
    dataGridStore.value.reset();
  };
  const handleLoadResponse = () => {
    dataGridStore.value.rows.value = tableStore.rows.value;
  };

  const tableStore = useDataTable({
    dataSource: props.dataSource,
    store: props.gridStore,
    beforeLoadData: beforeLoadData,
    handleGridDataResponse: handleLoadResponse,
  });

  async function gotoNext() {
    if (hasMoreData.value) {
      tableStore.pagination.value.currentPage += 1;
      await reloadData();
    }
  }

  async function reloadData() {
    await tableStore.reloadData();
    dataGridStore.value.rows.value = [
      ...dataGridStore.value.rows.value,
      ...tableStore.rows.value,
    ];
  }

  async function loadData() {
    await tableStore.loadData();
  }

  const hasMoreData = computed(() => {
    return (
      !noDataFound.value &&
      tableStore.pagination.value.currentPage <
        tableStore.pagination.value.totalPages
    );
  });

  const noDataFound = computed(
    () =>
      !tableStore.showLoader.value &&
      dataGridStore.value.rows.value.length === 0
  );

  onMounted(() => {
    loadData();
  });

  defineExpose({
    loadData,
  });
</script>
