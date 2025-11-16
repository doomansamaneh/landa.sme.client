<template>
  <q-btn
    v-if="statusId === voucherStatus.init"
    no-caps
    padding="0 8px"
    unelevated
    class="grey-gradient text-white text-center text-caption-xs border-radius-lg no-pointer-events"
    style="white-space: nowrap"
  >
    {{
      $t(
        `shared.voucherStatus.${helper.getEnumType(
          statusId,
          voucherStatus
        )}`
      )
    }}
  </q-btn>
  <q-btn
    v-else-if="statusId === voucherStatus.final"
    no-caps
    padding="0 8px"
    unelevated
    class="green-gradient text-white text-center text-caption-xs border-radius-lg no-pointer-events"
    style="white-space: nowrap"
  >
    {{
      $t(
        `shared.voucherStatus.${helper.getEnumType(
          statusId,
          voucherStatus
        )}`
      )
    }}
  </q-btn>
  <q-btn
    v-else
    no-caps
    padding="0 8px"
    unelevated
    class="red-gradient text-white text-center text-caption-xs border-radius-lg no-pointer-events"
    style="white-space: nowrap"
  >
    <template v-if="title">
      {{ title }}
    </template>
    <template v-else>
      {{
        $t(
          `shared.voucherStatus.${helper.getEnumType(
            statusId,
            voucherStatus
          )}`
        )
      }}
    </template>
  </q-btn>
</template>

<script setup>
  import { voucherStatus } from "src/constants";
  import { helper } from "src/helpers";

  const props = defineProps({
    title: String,
    statusId: String,
  });
</script>
