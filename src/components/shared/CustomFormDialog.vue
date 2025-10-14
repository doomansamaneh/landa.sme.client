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
        class="row items-center q-pr-md"
        :class="$q.screen.gt.xs ? 'q-pl-lg' : 'q-pl-md'"
      >
        <slot name="title">
          <div class="text-h6">{{ $t(title) }}</div>
        </slot>

        <q-space />
        <q-btn
          no-caps
          icon="close"
          class="icon-hover dark-3"
          flat
          round
          dense
          @click="closeDialog"
        />
      </q-card-section>

      <!-- <q-separator /> -->

      <q-card-section
        :style="
          $q.screen.gt.xs
            ? 'max-height: 70vh;'
            : 'max-height: calc(100vh - 20%)'
        "
        :class="
          $q.screen.gt.xs
            ? 'q-pa-lg scroll'
            : 'q-pa-lg scroll hide-scrollbar'
        "
      >
        <slot name="body">
          <component
            :is="component"
            :item="item"
            v-bind="formProps"
            ref="form"
          />
        </slot>
      </q-card-section>

      <slot name="action-bar">
        <action-buttons
          v-if="actionBar"
          @ok-clicked="submitForm"
          :ok-label="okLabel"
        />
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
    actionBar: Boolean,
    width: {
      type: String,
      default: "700px",
    },
    okLabel: String,
  });

  const emit = defineEmits([...useDialogPluginComponent.emits]);

  const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
    useDialogPluginComponent();

  const form = ref(null);

  async function submitForm() {
    if (form.value) {
      const responseData = await form.value.submitForm(onDialogOK);
      if (responseData) onDialogOK();
    }
  }

  function closeDialog() {
    onDialogCancel();
  }

  defineExpose({
    onDialogOK,
  });
</script>
