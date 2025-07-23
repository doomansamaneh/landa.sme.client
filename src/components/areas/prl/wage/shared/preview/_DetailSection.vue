<template>
  <q-card bordered>
    <q-card-section class="q-gutter-md">
      <div class="q-gutter-sm">
        <span class="text-caption">شماره:</span>
        <span class="text-weight-700">{{ model.value.no }}</span>
      </div>
      <div v-if="relationModel?.url">
        <q-btn no-caps :to="`/${relationModel.url}`" flat_unelevated>
          <span>مشاهده سند اصلی</span>
          <q-icon name="o_arrow_back" size="xs" class="q-ml-xs" />
        </q-btn>
      </div>
    </q-card-section>

    <q-card-section v-if="model.value.id">
      <detail-log />
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref, watch } from "vue";

  import DetailLog from "./_DetailLog.vue";

  const props = defineProps({
    model: Object,
    formStore: Object,
  });

  const relationModel = ref(null);

  const fetchRelation = async (id) => {
    const responseData = await props.formStore.getRelation(id);
    relationModel.value = responseData;
  };

  watch(
    () => props.model.value.id,
    (newId) => {
      if (newId) {
        fetchRelation(newId);
      }
    },
    { immediate: true }
  );
</script>
