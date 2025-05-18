<template>
  <q-card bordered>
    <q-card-section :class="$q.screen.gt.xs ? 'q-pa-lg' : 'q-pa-md'">
      <setting-form :config-store="configStore" />
    </q-card-section>

    <q-card-actions align="right" class="q-pa-md dark-1">
      <q-btn
        color="primary"
        class="primary-shadow"
        rounded
        no-caps
        padding="8px 16px"
        unelevated
        @click="configStore.saveSetting()"
      >
        <div class="flex q-gutter-sm">
          <q-icon name="save" size="sm" />
          <div class="text-body1">
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
          <div class="text-body1">
            {{ $t("shared.labels.reloadDefault") }}
          </div>
        </div>
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup>
  import { onMounted } from "vue";

  import { usePublicApiModel } from "../_composables/usePublicApiModel";
  import SettingForm from "./PluginInfoForm.vue";

  const configStore = usePublicApiModel();

  onMounted(() => {
    configStore.loadData();
  });
</script>
