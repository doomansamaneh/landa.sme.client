<template>
  <tool-bar
    :inside="inside"
    :title="title"
    :base-route="baseRoute"
  ></tool-bar>
  <div>
    <h4>address</h4>
    {{ model }}
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { useFormActions } from "src/composables/useFormActions";

  const props = defineProps({
    id: String,
  });

  const route = useRoute();
  const id = computed(() => props.id ?? route.params.id);
  const model = ref({});
  const crudStore = useFormActions(props.baseRoute, model, true);

  onMounted(async () => {
    model.value = await crudStore.customGetAction(
      `sls/invoice/getAddress/${id.value}`
    );
  });
</script>
