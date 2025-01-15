<template>
  <q-card flat bordered class="form-container" style="margin: 15px 0">
    <q-card-section style="padding: 8px !important">
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
    </q-card-section>

    <q-separator size="1px" />

    <q-card-section>
      <div class="row q-col-gutter-md">
        <div class="col-md-4 col-sm-6 col-xs-12">
          <customer-lookup
            :autofocus="index === formStore.newAddedItemIndex.value"
            v-model:selectedId="wageItem.customerId"
            v-model:selectedText="wageItem.customerName"
            :filter-expression="personnelFilter"
            label="پرسنل"
            required
          />
        </div>
        <div class="col-md-2 col-sm-3 col-xs-12">
          <custom-select
            v-model="wageItem.insurranceTypeId"
            :options="
              helper.getEnumOptions(insurranceType, 'insurranceType')
            "
            label="نوع بیمه"
            required
          />
        </div>
        <div class="col-md-2 col-sm-3 col-xs-12">
          <custom-select
            v-model="wageItem.day"
            :options="days"
            label="روزهای کارکرد"
            required
          />
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12">
          <custom-input-number
            v-model="wageItem.salary"
            label="دستمزد روزانه"
            required
          />
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12">
          <custom-input-number
            v-model="wageItem.baseYear"
            label="مزد پایه سنوات روزانه"
            required
          />
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12">
          <custom-input-number
            v-model="wageItem.housing"
            label="حق مسکن"
          />
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12">
          <custom-input-number v-model="wageItem.food" label="بن" />
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12">
          <custom-input-number
            v-model="wageItem.spouse"
            label="حق تاهل"
          />
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12">
          <custom-input-number
            v-model="wageItem.child"
            label="حق اولاد"
          />
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12">
          <custom-input-number
            v-model="wageItem.mission"
            label="حق ماموریت"
          />
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12">
          <custom-input-number
            v-model="wageItem.overtime"
            label="اضافه کار"
          />
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12">
          <custom-input-number
            v-model="wageItem.addition"
            label="دیگر مزایا"
          />
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12">
          <custom-input-number
            v-model="wageItem.deduction"
            label="دیگر کسورات"
          />
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12">
          <custom-input-number
            v-model="wageItem.leave"
            label="بازخرید مرخصی"
          />
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12">
          <custom-input-number
            v-model="wageItem.reward"
            label="پاداش بهره‌وری"
          />
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12">
          <custom-input-number
            v-model="wageItem.bonus"
            label="عیدی و پاداش"
          />
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12">
          <custom-input-number
            v-model="wageItem.serviceBenefit"
            label="بازخرید سنوات"
          />
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12">
          <date-time-picker
            v-model="wageItem.dateEnter"
            label="تاریخ آغاز به کار"
          />
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12">
          <date-time-picker
            v-model="wageItem.dateExit"
            label="تاریخ ترک کار"
          />
        </div>
        <div class="col-md-8 col-sm-8 col-xs-12">
          <custom-input v-model="wageItem.comment" label="شرح" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { computed } from "vue";
  import { helper } from "src/helpers";
  import {
    customerType,
    sqlOperator,
    insurranceType,
  } from "src/constants";

  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
  import DateTimePicker from "src/components/shared/forms/DateTimePicker.vue";
  import CustomerLookup from "src/components/shared/lookups/CustomerLookup.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
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
