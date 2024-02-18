<template>
    <q-dialog
        ref="dialogRef"
        transition-show="scale"
        transition-hide="scale"
        no-backdrop-dismiss
        @hide="onDialogHide"
    >
        <q-card class="q-dialog-plugin dialog-card_no-shadow">
            <q-card-section class="row items-center q-pl-lg q-pr-md">
                <div class="text-h6">
                    {{ title }}
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
                <div class="q-px-sm q-mb-sm">
                    {{ message }}
                </div>
            </q-card-section>

            <q-card-actions
                class="q-pa-md dark-1"
                align="right"
            >
                <q-btn
                    :color="okColor ?? 'primary'"
                    unelevated
                    no-caps
                    padding="8px 16px"
                    :label="ok ?? $t('shared.labels.ok')"
                    @click="onOKClick"
                />
                <q-btn
                    flat
                    size="md"
                    padding="8px 16px"
                    no-caps
                    :label="cancel ?? $t('shared.labels.cancel')"
                    @click="onDialogCancel"
                />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
  
<script setup>
import { useDialogPluginComponent } from 'quasar'
import { computed } from 'vue'

const props = defineProps({
    title: String,
    message: String,
    ok: String,
    cancel: String,
    okColor: String
})

defineEmits([
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

// this is part of our example (so not required)
function onOKClick() {
    // on OK, it is REQUIRED to
    // call onDialogOK (with optional payload)
    onDialogOK()
    // or with payload: onDialogOK({ ... })
    // ...and it will also hide the dialog automatically
}
</script>