<template>
  <q-btn
    rounded
    class="text-body1 no-letter-spacing"
    no-caps
    outline
    color="primary"
    unelevated
    padding="6px 12px"
  >
    <router-link to="/business/addBusiness">
      <q-icon
        name="add"
        class="q-pr-xs"
        size="16px"
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
