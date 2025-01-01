<template>
  <div class="flex justify-end q-pb-xl q-px-xl">
    <div class="q-gutter-y-md" style="width: 280px">
      <div class="row q-mr-md">
        <div class="col">مبلغ</div>
        <div>
          {{ helper.formatNumber(formStore.totalNetPrice.value) }}
        </div>
      </div>

      <div class="row q-mr-md">
        <div class="col row q-gutter-sm items-center">
          <q-btn outline round icon="o_add" size="xs">
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
              v-model="discountVisible"
              class="border-radius-lg"
              anchor="bottom right"
              self="bottom left"
              :offset="[10, 8]"
            >
              <q-card class="bordered">
                <q-card-section class="q-pb-none">
                  <div
                    class="text-h6 no-letter-spacing text-weight-700"
                  >
                    تخفیف
                  </div>
                </q-card-section>
                <q-card-section>
                  <custom-input-number v-model="generalDiscountValue">
                    <template #append>
                      <q-btn
                        size="8px"
                        class="cursor-pointer"
                        :color="
                          $q.dark.isActive ? 'yellow' : 'primary'
                        "
                        round
                        outline
                        @click="toggleDiscountType"
                      >
                        <q-icon
                          size="14px"
                          :name="
                            discountIsCash
                              ? 'attach_money'
                              : 'o_percent'
                          "
                        />
                      </q-btn>
                    </template>
                  </custom-input-number>
                </q-card-section>

                <q-card-actions class="dark-1 q-px-md">
                  <q-btn
                    padding="4px 12px"
                    rounded
                    unelevated
                    class="primary-gradient text-white"
                    @click="confirmGeneralDiscount"
                  >
                    {{ $t("shared.labels.accept") }}
                  </q-btn>
                  <q-btn
                    padding="4px 12px"
                    rounded
                    unelevated
                    @click="discountVisible = false"
                  >
                    {{ $t("shared.labels.cancel") }}
                  </q-btn>
                </q-card-actions>
              </q-card>
            </q-menu>
          </q-btn>

          <span>تخفیف</span>
        </div>
        <div>
          <span class="text-red">
            ({{ helper.formatNumber(formStore.totalDiscount.value) }})
          </span>
        </div>
      </div>

      <div class="row q-mr-md">
        <div class="col row q-gutter-sm items-center">
          <q-btn outline round icon="o_add" size="xs">
            <q-tooltip
              anchor="center left"
              self="center right"
              :offset="[10, 10]"
              class="text-body2 q-px-sm custom-tooltip"
              :delay="600"
            >
              انتخاب مالیات بر ارزش افزوده
            </q-tooltip>

            <q-menu
              v-model="vatVisible"
              class="border-radius-lg"
              anchor="bottom right"
              self="bottom left"
              :offset="[10, 8]"
            >
              <q-card class="bordered">
                <q-card-section class="q-pb-none">
                  <div
                    class="text-h6 no-letter-spacing text-weight-700"
                  >
                    ارزش افزوده
                  </div>
                </q-card-section>
                <q-card-section>
                  <vat-lookup
                    v-model:selectedId="vatId"
                    v-model:selectedText="vatTitle"
                    :filterExpression="vatFilter"
                    @rowSelected="vatChanged($event)"
                  />
                </q-card-section>

                <q-card-actions class="dark-1 q-px-md">
                  <q-btn
                    padding="4px 12px"
                    rounded
                    unelevated
                    class="primary-gradient text-white"
                    @click="confirmVat"
                  >
                    {{ $t("shared.labels.accept") }}
                  </q-btn>
                  <q-btn
                    padding="4px 12px"
                    rounded
                    unelevated
                    @click="vatVisible = false"
                  >
                    {{ $t("shared.labels.cancel") }}
                  </q-btn>
                </q-card-actions>
              </q-card>
            </q-menu>
          </q-btn>

          <span>ارزش افزوده</span>
        </div>
        <div>
          <span>
            {{ helper.formatNumber(formStore.totalVat.value) }}
          </span>
        </div>
      </div>

      <q-separator />

      <div class="row q-mr-md">
        <div class="col text-bold">جمع کل</div>
        <div>
          <strong>
            {{ helper.formatNumber(formStore.totalPrice.value) }}
          </strong>
          <span class="text-caption q-px-xs">
            {{ formStore.model.value.currencyTitle }}
          </span>
        </div>
      </div>

      <q-separator color="primary" size="1.5px" />
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { helper } from "src/helpers";
  import {
    sqlOperator,
    vatType,
    invoiceFormType,
  } from "src/constants";

  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";
  import VatLookup from "src/components/shared/lookups/VatLookup.vue";

  const props = defineProps({
    formStore: Object,
    formType: invoiceFormType,
  });

  const discountIsCash = ref(true);
  const discountVisible = ref(false);
  const generalDiscountValue = ref(0);
  const toggleDiscountType = () => {
    discountIsCash.value = !discountIsCash.value;
  };

  const confirmGeneralDiscount = () => {
    if (discountIsCash.value)
      props.formStore.applyDiscountAmount(generalDiscountValue.value);
    else
      props.formStore.applyDiscountPercent(
        generalDiscountValue.value
      );
    discountVisible.value = false;
  };

  const vatId = ref(null);
  const vatTitle = ref(null);
  const selectedVat = ref(null);
  const vatVisible = ref(false);
  const confirmVat = () => {
    props.formStore.applyVat(selectedVat.value);
    vatVisible.value = false;
  };
  const vatChanged = (vat) => {
    selectedVat.value = vat;
  };

  const vatFilter =
    props.formType == invoiceFormType.sales
      ? [
          {
            fieldName: "isForSale",
            operator: sqlOperator.in,
            value: `${vatType.sale},${vatType.purchaseAndSale}`,
          },
        ]
      : [
          {
            fieldName: "isForSale",
            operator: sqlOperator.in,
            value: `${vatType.purchase},${vatType.purchaseAndSale}`,
          },
        ];
</script>
