<template>
  <div class="row q-col-gutter-lg">
    <div class="col-md col-sm col-xs-12">
      <div class="q-gutter-lg">
        <!-- <div>
            <q-item-label
              class="text-body2  caption-on-dark q-mb-sm"
              >{{ $t('shared.labels.company') }}</q-item-label
            >
            <custom-input outlined dense />
          </div> -->
        <div>
          <custom-input
            :label="$t('shared.labels.nationalCode')"
            v-model="model.value.person.nationalCode"
          />
        </div>
        <div>
          <custom-input
            :label="$t('shared.labels.insuranceNo')"
            v-model="model.value.person.inssuranceNo"
          />
        </div>
        <div>
          <date-time
            :label="$t('shared.labels.birthDate')"
            v-model="model.value.person.birthDay"
          />
        </div>
        <div>
          <date-time
            :label="$t('shared.labels.issueDate')"
            v-model="model.value.person.issueDate"
          />
        </div>
        <div>
          <custom-select
            :label="$t('shared.labels.militaryStatus')"
            v-model="model.value.person.militaryStatusId"
            :options="
              helper.getEnumOptions(militaryStatus, 'militaryStatus')
            "
          />
        </div>
        <div>
          <custom-select
            :label="$t('shared.labels.marriageStatus')"
            v-model="model.value.person.mariageStatusId"
            :options="
              helper.getEnumOptions(marriageStatus, 'marriageStatus')
            "
          />
        </div>
        <div>
          <custom-input
            :label="$t('shared.labels.childCount')"
            v-model="model.value.person.childNo"
          />
        </div>
      </div>
    </div>
    <div class="col-md col-sm col-xs-12">
      <div class="q-gutter-lg">
        <div>
          <job-lookup
            :label="$t('shared.labels.job')"
            v-model:selectedId="model.value.jobId"
            v-model:selectedText="model.value.jobTitle"
          />
        </div>
        <div>
          <custom-input
            :label="$t('shared.labels.iddNo')"
            v-model="model.value.person.iddNo"
          />
        </div>
        <div>
          <location-lookup
            :label="$t('shared.labels.nationality')"
            v-model:selectedId="model.value.person.nationalitiyId"
            v-model:selectedText="
              model.value.person.nationalitiyTitle
            "
          />
        </div>
        <div>
          <location-lookup
            :label="$t('shared.labels.birthLocation')"
            v-model:selectedId="model.value.person.birthLocationId"
            v-model:selectedText="
              model.value.person.birthLocationTitle
            "
          />
        </div>
        <div>
          <custom-input
            :label="$t('shared.labels.issueLocation')"
            v-model="model.value.person.issueLocation"
          />
        </div>
        <div>
          <custom-input
            :label="$t('shared.labels.fatherName')"
            v-model="model.value.person.fatherName"
          />
        </div>
        <div>
          <date-time
            :label="$t('shared.labels.marriageDate')"
            v-model="model.value.person.marriageDate"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from "vue";
  import { useI18n } from "vue-i18n";
  import { helper } from "src/helpers";
  import { marriageStatus, militaryStatus } from "src/constants";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";
  import DateTime from "src/components/shared/forms/DateTimePicker.vue";
  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
  import JobLookup from "src/components/shared/lookups/JobLookup.vue";
  import LocationLookup from "src/components/shared/lookups/LocationLookup.vue";

  const { t } = useI18n();

  const props = defineProps({
    formStore: Object,
  });

  const model = computed(() => props.formStore.model);
</script>
