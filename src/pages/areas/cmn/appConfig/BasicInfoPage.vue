<template>
  <div
    :class="$q.screen.gt.sm ? 'flex items-center justify-center' : ''"
  >
    <div>
      <div>
        <div class="row items-center justify-between q-mb-md">
          <div class="text-h6 text-weight-700">اطلاعات اصلی</div>
          <back-button />
        </div>
        <index-view />
      </div>
    </div>
  </div>
</template>

<script setup>
  import IndexView from "src/components/areas/cmn/appConfig/BasicInfo.vue";
  import BackButton from "src/components/shared/buttons/GoBackLink.vue";
</script>

<style lang="scss">
  .settings-card {
    width: 900px;
  }
</style>
