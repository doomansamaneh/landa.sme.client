<template>
  <q-page class="flex justify-center items-center">
    <q-card class="q-card-desktop gt-xs no-shadow q-my-xl">
      <data-view
        :dataSource="`business/getBusinessPaymentGridData/${businessId}`"
        orderByField="fromDate"
        searchField="amount"
        :businessTitle="businessTitle"
      >
        <template #header>
          <q-item class="card-header q-px-lg q-py-lg">
            <div class="service-extension-btn q-mr-md">
              <q-btn
                unelevated
                round
                icon="add"
                class="add-new-business"
                size="12px"
              >
                <q-tooltip> تمدید سرویس </q-tooltip>
              </q-btn>
            </div>
            <q-item-section>
              <q-item-label class="text-weight-bold text-body1"
                >تاریخچه پرداخت</q-item-label
              >
              <q-item-label class="q-pt-xs text-body2" caption>
                {{ businessTitle }}
              </q-item-label>
            </q-item-section>
            <div class="flex items-center q-mr-xs">
              <q-icon
                class="dark-3 cursor-pointer"
                size="sm"
                name="o_refresh"
                @click="reloadData"
              >
                <q-tooltip>{{ $t("page.buttons.guide-tooltip") }}</q-tooltip>
              </q-icon>
            </div>
            <div class="flex items-center q-gutter-x-md">
              <q-icon
                class="dark-3 cursor-pointer"
                size="sm"
                name="arrow_back"
                @click="$router.go(-1)"
              >
                <q-tooltip>بازگشت</q-tooltip>
              </q-icon>
            </div>
          </q-item>
        </template>

        <template #item="{ item }">
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
                <q-item clickable v-close-popup @click="goToPaymentDetail">
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
        </template>
      </data-view>
    </q-card>
  </q-page>
</template>

<script setup>
import DesktopViewGuide from "../../components/business/DesktopViewGuide.vue"
import DataView from "../../components/shared/DataView.vue"
import { fetchWrapper } from "../../helpers"
import { computed, onMounted, onBeforeUnmount, watch } from "vue"
import { ref } from "vue"
import { useQuasar } from "quasar"
import { useRoute, useRouter } from "vue-router"

const router = useRouter()
const route = useRouter()

// const $q = useQuasar()

// const rows = ref([])

// const showGuideDialog = ref(false)
// const loadingData = ref(false)
// const searchTerm = ref("")
// const defaultPageSize = 11
// const selectedCard = ref(false)
const businessId = ref("79f898ef-de59-4390-a7e9-f68880f2caa5")
const businessTitle = ref("دومان سامانه برای تست")
// const pagination = ref({
//   sortBy: "dateCreated",
//   descending: true,
//   currentPage: 1,
//   pageSize: defaultPageSize,
//   totalItems: 0
// })

// const showPagebar = computed(() => {
//   return pagination.value.totalItems > defaultPageSize
// })

// const showPaging = computed(() => {
//   return pagination.value.totalItems > pagination.value.pageSize
// })

// const showSearchbar = computed(() => {
//   return true
//   return pagination.value.totalItems > defaultPageSize || !isSearchEmpty.value
// })

// function clearSearch() {
//   searchTerm.value = ""
//   reloadData()
// }

// const isSearchEmpty = computed(
//   () => !searchTerm.value || searchTerm.value.trim().length === 0
// )

// const maxPage = computed(() =>
//   Math.ceil(pagination.value.totalItems / pagination.value.pageSize)
// )

// const pagedRows = computed(() => {
//   return rows.value
// })

// onMounted(() => {
//   reloadData()
// })

// async function reloadData() {
//   loadData(pagination.value)
// }

// async function loadData(data) {
//   loadingData.value = true
//   selectedCard.value = false

//   let filterExpression = []

//   if (searchTerm.value) {
//     filterExpression.push({
//       fieldName: "title",
//       operator: 3,
//       value: searchTerm.value
//     })
//   }

//   const response = await fetchWrapper
//     .post("business/getBusinessGridData", {
//       pageSize: data.pageSize,
//       sortColumn: data.sortBy,
//       sortOrder: data.descending ? 1 : 2,
//       currentPage: data.currentPage,
//       filterExpression: filterExpression
//     })
//     .then((response) => {
//       console.log(response.data)
//       handleResponse(response, data)
//     })
//     .finally(() => {
//       loadingData.value = false
//     })
// }

// function handleResponse(response, pagination) {
//   rows.value = response.data.items
//   // businessId.value = response.data.items.id
//   //pagination.value = response.data.page
//   pagination.totalItems = response.data.page.totalItems
//   pagination.pageSize = response.data.page.pageSize
//   pagination.currentPage = response.data.page.currentPage
//   pagination.sortBy = pagination.sortBy
//   pagination.descending = pagination.descending
// }

async function goToPaymentDetail() {
  router.push("/business/PaymentDetail")
}
</script>

<style lang="scss">
.q-card-desktop {
  width: 620px !important;
}

.business-name {
  max-width: 150px;
}
</style>
