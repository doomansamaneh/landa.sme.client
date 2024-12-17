<template>
  <div
    :class="$q.screen.gt.sm ? 'flex items-center justify-center' : ''"
  >
    <div>
      <toolbar title="درون‌ریزی اطلاعات" />
      <index-view />
    </div>
  </div>
</template>

<script setup>
  import Toolbar from "components/shared/forms/FormToolbar.vue";
  import IndexView from "src/components/areas/cmn/appConfig/ImportData.vue";
  import BackButton from "src/components/shared/buttons/GoBackLink.vue";
</script>
