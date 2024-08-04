<template>
  <q-btn
    color="primary"
    class="text-lowercase primary-shadow q-ml-xs"
    rounded
    unelevated
    use
    @click="configStore.saveAppConfig()"
  >
    <q-icon name="save" class="q-px-xs" size="xs" />
    {{ $t("shared.labels.save") }}
  </q-btn>
  <q-btn
    color="info"
    class="text-lowercase q-ml-xs"
    rounded
    unelevated
    use
    @click="configStore.reloadData()"
  >
    <q-icon name="refresh" class="q-px-xs" size="xs" />
    {{ $t("shared.labels.reloadDefault") }}
  </q-btn>
</template>

<script setup>
  import { useAppConfigModel } from "../_composables/useAppConfigModel";

  const configStore = useAppConfigModel();
</script>
