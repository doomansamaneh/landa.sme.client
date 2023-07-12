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
          <div class="service-extension-btn q-mr-md">
            <q-btn
              unelevated
              round
              icon="add"
              size="12px"
              class="add-new-business q-py-sm"
            >
              <q-tooltip> تمدید سرویس </q-tooltip>
            </q-btn>
          </div>
          <q-item-section>
            <q-item-label class="text-bold text-subtitle1"
              >تاریخچه پرداخت</q-item-label
            >
            <q-item-label class="q-pt-xs text-subtitle2" caption>
              {{ $route.params.businessTitle }}
            </q-item-label>
          </q-item-section>
          <div class="flex items-center q-mr-xs">
            <q-icon class="dark-3 cursor-pointer" size="sm" name="o_refresh">
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
        <div class="col-5">
          <div class="flex justify-start">
            <label class=""
              ><q-icon
                class="expire-date-clock dark-2"
                name="history"
                size="md"
              />
              {{
                "از: " + item.fromDateString + " " + "تا: " + item.toDateString
              }}
            </label>
          </div>
        </div>

        <div class="col-2 flex items-center">
          <label class=""
            ><q-icon
              class="expire-date-clock dark-2"
              name="attach_money"
              size="xs"
            />
            {{ item.amount.toLocaleString() }}
            <q-tooltip>مبلغ پرداختی</q-tooltip>
          </label>
        </div>
        <div class="">
          <q-badge
            color="warning"
            text-color="white"
            label="طرح 3"
            class="q-py-xs q-px-sm"
          />
        </div>
        <div
          class="expire-date-container col-2 flex items-center justify-center q-gutter-x-xl"
        >
          <q-badge
            v-if="item.statusTitle == 'Enum_BusinessPaymentStatus_Trial'"
            color="orange"
            text-color="white"
            label="دوره آزمایشی"
            class="q-py-xs q-px-sm"
          />
          <q-badge
            v-else
            color="positive"
            text-color="white"
            label="پرداخت شده"
            class="q-py-xs q-px-sm"
          />
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

async function goToPaymentDetail() {
  router.push("/business/PaymentDetail")
}

const amountString = computed(() => {
  return item.amount.toLocaleString({ minimumFractionDigits: 2 })
})
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
