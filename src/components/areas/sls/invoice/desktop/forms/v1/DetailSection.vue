<template>
  <div class="row q-gutter-x-md text-bold q-mb-sm">
    <div style="width: 25%">کالا/خدمت</div>
    <div style="width: 7%">تعداد/مقدار</div>
    <div style="width: 10%">واحد سنجش</div>
    <div style="width: 10%">مبلغ</div>
    <div style="width: 15%">مالیات بر ارزش افزوده</div>
    <div style="width: 10%">مبلغ مالیات</div>
    <div class="col row justify-end items-center q-gutter-x-xs">
      مبلغ کل
      <q-icon name="o_info" size="xs" color="primary" class="cursor-pointer">
        <q-tooltip
          :delay="600"
          class="custom-tooltip"
          anchor="top right"
          self="bottom middle"
          :offset="[50, 10]"
        >
          <span class="text-body2">
            مبلغ کل = (تعداد * مبلغ) - تخفیف + مالیات بر ارزش افزوده
          </span>
        </q-tooltip>
      </q-icon>
    </div>
    <div class="col-1 row justify-end"></div>
  </div>
  <q-separator class="q-mb-md" />
  <div class="column q-gutter-y-md">
    <template
      v-for="(row, index) in formStore.model.value.invoiceItems"
      :key="index"
    >
      <div class="row q-gutter-md">
        <div style="width: 25%">
          <product-lookup
            placeholder="انتخاب کالا/خدمت"
            v-model:selectedId="row.productId"
            v-model:selectedText="row.productTitle"
            :filterExpression="productFilter"
            @rowSelected="productChanged($event, row)"
          />
        </div>
        <div style="width: 7%">
          <custom-input-number v-model="row.quantity" placeholder="مقدار" />
        </div>
        <div style="width: 10%">
          <product-unit-lookup
            placeholder="واحد سنجش"
            v-model:selectedId="row.productUnitId"
            v-model:selectedText="row.productUnitTitle"
          />
        </div>
        <div style="width: 10%">
          <custom-input-number v-model="row.price" placeholder="مبلغ" />
        </div>
        <div style="width: 15%">
          <vat-lookup
            placeholder="مالیات بر ارزش افزوده"
            v-model:selectedId="row.vatId"
            v-model:selectedText="row.vatTitle"
            :filterExpression="vatFilter"
            @rowSelected="vatChanged($event, row)"
          />
        </div>
        <div style="width: 10%">
          <custom-input-number
            v-model="row.vatAmount"
            placeholder="مبلغ مالیات"
          />
        </div>
        <div class="col row items-center justify-end">
          {{ row.totalPrice?.toLocaleString() }}
        </div>
        <div class="col-1 row items-center justify-end q-gutter-x-sm">
          <q-btn
            color="primary"
            unelevated
            round
            class="text-on-dark"
            size="sm"
            icon="o_add"
            @click="formStore.addNewRow(index, row)"
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
              class="border-radius-xl"
              style="width: 150px"
            >
              <q-list dense padding>
                <q-item
                  clickable
                  v-close-popup
                  tabindex="0"
                  @click="row.showDetail = !row.showDetail"
                >
                  <div class="q-py-sm">
                    <q-item-section avatar>
                      <q-avatar class="bg-on-dark" size="sm"
                        ><q-icon name="o_percent" size="14px"
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
                  @click="formStore.deleteRow(index)"
                >
                  <div class="q-py-sm">
                    <q-item-section avatar>
                      <q-avatar class="bg-on-dark" size="sm">
                        <q-icon name="o_delete" size="14px" />
                      </q-avatar>
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
      <div v-if="row.showDetail" class="row q-gutter-md q-pt-md">
        <div style="width: 32%">
          <q-item-label caption class="q-mb-sm">شرح تکمیلی کالا</q-item-label>
          <custom-input v-model="row.comment" />
        </div>
        <div style="width: 20%">
          <q-item-label caption class="q-mb-sm">شرح تخفیف</q-item-label>
          <custom-input v-model="row.discountComment" />
        </div>
        <div style="width: 10%">
          <q-item-label caption class="q-mb-sm">تخفیف</q-item-label>
          <q-input dense outlined v-model="row.discount">
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
      </div>
    </template>
  </div>

  <q-separator class="q-mt-md" />

  <div class="clear-fix row q-my-xl">
    <div class="col-8"></div>
    <div class="col-3 q-gutter-y-md">
      <div class="row q-mr-md">
        <div class="col">مبلغ</div>
        <div>
          {{ formStore.totalNetPrice.value.toLocaleString() }}
          <span class="text-caption"> ریال</span>
        </div>
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
              class="border-radius-xl"
              anchor="bottom right"
              self="bottom left"
              :offset="[10, 8]"
            >
              <q-card>
                <q-card-section>
                  <custom-input-number
                    outlined
                    dense
                    v-model="generalDiscountValue"
                  >
                    <template #append>
                      <q-btn
                        size="xs"
                        :icon="discountVisible ? 'attach_money' : 'o_percent'"
                        class="cursor-pointer"
                        color="primary"
                        round
                        outline
                        @click="discountVisible = !discountVisible"
                      />
                    </template>
                  </custom-input-number>
                </q-card-section>

                <q-card-actions class="dark-1 q-px-md">
                  <q-btn
                    @click="confirmGeneralDiscount"
                    padding="4px 12px"
                    unelevated
                    class="bg-primary text-white"
                  >
                    تایید
                  </q-btn>
                  <q-btn padding="4px 12px" unelevated>انصراف</q-btn>
                </q-card-actions>
              </q-card>
            </q-menu>
          </q-btn>

          <span>تخفیف</span>
        </div>
        <div>
          <span class="text-red">
            ({{ formStore.totalDiscount.value.toLocaleString() }})
          </span>
          <span class="text-red text-caption"> ریال</span>
        </div>
      </div>

      <div class="row q-mr-md">
        <div class="col">ارزش افزوده</div>
        <div>
          {{ formStore.totalVat.value.toLocaleString() }}
          <span class="text-caption"> ریال</span>
        </div>
      </div>

      <q-separator />

      <div class="row q-mr-md">
        <div class="col text-bold">مبلغ کل</div>
        <div>
          <strong>{{ formStore.totalPrice.value.toLocaleString() }}</strong>
          <span class="text-caption"> ریال</span>
        </div>
      </div>

      <q-separator color="primary" size="1.5px" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

import { sqlOperator } from "src/constants";

import ProductLookup from "src/components/shared/lookups/ProductLookup.vue";
import ProductUnitLookup from "src/components/shared/lookups/ProductUnitLookup.vue";
import VatLookup from "src/components/shared/lookups/VatLookup.vue";
import CustomInput from "src/components/shared/forms/CustomInput.vue";
import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";

const props = defineProps({
  formStore: Object,
});

const vatFilter = [
  { fieldName: "isForSale", operator: sqlOperator.in, value: "1,2" },
];

const productFilter = [
  { fieldName: "isForSale", operator: sqlOperator.equal, value: "1" },
];

const discountIsCash = ref(true);
const discountVisible = ref(true);
const generalDiscountValue = ref(0);

const vatChanged = (vat, row) => {
  row.vatPercent = vat?.rate ?? 0;
};

const productChanged = (product, row) => {
  row.price = product?.price ?? 0;
  row.productUnitId = product?.productUnitId ?? null;
  row.productUnitTitle = product?.productUnitTitle ?? null;
};

const confirmGeneralDiscount = () => {
  if (discountIsCash.value)
    props.formStore.applyDiscountAmount(generalDiscountValue.value);
  else props.formStore.applyDiscountPercent(generalDiscountValue.value);
};
</script>
