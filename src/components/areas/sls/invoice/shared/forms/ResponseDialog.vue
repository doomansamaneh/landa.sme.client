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
        <div class="text-h5 text-weight-700">نتیجه عملیات</div>
      </q-card-section>

      <q-card-section>
        <q-list>
          <q-item-label header>
            <div class="q-gutter-y-md">
              فاکتور فروش (صورتحساب) با موفقیت ثبت شد.
              <div>
                {{ $t("shared.labels.no") }}:
                <span class="text-h6 text-weight-700">
                  {{ responseData.no }}
                </span>
              </div>
              <div>گام بعدی را انتخاب کنید:</div>
            </div>
          </q-item-label>

          <q-item
            clickable
            v-ripple
            :to="`/${baseRoute}/preview/${responseData.id}`"
            class="rounded-borders"
          >
            <q-item-section avatar top>
              <q-avatar
                icon="print"
                color="primary"
                text-color="white"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">پیش نمایش</q-item-label>
              <q-item-label caption>پیش نمایش و چاپ</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-if="responseData.amount > responseData.receivedAmount"
            clickable
            v-ripple
            :to="`/trs/${paymentAction}/createFromInvoice/${responseData.id}`"
            class="rounded-borders"
          >
            <q-item-section avatar top>
              <q-avatar
                icon="payment"
                color="orange"
                text-color="white"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">دریافت/پرداخت</q-item-label>
              <q-item-label caption>
                دریافت/پرداخت مانده حساب
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-if="false"
            clickable
            v-ripple
            class="rounded-borders"
          >
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

          <q-separator v-if="false" class="q-my-sm" />

          <q-item
            v-if="false"
            class="rounded-borders"
            clickable
            v-ripple
          >
            <q-item-section avatar top>
              <q-avatar
                icon="assignment"
                color="grey"
                text-color="white"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">سند حسابداری</q-item-label>
              <q-item-label caption>
                مشاهده سند حسابداری. سند حسابداری به صورت خودکار توسط
                سامانه صادر می‌شود
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-actions class="q-pa-md bg-main" align="right">
        <q-btn
          no-caps
          rounded
          :color="okColor ?? 'primary'"
          unelevated
          padding="8px 16px"
          :label="ok ?? $t('shared.labels.ok')"
          icon="check"
          @click="onOKClick"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import { computed } from "vue";
  import { useDialogPluginComponent } from "quasar";

  const props = defineProps({
    responseData: Object,
    baseRoute: String,
  });

  defineEmits([...useDialogPluginComponent.emits]);

  const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
    useDialogPluginComponent();

  const paymentAction = computed(() => {
    const baseRouteLower = props.baseRoute?.toLowerCase();
    return baseRouteLower === "sls/invoice" ||
      baseRouteLower === "sls/purchasereturn"
      ? "receipt"
      : "payment";
  });

  function onOKClick() {
    onDialogOK();
  }
</script>
