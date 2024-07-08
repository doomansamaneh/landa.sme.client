<template>
  <div class="row q-col-gutter-lg">
    <div class="col-md col-sm col-xs-12">
      <div class="q-gutter-lg">
        <!-- <div>
            <q-item-label
              class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
              >شرکت وابسته</q-item-label
            >
            <custom-input outlined dense />
          </div> -->
        <div>
          <q-item-label
            class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
            >کد ملی</q-item-label
          >
          <custom-input v-model="model.value.person.nationalCode" />
        </div>
        <div>
          <q-item-label
            class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
            >شماره بیمه</q-item-label
          >
          <custom-input v-model="model.value.person.inssuranceNo" />
        </div>
        <div>
          <q-item-label
            class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
            >تاریخ تولد</q-item-label
          >
          <date-time v-model="model.value.person.birthDay" />
        </div>
        <div>
          <q-item-label
            class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
            >تاریخ صدور</q-item-label
          >
          <date-time v-model="model.value.person.issueDate" />
        </div>
        <div>
          <q-item-label
            class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
            >وضعیت نظام وظیفه</q-item-label
          >
          <custom-select
            v-model="model.value.person.militaryStatusId"
            :options="helper.getEnumOptions(militaryStatus, 'militaryStatus')"
          />
        </div>
        <div>
          <q-item-label
            class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
            >وضعیت تاهل</q-item-label
          >
          <custom-select
            v-model="model.value.person.mariageStatusId"
            :options="helper.getEnumOptions(marriageStatus, 'marriageStatus')"
          />
        </div>
        <div>
          <q-item-label
            class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
            >تعداد فرزند</q-item-label
          >
          <custom-input-number v-model="model.value.person.childNo" />
        </div>
      </div>
    </div>
    <div class="col-md col-sm col-xs-12">
      <div class="q-gutter-lg">
        <div>
          <q-item-label
            class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
            >شغل</q-item-label
          >
          <job-lookup
            v-model:selectedId="model.value.jobId"
            v-model:selectedText="model.value.jobTitle"
          />
        </div>
        <div>
          <q-item-label
            class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
            >شماره شناسنامه</q-item-label
          >
          <custom-input v-model="model.value.person.iddNo" />
        </div>
        <div>
          <q-item-label
            class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
            >ملیت</q-item-label
          >
          <location-lookup
            v-model:selectedId="model.value.person.nationalitiyId"
            v-model:selectedText="model.value.person.nationalitiyTitle"
          />
        </div>
        <div>
          <q-item-label
            class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
            >محل تولد</q-item-label
          >
          <location-lookup
            v-model:selectedId="model.value.person.birthLocationId"
            v-model:selectedText="model.value.person.birthLocationTitle"
          />
        </div>
        <div>
          <q-item-label
            class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
            >محل صدور</q-item-label
          >
          <custom-input v-model="model.value.person.issueLocation" />
        </div>
        <div>
          <q-item-label
            class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
            >نام پدر</q-item-label
          >
          <custom-input v-model="model.value.person.fatherName" />
        </div>
        <div>
          <q-item-label
            class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
            >تاریخ ازدواج</q-item-label
          >
          <date-time v-model="model.value.person.marriageDate" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { helper } from "src/helpers";
import { marriageStatus, militaryStatus } from "src/constants";

import CustomInput from "src/components/shared/forms/CustomInput.vue";
import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";
import DateTime from "src/components/shared/forms/DateTimePicker.vue";
import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
import JobLookup from "src/components/shared/lookups/JobLookup.vue";
import LocationLookup from "src/components/shared/lookups/LocationLookup.vue";

const props = defineProps({
  formStore: Object,
});

const model = computed(() => props.formStore.model);
</script>
