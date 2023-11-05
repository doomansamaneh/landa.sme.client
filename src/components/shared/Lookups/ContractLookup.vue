<template>
  <lookup-view
    dataSource="doc/contract/getlookupData"
    orderByField="no"
    textTemplate="{{ no }} {{ title }}"
    columns="no,title"
    searchField="title"
    ref="lookup"
  >
  <template #thead>
      <div class="row items-center">
        <div class="col-1">#</div>
        <div class="col-2">
          <header-column
            fieldName="code"
            title="کد"
            :lookup="lookup"
          />
        </div>
        <div class="col q-pr-md">
          <header-column
            fieldName="name"
            title="شماره"
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
      <div class="col-2 row items-center text-caption">{{ row.no }}</div>
      <div class="col-2 row items-center text-caption">{{ row.title }}</div>
    </template>
  </lookup-view>
</template>

<script setup>
import { ref } from "vue"
import LookupView from "src/components/shared/DataTables/LookupView.vue"
import HeaderColumn from "src/components/shared/Lookups/HeaderColumn.vue"

const lookup = ref(null)

defineExpose({
  lookup
})
</script>
