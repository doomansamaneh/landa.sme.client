<template>
  <q-item
    v-for="item in dataSource.model.value"
    :key="item.id"
    class="q-pr-sm q-pl-none q-pb-md border-radius-xs text-on-dark"
  >
    <div class="row q-gutter-x-sm items-center">
      <q-avatar
        class="primary-gradient primary-shadow border-radius-xs"
        square
        v-if="item.picture"
        text-color="white"
        size="58px"
      >
        <img :src="item.picture" />
      </q-avatar>

      <q-avatar
        class="border-radius-xs"
        square
        size="58px"
        text-color="white"
        :style="helper.generateAvatarStyle(item.id)"
        v-else
      >
        <div class="char text-body1 text-bold">
          {{ helper.getFirstChar(item.label) }}
        </div>
      </q-avatar>
    </div>

    <div class="row items-center justify-between full-width">
      <div class="col-9 q-pl-lg column">
        <span class="text-body3 no-letter-spacing">
          {{ item.label }}
        </span>
        <span class="text-body3 no-letter-spacing">
          <span>موجودی:</span>
          <span class="text-weight-600 q-px-xs">
            {{ helper.formatNumber(item.amount) }}
          </span>
        </span>
      </div>
      <div class="col row justify-end items-center">
        <goto-detail :to="`/acc/accountDL/Preview/${item.id}`" />
      </div>
    </div>
  </q-item>
</template>

<script setup>
  import { helper } from "src/helpers";
  import { useBankAccount } from "../../acc/_composables/useBankAccount";

  import GotoDetail from "src/components/shared/buttons/GotoDetail.vue";

  const props = defineProps({
    dataSource: useBankAccount,
  });
</script>
