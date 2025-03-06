<template>
  <q-dialog
    :maximized="$q.screen.xs"
    ref="dialogRef"
    transition-show="slide-up"
    transition-hide="slide-down"
    transition-duration="600"
    no-backdrop-dismiss
    @hide="onDialogHide"
  >
    <q-card
      :style="$q.screen.xs ? '' : `width: ${width}; max-width: 80vw;`"
      flat
    >
      <q-card-section
        class="row items-center q-pb-none q-pr-md"
        :class="$q.screen.gt.xs ? 'q-pl-lg' : 'q-pl-md'"
      >
        <slot name="title">
          <div class="text-h6">{{ $t(title) }}</div>
        </slot>

        <q-space />
        <q-btn
          icon="close"
          class="icon-hover dark-3"
          flat
          round
          dense
          @click="closeDialog"
        />
      </q-card-section>

      <q-card-section
        style="max-height: 70vh; min-height: 40vh"
        class="q-pa-lg scroll"
      >
        <slot name="body">
          <print-setting />
        </slot>
      </q-card-section>

      <slot name="actions">
        <q-card-actions
          class="q-pa-md dark-1"
          :class="$q.screen.xs ? 'absolute-bottom' : ''"
        >
          <q-space />
          <q-btn
            type="submit"
            @click="download"
            text-color="white"
            unelevated
            no-caps
            padding="8px 16px"
            rounded
            class="primary-gradient primary-shadow"
          >
            {{ $t("shared.labels.downloadPdf") }}
          </q-btn>
        </q-card-actions>
      </slot>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import { useDialogPluginComponent } from "quasar";
  import { usePrint } from "src/composables/usePrint";

  import PrintSetting from "src/components/shared/PrintSetting.vue";

  const props = defineProps({
    title: String,
    component: Object,
    formProps: Object,
    item: Object,
    actions: Boolean,
    width: {
      type: String,
      default: "600px",
    },
  });

  const emit = defineEmits([...useDialogPluginComponent.emits]);

  const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
    useDialogPluginComponent();

  const printStore = usePrint();

  const closeDialog = () => {
    onDialogCancel();
  };

  const download = () => {
    printStore.downloadPdf();
    closeDialog();
  };

  defineExpose({
    onDialogOK,
  });
</script>
