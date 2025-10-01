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
        <!-- <q-space />
        <q-btn no-caps
          icon="close"
          class="icon-hover dark-3"
          flat
          round
          dense
          v-close-popup
        /> -->
      </q-card-section>

      <q-card-section>
        <q-list>
          <q-item-label header>
            <div class="q-gutter-y-md">
              {{ $t("shared.labels.invoiceRegisteredSuccessfully") }}
              <div>
                {{ $t("shared.labels.no") }}:
                <span class="text-h6 text-weight-700">
                  {{ responseData.no }}
                </span>
              </div>
              <div>{{ $t("shared.labels.selectNextStep") }}</div>
            </div>
          </q-item-label>
          <!-- padding
          bordered
          class="rounded-borders"
          style="max-width: 350px" -->

          <q-item
            clickable
            v-ripple
            :to="`/${baseRoute}/preview/${responseData.id}`"
            class="rounded-borders"
          >
            <q-item-section avatar top>
              <q-avatar
                icon="print"
                color="primary"
                text-color="white"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">
                {{ $t("shared.labels.preview") }}
              </q-item-label>
              <q-item-label caption>
                {{ $t("shared.labels.previewAndPrint") }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item class="rounded-borders" clickable v-ripple>
            <q-item-section avatar top>
              <q-avatar
                icon="payment"
                color="orange"
                text-color="white"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">
                {{ $t("shared.labels.receipt") }}
              </q-item-label>
              <q-item-label caption>
                {{ $t("shared.labels.receiveAccountBalance") }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple class="rounded-borders">
            <q-item-section avatar top>
              <q-avatar icon="mail" color="teal" text-color="white" />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">
                {{ $t("shared.labels.sendEmail") }}
              </q-item-label>
              <q-item-label caption>
                {{ $t("shared.labels.sendPdfEmailDescription") }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator class="q-my-sm" />

          <q-item class="rounded-borders" clickable v-ripple>
            <q-item-section avatar top>
              <q-avatar
                icon="assignment"
                color="grey"
                text-color="white"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">
                {{ $t("shared.labels.accountingDocument") }}
              </q-item-label>
              <q-item-label caption>
                {{
                  $t(
                    "shared.labels.viewAccountingDocumentDescription"
                  )
                }}
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
