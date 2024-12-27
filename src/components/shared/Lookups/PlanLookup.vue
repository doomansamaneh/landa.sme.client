<template>
  <lookup-view
    dataSource="business/GetPlanLookupData"
    sortColumn="title"
    textTemplate="{{ title }}"
    searchField="title"
    columns="code,title"
    ref="lookup"
    :placeholder="$t('page.add-business.plan-lookup.placeholder')"
    :required="true"
    :rules="[(val) => val && val.length > 0]"
  >
    <template #thead>
      <!-- <div class="row items-center q-col-gutter-md_">
        <div style="width: 20px">#</div>
        <div class="col-8">
          <header-column
            fieldName="title"
            :title="$t('shared.labels.plan')"
            :data-source="lookup.dataSource"
          />
        </div>
        <div class="col">
          <header-column
            fieldName="cost"
            :title="$t('shared.labels.monthly')"
            :data-source="lookup.dataSource"
          />
        </div>
      </div> -->
    </template>

    <template #td="{ row, index }">
      <div class="row items-center q-col-gutter-md_ q-pa-md">
        <div style="width: 20px" class="text-body3 no-letter-spacing">{{ index }}</div>
        <div class="col-8 text-body2 no-letter-spacing">{{ row.title }}</div>
        <div class="col text-body2 no-letter-spacing">{{ row.cost.toLocaleString() }}</div>
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
