<template>
  <tool-bar inside buttons :title="title" back-button>
    <template #buttons>
      <q-btn
        :to="`/crm/customer/edit/${id}`"
        class="bg-primary primary-shadow text-white text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_edit" class="q-mr-xs" />
        {{ $t("shared.labels.edit") }}
        <!-- ({{ tableStore?.activeRow?.value?.code }}) -->
      </q-btn>
    </template>
  </tool-bar>

  <div :style="marginTop()">
    <div class="row items-center q-gutter-md">
      <q-avatar size="56px">
        <img class="avatar" src="https://cdn.quasar.dev/img/avatar4.jpg" />
      </q-avatar>
      <div class="column q-mt-md">
        <q-item-label class="text-body2 text-weight-700 no-letter-spacing">
          {{ model.name }}
        </q-item-label>
        <q-item-label class="caption-on-dark text-body2 no-letter-spacing">
          {{ model.unitTitle }}
          <span v-if="model.jobTitle"> / {{ model.jobTitle }} </span>
        </q-item-label>
      </div>
    </div>

    <div class="row q-col-gutter-md q-mt-lg">
      <div class="col-md col-sm col-xs-12">
        <sales-widget />
      </div>

      <div class="col-md-8 col-sm-8 col-xs-12">
        <sales-widget />
      </div>
    </div>
  </div>

  <tabs />
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";
import { useFormActions } from "src/composables/useFormActions";
import { invoiceModel } from "src/models/areas/sls/invoiceModel";

import ToolBar from "src/components/shared/ToolBarDesktop.vue";
import SalesWidget from "components/areas/dashboard/widgets/SalesWidget.vue";
import Tabs from "./_PreviewTabs.vue";

const $q = useQuasar();

const props = defineProps({
  item: Object,
  title: String,
});

const route = useRoute();
const model = ref(invoiceModel);
const formStore = useFormActions("crm/customer", model);

const id = computed(() => props.item?.id ?? route.params.id);

const marginTop = () => {
  return [
    $q.screen.xs ? "margin-top:64px" : "",
    $q.screen.sm ? "margin-top:64px" : "",
    $q.screen.gt.sm ? "margin-top:56px" : "",
  ];
};

onMounted(() => {
  formStore.getById(id.value);
});
</script>

<style lang="scss">
.profile-section {
  width: 400px;
}

.info-box:hover {
  border: 1px solid var(--q-primary) !important;
  cursor: pointer;
}
</style>
