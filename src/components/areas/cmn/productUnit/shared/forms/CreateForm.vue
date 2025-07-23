<template>
  <form-toolbar-container
    buttons
    :title="title"
    @submit-call-back="formStore.submitForm(form, action)"
  />

  <q-card class="form-container">
    <q-card-section>
      <q-form ref="form" autofocus>
        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <custom-input
              :label="$t('shared.columns.title')"
              hide-bottom-space
              v-model="formStore.model.value.title"
              required
            />
          </div>
        </div>

        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-md-2 col-sm-6 col-xs-6">
            <custom-input
              :label="$t('shared.labels.abbreviation')"
              hide-bottom-space
              v-model="formStore.model.value.code"
            />
          </div>
        </div>

        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-md-2 col-sm-6 col-xs-6">
            <custom-input
              :label="$t('shared.labels.taxCode')"
              hide-bottom-space
              v-model="formStore.model.value.taxCode"
            />
          </div>
        </div>

        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-md-2 col-sm-6 col-xs-6">
            <custom-select
              :label="$t('shared.labels.precisionCount')"
              v-model="formStore.model.value.precision"
              :options="precisionCounts"
              required
            />
          </div>
        </div>

        <div class="row q-gutter-md q-mb-md">
          <q-checkbox
            dense
            size="48px"
            v-model="formStore.model.value.isActive"
            :label="$t('shared.labels.isActive')"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";
  import { useI18n } from "vue-i18n";
  import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";
  import { precisionCounts } from "src/constants";

  import FormToolbarContainer from "src/components/shared/toolbars/FormToolbarContainer.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";

  const { t } = useI18n();

  const props = defineProps({
    action: String,
    title: String,
  });

  const form = ref(null);
  const formStore = useBaseInfoModel({
    baseRoute: "cmn/productUnit",
  });
</script>
