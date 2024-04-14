<template>
  <lookup-view
    dataSource="cmn/product/getlookupData"
    sortColumn="code"
    textTemplate="{{ code }} {{ title }}"
    columns="code,title"
    :filterExpression="filterExpression"
    ref="lookup"
  >
    <template #td="{ row }">
      <q-item clickable v-close-popup>
        <div class="row q-gutter-x-sm items-center q-my-sm">
          <q-avatar
            class="border-radius-xs"
            square
            v-if="row.picture"
            color="primary"
            text-color="white"
            size="58px"
          >
            <img :src="row.picture" />
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
          <q-item-label class="text-caption">
            {{ row.code }} - {{ row.title }}
          </q-item-label>
          <q-item-label class="text-caption-sm"
            ><span class="text-caption-sm text-bold">موجودی: </span
            >{{ row.stock }}</q-item-label
          >
          <q-item-label class="text-caption-sm"
            ><span class="text-caption-sm text-bold">قیمت فروش: </span
            >{{ row.price.toLocaleString() }}</q-item-label
          >
        </q-item-section>
      </q-item>
    </template>
  </lookup-view>
</template>

<script setup>
import { ref } from "vue";
import { helper } from "src/helpers";

import LookupView from "src/components/shared/dataTables/LookupView.vue";
import HeaderColumn from "src/components/shared/lookups/_HeaderColumn.vue";

const props = defineProps({
  filterExpression: Array,
});
const lookup = ref(null);

defineExpose({
  lookup,
});
</script>
