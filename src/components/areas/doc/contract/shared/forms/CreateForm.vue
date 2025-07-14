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
          <div class="col-md-2 col-sm-6 col-xs-6">
            <custom-input
              :label="$t('shared.columns.no')"
              hide-bottom-space
              v-model="formStore.model.value.no"
              required
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
          <div class="col-md-6 col-sm-12 col-xs-12">
            <custom-input
              :label="$t('shared.labels.title')"
              hide-bottom-space
              v-model="formStore.model.value.title"
              required
            />
          </div>
        </div>

        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-md-2 col-sm-6 col-xs-6">
            <date-time
              :label="$t('shared.columns.startDate')"
              v-model="formStore.model.value.startDate"
            />
          </div>
          <div class="col-md-2 col-sm-6 col-xs-6">
            <date-time
              :label="$t('shared.columns.finishDate')"
              v-model="formStore.model.value.finishDate"
            />
          </div>
        </div>

        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <custom-input
              :label="$t('shared.labels.comment')"
              type="textarea"
              v-model="formStore.model.value.comment"
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

  import FormToolbarContainer from "src/components/shared/toolbars/FormToolbarContainer.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import DateTime from "src/components/shared/forms/DateTimePicker.vue";

  const props = defineProps({
    action: String,
    title: String,
  });

  const form = ref(null);
  const formStore = useBaseInfoModel({
    baseRoute: "doc/contract",
  });
  const { t: $t } = useI18n();
</script>
