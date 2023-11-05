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
      <div class="row items-center">
        <div class="col-1">#</div>
        <div class="col-7">
          <header-column
            fieldName="code"
            :title="$t('page.add-business.plan-lookup.plan')"
            :lookup="lookup"
          />
        </div>
        <div class="col q-ml-lg">
          <header-column
            fieldName="name"
            :title="$t('page.add-business.plan-lookup.per-month')"
            :lookup="lookup"
          />
        </div>
        <q-btn
          dense
          unelevated
          color="primary"
          class="q-py-sm q-px-md"
          rounded
        >
          <q-icon
            name="o_add"
            size="xs"
            class="q-pr-xs"
          />
          <span class="text-caption">ایجاد</span>
        </q-btn>
      </div>
    </template>

    <template #td="{ row, index }">
      <div class="col-1 row items-center text-caption">{{ index + 1 }}</div>
      <div class="col-7 row items-center text-caption">{{ row.title }}</div>
      <div class="col row items-center text-caption q-ml-lg">{{ row.cost.toLocaleString() }}</div>
    </template>

  </lookup-view>
</template>

<script setup>
import { ref } from "vue"
import LookupView from "src/components/shared/DataTables/LookupView.vue"
import HeaderColumn from "src/components/shared/Lookups/HeaderColumn.vue"

const lookup = ref(null)
</script>
