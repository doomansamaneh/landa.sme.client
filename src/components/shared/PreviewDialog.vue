<template>
  <q-dialog
    maximized
    ref="dialogRef"
    transition-show="slide-up"
    transition-hide="slide-down"
    transition-duration="600"
    no-backdrop-dismiss
    @hide="onDialogHide"
  >
    <q-card class="q-mt-xl" flat>
      <q-card-section
        class="row items-center q-pb-none q-pr-lg"
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
            @click="printStore.downloadPdf"
          />
        </div>

        <q-space />

        <slot name="title">
          <div class="text-h6 no-letter-spacing q-mr-md">
            {{ title }}
            <!-- {{ $t(title) }} -->
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

      <q-card-section class="q-pt-none q-pb-lg q-px-lg">
        <slot name="body">
          <component :is="component" v-bind="previewProps" />
        </slot>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import { ref } from "vue";
  import { useDialogPluginComponent } from "quasar";
  import { usePrint } from "src/composables/usePrint";

  import MenuButton from "src/components/shared/buttons/MenuButton.vue";
  import MenuButtonPrint from "src/components/shared/buttons/MenuButtonPrint.vue";

  const props = defineProps({
    title: String,
    component: Object,
    previewProps: Object,
  });

  const emit = defineEmits([...useDialogPluginComponent.emits]);

  const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
    useDialogPluginComponent();

  const printStore = usePrint();

  function closeDialog() {
    onDialogCancel();
  }

  defineExpose({
    onDialogOK,
  });
</script>

<style lang="scss">
  .q-dialog__inner--maximized > div {
    border-radius: 24px !important;
  }
</style>
