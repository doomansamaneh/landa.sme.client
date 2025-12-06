<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card
      style="width: 700px; max-width: 90vw"
      class="q-dialog-plugin"
    >
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">کد خروجی قالب</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section
        class="q-pt-md scroll"
        style="max-height: 70vh; min-height: 40vh"
      >
        <div class="column q-gutter-md">
          <div class="text-body2">کد HTML قالب فیلتر شده:</div>
          <q-input
            v-model="codeOutput"
            type="textarea"
            readonly
            autogrow
            outlined
            style="
              min-height: 300px;
              font-family: monospace;
              font-size: 12px;
            "
            class="rtl"
          />
        </div>
      </q-card-section>
      <q-card-actions align="right" class="q-pa-md">
        <q-btn
          flat
          label="کپی"
          color="primary"
          @click="copyToClipboard"
        />
        <q-btn
          flat
          label="بستن"
          color="primary"
          @click="onDialogCancel"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import { ref } from "vue";
  import { useDialogPluginComponent, useQuasar } from "quasar";

  const props = defineProps({
    code: {
      type: String,
      required: true,
    },
  });

  const emit = defineEmits([...useDialogPluginComponent.emits]);

  const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
    useDialogPluginComponent();
  const $q = useQuasar();
  const codeOutput = ref(props.code);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(codeOutput.value)
      .then(() => {
        $q.notify({
          type: "positive",
          message: "کد با موفقیت کپی شد",
          position: "top",
        });
      })
      .catch(() => {
        $q.notify({
          type: "negative",
          message: "خطا در کپی کردن کد",
          position: "top",
        });
      });
  };
</script>
