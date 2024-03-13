<template>
  <q-dialog
    ref="dialogRef"
    transition-show="scale"
    transition-hide="scale"
    no-backdrop-dismiss
    @hide="onDialogHide"
  >
    <q-card class="q-dialog-plugin">
      <q-card-section class="row items-center q-pa-md">
        <div class="text-h5 text-weight-700">نتیجه تراکنش</div>
        <!-- <q-space />
        <q-btn
          icon="close"
          class="icon-hover dark-3"
          flat
          round
          dense
          v-close-popup
        /> -->
      </q-card-section>

      <q-card-section>
        <q-list>
          <q-item-label header>
            <div class="q-gutter-y-md">
              فاکتور فروش (صورتحساب) با موفقیت ثبت شد.
              <div>
                شماره:
                <span class="text-h6 text-weight-700">{{
                  responseData.no
                }}</span>
              </div>
              <div>گام بعدی را انتخاب کنید:</div>
            </div>
          </q-item-label>
          <!-- padding
          bordered
          class="rounded-borders"
          style="max-width: 350px" -->

          <q-item
            clickable
            v-ripple
            :to="`/sls/invoice/preview/${responseData.id}`"
            class="normal"
          >
            <q-item-section avatar top>
              <q-avatar icon="print" color="primary" text-color="white" />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">پیش نمایش</q-item-label>
              <q-item-label caption>پیش نمایش و چاپ فاکتور</q-item-label>
            </q-item-section>
          </q-item>

          <q-item class="normal" clickable v-ripple>
            <q-item-section avatar top>
              <q-avatar icon="payment" color="orange" text-color="white" />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">دریافت</q-item-label>
              <q-item-label caption> دریافت مانده حساب </q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple class="normal">
            <q-item-section avatar top>
              <q-avatar icon="mail" color="teal" text-color="white" />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">ارسال ایمیل</q-item-label>
              <q-item-label caption>
                اگر می‌خواهید این سند را به صورت pdf ایمیل کنید
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator class="q-my-sm" />

          <q-item class="normal" clickable v-ripple>
            <q-item-section avatar top>
              <q-avatar icon="assignment" color="grey" text-color="white" />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">سند حسابداری</q-item-label>
              <q-item-label caption>
                مشاهده سند حسابداری. سند حسابداری به صورت خودکار توسط سامانه
                صادر می‌شود
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-actions class="q-pa-md dark-1" align="right">
        <q-btn
          rounded
          :color="okColor ?? 'primary'"
          unelevated
          no-caps
          padding="8px 16px"
          :label="ok ?? $t('shared.labels.ok')"
          @click="onOKClick"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";

const props = defineProps({
  responseData: Object,
});

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

function onOKClick() {
  onDialogOK();
}
</script>
