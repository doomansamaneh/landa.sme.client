<template>
  <lookup-view
    ref="lookup"
    dataSource="business/GetPlanLookupData"
    sortColumn="title"
    textTemplate="{{ title }}"
    searchField="title"
    columns="code,title"
    :placeholder="$t('page.add-business.plan-lookup.placeholder')"
    :required="true"
  >
    <template #td="{ row, index }">
      <div class="row items-center q-col-gutter-md_ q-pa-md">
        <div style="width: 20px" class="text-body3 no-letter-spacing">
          {{ index }}
        </div>
        <div class="col-8 text-body2 no-letter-spacing">
          {{ row.title }}
        </div>
        <div class="col text-body2 no-letter-spacing">
          {{ row.cost.toLocaleString() }}
        </div>
      </div>
    </template>
  </lookup-view>
</template>

<script setup>
  import { ref } from "vue";

  import LookupView from "src/components/shared/dataTables/LookupView.vue";

  const lookup = ref(null);

  defineExpose({
    lookup,
  });
</script>
