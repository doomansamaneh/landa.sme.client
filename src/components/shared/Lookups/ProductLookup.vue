<template>
  <lookup-view
    ref="lookup"
    dataSource="cmn/product/getlookupData"
    sortColumn="code"
    textTemplate="{{ code }} {{ title }}"
    columns="code,title"
    :filterExpression="filterExpression"
    class="productLookup"
    show-add
    :create-form="CreateForm"
  >
    <template #td="{ row }">
      <q-item
        class="border-radius-xs"
        style="padding: 12px"
        clickable
        v-close-popup
      >
        <div class="row items-center">
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
            text-color="white"
            :style="helper.generateAvatarStyle(row.id)"
            v-else
          >
            <div class="char text-body2 no-letter-spacing text-bold">
              {{ helper.getFirstChar(row.title) }}
            </div>
          </q-avatar>
        </div>
        <q-item-section class="q-pl-md">
          <q-item-label class="text-body3 no-letter-spacing">
            {{ row.code }} - {{ row.title }}
          </q-item-label>
          <q-item-label class="text-body2 no-letter-spacing">
            <span class="text-body3 no-letter-spacing text-bold">
              موجودی:
            </span>
            {{ row.stock }}
          </q-item-label>
          <q-item-label class="text-body2 no-letter-spacing">
            <span class="text-body3 no-letter-spacing text-bold">
              قیمت فروش:
            </span>
            {{ row.price.toLocaleString() }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </lookup-view>
</template>

<script setup>
  import { ref } from "vue";
  import { helper } from "src/helpers";

  import LookupView from "src/components/shared/dataTables/LookupView.vue";
  import CreateForm from "src/components/areas/cmn/product/shared/forms/CreateForm.vue";

  const props = defineProps({
    filterExpression: Array,
  });
  const lookup = ref(null);

  defineExpose({
    lookup,
  });
</script>
