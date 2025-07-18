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
          <div class="col-md-3 col-sm-12 col-xs-12">
            <custom-input-number
              v-model="model.amount"
              :label="$t('shared.labels.price')"
              required
            />
          </div>
        </div>

        <div class="row q-mb-md">
          <div class="col-md-3 col-sm-12 col-xs-12">
            <date-time
              v-model="model.date"
              :label="$t('shared.labels.date')"
              required
            />
          </div>
        </div>

        <div class="row q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <custom-input
              v-model="model.subject"
              type="textarea"
              :label="$t('shared.labels.subject')"
              required
            />
          </div>
        </div>

        <div class="row q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <q-item-label class="caption-on-dark text-body2 q-mb-sm">
              {{ $t("shared.labels.from") }}
            </q-item-label>
            <q-option-group
              inline
              :options="
                helper.getEnumOptions(
                  transferMoneyType,
                  'transferMoneyType'
                )
              "
              type="radio"
              v-model="model.fromSource"
            />

            <bank-account-lookup
              v-if="
                model.fromSource === transferMoneyType.bankAccount
              "
              v-model:selectedId="model.fromBankAccountId"
              v-model:selectedText="model.fromBankAccountDisplay"
            />

            <cash-lookup
              v-if="model.fromSource === transferMoneyType.cash"
              v-model:selectedId="model.fromCashId"
              v-model:selectedText="model.fromCashTitle"
            />
          </div>
        </div>

        <div class="row q-mb-md">
          <div class="col-md-3 col-sm-12 col-xs-12">
            <custom-input-number
              v-model="model.fromFee"
              :label="$t('shared.labels.fee')"
            />
          </div>
        </div>

        <div class="row q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <q-item-label class="caption-on-dark text-body2 q-mb-sm">
              {{ $t("shared.labels.toTitle") }}
            </q-item-label>
            <q-option-group
              inline
              :options="
                helper.getEnumOptions(
                  transferMoneyType,
                  'transferMoneyType'
                )
              "
              type="radio"
              v-model="model.toSource"
            />

            <bank-account-lookup
              v-if="model.toSource === transferMoneyType.bankAccount"
              v-model:selectedId="model.toBankAccountId"
              v-model:selectedText="model.toBankAccountDisplay"
            />

            <cash-lookup
              v-if="model.toSource === transferMoneyType.cash"
              v-model:selectedId="model.toCashId"
              v-model:selectedText="model.toCashTitle"
            />
          </div>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { useI18n } from "vue-i18n";
  import { helper } from "src/helpers";
  import { transferMoneyType } from "src/constants";
  import { transferMoneyModel } from "src/models/areas/trs/transferMoneyModel";
  import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";

  import FormToolbarContainer from "src/components/shared/toolbars/FormToolbarContainer.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";
  import DateTime from "src/components/shared/forms/DateTimePicker.vue";
  import BankAccountLookup from "src/components/shared/lookups/BankAccountLookup.vue";
  import CashLookup from "src/components/shared/lookups/CashLookup.vue";

  const { t } = useI18n();

  const props = defineProps({
    action: String,
    title: String,
  });

  const form = ref(null);
  const model = ref(transferMoneyModel);
  const formStore = useBaseInfoModel({
    model: model,
    baseRoute: "trs/transferMoney",
  });
</script>
