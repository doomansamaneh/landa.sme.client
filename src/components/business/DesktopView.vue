<template>
  <card-container>
    <template #business-card-data-view>
      <data-view dataSource="business/getBusinessGridData" />
    </template>
  </card-container>
</template>

<script setup>
import DataView from "../../components/shared/DataView.vue"
import CardContainer from "../../components/shared/CardContainer.vue"
</script>
