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
          <custom-input
            label="کد ملی"
            v-model="model.value.person.nationalCode"
          />
        </div>
        <div>
          <custom-input
            label="شماره بیمه"
            v-model="model.value.person.inssuranceNo"
          />
        </div>
        <div>
          <date-time
            label="تاریخ تولد"
            v-model="model.value.person.birthDay"
          />
        </div>
        <div>
          <date-time
            label="تاریخ صدور"
            v-model="model.value.person.issueDate"
          />
        </div>
        <div>
          <custom-select
            label="وضعیت نظام وظیفه"
            v-model="model.value.person.militaryStatusId"
            :options="
              helper.getEnumOptions(militaryStatus, 'militaryStatus')
            "
          />
        </div>
        <div>
          <custom-select
            label="وضعیت تاهل"
            v-model="model.value.person.mariageStatusId"
            :options="
              helper.getEnumOptions(marriageStatus, 'marriageStatus')
            "
          />
        </div>
        <div>
          <custom-input
            label="تعداد فرزند"
            v-model="model.value.person.childNo"
          />
        </div>
      </div>
    </div>
    <div class="col-md col-sm col-xs-12">
      <div class="q-gutter-lg">
        <div>
          <job-lookup
            label="شغل"
            v-model:selectedId="model.value.jobId"
            v-model:selectedText="model.value.jobTitle"
          />
        </div>
        <div>
          <custom-input
            label="شماره شناسنامه"
            v-model="model.value.person.iddNo"
          />
        </div>
        <div>
          <location-lookup
            label="ملیت"
            v-model:selectedId="model.value.person.nationalitiyId"
            v-model:selectedText="
              model.value.person.nationalitiyTitle
            "
          />
        </div>
        <div>
          <location-lookup
            label="محل تولد"
            v-model:selectedId="model.value.person.birthLocationId"
            v-model:selectedText="
              model.value.person.birthLocationTitle
            "
          />
        </div>
        <div>
          <custom-input
            label="محل صدور"
            v-model="model.value.person.issueLocation"
          />
        </div>
        <div>
          <custom-input
            label="نام پدر"
            v-model="model.value.person.fatherName"
          />
        </div>
        <div>
          <date-time
            label="تاریخ ازدواج"
            v-model="model.value.person.marriageDate"
          />
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
