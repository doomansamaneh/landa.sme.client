<template>
  <toolbar-container
    v-if="model"
    :model="model"
    :inside="inside"
    :base-route="baseRoute"
  />

  <div class="row q-col-gutter-lg">
    <div class="col-md-5 col-sm-12 col-xs-12">
      <q-card bordered>
        <q-card-section class="bg-green-5 text-white">
          <span class="text-h5">
            {{ $t("shared.labels.chequeDetail") }}
          </span>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section class="q-gutter-y-sm_">
          <div id="invoicePreview">
            <body-section :model="model" />
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-md-7 col-sm-12 col-xs-12">
      <q-card bordered>
        <q-card-section class="bg-blue-12 text-white">
          <span class="text-h5">
            {{ $t("shared.labels.chequeTransaction") }}
          </span>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-px-none">
          <item-log v-if="model" :model="model" flat />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { useFormActions } from "src/composables/useFormActions";

  import ToolbarContainer from "./ToolbarContainer.vue";
  import BodySection from "./BodySection.vue";
  import ItemLog from "./ItemLog.vue";

  const props = defineProps({
    item: Object,
    title: String,
    inside: Boolean,
  });

  const route = useRoute();
  const baseRoute = "trs/paymentItemCheck";
  const model = ref(null);
  const crudStore = useFormActions(baseRoute, model);
  const id = computed(() => props.item?.id ?? route.params.id);

  onMounted(async () => {
    await crudStore.getById(id.value);
  });
</script>
