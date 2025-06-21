<template>
  <toolbar-container
    v-if="model"
    :inside="inside"
    :title="title"
    :base-route="baseRoute"
    :model="model"
    :crud-store="crudStore"
  />

  <q-card flat class="bordered shadow overflow-hidden">
    <card-title :title="title" icon="o_subject" />

    <q-card-section class="q-pb-none q-px-md">
      <header-section :model="model" />
    </q-card-section>

    <q-separator />

    <detail-section v-if="model" :model="model" />
  </q-card>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { useFormActions } from "src/composables/useFormActions";

  import HeaderSection from "./_HeaderSection.vue";
  import DetailSection from "./_DetailSection.vue";
  import CardTitle from "src/components/shared/CardTitle.vue";
  import ToolbarContainer from "./ToolbarContainer.vue";

  const props = defineProps({
    item: Object,
    title: String,
    inside: Boolean,
    margin: Boolean,
  });

  const model = ref(null);
  const crudStore = useFormActions("doc/contract", model);
  const route = useRoute();

  const id = computed(() => props.item?.id ?? route.params.id);

  onMounted(() => {
    crudStore.getById(id.value);
  });
</script>
