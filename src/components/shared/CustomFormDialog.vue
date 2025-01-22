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

      <q-card-section style="max-height: 70vh" class="q-pa-lg scroll">
        <slot name="body">
          <component
            :is="component"
            :item="item"
            v-bind="formProps"
            ref="form"
          />
        </slot>
      </q-card-section>

      <slot name="actions">
        <action-buttons v-if="actions" @ok-clicked="submitForm" />
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
    item: Object,
    actions: Boolean,
    width: {
      type: String,
      default: "700px",
    },
  });

  const emit = defineEmits([...useDialogPluginComponent.emits]);

  const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
    useDialogPluginComponent();

  const form = ref(null);

  async function submitForm() {
    if (form.value) {
      await form.value.submitForm(onDialogOK);
      onDialogOK();
    }
  }

  function closeDialog() {
    onDialogCancel();
  }

  defineExpose({
    onDialogOK,
  });
</script>
