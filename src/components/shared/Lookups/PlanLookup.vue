<template>
  <lookup-view
    dataSource="business/GetPlanLookupData"
    orderByField="title"
    textTemplate="{{ title }}"
    searchField="title"
    ref="lookup"
    :placeholder="$t('page.add-business.plan-lookup.placeholder')"
    :required="true"
    :rules="[(val) => val && val.length > 0]"
  >

  <template #thead>
      <div class="row q-gutter-x-md items-center">
        <div class="col-1">#</div>
        <div class="col q-pr-md">
          <header-column
            fieldName="name"
            title="طرح"
            :lookup="lookup"
          />
        </div>
        <div class="col-2">
          <header-column
            fieldName="code"
            title="ماهانه"
            :lookup="lookup"
          />
        </div>
      </div>
    </template>

    <template #td="{ row, index }">
      <div class="row q-gutter-x-md">
        <div class="col-1 text-caption">{{ index }}</div>
        <div class="col text-caption">{{ row.title }}</div>
        <div class="col-2 text-caption">{{ row.cost.toLocaleString() }}</div>
      </div>
    </template>

  </lookup-view>
</template>

<script setup>
import { ref } from "vue"
import LookupView from "src/components/shared/DataTables/LookupView.vue"
import HeaderColumn from "src/components/shared/Lookups/HeaderColumn.vue"

const lookup = ref(null)
</script>
