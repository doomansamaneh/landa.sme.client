<template>
  <change-password @submitted="submitted"></change-password>
</template>

<script setup>
import ChangePassword from "src/components/areas/scr/users/ChangePassword.vue"

function submitted(response) {
  $router.go(-1)
}
</script>

<style lang="scss" scoped></style>
