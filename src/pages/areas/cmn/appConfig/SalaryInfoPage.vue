<template>
  <div
    :class="$q.screen.gt.sm ? 'flex items-center justify-center' : ''"
  >
    <div>
      <div>
        <div class="row items-center justify-between q-mb-md">
          <div class="text-h6 text-weight-700">حقوق و دستمزد</div>
          <back-button />
        </div>
        <index-view />
      </div>
    </div>
  </div>
</template>

<script setup>
  import IndexView from "src/components/areas/cmn/appConfig/SalaryInfo.vue";
  import BackButton from "src/components/shared/buttons/GoBackLink.vue";
</script>
