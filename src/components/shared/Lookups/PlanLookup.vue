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
      <thead class="lookup-table-head">
        <tr class="">
          <th
            class=""
            style="width: 1px"
          >
            <span>#</span>
          </th>
          <th class="text-left">
            <header-column
              fieldName="title"
              :title="$t('page.add-business.plan-lookup.plan')"
              :lookup="lookup"
            ></header-column>
          </th>
          <th
            class=""
            style="width: 23%"
          >
            <header-column
              fieldName="cost"
              :title="$t('page.add-business.plan-lookup.per-month')"
              :lookup="lookup"
            ></header-column>
          </th>
        </tr>
      </thead>
    </template>

    <template #td="{ row, index }">
      <td>{{ index + 1 }}</td>
      <td>
        <span>{{ row.title }}</span>
      </td>
      <td>
        <span>{{ row.cost.toLocaleString() }}</span>
      </td>
    </template>
  </lookup-view>
</template>

<script setup>
import { ref } from "vue"
import LookupView from "src/components/shared/DataTables/LookupView.vue"
import HeaderColumn from "src/components/shared/Lookups/HeaderColumn.vue"

const lookup = ref(null)
</script>
