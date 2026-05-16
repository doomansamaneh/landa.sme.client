<template>
  <div
    :class="$q.screen.gt.sm ? 'flex items-center justify-center' : ''"
  >
    <div class="theme-settings-container">
      <form-toolbar :title="$t('shared.subSystem.accounting')" />
      <index-view />
    </div>
  </div>
</template>

<script setup>
  import IndexView from "src/components/areas/cmn/appConfig/AccountingInfo.vue";
  import FormToolbar from "src/components/shared/forms/FormToolbar.vue";
</script>
