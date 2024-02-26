<template>
  <!-- <mobile
    v-if="$q.screen.xs"
    :title="$t('main-menu-items.Crm_Customer_View')"
  />

  <desktop v-else toolbar :title="$t('main-menu-items.Crm_Customer_View')" /> -->

  <desktop toolbar :title="$t('main-menu-items.Crm_Customer_View')" />
</template>

<script setup>
import { ref } from "vue";

import Desktop from "components/areas/crm/customer/desktop/preview/IndexView.vue";
//import Mobile from "components/areas/crm/customer/mobile/preview/IndexView.vue";
</script>
