<template>
  <q-dialog
    ref="dialogRef"
    transition-show="scale"
    transition-hide="scale"
    transition-duration="600"
    no-backdrop-dismiss
    @hide="onDialogHide"
  >
    <q-card style="width: 600px; max-width: 80vw;">
      <q-card-section class="row items-center q-pl-lg q-pr-md">
        <div class="text-h6">
          {{ $t("shared.labels.editBatch") }}
        </div>
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
        <edit-batch-form
          ref="form"
          :selectedIds="selectedIds"
        />
      </q-card-section>

      <actions
        @ok-clicked="submitForm"
        class="q-px-lg"
      >
      </actions>
    </q-card>

  </q-dialog>
</template>

<script setup>
import { ref } from "vue"
import { useDialogPluginComponent } from "quasar"

import EditBatchForm from "src/components/areas/cmn/product/shared/forms/EditBatchForm.vue"
import Actions from "src/components/shared/Forms/FormCardActions.vue"

const props = defineProps({
  selectedIds: Array
})

const form = ref(null)
defineEmits([
  ...useDialogPluginComponent.emits
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

async function submitForm() {
  const response = await form.value.submitForm()
  if (response) onDialogOK()
}
</script>
