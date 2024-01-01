<template>
  <div class="row q-gutter-md">
    <div style="width: 25%;">
      <div>
        <q-item-label
          caption
          class="q-mb-sm"
        >
          مشتری
        </q-item-label>
        <customer-lookup ref="customerLookup" />
      </div>
    </div>
    <div style="width: 25%;">
      <div>
        <q-item-label
          caption
          class="q-mb-sm"
        >بازایاب</q-item-label>
        <customer-lookup />
      </div>
    </div>

    <div style="width: 25%;">
      <div>
        <q-item-label
          caption
          class="q-mb-sm"
        >شماره فاکتور</q-item-label>
        <q-input
          type="number"
          outlined
          dense
          v-model="invoiceNoField"
          :disable="isInputDisabled"
          style="width:165px"
        >
          <template #append>
            <q-icon
              size="sm"
              :name="invoiceNo ? 'o_no_encryption' : 'o_lock'"
              class="cursor-pointer all-pointer-events"
              @click="toggleInvocieNo"
            />
          </template>
        </q-input>
      </div>
    </div>

    <div class="col row justify-end items-center">
      <q-btn
        unelevated
        round
        dense
        icon="o_expand_more"
        @click="showDetailSection"
      />
    </div>

  </div>
  <q-slide-transition>
    <div v-show="detailSection">

      <div class="row q-gutter-x-md q-mt-md">
        <div style="width: 25%;">
          <div>
            <q-item-label
              caption
              class="q-mb-sm"
            >قرارداد</q-item-label>
            <contract-lookup ref="contractLookup" />
          </div>
        </div>
        <div style="width: 25%;">
          <div>
            <q-item-label
              caption
              class="q-mb-sm"
            >نوع فروش</q-item-label>
            <sale-type-lookup />
          </div>
        </div>

        <div class="col">
          <div class="row q-gutter-md">
            <div>
              <q-item-label
                caption
                class="q-mb-sm"
              >تاریخ</q-item-label>
              <date-time
                v-model="date"
                style="width:165px"
              />
            </div>
            <div>
              <q-item-label
                caption
                class="q-mb-sm"
              >سررسید</q-item-label>
              <date-time
                v-model="dueDate"
                style="width:165px"
              />
            </div>
          </div>
        </div>

      </div>
    </div>

  </q-slide-transition>
</template>

<script setup>
import { computed, ref } from "vue"
import CustomerLookup from "src/components/shared/Lookups/CustomerLookup.vue"
import ContractLookup from "src/components/shared/Lookups/ContractLookup.vue"
import SaleTypeLookup from "src/components/shared/Lookups/SaleTypeLookup.vue"
import dateTime from "src/components/shared/Forms/DateTimePicker.vue"
import DetailSectionV2 from "./DetailSectionV2.vue"

const description = ref('')
const contractLookup = ref(null)
const invoiceNo = ref(false)
const invoiceNoField = ref('1')
const date = ref('')
const dueDate = ref('')
const customerLookup = ref(null)
const detailSection = ref(false)

const toggleInvocieNo = () => {
  invoiceNo.value = !invoiceNo.value;
}

const isInputDisabled = computed(() => !invoiceNo.value)

const showDetailSection = () => {
  detailSection.value = !detailSection.value
}
</script>

<style lang="scss" scoped>
.q-item__label--caption {
  font-size: 14px;
  letter-spacing: 0;
  color: #697588;
}
</style>
