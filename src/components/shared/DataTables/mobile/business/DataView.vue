<template>
  <div class="column_ q-gutter-md q-my-lg">
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

      <q-card class="bordered row bg-dark rounded-borders q-pa-md _items-center">
        <div class="col-2 q-mr-xs">
          <q-avatar
            size="36px"
            text-color="white"
            color="primary"
            v-if="row.isOwner"
          >
            <q-icon
              name="o_person"
              size="20px"
            />
          </q-avatar>

          <q-avatar
            size="36px"
            class="text-on-dark bg-on-dark"
            v-else
          >
            <q-icon
              name="o_person"
              size="20px"
            />
          </q-avatar>
        </div>
        <div class="col">
          <div class="column q-gutter-sm">

            <div
              @click="gotoBusiness(row)"
              class="text-body3 ellipsis-2-lines"
            >{{ row.title }}</div>

            <div class="row">
              <q-item-label caption>
                <q-icon
                  class="expire-date-clock dark-icon2"
                  name="history"
                  size="16px"
                  v-if="!row.expired"
                />
                <q-icon
                  class="expire-date-clock dark-icon2"
                  color="warning"
                  name="warning"
                  size="16px"
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

          </div>
        </div>

        <div class="col-4">
          <div class="row justify-end q-gutter-xs">
            <renew-subscribtion :business="row" />
            <q-btn
              size="13px"
              unelevated
              round
              dense
              icon="o_more_vert"
              @click="onBottomSheetShow(row)"
            />
          </div>
        </div>
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

  <bottom-sheet
    v-if="bottomSheetStatus"
    :status="bottomSheetStatus"
    @hide="onBottomSheetHide"
  >

    <template #header>

    </template>

    <template #body>
      <q-list padding>

        <q-item
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-avatar
              class="bg-on-dark text-on-dark"
              size="36px"
            >
              <q-icon
                size="xs"
                name="o_login"
              />
            </q-avatar>
          </q-item-section>

          <q-item-section class="text-body2 no-letter-spacing"> {{ $t("page.buttons.more-button.enter-business") }}
          </q-item-section>
        </q-item>

        <template v-if="selectedRow.isOwner">

          <q-item
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-avatar
                class="bg-on-dark text-on-dark"
                size="36px"
              >
                <q-icon
                  size="xs"
                  name="o_person_add"
                />
              </q-avatar>
            </q-item-section>

            <q-item-section class="text-body2 no-letter-spacing"> {{ $t("page.buttons.more-button.invite-user") }}
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-avatar
                class="bg-on-dark text-on-dark"
                size="36px"
              >
                <q-icon
                  size="xs"
                  name="o_credit_card"
                />
              </q-avatar>
            </q-item-section>

            <q-item-section class="text-body2 no-letter-spacing"> {{ $t("page.buttons.more-button.payment-history") }}
            </q-item-section>
          </q-item>

          <q-separator size="0.5px" />

          <q-item
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-avatar
                class="delete-avatar bg-on-dark text-on-dark"
                size="36px"
              >
                <q-icon
                  size="xs"
                  name="o_delete"
                />
              </q-avatar>
            </q-item-section>

            <q-item-section class="text-body2 no-letter-spacing"> {{ $t("page.buttons.more-button.delete") }}
            </q-item-section>
          </q-item>

        </template>

      </q-list>
    </template>

  </bottom-sheet>
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
import BottomSheet from "src/components/shared/BottomSheet.vue"

import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { Loading, useQuasar } from "quasar"

const { t } = useI18n()
const router = useRouter()
const resetStore = useResetStores()
const businessStore = useBusiness()

const showCreate = ref(true)
let previousScrollPosition = 0
const bottomSheetStatus = ref(false)
const selectedRow = ref(null);

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

const onBottomSheetShow = (row) => {
  selectedRow.value = row;
  bottomSheetStatus.value = true;
}

const onBottomSheetHide = () => {
  bottomSheetStatus.value = false;
}

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
  font-size: 13px;
  letter-spacing: 0;
  color: #2d2d2d;
}
.q-item__section--side {
  padding-right: 12px;
}
</style>
