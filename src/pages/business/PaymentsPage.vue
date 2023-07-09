<template>
  <q-page class="flex justify-center items-center">
    <q-card class="q-card-desktop q-my-xl gt-xs no-shadow">
      <q-item class="card-header q-px-lg q-py-lg">
        <div class="service-extension-btn q-mr-md">
          <q-btn unelevated round icon="add" class="add-new-business">
            <q-tooltip> تمدید سرویس </q-tooltip>
          </q-btn>
        </div>
        <q-item-section>
          <q-item-label class="text-weight-bold text-body1"
            >تاریخچه پرداخت</q-item-label
          >
        </q-item-section>
        <div class="flex items-center q-gutter-x-md">
          <q-icon
            class="dark-3 cursor-pointer"
            size="md"
            name="arrow_back"
            @click="$router.go(-1)"
          >
            <q-tooltip>بازگشت</q-tooltip>
          </q-icon>
        </div>
      </q-item>
      <q-separator />
      <q-linear-progress
        class="business-progress"
        indeterminate
        size="xs"
        v-if="loadingData"
      />
      <q-card-section class="q-px-lg q-gutter-y-md">
        <div class="search-bar q-pt-sm" v-if="showSearchbar">
          <q-input
            outlined
            dense
            class="text-caption q-mb-sm"
            v-model="searchTerm"
            :placeholder="$t('page.card-searchbar')"
            @keydown.enter="reloadData"
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
                name="cancel"
                class="cursor-pointer"
                size="sm"
                color="grey-5"
                @click="clearSearch"
                v-if="!isSearchEmpty"
              />
            </template>
          </q-input>
        </div>
        <q-card
          class="row justify-between items-center no-shadow q-py-md q-px-md cursor-pointer"
          v-for="(item, index) in rows"
          :key="index"
          @click="selectCard(index)"
          :class="{ selected: isSelected(index) }"
        >
          <div class="col-6 q-gutter-x-md">
            <div class="flex justify-start">
              <label class="dark-2"
                ><q-icon
                  class="expire-date-clock dark-icon2"
                  name="history"
                  size="sm"
                />
                {{
                  "از: " +
                  item.fromDateString +
                  " " +
                  "تا: " +
                  item.toDateString
                }}
              </label>
            </div>
          </div>

          <div
            class="expire-date-container col-3 flex items-center q-gutter-x-xl"
          >
            <label class="dark-2"
              ><q-icon
                class="expire-date-clock dark-icon2"
                name="attach_money"
                size="sm"
              />
              {{ item.amount }}
              <q-tooltip>مبلغ</q-tooltip>
            </label>
          </div>
          <div
            class="expire-date-container col-4 flex items-center justify-center q-gutter-x-xl"
          >
            <q-badge
              v-if="item.statusTitle == 'Enum_BusinessPaymentStatus_Trial'"
              color="orange"
              text-color="white"
              label="دوره آزمایشی"
              class="q-py-xs"
            />
            <q-badge
              v-else
              color="orange"
              text-color="white"
              label="پرداخت شده"
              class="q-py-xs"
            />
          </div>
          <div class="more-options col-1 q-pl-md">
            <q-btn
              class="more-icon dark-2"
              unelevated
              falt
              round
              icon="more_vert"
              size="md"
              dense
            >
              <q-tooltip>{{ $t("page.buttons.more-tooltip") }}</q-tooltip>
            </q-btn>
            <q-menu transition-show="jump-down" transition-hide="jump-up">
              <q-list padding>
                <q-item clickable v-close-popup>
                  <q-item-section>
                    <div class="flex items-center q-gutter-x-sm">
                      <q-avatar icon="o_visibility" size="sm" class="dark-1" />
                      <div class="text-caption">مشاهده</div>
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </div>
        </q-card>
      </q-card-section>
      <div
        class="row q-pt-md justify-between dark-1 q-px-lg q-py-md"
        v-if="showPagebar"
      >
        <div class="pagination col-8 flex items-center">
          <q-pagination
            v-if="showPaging"
            v-model="pagination.currentPage"
            :min="1"
            :max="maxPage"
            direction-links
            boundary-links
            icon-first="keyboard_double_arrow_left"
            icon-last="keyboard_double_arrow_right"
            icon-prev="chevron_left"
            icon-next="chevron_right"
            @update:model-value="reloadData"
            gutter="xs"
            padding="2px 4px 2px 4px"
            round
            color="grey-8"
            active-color="primary"
          />
        </div>
        <div class="col-2">
          <q-select
            dense
            outlined
            v-model="pagination.pageSize"
            :options="[5, 10, 20]"
            @update:model-value="reloadData"
            transition-show="flip-up"
            transition-hide="flip-down"
            class="q-pl-lg dark-2 text-weight-bolder"
          />
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import DesktopViewGuide from "../../components/business/DesktopViewGuide.vue"
import { fetchWrapper } from "../../helpers"
import { computed, onMounted, onBeforeUnmount, watch } from "vue"
import { ref } from "vue"
import { useQuasar } from "quasar"

const $q = useQuasar()

const rows = ref([
  {
    id: "5d1c85d9-91d8-42eb-8cbd-a01076648c29",
    dateCreated: "2023-06-11T11:13:52",
    dateModified: null,
    dateModifiedString: null,
    fromDate: "2023-06-12T00:00:00",
    fromDateString: "1402/03/22",
    toDate: "2024-06-12T00:00:00",
    toDateString: "1403/03/23",
    amount: 0.0,
    planId: "00000000-0000-0000-0000-000000000000",
    planTitle: null,
    statusId: 2021,
    month: 12,
    comment: null,
    statusTitle: "Enum_BusinessPaymentStatus_Trial",
    businessTitle: null,
    loginName: null
  },
  {
    id: "1c027678-7920-4aea-8502-6f84b04ab90b",
    dateCreated: "2022-08-09T12:59:36",
    dateModified: null,
    dateModifiedString: null,
    fromDate: "2023-05-11T00:00:00",
    fromDateString: "1402/02/21",
    toDate: "2023-06-11T00:00:00",
    toDateString: "1402/03/21",
    amount: 539000.0,
    planId: "00000000-0000-0000-0000-000000000000",
    planTitle: null,
    statusId: 2024,
    month: 1,
    comment: null,
    statusTitle: "Enum_BusinessPaymentStatus_Payed",
    businessTitle: null,
    loginName: null
  },
  {
    id: "92bd0008-b9b0-49a1-9729-0fbc9c8c445a",
    dateCreated: "2022-07-31T19:05:34",
    dateModified: null,
    dateModifiedString: null,
    fromDate: "2023-04-10T00:00:00",
    fromDateString: "1402/01/21",
    toDate: "2023-05-10T00:00:00",
    toDateString: "1402/02/20",
    amount: 539000.0,
    planId: "00000000-0000-0000-0000-000000000000",
    planTitle: null,
    statusId: 2024,
    month: 1,
    comment: null,
    statusTitle: "Enum_BusinessPaymentStatus_Payed",
    businessTitle: null,
    loginName: null
  },
  {
    id: "f31e224f-30d2-49bd-a861-6cb6cbb26377",
    dateCreated: "2022-04-09T17:19:16",
    dateModified: null,
    dateModifiedString: null,
    fromDate: "2022-04-09T00:00:00",
    fromDateString: "1401/01/20",
    toDate: "2023-04-09T00:00:00",
    toDateString: "1402/01/20",
    amount: 0.0,
    planId: "00000000-0000-0000-0000-000000000000",
    planTitle: null,
    statusId: 2021,
    month: 12,
    comment: null,
    statusTitle: "Enum_BusinessPaymentStatus_Trial",
    businessTitle: null,
    loginName: null
  },
  {
    id: "74a3b30f-bab5-455d-89a6-7924aa04d8ee",
    dateCreated: "2022-03-08T16:41:29",
    dateModified: null,
    dateModifiedString: null,
    fromDate: "2022-03-08T00:00:00",
    fromDateString: "1400/12/17",
    toDate: "2022-04-08T00:00:00",
    toDateString: "1401/01/19",
    amount: 490000.0,
    planId: "00000000-0000-0000-0000-000000000000",
    planTitle: null,
    statusId: 2024,
    month: 1,
    comment: null,
    statusTitle: "Enum_BusinessPaymentStatus_Payed",
    businessTitle: null,
    loginName: null
  }
])

const showGuideDialog = ref(false)
const loadingData = ref(false)
const searchTerm = ref("")
const defaultPageSize = 5
const selectedCard = ref(false)

const pagination = ref({
  sortBy: "title",
  descending: false,
  currentPage: 1,
  pageSize: defaultPageSize,
  totalItems: 0
})

const showPagebar = computed(() => {
  return pagination.value.totalItems > defaultPageSize
})

const showPaging = computed(() => {
  return pagination.value.totalItems > pagination.value.pageSize
})

const showSearchbar = computed(() => {
  return true
  return pagination.value.totalItems > defaultPageSize || !isSearchEmpty.value
})

function clearSearch() {
  searchTerm.value = ""
  reloadData()
}

const isSearchEmpty = computed(
  () => !searchTerm.value || searchTerm.value.trim().length === 0
)

const maxPage = computed(() =>
  Math.ceil(pagination.value.totalItems / pagination.value.pageSize)
)

const pagedRows = computed(() => {
  return rows.value
})

onMounted(() => {
  reloadData()
})

async function reloadData() {
  loadData(pagination.value)
}

async function loadData(data) {
  loadingData.value = true
  selectedCard.value = false

  let filterExpression = []

  if (searchTerm.value) {
    filterExpression.push({
      fieldName: "b.title",
      operator: 3,
      value: searchTerm.value
    })
  }

  const response = await fetchWrapper
    .post("business/getBusinessPaymentGridData", {
      pageSize: data.pageSize,
      sortColumn: data.sortBy,
      sortOrder: data.descending ? 1 : 2,
      currentPage: data.currentPage,
      filterExpression: filterExpression
    })
    .then((response) => {
      handleResponse(response, data)
    })
    .finally(() => {
      loadingData.value = false
    })
}

function handleResponse(response, pagination) {
  rows.value = response.data.items
  //pagination.value = response.data.page
  pagination.totalItems = response.data.page.totalItems
  pagination.pageSize = response.data.page.pageSize
  pagination.currentPage = response.data.page.currentPage
  pagination.sortBy = pagination.sortBy
  pagination.descending = pagination.descending
}

function selectCard(index) {
  selectedCard.value = index
}

function isSelected(index) {
  return selectedCard.value === index
}
</script>

<style lang="scss">
.q-card-desktop {
  width: 620px !important;
}

.business-name {
  // max-width: 150px;
}
</style>
