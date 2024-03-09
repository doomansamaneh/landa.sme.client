<template>
  <div class="row q-gutter-sm items-center">
    <q-btn
      round
      class="text-on-dark text-caption"
      :to="`/${baseRoute}/edit/${item.id}`"
      unelevated
    >
      <q-icon name="o_edit" size="20px" />
      <q-tooltip class="custom-tooltip">
        {{ $t("shared.labels.edit") }}
      </q-tooltip>
    </q-btn>

    <q-btn
      round
      class="text-on-dark text-caption"
      :to="`/${baseRoute}/copy/${item.id}`"
      unelevated
    >
      <q-icon name="o_copy" size="20px" />
      <q-tooltip class="custom-tooltip">
        {{ $t("shared.labels.copy") }}
      </q-tooltip>
    </q-btn>

    <q-btn
      round
      class="text-on-dark text-caption"
      unelevated
      @click="crudStore.deleteById(item.id, tableStore?.reloadData)"
    >
      <q-icon name="o_delete" size="20px" />
      <q-tooltip class="custom-tooltip">
        {{ $t("shared.labels.delete") }}
      </q-tooltip>
    </q-btn>

    <slot name="more-items"></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  baseRoute: String,
  item: Object,
  tableStore: Object,
  crudStore: Object,
});
</script>
