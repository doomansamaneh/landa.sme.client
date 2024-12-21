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
            <q-item-label
              class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
            >
              حساب معین
            </q-item-label>
            <sl-lookup
              v-model:selectedId="formStore.model.value.slId"
              v-model:selectedText="formStore.model.value.slTitle"
              :filter-expression="filterSL"
            />
          </div>
        </div>

        <div class="row q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <q-item-label
              class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
            >
              شعبه بانک
            </q-item-label>
            <bank-branch-lookup
              v-model:selectedId="formStore.model.value.bankBranchId"
              v-model:selectedText="
                formStore.model.value.bankBranchTitle
              "
            />
          </div>
        </div>

        <div class="row q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <q-item-label
              class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
            >
              نوع حساب
            </q-item-label>
            <account-type-lookup
              v-model:selectedId="
                formStore.model.value.bankAccountTypeId
              "
              v-model:selectedText="
                formStore.model.value.bankAccountTypeTitle
              "
            />
          </div>
        </div>

        <div class="row q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <q-item-label
              class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
            >
              شماره حساب
            </q-item-label>
            <custom-input v-model="formStore.model.value.no" />
          </div>
        </div>

        <div class="row q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <q-item-label
              class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
            >
              نام صاحب حساب
            </q-item-label>
            <custom-input v-model="formStore.model.value.ownerName" />
          </div>
        </div>

        <div class="row q-mb-md">
          <div class="col-md-2 col-sm-4 col-xs-12">
            <q-item-label
              class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
            >
              تاریخ آغاز
            </q-item-label>
            <date-time v-model="formStore.model.value.openingDate" />
          </div>
        </div>

        <div class="row q-gutter-md q-mb-md">
          <q-checkbox
            dense
            size="48px"
            v-model="formStore.model.value.isActive"
            label="فعال"
          />
        </div>
      </q-form>
      <q-card flat class="tips">
        <q-card-section>
          <div class="title q-mb-sm">راهنما</div>
          <div class="text-body1 no-letter-spacing">
            حساب معین پیشفرض: موجودی نزد بانک با کد 10101
          </div>
        </q-card-section>
      </q-card>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";
  import { sqlOperator, accountCLType } from "src/constants";
  import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";

  import FormToolbarContainer from "src/components/shared/FormToolbarContainer.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import DateTime from "src/components/shared/forms/DateTimePicker.vue";
  import SlLookup from "src/components/shared/lookups/AccountSLLookup.vue";
  import BankBranchLookup from "src/components/shared/lookups/BankBranchLookup.vue";
  import AccountTypeLookup from "src/components/shared/lookups/BankAccountTypeLookup.vue";

  const props = defineProps({
    action: String,
    title: String,
  });

  const form = ref(null);
  const formStore = useBaseInfoModel({
    baseRoute: "trs/bankAccount",
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
</script>
