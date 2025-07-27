<template>
  <form-toolbar-container
    buttons
    :title="title"
    @submit-call-back="formStore.submitForm(form, action)"
  />

  <q-card class="form-container">
    <q-card-section>
      <q-form ref="form" autofocus>
        <div class="row q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <custom-input
              :label="$t('shared.columns.title')"
              v-model="formStore.model.value.title"
              required
            />
          </div>
        </div>

        <div class="row q-mb-md">
          <div class="col-md-3 col-sm-12 col-xs-12">
            <custom-select
              v-model="formStore.model.value.paymentTypeId"
              :options="
                helper.getEnumOptions(paymentType, 'paymentType')
              "
              :label="$t('shared.labels.paymentMethod')"
              required
            />
          </div>
        </div>

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
            <sl-lookup
              v-model:selectedId="formStore.model.value.discountSLId"
              v-model:selectedText="
                formStore.model.value.discountSLDisplay
              "
              :filter-expression="filterProduct"
              :label="$t('shared.labels.discountAccount')"
              required
            />
          </div>
        </div>

        <div class="row q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <sl-lookup
              v-model:selectedId="formStore.model.value.productSLId"
              v-model:selectedText="
                formStore.model.value.productSLDisplay
              "
              :filter-expression="filterProduct"
              :label="$t('shared.labels.productAccount')"
              required
            />
          </div>
        </div>

        <div class="row q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <sl-lookup
              v-model:selectedId="formStore.model.value.serviceSLId"
              v-model:selectedText="
                formStore.model.value.serviceSLDisplay
              "
              :filter-expression="filterProduct"
              :label="$t('shared.labels.serviceAccount')"
              required
            />
          </div>
        </div>

        <div class="row q-gutter-md q-mb-md">
          <q-checkbox
            dense
            size="48px"
            v-model="formStore.model.value.isActive"
            :label="$t('shared.columns.isActive')"
          />
        </div>
      </q-form>
      <q-card flat class="tips">
        <q-card-section>
          <div class="title q-mb-sm">
            {{ $t("shared.labels.userGuide") }}
          </div>
          <div class="text-body1">
            <ul class="q-gutter-y-sm">
              <li>
                <strong>
                  {{ $t("shared.labels.paymentMethod") }}:
                </strong>
                {{ $t("shared.labels.paymentMethodGuide") }}
              </li>
              <li>
                <strong>{{ $t("shared.columns.slTitle") }}:</strong>
                {{ $t("shared.labels.slAccountGuide") }}
              </li>
              <li>
                <strong>
                  {{ $t("shared.labels.discountAccount") }}:
                </strong>
                {{ $t("shared.labels.discountAccountGuide") }}
              </li>
              <li>
                <strong>
                  {{ $t("shared.labels.productAccount") }}:
                </strong>
                {{ $t("shared.labels.productAccountGuide") }}
              </li>
              <li>
                <strong>
                  {{ $t("shared.labels.serviceAccount") }}:
                </strong>
                {{ $t("shared.labels.serviceAccountGuide") }}
              </li>
            </ul>
          </div>
        </q-card-section>
      </q-card>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";
  import { helper } from "src/helpers";
  import {
    sqlOperator,
    paymentType,
    accountCLType,
  } from "src/constants";
  import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";

  import FormToolbarContainer from "src/components/shared/toolbars/FormToolbarContainer.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
  import SlLookup from "src/components/shared/lookups/AccountSLLookup.vue";

  const props = defineProps({
    action: String,
    title: String,
  });

  const form = ref(null);
  const formStore = useBaseInfoModel({
    baseRoute: "sls/saleType",
    getCreateModel: true,
  });

  const filterSL = [
    {
      fieldName: "clId",
      operator: sqlOperator.equal,
      value: accountCLType.currentAsset,
    },
  ];
  const filterProduct = [
    {
      fieldName: "clId",
      operator: sqlOperator.equal,
      value: accountCLType.revenue,
    },
  ];
</script>
