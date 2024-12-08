<template>
  <tool-bar :inside="inside" buttons :title="title" back-button>
    <template #buttons>
      <q-btn
        :to="`/doc/contract/edit/${id}`"
        class="primary-gradient primary-shadow text-white text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_edit" class="q-mr-xs" />
        {{ $t("shared.labels.edit") }}
      </q-btn>
      <q-btn
        @click="helper.print('invoicePreview')"
        class="text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_print" class="q-mr-xs" />
        چاپ
      </q-btn>
    </template>
  </tool-bar>

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
  import { helper } from "src/helpers";
  import { useFormActions } from "src/composables/useFormActions";

  import ToolBar from "src/components/shared/ToolBarDesktop.vue";
  import HeaderSection from "./_HeaderSection.vue";
  import DetailSection from "./_DetailSection.vue";
  import CardTitle from "src/components/shared/CardTitle.vue";
  import DataGridToolbar from "components/shared/dataTables/desktop/DataGridToolbar.vue";

  const props = defineProps({
    item: Object,
    title: String,
    inside: Boolean,
    margin: Boolean,
  });

  const model = ref(null);
  const formStore = useFormActions("doc/contract", model);
  const route = useRoute();

  const id = computed(() => props.item?.id ?? route.params.id);

  onMounted(() => {
    formStore.getById(id.value);
  });
</script>
