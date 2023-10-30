<template>
  <tool-bar>
    <template #header>
      <q-badge
        v-if="tableStore?.pagination.value.totalItems > 0"
        rounded
        outline
        :label="tableStore?.pagination.value.totalItems"
        class="q-mr-sm bg-dark text-on-dark text-body2"
      />
      <span class="text-h6">ایجاد فاکتور فروش</span>
    </template>
    <template #buttons>
      <q-btn
        class="bg-primary text-white text-caption"
        padding="6px 12px"
        rounded
        no-caps
        unelevated
      >
        <q-icon
          name="o_add"
          class="q-mr-xs"
        />
        {{ $t("shared.labels.save") }}
      </q-btn>
      <q-btn
        class="bordered-btn_bg-dark text-caption"
        rounded
        unelevated
      >
        <q-icon
          name="more_horiz"
          class="q-mr-xs"
        />
        {{ $t("shared.labels.more") }}
      </q-btn>
    </template>
  </tool-bar>
  <q-card class="bordered q-pa-md q-mt-md">
    <q-card-section>
      <div class="row justify-between q-mb-xl">
        <div class="col-6">
          <div class="row q-gutter-md">
            <div class="col">
              <div class="q-gutter-md">
                <div>
                  <h4>{{ customerLookup?.lookup.selectedId }}</h4>
                  <pre>{{ customerLookup?.lookup.tableStore.activeRow.value }}</pre>
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
              v-model="text"
              outlined
              type="textarea"
              autogrow
            />
          </div>
        </div>
        <div class="col-2">
          <div class="row justify-end q-gutter-md">
            <div>
              <div class="row items-center q-mb-sm">
                <q-item-label caption>شماره فاکتور</q-item-label>
                <q-toggle
                  v-model="invoiceNo"
                  checked-icon="check"
                  color="green"
                  size="sm"
                  unchecked-icon="clear"
                />
              </div>
              <q-input
                dense
                style="width:195px"
                v-model="invoiceNoField"
                outlined
                :disable="!invoiceNo"
              />
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
          </div>
        </div>
      </div>
      <div class="row q-gutter-x-md text-bold q-mb-sm">
        <div style="width: 20% ;">کالا/خدمت</div>
        <div style="width: 7%;">تعداد/مقدار</div>
        <div style="width: 10%;">واحد سنجش</div>
        <div style="width: 10%;">مبلغ</div>
        <div style="width: 17%;">مالیات بر ارزش افزوده</div>
        <div style="width: 10%;">ارزش افزوده</div>
        <div class="col row justify-end">مبلغ کل</div>
        <div class="col-1 row justify-end"></div>
      </div>
      <q-separator />
      <div class="row q-gutter-x-md q-py-sm q-my-md">

        <div style="width: 20%;">
          <product-lookup placeholder="انتخاب کالا/خدمت" />
        </div>
        <div style="width: 7%;">
          <q-input
            dense
            outlined
            v-model="quantity"
          />
        </div>
        <div style="width: 10%;">
          <product-unit-lookup paceholder="واحد سنجش" />
        </div>
        <div style="width: 10%;">
          <q-input
            dense
            outlined
            v-model="amount"
          />
        </div>
        <div style="width: 17%;">
          <vat-lookup placeholder="مالیات بر ارزش افزوده" />
        </div>
        <div style="width: 10%">
          <q-input
            dense
            outlined
            v-model="amount"
          />
        </div>
        <div class="col row items-center justify-end">
          <span>{{ totalAmount }} ریال</span>
        </div>
        <div class="col-1 row items-center justify-end">
          <q-btn
            unelevated
            round
            class="text-on-dark"
            size="sm"
            icon="o_percent"
          />
          <q-btn
            unelevated
            round
            class="text-on-dark"
            size="sm"
            icon="o_delete"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { computed, ref } from "vue"
import ToolBar from "src/components/shared/ToolBar.vue"
import CustomerLookup from "src/components/shared/Lookups/CustomerLookup.vue"
import ContractLookup from "src/components/shared/Lookups/ContractLookup.vue"
import ProductLookup from "src/components/shared/Lookups/ProductLookup.vue"
import ProductUnitLookup from "src/components/shared/Lookups/ProductUnitLookup.vue"
import SaleTypeLookup from "src/components/shared/Lookups/SaleTypeLookup.vue"
import VatLookup from "src/components/shared/Lookups/VatLookup.vue"
import dateTime from "src/components/shared/Forms/DateTimePicker.vue"

const invoiceNo = ref(false)
const invoiceNoField = ref('')
const date = ref('')
const dueDate = ref('')
const quantity = ref(1)
const amount = ref()
const totalAmount = ref(69140000)

const customerLookup = ref(null)

</script>

<style lang="scss" scoped>
.q-item__label--caption {
  font-size: 14px;
  letter-spacing: 0;
  color: #697588;
}
</style>
