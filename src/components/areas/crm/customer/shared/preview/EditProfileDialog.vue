<template>
  <q-dialog
    ref="dialogRef"
    transition-show="slide-down"
    transition-hide="fade"
    transition-duration="600"
    no-backdrop-dismiss
  >
    <edit-profile />
  </q-dialog>
</template>

<script setup>
import EditProfile from "./editProfile/EditProfile.vue";
</script>
