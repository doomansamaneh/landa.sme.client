<template>
  <q-dialog
    ref="dialogRef"
    transition-show="slide-down"
    transition-hide="fade"
    transition-duration="600"
    no-backdrop-dismiss
    maximized
  >
    <edit-profile />
  </q-dialog>
</template>

<script setup>
import EditProfile from "src/components/areas/crm/customer/mobile/preview/EditProfile.vue";
</script>
