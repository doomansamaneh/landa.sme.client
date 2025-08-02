<template>
  <q-card-actions align="right" class="q-pa-md bg-main">
    <q-btn
      no-caps
      color="primary"
      class="primary-shadow"
      rounded
      padding="8px 16px"
      unelevated
      @click="configStore.saveAppConfig()"
    >
      <div class="flex q-gutter-sm">
        <q-icon name="save" size="sm" />
        <div class="text-body1">
          {{ $t("shared.labels.save") }}
        </div>
      </div>
    </q-btn>
    <q-btn
      no-caps
      class="q-ml-xs"
      no-cpas
      rounded
      padding="8px 16px"
      unelevated
      @click="configStore.reloadData()"
    >
      <div class="flex q-gutter-sm">
        <q-icon name="refresh" size="sm" />
        <div class="text-body1">
          {{ $t("shared.labels.reloadDefault") }}
        </div>
      </div>
    </q-btn>
  </q-card-actions>
</template>

<script setup>
  import { useAppConfigModel } from "../_composables/useAppConfigModel";

  const configStore = useAppConfigModel();
</script>
