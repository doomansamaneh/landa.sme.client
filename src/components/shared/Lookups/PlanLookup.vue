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

    <template #thead-cols="{ tableStore }">
      <div class="col">
        <header-column
          fieldName="title"
          title="عنوان"
          :table-store="tableStore"
        />
      </div>
      <div class="col-2">
        <header-column
          fieldName="cost"
          title="هزینه"
          :table-store="tableStore"
        />
      </div>
    </template>

    <template #tbody-index="{ index }">
      <div>{{ index + 1 }}</div>
    </template>

    <template #tbody-cols="{ item }">
      <div class="col">
        <span class="q-mr-sm text-body2">
          {{ item.title }}
        </span>
      </div>
      <div class="col-2">
        <span class="text-body2">
          {{ item.cost.toLocaleString() }}
        </span>
      </div>
    </template>
  </lookup-view>
</template>

<script setup>
  import { ref } from "vue";

  import LookupView from "src/components/shared/dataTables/LookupView.vue";
  import HeaderColumn from "src/components/shared/lookups/_HeaderColumn.vue";

  const lookup = ref(null);

  defineExpose({
    lookup,
  });
</script>
