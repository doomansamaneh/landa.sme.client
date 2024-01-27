<template>
  <div class="column_ q-gutter-md q-my-md">
    <div>
      <q-input
        outlined
        dense
        class="text-body2"
        v-model="tableStore.pagination.value.searchTerm"
        :placeholder="$t('page.card-searchbar')"
        @keydown.enter="tableStore?.reloadData"
      >
        <template v-slot:prepend>
          <q-icon
            name="search"
            class="search-icon cursor-pointer"
            size="sm"
            color="primary"
            @click="reloadData"
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
        </template>
      </q-input>
    </div>

    <div
      v-for="(row) in businessStore.state.rows.value"
      :key="row.id"
    >
      <q-card class="full-width bordered no-padding">
        <q-card-section class="q-pb-none q-px-lg">
          <div class="row items-center justify-center q-mb-md">
            <q-avatar
              size="48px"
              text-color="white"
              color="primary"
              v-if="row.isOwner"
            >
              <q-icon
                name="o_person"
                size="sm"
              />
            </q-avatar>

            <q-avatar
              size="48px"
              class="text-on-dark bg-on-dark"
              v-else
            >
              <q-icon
                name="o_person"
                size="sm"
              />
            </q-avatar>
          </div>
          <div class="row justify-between items-center">

            <div class="col row items-center">
              <q-item-label caption>
                <q-icon
                  class="expire-date-clock dark-icon2"
                  name="history"
                  size="xs"
                  v-if="!row.expired"
                />
                <q-icon
                  class="expire-date-clock dark-icon2"
                  color="warning"
                  name="warning"
                  size="xs"
                  v-if="row.expired"
                />
                {{ row.toDateString }}
                <q-tooltip
                  class="custom-tooltip"
                  :delay="600"
                >{{
                  $t("page.buttons.expire-date-tooltip")
                }}</q-tooltip>
              </q-item-label>
            </div>

            <div class="col row justify-end items-center">
              <renew-subscribtion
                class="bg-green text-white"
                :business="row"
              />
            </div>
          </div>
          <q-separator class="q-my-md" />

          <div class="q-my-md">
            <span class="text-body2 text-bold text-on-dark">{{ row.title }}</span>
          </div>

        </q-card-section>

        <q-card-actions
          class="q-pa-md"
          align="between"
        >

          <!-- <add-business /> -->

          <q-btn
            rounded
            dense
            unelevated
            padding="8px 16px"
            @click="gotoBusiness(row)"
          >
            <span class="text-body2">ورود به کسب و کار</span>
          </q-btn>

          <q-btn
            round
            unelevated
            dense
            icon="o_more_vert"
            @click="onBottomSheetShow"
          />

        </q-card-actions>


      </q-card>


    </div>

    <div
      class="row justify-center"
      v-if="hasMoreData"
    >
      <q-btn
        rounded
        unelevated
        @click="gotoNext"
        class="full-width primary-shadow bg-primary text-white"
      >
        <span class="text-body3">بارگزاری بیشتر</span>
      </q-btn>
    </div>

    <div>
      <q-card v-if="!tableStore.showLoader.value && tableStore.rows.value.length == 0">
        <q-card-section>
          <no-data-found />
        </q-card-section>
      </q-card>
    </div>

    <q-inner-loading
      :showing="tableStore?.showLoader?.value"
      class="transparent z-max"
    >
      <q-spinner
        size="52px"
        color="primary"
      />
    </q-inner-loading>

  </div>

  <q-page-sticky
    position="bottom-right z-1"
    :offset="[18, 18]"
  >
    <q-btn
      v-if="showCreate"
      rounded
      padding="10px 20px"
      to="/sls/invoice/create"
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
          {{ $t("page.buttons.add-new-business-tooltip") }}
        </span>
      </div>
    </q-btn>

  </q-page-sticky>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue"
import { fetchWrapper } from "src/helpers"
// import { usePaginationStore } from "src/stores/page-store.js"
// import PageBar from "src/components/shared/DataTables/PageBar.vue"
// import AddBusiness from "src/components/management/shared/AddBusinessLink.vue"
import NoDataFound from "src/components/shared/DataTables/NoDataFound.vue"
import { useDataTable } from "src/composables/useDataTable"
import RenewSubscribtion from "src/components/management/shared/RenewSubscribtionLink.vue"
import { useResetStores } from "src/composables/useResetStores"
import { useBusiness } from "src/components/management/_composables/useBusiness"

import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { Loading, useQuasar } from "quasar"

const { t } = useI18n()
const router = useRouter()
const resetStore = useResetStores()
const businessStore = useBusiness()

const showCreate = ref(true)
let previousScrollPosition = 0

const props = defineProps({
  dataSource: String,
  sortColumn: String,
  searchField: String,
  columns: Array,
  gridStore: Object
})

const tableStore = useDataTable(props.dataSource, props.gridStore.columns, props.gridStore)

const emit = defineEmits(["active-row-changed", "selected-rows-changed"])

async function clearSearch() {
  tableStore.pagination.value.searchTerm = ""
  await reloadData()
}

const isSearchEmpty = computed(() =>
  !tableStore.pagination.value.searchTerm || tableStore.pagination.value.searchTerm.trim().length === 0
)

const handleScroll = () => {
  const currentPosition = window.pageYOffset || document.documentElement.scrollTop;
  showCreate.value = currentPosition <= 0 || currentPosition < previousScrollPosition;
  previousScrollPosition = currentPosition;
};

const loadingMessage = t('shared.messages.loading-message')

async function gotoBusiness(item) {
  Loading.show({
    message: loadingMessage,
    boxClass: 'bg-dark text-on-dark text-bold',
    spinnerColor: 'primary'
  })
  resetStore.reset()

  await fetchWrapper
    .post(`business/gotoBusiness/${item.id}`)
    .then((response) => {
      router.push(`/${item.id}`)
    }).finally(() => {
      Loading.hide()
    });
}

async function gotoNext() {
  if (hasMoreData.value) {
    tableStore.pagination.value.currentPage += 1
    await reloadData()
  }
}

async function reloadData() {
  await tableStore.reloadData()
  businessStore.state.rows.value = [...businessStore.state.rows.value, ...tableStore.rows.value]
}

async function loadData() {
  tableStore.pagination.value.currentPage = 1
  await tableStore.reloadData()
  businessStore.state.rows.value = tableStore.rows.value
}

const hasMoreData = computed(() => {
  return tableStore.pagination.value.currentPage < tableStore.pagination.value.totalPages
});

onMounted(() => {
  if (!props.gridStore) {
    tableStore.pagination.value.sortColumn = props.sortColumn
    tableStore.pagination.value.searchField = props.searchField
  }
  loadData()
  window.addEventListener('scroll', handleScroll)

})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

defineExpose({
  reloadData, loadData
})

</script>

<style lang="scss" scoped>
.q-item__label--caption {
  font-size: 14px;
  letter-spacing: 0;
  color: #2d2d2d;
}
</style>
