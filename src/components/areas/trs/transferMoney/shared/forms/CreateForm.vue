<template>
  <tool-bar
    :title="title"
    @submit-call-back="formStore.crudStore.submitForm(form, action)"
  />

  <q-card class="form-container">
    <q-card-section>
      <q-form ref="form" autofocus>
        <div class="row q-mb-md">
          <div class="col-md-3 col-sm-12 col-xs-12">
            <q-item-label
              class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
            >
              مبلغ
            </q-item-label>
            <custom-input-number
              v-model="formStore.model.value.amount"
            />
          </div>
        </div>

        <div class="row q-mb-md">
          <div class="col-md-3 col-sm-12 col-xs-12">
            <q-item-label
              class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
            >
              تاریخ
            </q-item-label>
            <date-time v-model="formStore.model.value.date" />
          </div>
        </div>

        <div class="row q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <q-item-label
              class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
            >
              شرح
            </q-item-label>
            <custom-input
              v-model="formStore.model.value.subject"
              hide-bottom-space
              type="textarea"
            />
          </div>
        </div>

        <div class="row q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <q-item-label
              class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
            >
              از
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
              v-model="formStore.model.value.fromSource"
            />
            <bank-account-lookup
              v-if="
                formStore.model.value.fromSource ===
                transferMoneyType.bankAccount
              "
              v-model:selectedId="
                formStore.model.value.fromBankAccountId
              "
              v-model:selectedText="
                formStore.model.value.fromBankAccountTitle
              "
            />

            <cash-lookup
              v-if="
                formStore.model.value.fromSource ===
                transferMoneyType.cash
              "
              v-model:selectedId="formStore.model.value.fromCashId"
              v-model:selectedText="
                formStore.model.value.fromCashTitle
              "
            />
          </div>
        </div>

        <div class="row q-mb-md">
          <div class="col-md-3 col-sm-12 col-xs-12">
            <q-item-label
              class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
            >
              کارمزد
            </q-item-label>
            <custom-input-number
              v-model="formStore.model.value.fromFee"
            />
          </div>
        </div>

        <div class="row q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <q-item-label
              class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
            >
              به
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
              v-model="formStore.model.value.toSource"
            />
            <bank-account-lookup
              v-if="
                formStore.model.value.toSource ===
                transferMoneyType.bankAccount
              "
              v-model:selectedId="
                formStore.model.value.toBankAccountId
              "
              v-model:selectedText="
                formStore.model.value.toBankAccountTitle
              "
            />

            <cash-lookup
              v-if="
                formStore.model.value.toSource ===
                transferMoneyType.cash
              "
              v-model:selectedId="formStore.model.value.toCashId"
              v-model:selectedText="formStore.model.value.toCashTitle"
            />
          </div>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";
  import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";
  import { helper } from "src/helpers";
  import { transferMoneyType } from "src/constants";
  import { transferMoneyModel } from "src/models/areas/trs/transferMoneyModel";

  import ToolBar from "src/components/shared/FormToolBar.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";
  import DateTime from "src/components/shared/forms/DateTimePicker.vue";
  import BankAccountLookup from "src/components/shared/lookups/BankAccountLookup.vue";
  import CashLookup from "src/components/shared/lookups/CashLookup.vue";

  const props = defineProps({
    action: String,
    title: String,
  });

  const form = ref(null);
  const formStore = useBaseInfoModel({
    model: transferMoneyModel,
    baseRoute: "trs/transferMoney",
  });
</script>
