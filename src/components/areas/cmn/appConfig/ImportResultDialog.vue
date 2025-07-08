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
          نتیجه درون‌ریزی اطلاعات
        </div>
      </q-card-section>

      <q-card-section>
        <q-list>
          <q-item-label header>
            <div class="q-gutter-y-md">
              <div>
                تعداد کل سطرها:
                <span class="text-h6 text-weight-700">
                  {{ importResult.count.toLocaleString() }}
                </span>
              </div>
              <div>
                تعداد import شده:
                <span class="text-h6 text-weight-700">
                  {{ importResult.importedCount.toLocaleString() }}
                </span>
              </div>
              <div>
                تعداد خطا:
                <span class="text-h6 text-weight-700">
                  {{ importResult.errorList.length.toLocaleString() }}
                </span>
              </div>
              <div v-if="importResult.errorList?.length">
                <q-btn
                  no-caps
                  rounded
                  unelevated
                  padding="8px 16px"
                  :label="ok ?? $t('shared.labels.download')"
                  icon="download"
                  @click="handleDownloadError"
                />
                <ul>
                  <li
                    v-for="(item, index) in importResult.errorList"
                    :key="index"
                  >
                    {{ index + 1 }}. {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </q-item-label>
        </q-list>
      </q-card-section>

      <q-card-actions class="q-pa-md dark-1" align="right">
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
  import { bus } from "src/helpers";

  const props = defineProps({
    importResult: Object,
  });

  const emit = defineEmits([...useDialogPluginComponent.emits]);

  const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
    useDialogPluginComponent();

  const handleDownloadError = () => {
    bus.emit("download-import-error");
  };

  function onOKClick() {
    onDialogOK();
  }
</script>
