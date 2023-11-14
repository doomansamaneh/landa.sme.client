<template>
  <lookup-view
    dataSource="cmn/product/getlookupData"
    orderByField="code"
    textTemplate="{{ code }} {{ title }}"
    searchField="title"
    ref="lookup"
  >
    <template #thead>
      <div class="row q-gutter-x-md items-center">
        <div class="col-1">#</div>
        <div class="col-2 q-pr-md">
          <header-column
            fieldName="name"
            title="کد"
            :lookup="lookup"
          />
        </div>
        <div class="col">
          <header-column
            fieldName="code"
            title="عنوان"
            :lookup="lookup"
          />
        </div>
        <q-btn
          dense
          unelevated
          color="primary"
          class="absolute-top-right q-py-xs q-px-sm q-mr-sm"
          style="margin-top: 12px;"
          rounded
          size="12px"
        >
          <q-icon
            name="o_add"
            size="14px"
            style="margin-left: 2px;"
          />
          <span class="text-caption">ایجاد</span>
        </q-btn>
      </div>
    </template>

    <template #td="{ row, index }">
      <div class="row q-gutter-x-md">
        <div class="col-1 text-caption">{{ index }}</div>
        <div class="col-2 text-caption">{{ row.code }}</div>
        <div class="col text-caption">{{ row.title }}</div>
      </div>
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
