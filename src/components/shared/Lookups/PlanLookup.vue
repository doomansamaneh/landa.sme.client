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
      <div class="row items-center q-col-gutter-md_">
        <div style="width: 20px;">#</div>
        <div class="col-8">
          <header-column
            fieldName="title"
            title="طرح"
            :lookup="lookup"
          />
        </div>
        <div class="col">
          <header-column
            fieldName="cost"
            title="ماهانه"
            :lookup="lookup"
          />
        </div>
      </div>
    </template>

    <template #td="{ row, index }">
      <div class="row items-center q-col-gutter-md_ q-pa-md">
        <div style="width: 20px;" class="text-caption">{{ index }}</div>
        <div class="col-8 text-caption">{{ row.title }}</div>
        <div class="col text-caption">{{ row.cost.toLocaleString() }}</div>
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
