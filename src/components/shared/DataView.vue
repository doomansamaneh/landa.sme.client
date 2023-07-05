<template>
  <q-card-section class="q-px-lg q-gutter-y-md">
    <div class="search-bar q-pt-sm" v-if="showSearchbar">
      <q-input
        outlined
        dense
        class="text-caption q-mb-sm"
        v-model="searchTerm"
        :placeholder="$t('business-page.card-searchbar')"
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
      v-for="(item, index) in pagedRows"
      :key="index"
      @click="selectCard(index)"
      :class="{ selected: isSelected(index) }"
    >
      <div class="col-6 q-gutter-x-sm">
        <q-avatar
          class="business-isowner"
          icon="o_person"
          size="lg"
          v-if="item.isOwner"
        />
        <q-avatar
          class="business-isnotowner"
          icon="o_person"
          size="lg"
          v-else
        />
        <q-btn
          class="business-name-btn text-caption text-weight-bold"
          no-caps
          flat
          text-color="dark"
          :ripple="false"
          @click="gotoBusiness"
        >
          <div class="flex no-wrap q-gutter-sm">
            <div class="business-name-icon">
              <q-icon name="o_login" />
            </div>
            <div class="business-name flex">
              <span class="ellipsis">{{ item.title }}</span>
            </div>
          </div>
          <q-tooltip>
            {{ $t("business-page.buttons.more-button.enter-business") }}
          </q-tooltip>
        </q-btn>
      </div>

      <div class="expire-date-container flex items-center q-gutter-x-xl">
        <label class="dark-2"
          ><q-icon
            class="expire-date-clock dark-icon2"
            name="history"
            size="sm"
          />
          {{ item.dateCreatedString }}
          <q-tooltip>{{
            $t("business-page.buttons.expire-date-tooltip")
          }}</q-tooltip>
        </label>
        <q-btn
          v-if="item.isOwner"
          class="service-extension q-pa-sm"
          round
          dense
          flat
          color="positive"
          icon="o_add_shopping_cart"
          size="md"
        >
          <q-tooltip>{{
            $t("business-page.buttons.service-extension-tooltip")
          }}</q-tooltip>
        </q-btn>
        <q-btn
          v-else
          class="service-extension dark-2 q-pa-sm"
          round
          dense
          flat
          icon="o_add_shopping_cart"
          size="md"
          disable
        >
        </q-btn>
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
          <q-tooltip>{{ $t("business-page.buttons.more-tooltip") }}</q-tooltip>
        </q-btn>
        <q-menu transition-show="jump-down" transition-hide="jump-up">
          <q-list padding>
            <q-item clickable v-close-popup>
              <q-item-section>
                <div class="flex items-center q-gutter-x-sm">
                  <q-avatar icon="login" size="sm" class="dark-1" />
                  <div class="text-caption">
                    {{ $t("business-page.buttons.more-button.enter-business") }}
                  </div>
                </div>
              </q-item-section>
            </q-item>
            <div class="isNotOwner" v-if="item.isOwner">
              <q-item clickable v-close-popup>
                <q-item-section>
                  <div class="flex items-center q-gutter-x-sm">
                    <q-avatar icon="o_person_add" size="sm" class="dark-1" />
                    <div class="text-caption">
                      {{ $t("business-page.buttons.more-button.invite-user") }}
                    </div>
                  </div>
                </q-item-section>
              </q-item>
              <q-separator spaced />
              <q-item clickable v-close-popup>
                <q-item-section>
                  <div class="flex items-center q-gutter-x-sm">
                    <q-avatar icon="o_delete" size="sm" class="dark-1" />
                    <div class="text-caption">
                      {{ $t("business-page.buttons.more-button.delete") }}
                    </div>
                  </div>
                </q-item-section>
              </q-item>
              <q-separator spaced />
              <q-item clickable v-close-popup>
                <q-item-section>
                  <div
                    class="flex items-center q-gutter-x-sm"
                    @click="goToPaymentHistory"
                  >
                    <q-avatar icon="credit_card" size="sm" class="dark-1" />
                    <div class="text-caption">
                      {{
                        $t("business-page.buttons.more-button.payment-history")
                      }}
                    </div>
                  </div>
                </q-item-section>
              </q-item>
            </div>
          </q-list>
        </q-menu>
      </div>
    </q-card>
    <div
      class="no-results flex justify-center q-my-xl items-center q-gutter-x-sm"
      v-if="showSearchbar && pagedRows.length === 0 && !loadingData"
    >
      <div class="">
        <q-icon
          name="o_sentiment_dissatisfied"
          size="sm"
          class="no-results-icon"
        />
      </div>
      <div class="">چیزی یافت نشد!</div>
    </div>
  </q-card-section>
</template>

<script setup>
import DesktopViewGuide from "../../components/business/DesktopViewGuide.vue"
import { fetchWrapper } from "../../helpers"
import { computed, onMounted, onBeforeUnmount, watch } from "vue"
import { ref } from "vue"
import { useQuasar } from "quasar"
import { useRouter } from "vue-router"

const router = useRouter()
const $q = useQuasar()

const rows = ref([])
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
    .post("business/getBusinessGridData", {
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

async function gotoBusiness() {}

async function goToPaymentHistory() {
  router.push("/business/Payments")
}

function selectCard(index) {
  selectedCard.value = index
}

function isSelected(index) {
  return selectedCard.value === index
}

import DataGrid from "../../components/shared/DataGrid.vue"
import TestContainer from "../../components/shared/TestContainer.vue"
const gridBusiness = ref(null)

const columns = [
  {
    name: "row-number",
    required: true,
    label: "#",
    align: "left",
    sortable: false,
    headerStyle: "width: 5px"
  },
  {
    name: "name",
    required: true,
    label: "name",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true
  },
  {
    name: "toDate",
    required: true,
    label: "to date",
    align: "left",
    field: "toDateString",
    sortable: true,
    headerStyle: "width: 50px"
  },
  {
    name: "dateCreated",
    required: true,
    label: "dayes to expire",
    field: (row) => row.daysToExpire,
    sortable: true,
    headerStyle: "width: 50px"
  }
]

const columns2 = [
  {
    name: "row-number",
    required: true,
    label: "#",
    align: "left",
    sortable: false,
    headerStyle: "width: 5px"
  },
  {
    name: "name",
    required: true,
    label: "name",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true
  }
]

function reloadData_test() {
  gridBusiness.value.reloadData()
}

import DataView from "../../components/shared/DataView.vue"
import CardContainer from "../../components/shared/CardContainer.vue"
</script>

<style>
.q-card-desktop {
  width: 620px !important;
}

.business-name {
  max-width: 150px;
}
</style>
