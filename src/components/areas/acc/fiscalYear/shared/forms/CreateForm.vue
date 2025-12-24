<template>
  <form-toolbar-container
    buttons
    :title="title"
    @submit-call-back="formStore.submitForm(form, action)"
  />

  <q-card class="q-mt-xl tips">
    <q-card-section>
      <div class="title">{{ $t("shared.labels.note") }}</div>
      <div class="text-body1 q-mt-sm">
        {{ $t("shared.labels.fiscalYearNote") }}
      </div>
    </q-card-section>
  </q-card>

  <q-card class="form-container" style="margin-top: 16px">
    <q-card-section>
      <q-form ref="form" autofocus>
        <div class="row q-mb-md">
          <div class="col-md-3 col-sm-12 col-xs-12">
            <custom-input
              :label="$t('shared.labels.fiscalYear')"
              type="number"
              v-model="formStore.model.value.year"
              required
            />
          </div>
        </div>

        <div class="row q-mb-md">
          <div class="col-md-3 col-sm-12 col-xs-12">
            <date-time
              :label="$t('shared.labels.dateFrom')"
              v-model="formStore.model.value.fromDate"
            />
          </div>
        </div>
        <div class="row q-mb-md">
          <div class="col-md-3 col-sm-12 col-xs-12">
            <date-time
              :label="$t('shared.labels.dateTo')"
              v-model="formStore.model.value.toDate"
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
    baseRoute: "acc/fiscalYear",
    loadCreateModel: true,
  });
</script>
