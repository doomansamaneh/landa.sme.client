<template>
  <div :class="$q.screen.gt.xs ? 'q-mt-lg' : ''">
    <q-card
      flat
      bordered
      class="form-container"
      style="margin-top: 0"
    >
      <div :class="$q.screen.gt.xs ? 'q-py-sm q-px-md' : 'q-pb-sm'">
        <div class="row items-center no-wrap">
          <div class="col">
            <div
              class="row items-center text-bold text-body1 no-letter-spacing"
            >
              <q-btn
                unelevated
                size="8px"
                class="bg-primary text-white q-mr-sm text-caption-sm no-pointer-events no-letter-spacing"
                round
              >
                <span class="text-body2 no-letter-spacing">
                  {{ index + 1 }}
                </span>
              </q-btn>
            </div>
          </div>

          <div class="q-gutter-sm col-auto">
            <q-btn
              size="11px"
              round
              flat
              @click="formStore.addRow(index, item)"
            >
              <q-icon size="22px" name="o_add" />
            </q-btn>

            <q-btn
              size="11px"
              round
              flat
              @click="formStore.deleteRow(index)"
            >
              <q-icon size="22px" name="o_delete" />
            </q-btn>
          </div>
        </div>
      </div>

      <q-separator
        size="0.5px"
        :class="{ 'q-mb-md': $q.screen.xs }"
      />

      <q-card-section>
        <div class="row q-col-gutter-sm">
          <div class="col-md-4 col-sm-12 col-xs-12">
            <q-item-label caption class="q-mb-sm">پرسنل</q-item-label>
            <customer-lookup
              v-model:selectedId="wageItem.customerId"
              v-model:selectedText="wageItem.customerName"
              :filter-expression="personnelFilter"
              hide-bottom-space
            />
          </div>
          <div class="col-md-2 col-sm-6 col-xs-12">
            <q-item-label caption class="q-mb-sm">
              نوع بیمه
            </q-item-label>
            <custom-select
              v-model="wageItem.insurranceTypeId"
              :options="
                helper.getEnumOptions(
                  insurranceType,
                  'insurranceType'
                )
              "
              hide-bottom-space
            />
          </div>
          <div class="col-md-2 col-sm-6 col-xs-12">
            <q-item-label caption class="q-mb-sm">
              روزهای کارکرد
            </q-item-label>
            <custom-select
              v-model="wageItem.day"
              :options="days"
              hide-bottom-space
            />
          </div>
          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item-label caption class="q-mb-sm">
              دستمزد روزانه
            </q-item-label>
            <custom-input-number
              v-model="wageItem.salary"
              hide-bottom-space
            />
          </div>
          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item-label caption class="q-mb-sm">
              حق مسکن
            </q-item-label>
            <custom-input-number
              v-model="wageItem.housing"
              hide-bottom-space
            />
          </div>
          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item-label caption class="q-mb-sm">بن</q-item-label>
            <custom-input-number
              v-model="wageItem.food"
              hide-bottom-space
            />
          </div>
          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item-label caption class="q-mb-sm">
              حق اولاد
            </q-item-label>
            <custom-input-number
              v-model="wageItem.child"
              hide-bottom-space
            />
          </div>
          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item-label caption class="q-mb-sm">
              حق ماموریت
            </q-item-label>
            <custom-input-number
              v-model="wageItem.mission"
              hide-bottom-space
            />
          </div>
          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item-label caption class="q-mb-sm">
              اضافه کار
            </q-item-label>
            <custom-input-number
              v-model="wageItem.overtime"
              hide-bottom-space
            />
          </div>
          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item-label caption class="q-mb-sm">
              دیگر مزایا
            </q-item-label>
            <custom-input-number
              v-model="wageItem.addition"
              hide-bottom-space
            />
          </div>
          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item-label caption class="q-mb-sm">
              دیگر کسورات
            </q-item-label>
            <custom-input-number
              v-model="wageItem.deduction"
              hide-bottom-space
            />
          </div>
          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item-label caption class="q-mb-sm">
              بازخرید مرخصی
            </q-item-label>
            <custom-input-number
              v-model="wageItem.leave"
              hide-bottom-space
            />
          </div>
          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item-label caption class="q-mb-sm">
              پاداش بهره‌وری
            </q-item-label>
            <custom-input-number
              v-model="wageItem.reward"
              hide-bottom-space
            />
          </div>
          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item-label caption class="q-mb-sm">
              عیدی و پاداش
            </q-item-label>
            <custom-input-number
              v-model="wageItem.bonus"
              hide-bottom-space
            />
          </div>
          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item-label caption class="q-mb-sm">
              بازخرید سنوات
            </q-item-label>
            <custom-input-number
              v-model="wageItem.serviceBenefit"
              hide-bottom-space
            />
          </div>
          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item-label caption class="q-mb-sm">
              تاریخ آغاز به کار
            </q-item-label>
            <date-time-picker
              v-model="wageItem.dateEnter"
              hide-bottom-space
            />
          </div>
          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item-label caption class="q-mb-sm">
              تاریخ ترک کار
            </q-item-label>
            <date-time-picker
              v-model="wageItem.dateExit"
              hide-bottom-space
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
  import { computed, ref } from "vue";
  import { helper } from "src/helpers";
  import {
    customerType,
    sqlOperator,
    insurranceType,
  } from "src/constants";

  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
  import DateTimePicker from "src/components/shared/forms/DateTimePicker.vue";
  import CustomerLookup from "src/components/shared/lookups/CustomerLookup.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";

  const props = defineProps({
    item: Object,
    index: Number,
    formStore: Object,
  });

  const personnelFilter = [
    {
      fieldName: "typeId",
      operator: sqlOperator.equal,
      value: customerType.personnel,
    },
  ];

  const days = computed(() =>
    Array.from({ length: 32 }, (_, i) => ({ label: i, value: i }))
  );

  const wageItem = computed(() => props.item);
</script>
