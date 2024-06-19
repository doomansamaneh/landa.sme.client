<template>
  <tool-bar
    :inside="inside"
    :margin="!inside"
    buttons
    :title="title"
    back-button
  >
    <template #buttons>
      <q-btn
        @click="helper.print('invoicePreview')"
        class="text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_print" class="q-mr-xs" />
        {{ $t("shared.labels.print") }}
      </q-btn>
    </template>
  </tool-bar>

  <q-card bordered>
    <div id="invoicePreview">
      <header-section :model="model" />
      <body-section :model="model" />
    </div>
  </q-card>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { helper } from "src/helpers";
  import { useFormActions } from "src/composables/useFormActions";

  import ToolBar from "src/components/shared/ToolBarDesktop.vue";
  import HeaderSection from "./_HeaderSection.vue";
  import BodySection from "./_BodySection.vue";

  const props = defineProps({
    item: Object,
    title: String,
    inside: Boolean,
  });

  const model = ref(null);
  const baseRoute = "prl/wageItem";
  const crudStore = useFormActions(baseRoute, model);

  const route = useRoute();

  const id = computed(() => props.item?.id ?? route.params.id);

  onMounted(() => {
    crudStore.getById(id.value);
  });
</script>
