<template>
  <tool-bar :title="title" @submit-call-back="formStore.crudStore.submitForm(form, action)" />

  <q-card class="tips q-mt-xl">
    <q-card-section>
      <div>
        <div class="title">نکته</div>
        <div class="q-mt-sm">
          <p>
            <strong>عنوان: </strong>
            عنوانی که در سند حسابداری برای این قلم نشان داده می‌شود، مانند مالیات بر
            ارزش افزوده پرداختنی
          </p>
          <p>
            <strong>حساب معین: </strong>
            حسابهای معین پیشفرض: 30501: مالیات بر ارزش افزوده پرداختنی و 30502:
            عوارض ارزش افزوده پرداختنی
          </p>
          <p>
            <strong>نرخ: </strong>
            نرخ مالیات بر ارزش افزوده به ردیفهای زیر در سند حسابداری که به صورت
            خودکار از روی فاکتور، خرید، و... ایجاد می‌شود، شکسته می‌شود.
          </p>
        </div>
      </div>
    </q-card-section>
  </q-card>

  <q-card class="form-container" style="margin-top: 16px;">
    <q-card-section>
      <q-form ref="form" autofocus>
        <master-section :form-store="formStore" />
        <detail-section :form-store="formStore" />
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";
import { vatModel } from "src/models/areas/cmn/vatModel";

import MasterSection from "./_MasterSection.vue";
import DetailSection from "./_DetailSection.vue";
import ToolBar from "src/components/shared/FormToolBar.vue";

const props = defineProps({
  action: String,
  title: String,
});

const form = ref(null);
const formStore = useBaseInfoModel("cmn/vat", vatModel);
</script>
