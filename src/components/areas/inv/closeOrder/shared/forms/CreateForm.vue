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
            <date-time
              :label="$t('shared.columns.date')"
              v-model="formStore.model.value.date"
              hide-bottom-space
              required
            />
          </div>
        </div>

        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <inventory-lookup
              :label="$t('shared.columns.inventoryTitle')"
              v-model:selectedId="formStore.model.value.inventoryId"
              v-model:selectedText="
                formStore.model.value.inventoryTitle
              "
              hide-bottom-space
              required
            />
          </div>
        </div>

        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <contract-lookup
              :label="$t('shared.labels.contract')"
              v-model:selectedId="formStore.model.value.contractId"
              v-model:selectedText="
                formStore.model.value.contractTitle
              "
              hide-bottom-space
              required
            />
          </div>
        </div>

        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <custom-input
              :label="$t('shared.columns.summary')"
              type="textarea"
              v-model="formStore.model.value.summary"
            />
          </div>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";
  import { useI18n } from "vue-i18n";
  import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";
  import { useCloseOrderState } from "../../../_composables/useCloseOrderState";

  import FormToolbarContainer from "src/components/shared/toolbars/FormToolbarContainer.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import DateTime from "src/components/shared/forms/DateTimePicker.vue";
  import ContractLookup from "src/components/shared/lookups/ContractLookup.vue";
  import InventoryLookup from "src/components/shared/lookups/InventoryLookup.vue";

  const { t } = useI18n();

  const props = defineProps({
    action: String,
    title: String,
  });

  const form = ref(null);
  const closeOrderStore = useCloseOrderState();
  const formStore = useBaseInfoModel({
    baseRoute: "inv/closeOrder",
    resetCallback: closeOrderStore.reset,
  });
</script>
