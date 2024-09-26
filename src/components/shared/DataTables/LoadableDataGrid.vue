<template>
  <q-inner-loading
    :showing="tableStore.showLoader.value"
    class="transparent z-max"
  >
    <q-spinner size="52px" color="primary" />
  </q-inner-loading>

  <div
    class="row items-center justify-between q-gutter-md q-px-md q-py-md"
  >
    <div v-if="showSearch" class="col">
      <slot name="search">
        <q-input
          ref="searchInput"
          inputmode="search"
          color="grey-5"
          outlined
          v-model="tableStore.pagination.value.searchTerm"
          :placeholder="$t('shared.labels.search')"
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
      </slot>
    </div>

    <slot name="close"></slot>
  </div>

  <q-scroll-area
    :style="scrollAreaStyle"
    :thumb-style="helper.thumbStyle"
    :bar-style="helper.barStyle"
  >
    <template
      v-for="(item, index) in gridStore.rows.value"
      :key="item.Id"
    >
      <slot name="item" :item="item" :index="index"></slot>
    </template>

    <div
      v-if="
        !tableStore.showLoader.value &&
        gridStore.rows.value.length === 0
      "
      class="text-on-dark"
    >
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
  </q-scroll-area>
</template>

<script setup>
  import { computed, onMounted } from "vue";
  import { useQuasar } from "quasar";
  import { useDataTable } from "src/composables/useDataTable";
  import { helper } from "src/helpers";
  import { useDefaultGridState } from "src/composables/useDefaultGridState";
  import { sortOrder } from "src/constants";

  import NoDataFound from "src/components/shared/dataTables/NoDataFound.vue";

  const props = defineProps({
    scrollStyle: String,
    showSearch: { type: Boolean, default: true },
    firstLoad: { type: Boolean, default: false },
    sortColumn: String,
    sortColumnOrder: sortOrder,
    dataSource: String,
    dataStore: Object,
  });
  const $q = useQuasar();

  const gridStore = computed(
    () =>
      props.dataStore ??
      useDefaultGridState({
        sortColumn: props.sortColumn,
        sortColumnOrder: props.sortColumnOrder,
      })
  );

  const tableStore = useDataTable({
    dataSource: props.dataSource,
    store: gridStore.value,
  });

  async function gotoNext() {
    if (hasMoreData.value) {
      tableStore.pagination.value.currentPage += 1;
      await reloadData();
    }
  }

  async function reloadData() {
    await tableStore.reloadData();
    gridStore.value.rows.value = [
      ...gridStore.value.rows.value,
      ...tableStore.rows.value,
    ];
  }

  async function loadData() {
    tableStore.pagination.value.currentPage = 1;
    await tableStore.reloadData();
    gridStore.value.rows.value = tableStore.rows.value;
  }

  const hasMoreData = computed(() => {
    return (
      gridStore.value.rows.value.length &&
      tableStore.pagination.value.currentPage <
        tableStore.pagination.value.totalPages
    );
  });

  const scrollAreaStyle = computed(
    () =>
      props.scrollStyle ??
      ($q.screen.gt.xs
        ? "height: calc(100vh - 180px);"
        : "height: calc(100vh - 120px);")
  );

  onMounted(() => {
    if (props.firstLoad) loadData();
  });

  defineExpose({
    tableStore,
    loadData,
  });
</script>
