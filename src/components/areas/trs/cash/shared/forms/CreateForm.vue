<template>
  <q-form ref="form" autofocus>
    <div class="row q-mb-md">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <sl-lookup
          v-model:selectedId="formStore.model.value.slId"
          v-model:selectedText="formStore.model.value.slDisplay"
          :filter-expression="filterSL"
          :label="$t('shared.columns.slTitle')"
          required
        />
      </div>
    </div>

    <div class="row q-mb-md">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <custom-input
          v-model="formStore.model.value.title"
          :label="$t('shared.labels.title')"
          required
        />
      </div>
    </div>

    <div class="row q-mb-md">
      <div class="col-md-2 col-sm-4 col-xs-12">
        <date-time
          v-model="formStore.model.value.openingDate"
          :label="$t('shared.labels.date')"
          required=""
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
  <q-card flat class="tips">
    <q-card-section>
      <div class="title q-mb-sm">
        {{ $t("shared.labels.userGuide") }}
      </div>
      <div class="text-body1">
        {{ $t("shared.labels.cashSubLedgerAccountGuide") }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";
  import { useI18n } from "vue-i18n";
  import { sqlOperator, accountCLType } from "src/constants";
  import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import DateTime from "src/components/shared/forms/DateTimePicker.vue";
  import SlLookup from "src/components/shared/lookups/AccountSLLookup.vue";

  const { t } = useI18n();

  const props = defineProps({
    action: String,
    title: String,
  });

  const form = ref(null);
  const formStore = useBaseInfoModel({
    baseRoute: "trs/cash",
    getCreateModel: true,
  });

  const filterSL = [
    {
      fieldName: "clId",
      operator: sqlOperator.equal,
      value: accountCLType.currentAsset,
      // operator: sqlOperator.in,
      // value: `${accountCLType.currentAsset},${accountCLType.currentLiability}`,
    },
  ];

  async function submitForm(callBack) {
    return await formStore.submitForm(
      form.value,
      props.action,
      callBack
    );
  }

  defineExpose({
    submitForm,
  });
</script>
