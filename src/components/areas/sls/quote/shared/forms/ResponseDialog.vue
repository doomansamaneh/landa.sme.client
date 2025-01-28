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
              پیش‌فاکتور با موفقیت ثبت شد.
              <div>
                شماره:
                <span class="text-h6 text-weight-700">
                  {{ responseData.no }}
                </span>
              </div>
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
            clickable
            v-ripple
            class="rounded-borders hidden"
            @click="sendEmail"
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
          icon="check"
          @click="onOKClick"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import { useDialogPluginComponent } from "quasar";
  import { useDialog } from "src/composables/useDialog";

  import SendEmail from "../../../_shared/invoice/shared/forms/SendEmailForm.vue";

  const props = defineProps({
    responseData: Object,
    baseRoute: String,
  });

  defineEmits([...useDialogPluginComponent.emits]);

  const dialogStore = useDialog();
  const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
    useDialogPluginComponent();

  function onOKClick() {
    onDialogOK();
  }

  function sendEmail() {
    dialogStore.openDialog({
      title: `shared.labels.sendMail`,
      component: SendEmail,
      actionBar: true,
      props: {
        id: props.responseData.id,
        baseRoute: props.baseRoute,
      },
      okCallback: async (response) => {
        //await reloadData();
      },
    });
  }
</script>
