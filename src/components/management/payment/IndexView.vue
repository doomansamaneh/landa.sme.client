<template>
  <data-view class="card-desktop gt-xs no-shadow q-my-xl" ref="businessDataView"
    :dataSource="`business/getBusinessPaymentGridData/${$route.params.businessId}`" orderByField="fromDate"
    searchField="amount" @reload-data="reloadData">
    <template #header>
      <q-item class="card-header q-px-lg q-py-lg">
        <q-item-section>
          <q-item-label class="text-h6">{{
            $t("page.payment-history.payment-card-title")
          }}</q-item-label>
          <q-item-label class="dark-2 q-pt-xs text-subtitle2" caption>
            {{ $route.params.businessTitle }}
          </q-item-label>
        </q-item-section>
        <q-card-actions>
          <div class="flex items-center q-mr-xs">
            <q-icon class="icon-hover dark-3 cursor-pointer" size="xs" name="o_refresh" @click="reloadData">
              <q-tooltip class="custom-tooltip">{{
                $t("page.buttons.reload-data")
              }}</q-tooltip>
            </q-icon>
          </div>
          <div class="flex items-center q-gutter-x-md">
            <back-button />
            <renew-subscribtion class="bg-green text-white" size="12px" :businessId="$route.params.businessId"
              :businessTitle="$route.params.businessTitle" />
          </div>
        </q-card-actions>
      </q-item>
    </template>

    <template #item="{ item }">
      <div class="col-4">
        <div class="flex justify-start">
          <label class="text-caption"><q-icon class="expire-date-clock dark-2" name="history" size="xs" />
            {{ item.fromDateString }} -
            {{ item.toDateString }}
          </label>
        </div>
      </div>

      <div class="col-2 flex items-center justify-start">
        <label class="text-caption">
          {{ formatCurrency(item.amount) }}
          <span>ریال</span>
          <q-tooltip class="custom-tooltip" :delay="600">
            {{ $t("page.payment-history.amount-paid") }}</q-tooltip>
        </label>
      </div>
      <div class="col-1 row justify-center">
        <label class="text-caption text-light-blue-7 q-pr-sm">{{
          planTitle
        }}</label>
      </div>
      <div class="expire-date-container col-3 flex items-center justify-center q-gutter-x-xl">
        <label v-if="item.statusTitle == 'Enum_BusinessPaymentStatus_Trial'" class="text-caption">
          <q-icon name="circle" color="orange" size="8px" />
          {{ $t("page.payment-history.trial") }}
        </label>
        <label v-else class="text-caption">
          <q-icon name="circle" color="positive" size="8px" />
          {{ $t("page.payment-history.paid") }}
        </label>
      </div>
      <div class="more-options col-1 q-pl-md">
        <q-btn class="more-icon dark-2" unelevated falt round icon="more_horiz" size="md" dense>
          <q-tooltip class="custom-tooltip" :delay="600">{{
            $t("page.buttons.more-tooltip")
          }}</q-tooltip>
        </q-btn>
        <q-menu transition-show="jump-down" transition-hide="jump-up">
          <q-list padding>
            <q-item clickable v-close-popup @click="goToPaymentDetail">
              <q-item-section>
                <div class="flex items-center q-gutter-x-sm">
                  <q-avatar icon="o_visibility" size="sm" class="dark-1" />
                  <div class="text-caption">
                    {{ $t("page.payment-history.buttons.view") }}
                  </div>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </div>
    </template>
  </data-view>
</template>

<script setup>
  import { computed, onMounted, onBeforeUnmount, watch } from "vue"
  import { ref } from "vue"
  import { useQuasar } from "quasar"
  import { useRoute, useRouter } from "vue-router"
  import { fetchWrapper } from "src/helpers"

  import DataView from "src/components/shared/DataView.vue"
  import RenewSubscribtion from "src/components/management/shared/RenewSubscribtion.vue"
  import BackButton from "src/components/shared/buttons/BackButton.vue"

  const router = useRouter()
  const route = useRouter()

  const planTitle = "طرح 3"
  const businessDataView = ref(null)

  async function goToPaymentDetail(item) {
    router.push(`/business/PaymentDetail/${item.id}`)
  }

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

  defineExpose({
    formatCurrency
  })

  async function reloadData() {
    businessDataView.value.reloadData()
  }
</script>

<style lang="scss" scoped>
  .card-desktop {
    width: 620px !important;
  }
</style>