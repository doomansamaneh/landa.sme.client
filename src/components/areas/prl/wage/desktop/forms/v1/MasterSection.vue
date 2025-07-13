<template>
  <div class="row">
    <div class="col-md-8">
      <div class="row q-col-gutter-md">
        <div class="col-md-3 col-sm-6 col-xs-12">
          <custom-select
            v-model="localFormStore.model.value.month"
            :label="$t('shared.columns.month')"
            :options="months"
            required
          />
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
          <date-time
            v-model="localFormStore.model.value.date"
            :label="$t('shared.labels.date')"
            required
          />
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
          <custom-input
            v-model="localFormStore.model.value.insuranceNo"
            :label="$t('shared.labels.workInsuranceNo')"
            required
          />
        </div>
      </div>

      <div class="row q-mt-md">
        <div class="col-md-9 col-sm-12 col-xs-12">
          <comment-lookup
            v-model="localFormStore.model.value.summary"
            :label="$t('shared.labels.comment')"
            type="textarea"
          />
        </div>
      </div>
    </div>

    <div class="col q-gutter-y-md">
      <q-btn
        no-caps
        rounded
        unelevated
        :href="`${baseUrl}/excelTemplate/import/payrollTemplate.xlsx`"
      >
        <q-icon
          name="file_download"
          class="q-pr-xs"
          size="xs"
          :class="hrefColor"
        />
        <span>{{ $t("shared.labels.downloadTemplate") }}</span>
      </q-btn>
      <upload-area ref="uploadArea" @upload="upload" />
    </div>
  </div>
</template>

<script setup>
  import { computed } from "vue";
  import { baseUrl } from "src/constants";
  import { useWageModel } from "src/components/areas/prl/_composables/useWageModel";

  import DateTime from "src/components/shared/forms/DateTimePicker.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
  import CommentLookup from "src/components/shared/Lookups/CommentLookup.vue";
  import UploadArea from "src/components/areas/_shared/common/UploadArea.vue";

  const props = defineProps({
    formStore: useWageModel,
  });

  const localFormStore = computed(() => props.formStore);

  const months = computed(() =>
    Array.from({ length: 12 }, (_, i) => ({
      label: i + 1,
      value: i + 1,
    }))
  );

  const upload = async (file) => {
    await props.formStore.importItems(file);
  };
</script>
