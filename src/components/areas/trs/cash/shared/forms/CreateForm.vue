<template>
  <tool-bar
    :title="title"
    @submit-call-back="formStore.crudStore.submitForm(form, action)"
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
              عنوان
            </q-item-label>
            <custom-input
              hide-bottom-space
              v-model="formStore.model.value.title"
              :rules="[(val) => val !== null && val !== '']"
            />
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
            حساب معین را از حسابهای موجودی نزد صندوق با کد 10102، یا موجودی نزد
            تنخواه گردانها با کد 10103 انتخاب کنید
          </div>
        </q-card-section>
      </q-card>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import {
  sqlOperator,
  accountCurrentAsset,
  accountCurrentLiability,
} from "src/constants";
import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";

import ToolBar from "src/components/shared/FormToolBar.vue";
import CustomInput from "src/components/shared/forms/CustomInput.vue";
import DateTime from "src/components/shared/forms/DateTimePicker.vue";
import SlLookup from "src/components/shared/lookups/AccountSLLookup.vue";

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
    value: accountCurrentAsset,
    // operator: sqlOperator.in,
    // value: `${accountCurrentAsset},${accountCurrentLiability}`,
  },
];
</script>
