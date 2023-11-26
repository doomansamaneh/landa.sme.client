<template>
  <lookup-view
    dataSource="cmn/product/getlookupData"
    orderByField="code"
    textTemplate="{{ code }} {{ title }}"
    searchField="title"
    ref="lookup"
  >
    <template #thead>
      <div
        class="row q-gutter-x-md items-center"
        style="width: 200px;"
      >
        <div class="col-5 q-pr-md">
          <header-column
            fieldName="code"
            title="کد"
            :lookup="lookup"
          />
        </div>
        <div class="col-4">
          <header-column
            fieldName="title"
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

    <template #td="{ row }">
      <q-item
        clickable
        v-close-popup
      >
        <div class="row q-gutter-x-sm items-center q-my-sm">
          <q-avatar
            class="border-radius-xs"
            square
            v-if="row.picture"
            color="primary"
            text-color="white"
            size="58px"
          >
            <img :src="row.picture">
          </q-avatar>

          <q-avatar
            class="border-radius-xs"
            square
            size="58px"
            color="primary"
            text-color="white"
            v-else
          >
            <div class="char text-body1 text-bold">
              {{ helper.getFirstChar(row.title) }}
            </div>
          </q-avatar>
        </div>
        <q-item-section class="q-pl-md">
          <q-item-label class="text-caption">{{ row.title }}</q-item-label>
          <q-item-label class="text-caption-sm"><span class="text-caption-sm text-bold">موجودی: </span>{{ row.stock
          }}</q-item-label>
          <q-item-label class="text-caption-sm"><span class="text-caption-sm text-bold">قیمت فروش: </span>{{
            row.price.toLocaleString() }}</q-item-label>
        </q-item-section>

      </q-item>
    </template>
  </lookup-view>
</template>

<script setup>
import { ref } from "vue"
import LookupView from "src/components/shared/DataTables/LookupView.vue"
import HeaderColumn from "src/components/shared/Lookups/HeaderColumn.vue"
import { helper } from "src/helpers"

const lookup = ref(null)

defineExpose({
  lookup
})
</script>
