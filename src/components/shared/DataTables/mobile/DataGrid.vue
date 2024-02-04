<template>
  <slot name="title">
    <!-- <div class="q-my-md">
      نام صفحه
    </div> -->
  </slot>
  <slot name="header">
    <q-input
      outlined
      rounded
      dense
      class="searchbox text-body2 q-my-md"
      v-model="tableStore.pagination.value.searchTerm"
      :placeholder="$t('page.card-searchbar')"
      @keydown.enter="resetPage"
    >
      <template v-slot:prepend>
        <q-icon
          name="search"
          class="search-icon cursor-pointer"
          size="sm"
          color="primary"
        />
      </template>

      <template v-slot:append>
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

        <slot name="header-guide">
        </slot>
      </template>
    </q-input>
  </slot>

  <div class="q-my-lg q-gutter-y-md">
    <template
      v-for="(row, index) in gridStore?.rows?.value"
      :key="row.id"
    >
      <slot
        name="body"
        :item="row"
      >
        <q-card class="card-grid-body">
          <slot
            name="row-header"
            :item="row"
          >
          </slot>

          <q-card-section>
            <slot
              name="row-body"
              :item="row"
            >
              <span
                v-if="numbered"
                class="text-on-dark"
              >
                {{ index + startIndex }}
              </span>
              <div
                v-for="col in gridStore?.columns.value"
                :key="col.name"
              >
                <slot
                  :name="`cell-${col.name}`"
                  :item="row"
                >
                  <template v-if="col.field">
                    {{ col.label }}: {{ row[col.field] }}
                  </template>
                </slot>
              </div>
            </slot>
          </q-card-section>
          <q-card-actions class="dark-1">
            <slot
              name="row-actions"
              :item="row"
            >
            </slot>

            <slot
              name="row-more-menus"
              :item="row"
            >
            </slot>
          </q-card-actions>
        </q-card>
      </slot>
    </template>
  </div>

  <slot name="footer"></slot>

  <div
    v-if="!tableStore.showLoader.value && tableStore?.rows.value.length === 0"
    class="text-on-dark"
  >
    <no-data-found />
  </div>

  <q-inner-loading
    :showing="tableStore.showLoader.value"
    class="transparent z-max"
  >
    <q-spinner
      size="52px"
      color="primary"
    />
  </q-inner-loading>

  <div
    v-if="showPagebar"
    class="row items-center justify-center q-gutter-sm q-mt-md q-mb-xl"
  >
    <q-btn
      :disable="previousAction"
      unelevated
      rounded
      dense
      padding="6px 16px"
      color="primary"
      class="primary-shadow"
      @click="previous"
    >
      <span class="text-body2 no-letter-spacing">
        قبلی
      </span>
    </q-btn>
    <q-btn
      :disable="nextAction"
      unelevated
      rounded
      dense
      padding="6px 16px"
      color="primary"
      class="primary-shadow"
      @click="next"
    >
      <span class="text-body2 no-letter-spacing">
        بعدی
      </span>
    </q-btn>
  </div>

  <template v-if="createUrl">
    <q-page-sticky
      position="bottom-right z-1"
      :offset="[18, 18]"
    >
      <slot name="create-label">
        <q-btn
          v-if="showCreate"
          rounded
          unelevated
          padding="10px 20px"
          :to="createUrl"
          dense
          color="primary"
          class="text-body1 no-letter-spacing primary-shadow"
        >
          <div class="row items-center q-gutter-x-xs">
            <q-icon
              name="o_add"
              size="sm"
            />
            <span>
              {{ $t("shared.labels.create") }}
            </span>
          </div>
        </q-btn>
      </slot>
    </q-page-sticky>
  </template>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue"
import { useDataTable } from "src/composables/useDataTable"

import NoDataFound from "src/components/shared/dataTables/NoDataFound.vue"
import { dataViewDefaultPageSize } from "src/constants"

const props = defineProps({
  dataSource: String,
  createUrl: String,
  gridStore: Object,
  numbered: Boolean,
  multiSelect: Boolean
})

const emit = defineEmits(["active-row-changed", "selected-rows-changed"])

const startIndex = ref(1)
const showCreate = ref(true)
let previousScrollPosition = 0

const tableStore = useDataTable(props.dataSource, null, props.gridStore)

const thisGridStore = computed(() => {
  return props.gridStore
})

const nextAction = computed(() =>
  tableStore.pagination.value.currentPage >= tableStore.pagination.value.totalPages
)

const previousAction = computed(() => tableStore.pagination.value.currentPage <= 1)

async function reloadData() {
  await tableStore.reloadData()
  if (thisGridStore.value.rows)
    thisGridStore.value.rows.value = tableStore.rows.value
  //thisGridStore.value.rows.value = [...thisGridStore.value.rows.value, ...tableStore.rows.value]
}

async function loadData() {
  await tableStore.loadData()
  if (thisGridStore.value.rows)
    thisGridStore.value.rows.value = tableStore.rows.value
}

async function resetPage() {
  tableStore.pagination.value.currentPage = 1
  await tableStore.reloadData()
  if (thisGridStore.value.rows)
    thisGridStore.value.rows.value = tableStore.rows.value
}

const handleScroll = () => {
  const currentPosition = window.scrollY || document.documentElement.scrollTop;
  showCreate.value = currentPosition <= 0 || currentPosition < previousScrollPosition;
  previousScrollPosition = currentPosition;
}

function selectAll(checked) {
  tableStore.selectAll(checked)
  emitselectedRows()
}

function selectRow(row, checked) {
  tableStore.selectRow(row, checked)
  emitselectedRows()
}

function emitselectedRows() {
  emit("selected-rows-changed", tableStore.selectedRows.value)
}

function setActiveRow(row) {
  tableStore.setActiveRow(row)
  emit("active-row-changed", row)
}

async function clearSearch() {
  tableStore.pagination.value.searchTerm = ""
  await reloadData()
}

const isSearchEmpty = computed(() =>
  !tableStore.pagination.value.searchTerm || tableStore.pagination.value.searchTerm.trim().length === 0
)

const showPagebar = computed(() => tableStore.pagination.value.totalItems > dataViewDefaultPageSize)

async function previous(e) {
  tableStore.pagination.value.currentPage -= 1
  await reloadData()
}
async function next(e) {
  tableStore.pagination.value.currentPage += 1
  await reloadData()
}

onMounted(() => {
  loadData()
  reloadData()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

defineExpose({
  tableStore,
  resetPage
})
</script>
