<template>
  <!-- <q-card-actions align="right" class="q-pa-md bg-on-dark"> -->
  <q-card-section class="bg-on-dark flex justify-end">
    <q-btn
      no-caps
      class="primary-gradient primary-shadow text-white text-body2"
      rounded
      unelevated
      @click="configStore.saveAppConfig()"
    >
      <q-icon name="o_save" size="20px" class="q-mr-xs" />
      {{ $t("shared.labels.save") }}
    </q-btn>
    <q-btn
      no-caps
      no-cpas
      rounded
      unelevated
      @click="configStore.reloadData()"
      class="q-ml-xs text-body2"
    >
      <q-icon name="refresh" size="20px" class="q-mr-xs" />
      {{ $t("shared.labels.reloadDefault") }}
    </q-btn>
  </q-card-section>

  <!-- </q-card-actions> -->
</template>

<script setup>
  import { useAppConfigModel } from "../_composables/useAppConfigModel";

  const configStore = useAppConfigModel();
</script>
