<template>
  <tool-bar
    :inside="inside"
    :title="title"
    :base-route="baseRoute"
    :model="model"
    :crud-store="crudStore"
  />

  <mobile
    v-if="$q.screen.xs"
    :model="model"
    :base-route="baseRoute"
    :title="title"
    :type="documentType.bill"
  />
  <desktop
    v-else
    :model="model"
    :base-route="baseRoute"
    :title="title"
    :type="documentType.bill"
  />
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useFormActions } from "src/composables/useFormActions";
  import { documentType } from "src/constants";

  import ToolBar from "./ToolBar.vue";
  import Mobile from "../../mobile/preview/IndexView.vue";
  import Desktop from "../../desktop/preview/IndexView.vue";

  const props = defineProps({
    item: Object,
    title: String,
    inside: Boolean,
    baseRoute: { type: String, default: "trs/bill" },
  });

  const model = ref(null);
  const crudStore = useFormActions(props.baseRoute, model);

  const route = useRoute();
  const router = useRouter();

  const id = computed(() => props.item?.id ?? route.params.id);

  function deleteCallBack() {
    router.back();
  }

  onMounted(() => {
    crudStore.getById(id.value);
  });
</script>
