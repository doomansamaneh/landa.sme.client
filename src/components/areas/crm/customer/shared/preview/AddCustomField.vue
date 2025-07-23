<template>
  <q-dialog
    ref="dialogRef"
    transition-show="slide-down"
    transition-hide="fade"
    transition-duration="600"
    no-backdrop-dismiss
  >
    <q-card class="dialog-card no-shadow" style="width: 600px">
      <q-card-section class="row items-center q-px-lg">
        <div class="text-h6">ایجاد ویژگی‌ها</div>
        <q-space />
        <q-btn
          no-caps
          icon="close"
          class="icon-hover dark-3"
          flat
          round
          dense
          v-close-popup
        />
      </q-card-section>
      <q-card-section>
        <div class="row q-gutter-md q-px-sm q-pb-sm">
          <div class="col">
            <div>
              <q-item-label caption class="q-mb-sm">
                عنوان
              </q-item-label>
              <q-input v-model="text" outlined dense />
            </div>
          </div>
          <div class="col">
            <div>
              <q-item-label caption class="q-mb-sm">
                مقدار
              </q-item-label>
              <q-input v-model="text" outlined dense />
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-actions class="q-pa-md dark-1">
        <div class="row q-gutter-sm">
          <q-btn
            no-caps
            type="submit"
            @click="okClicked"
            color="primary"
            unelevated
            no-caps
            padding="8px 16px"
          >
            {{ $t("shared.labels.save") }}
          </q-btn>
          <q-btn
            no-caps
            type="submit"
            @click="okClicked"
            color="negative"
            unelevated
            no-caps
            padding="8px 16px"
          >
            {{ $t("shared.labels.saveAndNew") }}
          </q-btn>
          <q-btn
            no-caps
            unelevated
            v-close-popup
            no-caps
            padding="8px 16px"
          >
            {{ $t("shared.labels.cancel") }}
          </q-btn>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import Actions from "src/components/shared/forms/FormCardActions.vue";
</script>

<style scoped>
  .q-item__label--caption {
    font-size: 16px;
    letter-spacing: 0;
    color: #697588;
  }
</style>
