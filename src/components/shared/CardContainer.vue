<template>
  <q-card class="q-card-desktop">
    <slot name="business-card-data-view"></slot>
  </q-card>
</template>

<script setup></script>

<style>
.q-card-desktop {
  width: 620px !important;
}

.business-name {
  max-width: 150px;
}
</style>
