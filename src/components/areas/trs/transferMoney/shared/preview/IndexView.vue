<template>
  <tool-bar :inside="inside" :model="model" />

  <div class="row q-col-gutter-lg" style="margin-top: -16px">
    <div class="col-md-8 col-sm-12 col-xs-12">
      <q-card>
        <div id="invoicePreview">
          <header-section :model="model" />
          <body-section :model="model" />
        </div>
      </q-card>
    </div>
    <div class="col-md-4 col-sm-12 col-xs-12">
      <detail-section :model="model" />
    </div>
  </div>
</template>
<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { useFormActions } from "src/composables/useFormActions";

  import ToolBar from "./_Toolbar.vue";
  import HeaderSection from "./_HeaderSection.vue";
  import BodySection from "./_BodySection.vue";
  import DetailSection from "src/components/areas/_shared/preview/VoucherDetail.vue";

  const props = defineProps({
    item: Object,
    title: String,
    inside: Boolean,
  });

  const model = ref(null);
  const route = useRoute();

  const id = computed(() => props.item?.id ?? route.params.id);
  const crudStore = useFormActions("trs/transferMoney", model);

  onMounted(() => {
    crudStore.getById(id.value);
  });
</script>
