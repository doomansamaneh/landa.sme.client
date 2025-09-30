<template>
  <q-dialog
    ref="dialogRef"
    transition-show="scale"
    transition-hide="scale"
    no-backdrop-dismiss
    @hide="onDialogHide"
  >
    <q-card class="q-dialog-plugin">
      <q-card-section class="row items-center q-pa-md">
        <div class="text-h5 text-weight-700">
          {{ $t("shared.labels.operationResult") }}
        </div>
      </q-card-section>

      <q-card-section>
        <q-list>
          <q-item-label header>
            <div class="q-gutter-y-md">
              {{ $t("shared.labels.customerCreatedSuccessfully") }}
            </div>
          </q-item-label>
          <q-item
            clickable
            v-ripple
            :to="`/${baseRoute}/preview/${responseData.id}`"
            class="rounded-borders"
          >
            <q-item-section avatar top>
              <q-avatar
                icon="group"
                color="primary"
                text-color="white"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label lines="1">
                {{ $t("shared.labels.viewProfile") }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-actions class="q-pa-md bg-main" align="right">
        <q-btn
          no-caps
          rounded
          :color="okColor ?? 'primary'"
          unelevated
          padding="8px 16px"
          :label="ok ?? $t('shared.labels.ok')"
          icon="check"
          @click="onOKClick"
        />
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

  defineEmits([...useDialogPluginComponent.emits]);

  const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
    useDialogPluginComponent();

  function onOKClick() {
    onDialogOK();
  }
</script>
