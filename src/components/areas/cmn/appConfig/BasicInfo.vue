<template>
  <q-card bordered>
    <q-card-section :class="$q.screen.gt.xs ? 'q-pa-lg' : 'q-pa-md'">
      <setting-form />
    </q-card-section>

    <save-button />
  </q-card>
</template>

<script setup>
  import SaveButton from "./_SaveSettingButton.vue";
  import SettingForm from "./BasicInfoForm.vue";
</script>
