<template>
  <q-btn
    color="primary"
    class="primary-shadow"
    rounded
    no-caps
    padding="8px 16px"
    unelevated
    @click="configStore.saveAppConfig()"
  >
    <div class="flex q-gutter-sm">
      <q-icon name="save" size="sm" />
      <div class="text-body1 no-letter-spacing">
        {{ $t("shared.labels.save") }}
      </div>
    </div>
  </q-btn>
  <q-btn
    class="q-ml-xs"
    no-cpas
    rounded
    padding="8px 16px"
    unelevated
    @click="configStore.reloadData()"
  >
    <div class="flex q-gutter-sm">
      <q-icon name="refresh" size="sm" />
      <div class="text-body1 no-letter-spacing">
        {{ $t("shared.labels.reloadDefault") }}
      </div>
    </div>
  </q-btn>
</template>

<script setup>
  import { useAppConfigModel } from "../_composables/useAppConfigModel";

  const configStore = useAppConfigModel();
</script>
