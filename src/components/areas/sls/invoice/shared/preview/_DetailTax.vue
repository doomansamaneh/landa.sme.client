<template>
  <div class="row q-py-lg">
    <q-btn color="red" padding="4px 12px" unelevated class="red-shadow">
      <q-icon name="o_arrow_upward" size="xs" class="q-mr-xs" />
      <span>ارسال به سامانه مودیان</span>
    </q-btn>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  item: Object,
  formStore: Object,
});

const route = useRoute();

const id = computed(() => props.item?.id ?? route.params.id);

onMounted(() => {
  //formStore.getById(id.value);
});
</script>
