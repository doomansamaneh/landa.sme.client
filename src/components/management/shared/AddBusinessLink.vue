<template>
  <q-btn
    no-caps
    rounded
    class="text-white primary-gradient primary-shadow"
    unelevated
    padding="8px 16px"
  >
    <router-link
      to="/business/addBusiness"
      class="flex items-center no-decoration text-white"
    >
      <q-icon name="add" class="q-pr-xs" size="16px" />
      {{ $t("pages.add-new-business") }}
    </router-link>
  </q-btn>
</template>
