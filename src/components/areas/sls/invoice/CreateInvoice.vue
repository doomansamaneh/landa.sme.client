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
  <q-card
    class="bordered q-pa-md"
    style="margin-top: 40px;"
  >
    <q-card-section>
      <div class="row justify-between q-mb-xl">
        <div class="col-6">
          <div class="row q-gutter-md">
            <div class="col">
              <div class="q-gutter-md">
                <div>
                  <!-- <h4>{{ customerLookup?.lookup.selectedId }}</h4>
                  <pre>{{ customerLookup?.lookup.tableStore.activeRow.value }}</pre> -->
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
              <q-item-label
                caption
                class="q-mb-sm"
              >شماره فاکتور</q-item-label>
              <q-input
                dense
                v-model="invoiceNoField"
                outlined
                :disable="isInputDisabled"
                style="width: 120px;"
              >
                <template #after>
                  <q-icon
                    size="sm"
                    :name="invoiceNo ? 'o_no_encryption' : 'o_lock'"
                    class="cursor-pointer"
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
          </div>
        </div>
      </div>
      <div class="row q-gutter-x-md text-bold q-mb-sm">
        <div style="width: 25% ;">کالا/خدمت</div>
        <div style="width: 7%;">تعداد/مقدار</div>
        <div style="width: 12%;">واحد سنجش</div>
        <div style="width: 10%;">مبلغ</div>
        <div style="width: 17%;">مالیات بر ارزش افزوده</div>
        <div class="col row justify-end">مبلغ کل</div>
        <div class="col-1 row justify-end"></div>
      </div>
      <q-separator />
      <div>

        <div class="row q-gutter-x-md q-py-md">

          <div style="width: 25%;">
            <product-lookup placeholder="انتخاب کالا/خدمت" />
          </div>
          <div style="width: 7%;">
            <q-input
              dense
              outlined
              v-model="quantity"
            />
          </div>
          <div style="width: 12%;">
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

          <div class="col row items-center justify-end">
            <div>{{ totalAmount }} <span class="text-caption"> ریال</span></div>
          </div>
          <div class="col-1 row items-center justify-end q-gutter-sm">
            <q-btn
              color="primary"
              unelevated
              round
              class="text-on-dark"
              size="sm"
              icon="o_add"
              @click="addRow"
            />
            <q-btn
              unelevated
              round
              class="text-on-dark"
              size="sm"
              icon="o_more_horiz"
            >
              <q-menu
                :offset="[0, 20]"
                fit
                style="width: 150px;"
              >
                <q-list
                  dense
                  padding
                >
                  <q-item
                    clickable
                    v-close-popup
                    tabindex="0"
                    @click="showMoreDetail = !showMoreDetail"
                  >
                    <div class="q-py-sm">
                      <q-item-section avatar>
                        <q-avatar
                          class="dark-icon"
                          size="sm"
                        ><q-icon
                            name="o_percent"
                            size="14px"
                          /></q-avatar>
                      </q-item-section>
                    </div>
                    <q-item-section>
                      <div>تخفیف</div>
                    </q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    v-close-popup
                    tabindex="0"
                  >
                    <div class="q-py-sm">
                      <q-item-section avatar>
                        <q-avatar
                          class="dark-icon"
                          size="sm"
                        ><q-icon
                            name="o_delete"
                            size="14px"
                          /></q-avatar>
                      </q-item-section>
                    </div>
                    <q-item-section>
                      <div>حذف</div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
        <div
          v-if="showMoreDetail"
          class="row q-gutter-x-md"
        >

          <div style="width: 25%;">
            <q-item-label
              caption
              class="q-mb-sm"
            >شرح تکمیلی کالا</q-item-label>
            <q-input
              v-model="text"
              outlined
              type="textarea"
              autogrow
            />
          </div>

          <div style="width: 7%;">

          </div>

          <div style="width: 12%;">

          </div>

          <div style="width: 10%;">
            <q-item-label
              caption
              class="q-mb-sm"
            >تخفیف</q-item-label>
            <q-input
              dense
              outlined
              v-model="amount"
            >
              <template v-slot:append>
                <q-btn
                  size="xs"
                  :icon="discountIsCash ? 'attach_money' : 'o_percent'"
                  class="cursor-pointer"
                  color="primary"
                  round
                  outline
                  @click="discountIsCash = !discountIsCash"
                />
              </template>
            </q-input>
          </div>

          <div style="width: 17%;">
            <q-item-label
              caption
              class="q-mb-sm"
            >مبلغ ارزش افزوده</q-item-label>
            <q-input
              dense
              outlined
              v-model="amount"
            >
              <template v-slot:append>
                <q-btn
                  size="xs"
                  :icon="vatIsCash ? 'attach_money' : 'o_percent'"
                  class="cursor-pointer"
                  color="primary"
                  round
                  outline
                  @click="vatIsCash = !vatIsCash"
                />
              </template>
            </q-input>
          </div>

        </div>

      </div>

      <div class="clear-fix row q-my-xl">

        <div class="col-8"></div>
        <div class="col-3 q-gutter-y-md">
          <div class="row q-mr-md">
            <div class="col">مبلغ</div>
            <div>0 <span class="text-caption"> ریال</span></div>
          </div>

          <div class="row q-mr-md">
            <div class="col row q-gutter-sm items-center">
              <q-btn
                outline
                round
                icon="o_add"
                size="xs"
                @click="generalDiscount = true"
              >
                <q-tooltip
                  anchor="center left"
                  self="center right"
                  :offset="[10, 10]"
                  class="text-body2 q-px-sm custom-tooltip"
                  :delay="600"
                >
                  ایجاد تخفیف
                </q-tooltip>

                <q-menu
                  anchor="bottom right"
                  self="bottom left"
                  :offset="[10, 8]"
                >
                  <q-input
                    outlined
                    dense
                    v-model="generalDiscountValue"
                    v-if="generalDiscount"
                  >

                  <template #append>
                    <q-btn
                  size="xs"
                  :icon="generalDiscountIsCash ? 'attach_money' : 'o_percent'"
                  class="cursor-pointer"
                  color="primary"
                  round
                  outline
                  @click="generalDiscountIsCash = !generalDiscountIsCash"
                />
                  </template>

                  </q-input>
                </q-menu>

              </q-btn>

              <span>تخفیف</span>

            </div>
            <div>0 <span class="text-caption"> ریال</span></div>
          </div>

          <div class="row q-mr-md">
            <div class="col">ارزش افزوده</div>
            <div>0 <span class="text-caption"> ریال</span></div>
          </div>

          <q-separator />

          <div class="row q-mr-md">
            <div class="col text-bold">مبلغ کل</div>
            <div>6,914,000,000 <span class="text-caption"> ریال</span></div>
          </div>

          <q-separator color="primary" />

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
const invoiceNoField = ref('1')
const date = ref('')
const dueDate = ref('')
const discountIsCash = ref(true)
const generalDiscountIsCash = ref(true)
const vatIsCash = ref(true)
const quantity = ref(1)
const amount = ref()
const totalAmount = ref(691400000)
const customerLookup = ref(null)
const showMoreDetail = ref(false)
const generalDiscount = ref(false)
const generalDiscountValue = ref()

const toggleInvocieNo = () => {
  invoiceNo.value = !invoiceNo.value;
}

const isInputDisabled = computed(() => !invoiceNo.value)


</script>

<style lang="scss" scoped>
.q-item__label--caption {
  font-size: 14px;
  letter-spacing: 0;
  color: #697588;
}
</style>
