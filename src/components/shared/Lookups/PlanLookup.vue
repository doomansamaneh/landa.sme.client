<template>
  <lookup-view
    ref="lookup"
    dataSource="business/GetPlanLookupData"
    sortColumn="title"
    textTemplate="{{ title }}"
    searchField="title"
    columns="title,cost"
    :placeholder="$t('page.add-business.plan-lookup.placeholder')"
    required
  >
    <template #thead-index>
      <div>#</div>
    </template>

    <template #thead-cols>
      <div class="col">عنوان</div>
      <div class="col-1">هزینه</div>
    </template>

    <template #tbody-index="{ index }">
      <div>{{ index + 1 }}</div>
    </template>

    <template #tbody-cols="{ item }">
      <div class="col">
        <span class="q-mr-sm text-body2 no-letter-spacing">
          {{ item.title }}
        </span>
      </div>
      <div class="col-1">
        <span class="text-body2 no-letter-spacing">
          {{ item.cost.toLocaleString() }}
        </span>
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
