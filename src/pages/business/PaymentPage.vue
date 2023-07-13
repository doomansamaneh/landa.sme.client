<template>
  <q-card class="q-card-desktop gt-xs no-shadow q-my-xl">
    <data-view
      :dataSource="`business/getBusinessPaymentGridData/${$route.params.businessId}`"
      orderByField="fromDate"
      searchField="amount"
      @page-changed="loadData"
    >
      <template #header>
        <q-item class="card-header q-px-lg q-py-lg">
          <div class="page-title"></div>
          <q-item-section>
            <q-item-label class="text-bold text-subtitle1"
              >تاریخچه پرداخت</q-item-label
            >
            <q-item-label class="q-pt-xs text-subtitle2" caption>
              {{ $route.params.businessTitle }}
            </q-item-label>
          </q-item-section>
          <div class="flex items-center q-mr-xs">
            <q-icon
              class="dark-3 cursor-pointer"
              size="xs"
              name="o_refresh"
              @click="$emit('reload-data')"
            >
              <q-tooltip>{{ $t("page.buttons.guide-tooltip") }}</q-tooltip>
            </q-icon>
          </div>
          <div class="flex items-center q-gutter-x-md">
            <q-icon
              class="dark-3 cursor-pointer"
              size="xs"
              name="arrow_back"
              @click="$router.go(-1)"
            >
              <q-tooltip>بازگشت</q-tooltip>
            </q-icon>
            <q-btn
              rounded
              class="service-extension text-caption q-px-md q-py-sm"
              outline
            >
              <q-icon name="add" class="q-pr-xs" size="xs" />
              <span class="text-caption">{{
                $t("page.buttons.service-extension-tooltip")
              }}</span>
              <q-tooltip>{{
                $t("page.buttons.service-extension-tooltip")
              }}</q-tooltip>
            </q-btn>
          </div>
        </q-item>
      </template>

      <template #item="{ item }">
        <div class="col-4">
          <div class="flex justify-start">
            <label class="text-caption"
              ><q-icon
                class="expire-date-clock dark-2"
                name="history"
                size="xs"
              />
              {{ toPersianDigits(item.fromDateString) }} -
              {{ toPersianDigits(item.toDateString) }}
            </label>
          </div>
        </div>

        <div class="col-2 flex items-center">
          <label class="text-caption">
            {{ formatCurrency(item.amount) }}
            <span>ریال</span>
            <q-tooltip>مبلغ پرداختی</q-tooltip>
          </label>
        </div>
        <div class="col-1">
          <label class="text-caption text-primary">{{ planTitle }}</label>
        </div>
        <div
          class="expire-date-container col-3 flex items-center justify-center q-gutter-x-xl"
        >
          <label
            v-if="item.statusTitle == 'Enum_BusinessPaymentStatus_Trial'"
            class="text-caption"
          >
            <q-icon name="circle" color="orange" size="8px" /> دوره آزمایشی
          </label>
          <label v-else class="text-caption">
            <q-icon name="circle" color="positive" size="8px" /> پرداخت شده
          </label>
        </div>
        <div class="more-options col-1 q-pl-md">
          <q-btn
            class="more-icon dark-2"
            unelevated
            falt
            round
            icon="more_horiz"
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

const planTitle = "طرح 3"

async function goToPaymentDetail() {
  router.push("/business/PaymentDetail")
}

const formatCurrency = (value) => {
  return value.toLocaleString("fa-IR", {
    // style: "currency",
    currency: "IRR",
    minimumFractionDigits: 0
  })
}

function toPersianDigits(number) {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹"
  return number.toString().replace(/\d/g, (digit) => persianDigits[digit])
}
</script>

<style lang="scss">
.q-card-desktop {
  width: 620px !important;
}

.business-name {
  max-width: 150px;
}

// .amount {
//   width: 85px;
// }
</style>
