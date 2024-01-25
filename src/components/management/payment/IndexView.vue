<template>
  <data-view
    class="card-desktop gt-xs no-shadow q-my-xl"
    ref="paymentGrid"
    :dataSource="paymentDataSource"
    :columns="columns"
    sort-column="fromDate"
    searchField="amount"
  >
    <template #header>
      <q-item class="card-header q-px-lg q-py-lg">
        <q-item-section>
          <q-item-label class="text-h6">
            {{ $t("pages.payments") }}
          </q-item-label>
          <q-item-label caption>
            {{ business?.title }}
          </q-item-label>
        </q-item-section>
        <q-card-actions>
          <div class="flex items-center q-mx-xs">
            <q-btn
              round
              unelevated
              class="text-on-dark"
              dense
              icon="o_refresh"
              @click="refreshPayments"
            >
              <q-tooltip class="custom-tooltip">
                {{ $t("page.buttons.reload-data") }}
              </q-tooltip>
            </q-btn>
          </div>
          <div class="flex items-center q-gutter-x-md">
            <back-button />
            <renew-subscribtion
              class="bg-green text-white"
              size="12px"
              :business="business"
            />
          </div>
        </q-card-actions>
      </q-item>
    </template>

    <template #item="{ item }">
      <div class="col-5">
        <div class="flex justify-start">
          <q-item-label
            caption
            class="text-on-dark"
          >
            <q-icon
              class="expire-date-clock"
              name="history"
              size="xs"
            />
            {{ item.fromDateString }} -
            {{ item.toDateString }}
          </q-item-label>
        </div>
      </div>

      <div class="col-2 flex items-center justify-start">
        <q-item-label caption>
          {{ formatCurrency(item.amount) }}
          <span>{{ $t("page.payment-history.rial") }}</span>
          <q-tooltip
            class="custom-tooltip"
            :delay="600"
          >
            {{ $t("page.payment-history.amount-paid") }}</q-tooltip>
        </q-item-label>
      </div>
      <div class="expire-date-container col-3 flex items-center justify-start">
        <q-item-label
          caption
          v-if="item.statusTitle == 'Enum_BusinessPaymentStatus_Trial'"
        >
          <q-icon
            name="circle"
            color="orange"
            size="8px"
          />
          {{ $t("page.payment-history.trial") }}
        </q-item-label>
        <q-item-label
          caption
          v-else
        >
          <q-icon
            name="circle"
            color="positive"
            size="8px"
          />
          {{ $t("page.payment-history.paid") }}
        </q-item-label>
      </div>
      <div class="more-options col-1 q-pl-md">
        <q-btn
          class="more-icon text-on-dark"
          unelevated
          falt
          round
          icon="more_horiz"
          size="md"
          dense
        >
          <q-tooltip
            class="custom-tooltip"
            :delay="600"
          >
            {{ $t("page.buttons.more-tooltip") }}
          </q-tooltip>
        </q-btn>
        <q-menu
          transition-show="jump-down"
          transition-hide="jump-up"
        >
          <q-list padding>
            <q-item
              clickable
              v-close-popup
            >
              <q-item-section>
                <router-link :to="getDetailUrl(item)">
                  <div class="flex items-center q-gutter-x-sm">
                    <q-avatar
                      icon="o_visibility"
                      size="md"
                    />
                    <div class="text-body2">
                      {{ $t("page.payment-history.buttons.view") }}
                    </div>
                  </div>
                </router-link>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </div>
    </template>
  </data-view>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { useRoute } from "vue-router"
import { fetchWrapper } from "src/helpers"
import DataView from "src/components/shared/DataTables/DataView.vue"
import BackButton from "src/components/shared/Buttons/GoBackLink.vue"
import RenewSubscribtion from "src/components/management/shared/RenewSubscribtionLink.vue"

const route = useRoute()

const business = ref(null)
const paymentGrid = ref(null)

const columns = ref([
  {
    name: "amount",
    field: "amount",
  },
  {
    name: "businessTitle",
    field: "businessTitle",
  },
  {
    name: "fromDate",
    field: "fromDate",
  },
  {
    name: "toDate",
    field: "toDate",
  }
])

//todo: remove this code from here to somewhere more general
const formatCurrency = (value) => {
  const language = localStorage.getItem("selectedLanguage")
  if (language === "fa-IR") {
    return value.toLocaleString("fa-IR", {
      minimumFractionDigits: 0
    })
  } else {
    return value.toLocaleString()
  }
}

async function loadData() {
  await fetchWrapper
    .get(`business/GetBusiness/${route.params.businessId}`)
    .then((response) => {
      business.value = response.data.data
    })
}

async function refreshPayments() {
  paymentGrid.value.reloadData()
}

function getDetailUrl(item) {
  return `/business/PaymentDetail/${item.id}`
}

onMounted(() => {
  loadData()
})

const paymentDataSource = computed(
  () => `business/getBusinessPaymentGridData/${route.params.businessId}`
)

defineExpose({
  formatCurrency
})
</script>

<style lang="scss" scoped>
.card-desktop {
  width: 620px !important;
}

.q-item__label--caption {
  font-size: 14px;
  letter-spacing: 0;
  color: #2d2d2d;
}

a {
  text-decoration: none;
  color: inherit;
}</style>
