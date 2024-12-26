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

      <q-card-section>
        <slot name="body">
          <component :is="component" v-bind="formProps" ref="form" />
        </slot>
      </q-card-section>

      <slot name="actions">
        <action-buttons @ok-clicked="submitForm" />
      </slot>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import { ref } from "vue";
  import { useDialogPluginComponent } from "quasar";

  import ActionButtons from "src/components/shared/forms/FormCardActions.vue";

  const props = defineProps({
    title: String,
    component: Object,
    formProps: Object,
  });

  const emit = defineEmits([...useDialogPluginComponent.emits]);

  const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
    useDialogPluginComponent();

  const form = ref(null);

  async function submitForm() {
    if (form.value) {
      const response = await form.value.submitForm();
      if (response) onDialogOK(response);
    }
  }

  function closeDialog() {
    // Logic to close dialog (e.g., reset or handle closing behavior)
    onDialogCancel();
  }

  defineExpose({
    onDialogOK,
  });
</script>
