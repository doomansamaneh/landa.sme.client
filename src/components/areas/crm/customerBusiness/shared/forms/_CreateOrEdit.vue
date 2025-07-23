<template>
  <div class="row q-col-gutter-lg">
    <div class="col-md col-sm col-xs-12">
      <div class="q-gutter-lg">
        <div>
          <custom-input
            :label="$t('shared.columns.nationalNo')"
            v-model="model.nationalNo"
          />
        </div>
        <div>
          <custom-input
            :label="$t('shared.labels.regNo')"
            v-model="model.regNo"
          />
        </div>
        <div>
          <custom-input
            :label="$t('shared.labels.insuranceWorkNo')"
            v-model="model.insuranceWorkNo"
          />
        </div>
      </div>
    </div>
    <div class="col-md col-sm col-xs-12">
      <div class="q-gutter-lg">
        <div>
          <custom-input
            :label="$t('shared.columns.taxNo')"
            v-model="model.taxNo"
          />
        </div>
        <div>
          <date-time
            :label="$t('shared.labels.regDate')"
            v-model="model.regDate"
          />
        </div>
        <div>
          <custom-input
            :label="$t('shared.labels.branchNo')"
            v-model="model.branchNo"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="row q-mt-lg">
    <div class="col-12">
      <custom-input
        :label="$t('shared.columns.comment')"
        v-model="model.comment"
        type="textarea"
      />
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useI18n } from "vue-i18n";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import DateTime from "src/components/shared/forms/DateTimePicker.vue";

  const { t } = useI18n();

  const props = defineProps({
    item: Object,
  });

  const model = computed(() => props.item);
</script>
