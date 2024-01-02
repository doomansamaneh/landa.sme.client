<template>
  <div class="column q-gutter-md">
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

    <div>
      <q-item-label
        caption
        class="q-mb-sm"
      >تاریخ</q-item-label>
      <date-time v-model="date" />
    </div>
    <div>
      <q-item-label
        caption
        class="q-mb-sm"
      >سررسید</q-item-label>
      <date-time v-model="dueDate" />
    </div>

    <div>
      <q-item-label
        caption
        class="q-mb-sm"
      >
        مشتری
      </q-item-label>
      <q-input
        outlined
        dense
      >
        <template #append>
          <q-icon
            name="o_expand_more"
            @click="goToCustomerLookup"
          />
        </template>
      </q-input>
    </div>
    <div>
      <q-item-label
        caption
        class="q-mb-sm"
      >بازایاب</q-item-label>
      <q-input
        outlined
        dense
      >
        <template #append>
          <q-icon
            name="o_expand_more"
            @click="goToCustomerLookup"
          />
        </template>
      </q-input>
    </div>
    <div>
      <q-item-label
        caption
        class="q-mb-sm"
      >قرارداد</q-item-label>
      <contract-lookup />
    </div>
    <div>
      <q-item-label
        caption
        class="q-mb-sm"
      >نوع فروش</q-item-label>
      <sale-type-lookup />
    </div>
    <div>
      <q-item-label
        caption
        class="q-mb-sm"
      >شرح</q-item-label>
      <q-input
        v-model="description"
        outlined
        type="textarea"
        autogrow
      />
    </div>
  </div>
  <!-- <div class="row justify-between">
    <div class="col-6">
      <div class="row q-gutter-md">
        <div class="col">
          <div class="q-gutter-md">
            <div>
              <q-item-label
                caption
                class="q-mb-sm"
              >
                مشتری
              </q-item-label>
              <customer-lookup ref="customerLookup" />
            </div>
            <div>
              <q-item-label
                caption
                class="q-mb-sm"
              >قرارداد</q-item-label>
              <contract-lookup />
            </div>
          </div>
        </div>
        <div class="col">
          <div class="q-gutter-md">
            <div>
              <q-item-label
                caption
                class="q-mb-sm"
              >بازایاب</q-item-label>
              <customer-lookup />
            </div>
            <div>
              <q-item-label
                caption
                class="q-mb-sm"
              >نوع فروش</q-item-label>
              <sale-type-lookup />
            </div>
          </div>
        </div>
      </div>
      <div class="q-mt-md">
        <q-item-label
          caption
          class="q-mb-sm"
        >شرح</q-item-label>
        <q-input
          v-model="description"
          outlined
          type="textarea"
          autogrow
        />
      </div>
    </div>
    <div class="col-2">
      <div class="column items-end q-gutter-md">
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
            style="width: 180px;"
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
        <div>
          <q-item-label
            caption
            class="q-mb-sm"
          >تاریخ</q-item-label>
          <date-time
            v-model="date"
            style="width:180px"
          />
        </div>
        <div>
          <q-item-label
            caption
            class="q-mb-sm"
          >سررسید</q-item-label>
          <date-time
            v-model="dueDate"
            style="width:180px"
          />
        </div>
      </div>
    </div>
  </div> -->
</template>

<script setup>
import { computed, ref } from "vue"
import CustomerLookup from "src/components/shared/Lookups/CustomerLookup.vue"
import ContractLookup from "src/components/shared/Lookups/ContractLookup.vue"
import SaleTypeLookup from "src/components/shared/Lookups/SaleTypeLookup.vue"
import dateTime from "src/components/shared/Forms/DateTimePicker.vue"
import { useRouter } from "vue-router"

const router = useRouter()
const description = ref('')
const invoiceNo = ref(false)
const invoiceNoField = ref('1')
const date = ref('')
const dueDate = ref('')
const customerLookup = ref(null)

const toggleInvocieNo = () => {
  invoiceNo.value = !invoiceNo.value;
}

const isInputDisabled = computed(() => !invoiceNo.value)

const goToCustomerLookup = () => {
  router.push("/sls/invoice/create/contactlookup")
}
</script>

<style lang="scss" scoped>.q-item__label--caption {
  font-size: 14px;
  letter-spacing: 0;
  color: #697588;
}</style>
