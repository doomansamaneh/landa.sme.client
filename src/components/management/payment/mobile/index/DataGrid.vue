<template>
  <data-grid
    ref="businessDataView"
    :data-source="`business/getBusinessPaymentGridData/${businessId}`"
    create-url="/business/addBusiness"
    :grid-store="gridStore"
    class="q-my-xl"
  >
    <template #title>
      <div class="text-center line-height-sm text-body2 no-letter-spacing q-my-lg">
        {{ business?.title }}
      </div>
    </template>

    <template #body="{ item }">
      <q-card class="bordered row bg-dark rounded-borders q-pa-md">
        <div class="col-6">
          <div class="row">
            <div class="col-4">
              <q-avatar
                size="36px"
                class="bg-on-dark"
              >
                <q-icon
                  name="o_history"
                  size="20px"
                />
              </q-avatar>
            </div>
            <div class="col">
              <div class="column q-gutter-xs">
                <div>
                  <q-item-label caption>
                    {{ item.fromDateString }}
                  </q-item-label>
                </div>
                <div>
                  <q-item-label caption>
                    {{ item.toDateString }}
                  </q-item-label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="column q-gutter-xs">
            <q-item-label caption>
              {{ item.amount.toLocaleString() }}
              <span>{{ $t("page.payment-history.rial") }}</span>
              <q-tooltip
                class="custom-tooltip"
                :delay="600"
              >
                {{ $t("page.payment-history.amount-paid") }}</q-tooltip>
            </q-item-label>

            <div>
              <q-item-label
                caption
                v-if="item.statusTitle === 'Enum_BusinessPaymentStatus_Payed'"
              >
                <q-icon
                  name="circle"
                  color="positive"
                  size="8px"
                />
                {{ $t("page.payment-history.paid") }}
              </q-item-label>
              <q-item-label
                caption
                v-else
              >
                <q-icon
                  name="circle"
                  color="orange"
                  size="8px"
                />
                {{ $t("page.payment-history.trial") }}
              </q-item-label>
            </div>
          </div>
        </div>

        <div class="col-1">
          <div class="row justify-end q-gutter-xs">
            <q-btn
              size="13px"
              unelevated
              round
              dense
              icon="o_more_vert"
              @click="onBottomSheetShow(item)"
            />
          </div>
        </div>
      </q-card>
    </template>

    <template #create-label>
      <q-btn
        round
        unelevated
        @click="$router.push(`/business`)"
        dense
        size="20px"
        color="primary"
        class="primary-shadow"
      >
        <q-icon
          name="o_business"
          size="sm"
        />
      </q-btn>
    </template>
  </data-grid>

  <bottom-sheet
    v-if="bottomSheetStatus"
    :status="bottomSheetStatus"
    @hide="onBottomSheetHide"
  >

    <template #body>
      <q-list padding>

        <q-item
          clickable
          v-ripple
          :to="`/business/paymentDetail/${selectedRow.id}`"
        >
          <q-item-section avatar>
            <q-avatar
              class="bg-on-dark text-on-dark"
              size="36px"
            >
              <q-icon
                size="xs"
                name="o_visibility"
              />
            </q-avatar>
          </q-item-section>

          <q-item-section class="text-body2 no-letter-spacing"> {{ $t("page.payment-history.buttons.view") }}
          </q-item-section>
        </q-item>

      </q-list>
    </template>

  </bottom-sheet>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { fetchWrapper } from "src/helpers"

import DataGrid from "src/components/shared/dataTables/mobile/DataGrid.vue"
import BottomSheet from "src/components/shared/BottomSheet.vue"

const route = useRoute()

const props = defineProps({
  gridStore: Object
})

const business = ref(null)

async function loadData() {
  await fetchWrapper
    .get(`business/GetBusiness/${route.params.businessId}`)
    .then((response) => {
      business.value = response.data.data
    })
}

const businessId = computed(() => route.params.businessId)

const bottomSheetStatus = ref(false)
const selectedRow = ref(null)

const onBottomSheetShow = (item) => {
  selectedRow.value = item;
  bottomSheetStatus.value = true;
}

const onBottomSheetHide = () => {
  bottomSheetStatus.value = false;
}

onMounted(() => {
  loadData()
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
