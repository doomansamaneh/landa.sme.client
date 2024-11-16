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
      flat
      :style="$q.screen.xs ? '' : 'width: 600px; max-width: 80vw'"
    >
      <q-card-section
        class="row items-center q-pr-md"
        :class="$q.screen.gt.xs ? 'q-pl-lg' : 'q-pl-md'"
      >
        <slot name="title">
          <div class="text-h6">{{ title }}</div>
        </slot>

        <q-space />
        <q-btn
          icon="close"
          class="icon-hover dark-3"
          flat
          round
          dense
          v-close-popup
        />
      </q-card-section>

      <q-card-section>
        <slot name="body"></slot>
      </q-card-section>

      <slot name="actions"></slot>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import { useDialogPluginComponent } from "quasar";

  const props = defineProps({
    title: String,
    form: Object,
  });

  const emit = defineEmits([...useDialogPluginComponent.emits]);

  const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
    useDialogPluginComponent();

  defineExpose({
    onDialogOK,
  });
</script>
