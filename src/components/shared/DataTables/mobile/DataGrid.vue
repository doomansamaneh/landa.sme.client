<template>
  <slot name="title"></slot>
  <slot name="header">
    <!-- Searchbar -->
    <q-input
      outlined
      rounded
      dense
      class="searchbox text-body2"
      v-model="tableStore.pagination.value.searchTerm"
      :placeholder="$t('page.card-searchbar')"
      @keydown.enter="resetPage"
    >
      <template #prepend>
        <q-icon
          name="search"
          class="search-icon cursor-pointer"
          size="sm"
          color="primary"
        />
      </template>

      <template #append>
        <q-icon
          name="clear"
          class="cursor-pointer"
          size="16px"
          color="primary"
          @click="clearSearch"
          v-if="!isSearchEmpty"
        />
        <q-btn
          round
          unelevated
          class="text-on-dark"
          dense
          icon="o_refresh"
          size="12px"
          @click="resetPage"
        />
        <slot name="header-guide"></slot>
      </template>
    </q-input>
  </slot>

  <!-- Rows -->
  <div class="q-mt-sm q-gutter-y-sm" style="margin: 0">
    <template v-for="row in rows?.value" :key="row.id">
      <q-card
        v-touch-hold.capture="() => selectRow(row)"
        class="border-radius-md"
        :class="tableStore.getRowClass(row)"
        flat
      >
        <q-card-section class="q-pa-xs">
          <div class="row no-wrap items-start justify-between">
            <!-- Left: avatar + body + badges -->
            <router-link
              class="col q-gutter-y-xs no-decoration text-on-dark"
              :to="baseRoute ? `/${baseRoute}/preview/${row.id}` : ''"
              @contextmenu.prevent
            >
              <div class="row items-start">
                <slot v-if="showAvatar" name="row-avatar" :item="row">
                  <div class="col-auto q-mr-sm">
                    <transition name="slide" appear mode="out-in">
                      <q-avatar
                        :key="row.selected"
                        size="48px"
                        text-color="white"
                        :style="
                          !row.selected
                            ? helper.generateAvatarStyle(
                                row[avatarField ?? id]
                              )
                            : ''
                        "
                        :class="
                          row.selected ? 'primary-gradient' : ''
                        "
                        @click.prevent="setActiveRow(row)"
                      >
                        <div
                          v-if="!row.selected"
                          class="text-body2 text-bold"
                        >
                          <slot name="row-avatar-title" :item="row">
                            {{ helper.getFirstChar(row?.id) }}
                          </slot>
                        </div>
                        <transition appear name="slide-fade">
                          <q-icon
                            v-if="row.selected"
                            size="24px"
                            name="check"
                          />
                        </transition>
                      </q-avatar>
                    </transition>
                  </div>
                </slot>

                <div class="col">
                  <slot name="row-body" :item="row">
                    <div
                      v-for="col in gridStore?.columns.value"
                      :key="col.name"
                    >
                      <slot :name="`cell-${col.name}`" :item="row">
                        <div
                          v-if="
                            col.field && col.label && row[col.field]
                          "
                          class="q-pa-xs"
                        >
                          {{ col.label }}:
                          <span v-html="getColText(row, col)"></span>
                        </div>
                      </slot>
                    </div>
                  </slot>

                  <!-- Badge -->
                  <div v-if="showBadge" class="row no-wrap">
                    <div class="col no-wrap">
                      <q-scroll-area
                        :bar-style="{ opacity: 0 }"
                        :thumb-style="{ opacity: 0 }"
                        style="height: 21px"
                      >
                        <div
                          class="row q-gutter-x-xs no-wrap q-pr-xs"
                        >
                          <slot name="row-badge" :item="row"></slot>
                        </div>
                      </q-scroll-area>
                    </div>
                  </div>
                </div>
              </div>
            </router-link>

            <!-- Right: Toolbar -->
            <div class="col-auto q-ml-sm">
              <slot name="row-toolbar" :item="row" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </template>
  </div>

  <slot name="footer"></slot>

  <!-- No Data -->
  <div
    v-if="
      !tableStore.showLoader.value &&
      tableStore?.rows.value.length === 0
    "
    class="text-on-dark"
  >
    <no-data-found />
  </div>

  <!-- Loader -->
  <q-inner-loading
    :showing="tableStore.showLoader.value"
    class="transparent z-max"
  >
    <q-spinner size="52px" color="primary" />
  </q-inner-loading>

  <!-- Pagebar -->
  <div
    v-if="showPagebar"
    class="row items-center justify-center q-gutter-sm q-my-lg"
  >
    <q-btn
      :disable="previousAction"
      unelevated
      rounded
      dense
      padding="3px 9px"
      text-color="white"
      class="row primary-gradient primary-shadow items-center"
      @click="previous"
    >
      <q-icon class="q-pr-xs" size="16px" name="east" />
      <span class="text-body3">
        {{ $t("shared.labels.previous") }}
      </span>
    </q-btn>
    <q-btn
      :disable="nextAction"
      unelevated
      rounded
      dense
      padding="3px 9px"
      text-color="white"
      class="row primary-gradient primary-shadow items-center"
      @click="next"
    >
      <span class="text-body3">{{ $t("shared.labels.next") }}</span>
      <q-icon class="q-pl-xs" size="16px" name="west" />
    </q-btn>
  </div>

  <!-- Create Button -->
  <template v-if="createUrl">
    <q-page-sticky position="bottom-right z-1" :offset="[18, 18]">
      <slot name="create-label">
        <q-btn
          v-if="showCreate"
          text-color="white"
          rounded
          unelevated
          padding="8px 16px"
          :to="createUrl"
          dense
          class="text-body1 primary-gradient primary-shadow"
        >
          <div class="row items-center q-gutter-x-xs">
            <q-icon name="o_add" size="20px" />
            <span>{{ $t("shared.labels.create") }}</span>
          </div>
        </q-btn>
      </slot>
    </q-page-sticky>
  </template>
</template>

<script setup>
  import { ref, onMounted, onUnmounted, computed } from "vue";
  import { useDataTable } from "src/composables/useDataTable";
  import { dataViewDefaultPageSize } from "src/constants";
  import { helper } from "src/helpers";

  import NoDataFound from "src/components/shared/dataTables/NoDataFound.vue";

  const props = defineProps({
    dataSource: String,
    columns: Array,
    createUrl: String,
    gridStore: Object,
    numbered: Boolean,
    showAvatar: Boolean,
    avatarField: { type: String, default: "id" },
    showBadge: Boolean,
    baseRoute: String,
    multiSelect: Boolean,
    dataTableStore: useDataTable,
  });

  const emit = defineEmits([
    "active-row-changed",
    "selected-rows-changed",
  ]);

  const showCreate = ref(true);
  let previousScrollPosition = 0;

  const tableStore = computed(
    () =>
      props.dataTableStore ??
      useDataTable({
        dataSource: props.dataSource,
        dataColumns: props.columns,
        store: props.gridStore,
      })
  );

  const thisGridStore = computed(() => tableStore.value.state);

  const rows = computed(() => {
    if (thisGridStore.value?.rows) {
      return thisGridStore.value.rows;
    }
    return tableStore.value.rows;
  });

  const nextAction = computed(
    () =>
      tableStore.value.pagination.value.currentPage >=
      tableStore.value.pagination.value.totalPages
  );

  const previousAction = computed(
    () => tableStore.value.pagination.value.currentPage <= 1
  );

  function getColText(row, col) {
    if (row && col) {
      if (col.template) {
        return col.template.replace(
          /{{\s*([\w.]+)\s*}}/g,
          (_, key) => row[key] ?? ""
        );
      } else if (col.field) return row[col.field];
    }
    return "";
  }

  async function loadData() {
    await tableStore.value.loadData();
    if (thisGridStore.value?.rows) {
      thisGridStore.value.rows.value = tableStore.value.rows.value;
    }
  }

  async function reloadData() {
    await tableStore.value.reloadData();
    if (thisGridStore.value?.rows)
      thisGridStore.value.rows.value = tableStore.value.rows.value;
  }

  async function resetPage() {
    //tableStore.value.pagination.value.currentPage = 1
    await reloadData();
  }

  const handleScroll = () => {
    const currentPosition =
      window.scrollY || document.documentElement.scrollTop;
    showCreate.value =
      currentPosition <= 0 ||
      currentPosition < previousScrollPosition;
    previousScrollPosition = currentPosition;
  };

  function selectAll(checked) {
    tableStore.value.selectAll(checked);
    emitselectedRows();
  }

  function selectRow(row) {
    tableStore.value.selectRow(row, !row.selected);
    emitselectedRows();
  }

  function emitselectedRows() {
    emit(
      "selected-rows-changed",
      tableStore.value.selectedRows.value
    );
  }

  function setActiveRow(row) {
    if (tableStore.value.selectedRows.value.length > 0) {
      selectRow(row);
      tableStore.value.setActiveRow(row);
    } else {
      if (tableStore.value.activeRow.value === row) {
        tableStore.value.setActiveRow(null);
      } else tableStore.value.setActiveRow(row);
    }
    emit("active-row-changed", row);
  }

  async function clearSearch() {
    tableStore.value.pagination.value.searchTerm = "";
    await reloadData();
  }

  const isSearchEmpty = computed(
    () =>
      !tableStore.value.pagination.value.searchTerm ||
      tableStore.value.pagination.value.searchTerm.trim().length === 0
  );

  const showPagebar = computed(
    () =>
      tableStore.value.pagination.value.totalItems >
      dataViewDefaultPageSize
  );

  async function previous(e) {
    tableStore.value.pagination.value.currentPage -= 1;
    await reloadData();
  }
  async function next(e) {
    tableStore.value.pagination.value.currentPage += 1;
    await reloadData();
  }

  onMounted(() => {
    loadData();
    window.addEventListener("scroll", handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  defineExpose({
    tableStore,
    resetPage,
    loadData,
  });
</script>
