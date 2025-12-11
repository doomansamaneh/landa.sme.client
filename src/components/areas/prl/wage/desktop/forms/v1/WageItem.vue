<template>
  <q-card flat bordered class="form-container" style="margin: 15px 0">
    <q-card-section style="padding: 8px !important">
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="row items-center text-bold text-body1">
            <q-btn
              no-caps
              unelevated
              size="8px"
              class="bg-primary text-white q-mr-sm text-caption-sm no-pointer-events"
              round
            >
              <span class="text-body2">
                {{ index + 1 }}
              </span>
            </q-btn>
          </div>
        </div>

        <div class="q-gutter-sm col-auto">
          <q-btn
            no-caps
            size="11px"
            round
            flat
            @click="formStore.addRow(index, item)"
          >
            <q-icon size="22px" name="o_add" />
          </q-btn>

          <q-btn
            no-caps
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
            :label="$t('shared.columns.personnel')"
            required
          />
        </div>
        <div class="col-md-2 col-sm-3 col-xs-12">
          <custom-select
            v-model="wageItem.insurranceTypeId"
            :options="
              helper.getEnumOptions(insuranceType, 'insuranceType')
            "
            :label="$t('shared.columns.insurranceEmp')"
            required
          />
        </div>
        <div class="col-md-2 col-sm-3 col-xs-12">
          <custom-select
            v-model="wageItem.day"
            :options="days"
            :label="$t('shared.columns.day')"
          />
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12">
          <custom-input-number
            v-model="wageItem.salary"
            :label="$t('shared.columns.salary')"
          />
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12">
          <custom-input-number
            v-model="wageItem.baseYear"
            :label="$t('shared.columns.baseYear')"
          />
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12">
          <custom-input-number
            v-model="wageItem.housing"
            :label="$t('shared.columns.housing')"
          />
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12">
          <custom-input-number
            v-model="wageItem.food"
            :label="$t('shared.columns.food')"
          />
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12">
          <custom-input-number
            v-model="wageItem.spouse"
            :label="$t('shared.columns.spouse')"
          />
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12">
          <custom-input-number
            v-model="wageItem.child"
            :label="$t('shared.columns.child')"
          />
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12">
          <custom-input-number
            v-model="wageItem.mission"
            :label="$t('shared.columns.mission')"
          />
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12">
          <custom-input-number
            v-model="wageItem.overtime"
            :label="$t('shared.columns.overtime')"
          />
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12">
          <custom-input-number
            v-model="wageItem.addition"
            :label="$t('shared.columns.addition')"
          />
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12">
          <custom-input-number
            v-model="wageItem.deduction"
            :label="$t('shared.columns.deduction')"
          />
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12">
          <custom-input-number
            v-model="wageItem.leave"
            :label="$t('shared.columns.leave')"
          />
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12">
          <custom-input-number
            v-model="wageItem.reward"
            :label="$t('shared.columns.reward')"
          />
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12">
          <custom-input-number
            v-model="wageItem.bonus"
            :label="$t('shared.columns.bonus')"
          />
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12">
          <custom-input-number
            v-model="wageItem.serviceBenefit"
            :label="$t('shared.columns.serviceBenefit')"
          />
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12">
          <date-time-picker
            v-model="wageItem.dateEnter"
            :label="$t('shared.columns.dateEnter')"
          />
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12">
          <date-time-picker
            v-model="wageItem.dateExit"
            :label="$t('shared.columns.dateExit')"
          />
        </div>
        <div class="col-md-8 col-sm-8 col-xs-12">
          <custom-input
            v-model="wageItem.comment"
            :label="$t('shared.columns.comment')"
          />
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
    insuranceType,
  } from "src/constants";

  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
  import DateTimePicker from "src/components/shared/forms/DateTimePicker.vue";
  import CustomerLookup from "src/components/shared/lookups/CustomerLookup.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";
  import CommentLookup from "src/components/shared/Lookups/CommentLookup.vue";

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
