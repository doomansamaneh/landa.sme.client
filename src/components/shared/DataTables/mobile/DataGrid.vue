<template>
  <!-- Title -->
  <slot name="title" />

  <!-- Header with search -->
  <slot name="header">
    <q-input
      outlined
      rounded
      dense
      class="searchbox text-body2"
      v-model="pagination.searchTerm"
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
          v-if="!isSearchEmpty"
          name="clear"
          class="cursor-pointer"
          size="16px"
          color="primary"
          @click="clearSearch"
        />
        <q-btn
          no-caps
          round
          unelevated
          dense
          icon="o_refresh"
          size="12px"
          class="text-on-dark"
          @click="resetPage"
        />
        <slot name="header-guide" />
      </template>
    </q-input>
  </slot>

  <!-- Rows -->
  <template
    v-for="(row, index) in rows?.value"
    :key="row.id || index"
  >
    <q-card
      flat
      v-touch-hold.capture="() => selectRow(row)"
      class="border-radius-md"
      :class="tableStore.getRowClass(row)"
      @click="setActiveRow(row)"
    >
      <q-card-section class="q-pa-xs">
        <div class="row_ no-wrap items-start justify-between">
          <router-link
            class="col q-gutter-y-xs no-decoration text-on-dark"
            :to="getPreviewRoute(row)"
            @contextmenu.prevent
          >
            <div class="row items-start">
              <!-- Avatar Slot -->
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
                      :class="row.selected ? 'primary-gradient' : ''"
                      @click.prevent.stop="selectRow(row)"
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

              <!-- Row Content -->
              <div class="col">
                <slot name="row-body" :item="row" />

                <!-- Badge Slot -->
                <div v-if="showBadge" class="row no-wrap q-mt-sm">
                  <div class="col no-wrap">
                    <q-scroll-area
                      :bar-style="{ opacity: 0 }"
                      :thumb-style="{ opacity: 0 }"
                      style="height: 21px"
                    >
                      <div class="row q-gutter-x-xs no-wrap q-pr-xs">
                        <slot name="row-badge" :item="row" />
                      </div>
                    </q-scroll-area>
                  </div>
                </div>
              </div>
            </div>
          </router-link>

          <!-- Row Toolbar -->
          <div class="col-auto q-ml-sm">
            <slot name="row-toolbar" :item="row" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </template>

  <slot name="footer" />

  <!-- No Data -->
  <div
    v-if="!tableStore.showLoader.value && rows?.value.length === 0"
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
      no-caps
      :disable="previousDisabled"
      unelevated
      rounded
      dense
      padding="3px 9px"
      text-color="white"
      class="row primary-gradient primary-shadow items-center"
      @click="previous"
    >
      <q-icon
        class="q-pr-xs"
        size="16px"
        :name="$q.lang.rtl ? 'east' : 'west'"
      />
      <span class="text-body3">
        {{ $t("shared.labels.previous") }}
      </span>
    </q-btn>
    <q-btn
      no-caps
      :disable="nextDisabled"
      unelevated
      rounded
      dense
      padding="3px 9px"
      text-color="white"
      class="row primary-gradient primary-shadow items-center"
      @click="next"
    >
      <span class="text-body3">{{ $t("shared.labels.next") }}</span>
      <q-icon
        class="q-pl-xs"
        size="16px"
        :name="$q.lang.rtl ? 'west' : 'east'"
      />
    </q-btn>
  </div>

  <!-- Create Button -->
  <q-page-sticky
    v-if="createUrl && showCreate"
    position="bottom-right z-1"
    :offset="[18, 18]"
  >
    <slot name="create-label">
      <q-btn
        no-caps
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

<script setup>
  import { ref, onMounted, onUnmounted, computed } from "vue";
  import { useDataTable } from "src/composables/useDataTable";
  import { dataViewDefaultPageSize } from "src/constants";
  import { helper } from "src/helpers";

  import NoDataFound from "src/components/shared/dataTables/NoDataFound.vue";

  // Props
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
    previewPage: { type: Boolean, default: true },
    dataTableStore: useDataTable,
    noActiveRow: Boolean,
    noSelectRow: Boolean,
  });

  // Emits
  const emit = defineEmits([
    "active-row-changed",
    "selected-rows-changed",
  ]);

  // State
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

  const pagination = computed(
    () => tableStore.value.pagination.value
  );
  const rows = computed(() => tableStore.value.rows);
  const isSearchEmpty = computed(
    () => !pagination.value.searchTerm?.trim()
  );
  const showPagebar = computed(
    () => pagination.value.totalItems > dataViewDefaultPageSize
  );

  const nextDisabled = computed(
    () => pagination.value.currentPage >= pagination.value.totalPages
  );
  const previousDisabled = computed(
    () => pagination.value.currentPage <= 1
  );

  // Methods
  function getPreviewRoute(row) {
    if (props.previewPage && props.baseRoute)
      return `/${props.baseRoute}/preview/${row.id}`;
    return "";
  }

  function emitSelectedRows() {
    emit(
      "selected-rows-changed",
      tableStore.value.selectedRows.value
    );
  }

  function selectRow(row) {
    if (!props.noSelectRow) {
      tableStore.value.selectRow(row, !row.selected);
      emitSelectedRows();
    }
  }

  function setActiveRow(row) {
    if (tableStore.value.selectedRows.value.length > 0) {
    } else {
      const isSame = tableStore.value.activeRow.value === row;
      if (!props.noActiveRow) {
        tableStore.value.setActiveRow(isSame ? null : row);
      }
    }
    emit("active-row-changed", row);
  }

  async function loadData() {
    await tableStore.value.loadData();
    props.gridStore?.rows &&
      (props.gridStore.rows.value = tableStore.value.rows.value);
  }

  async function reloadData() {
    await tableStore.value.reloadData();
    props.gridStore?.rows &&
      (props.gridStore.rows.value = tableStore.value.rows.value);
  }

  async function resetPage() {
    pagination.value.currentPage = 1;
    await reloadData();
  }

  async function clearSearch() {
    pagination.value.searchTerm = "";
    await reloadData();
  }

  async function next() {
    pagination.value.currentPage++;
    await reloadData();
  }

  async function previous() {
    pagination.value.currentPage--;
    await reloadData();
  }

  function handleScroll() {
    const currentPosition =
      window.scrollY || document.documentElement.scrollTop;
    showCreate.value =
      currentPosition <= 0 ||
      currentPosition < previousScrollPosition;
    previousScrollPosition = currentPosition;
  }

  // Lifecycle
  onMounted(() => {
    loadData();
    window.addEventListener("scroll", handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  // Expose
  defineExpose({ tableStore, resetPage, loadData });
</script>
