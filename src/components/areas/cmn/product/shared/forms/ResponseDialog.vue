<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="text-h6">اطلاعات</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-body1">
          {{ responseData?.message }}
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="بستن" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import { useDialogPluginComponent } from "quasar";

  const props = defineProps({
    responseData: Object,
    baseRoute: String,
  });

  const { dialogRef, onDialogHide, onOKClick } =
    useDialogPluginComponent();
</script>
