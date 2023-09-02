<template>
  <q-btn
    rounded
    class="service-extension text-caption"
    size="12px"
    no-caps
    outline
    unelevated
    padding="6px 12px"
  >
    <router-link to="/business/addBusiness">
      <q-icon
        name="add"
        class="q-pr-xs"
        size="14px"
      />
      {{ $t("page.buttons.add-new-business-tooltip") }}
    </router-link>
  </q-btn>
</template>

<script setup></script>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
</style>
