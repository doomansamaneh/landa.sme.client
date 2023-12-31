<template>
  <q-footer
    bordered
    class="bg-grey-3 text-primary"
  >
    <q-tabs
      no-caps
      active-color="primary"
      indicator-color="transparent"
      class="text-grey-8"
      v-model="tab"
    >
      <q-tab
        name="images"
        label="Images"
      />
      <q-tab
        name="videos"
      label="Videos"
    />
    <q-tab
      name="articles"
      label="Articles"
    />
  </q-tabs>
</q-footer></template>

<script setup>

</script>
