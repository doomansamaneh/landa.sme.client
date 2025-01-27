<template>
  <q-dialog
    maximized
    ref="dialogRef"
    transition-show="slide-up"
    transition-hide="slide-down"
    transition-duration="600"
    no-backdrop-dismiss
    @hide="onDialogHide"
    class="preview-dialog"
  >
    <q-card class="q-mt-xl" flat>
      <q-inner-loading
        :showing="showLoader"
        class="transparent z-max"
      >
        <q-spinner size="52px" color="primary" />
      </q-inner-loading>

      <q-card-section
        class="row items-center q-pr-lg"
        :class="$q.screen.gt.xs ? 'q-pl-lg' : 'q-pl-lg'"
      >
        <div class="flex q-gutter-sm">
          <menu-button-print
            class="primary-gradient text-white primary-shadow"
            @click="printStore.handlePrint"
          />
          <menu-button
            :title="$t('shared.labels.downloadPdf')"
            icon="download"
            @click="openPrintSettings"
          />
        </div>

        <q-space />

        <slot name="title">
          <div class="text-h6 no-letter-spacing q-mr-md">
            {{ title }}
          </div>
        </slot>

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
        class="q-pt-none q-pb-xl q-px-lg scroll"
        style="max-height: 80vh"
      >
        <slot name="body">
          <component :is="component" v-bind="previewProps" />
        </slot>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import { computed } from "vue";
  import { useDialogPluginComponent } from "quasar";
  import { usePrint } from "src/composables/usePrint";
  import { useDialog } from "src/composables/usePrintSetting";

  import MenuButton from "src/components/shared/buttons/MenuButton.vue";
  import MenuButtonPrint from "src/components/shared/buttons/MenuButtonPrint.vue";
  import PrintSetting from "src/components/shared/dialogs/PrintSettingDialog.vue";

  const props = defineProps({
    title: String,
    component: Object,
    previewProps: Object,
  });

  const emit = defineEmits([...useDialogPluginComponent.emits]);

  const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
    useDialogPluginComponent();

  const printStore = usePrint();
  const dialogStore = useDialog();

  function closeDialog() {
    onDialogCancel();
  }

  const showLoader = computed(
    () => props.previewProps.tableStore.showLoader.value
  );

  const openPrintSettings = () => {
    dialogStore.openDialog({
      title: "تنظیمات چاپ",
      component: PrintSetting,
      props: {
        tableStore: props.previewProps.tableStore,
        title: props.title,
        actionBar: true,
      },
    });
  };

  defineExpose({
    onDialogOK,
  });
</script>
