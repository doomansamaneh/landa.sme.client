<template>
  <toolbar-container
    v-if="model.id"
    :inside="inside"
    :title="title"
    :model="model"
  />

  <div class="row items-center q-col-gutter-lg q-pb-lg">
    <div class="col-md row items-center q-gutter-md no-wrap">
      <customer-avatar
        size="120px"
        text-color="white"
        :text-holder="model.name"
        text-holder-class="text-bold "
        :avatar="model.avatar"
        :item="model.id"
      />
      <div>
        <div class="text-h4 line-height-lg text-weight-700">
          {{ model.name }}
        </div>
        <div
          v-if="model.code && model.code !== '-'"
          class="ellipsis_ caption-on-dark text-h6_"
        >
          کد: {{ model.code }}
        </div>
        <div class="ellipsis caption-on-dark text-h5">
          {{ model.unitTitle }}
          <span v-if="model.jobTitle">/ {{ model.jobTitle }}</span>
        </div>
      </div>
    </div>

    <div class="col-md-8" v-access="`acc.report.accountReview`">
      <customer-balance v-if="model" :model="model" />
    </div>
  </div>

  <invoice-summary :customer-id="id" class="q-mb-lg" />

  <tabs :item="model" />
</template>

<script setup>
  import { ref, computed, watch, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { useFormActions } from "src/composables/useFormActions";

  import ToolbarContainer from "./ToolbarContainer.vue";
  import InvoiceSummary from "./_InvoiceSummary.vue";
  import Tabs from "./_PreviewTabs.vue";
  import CustomerAvatar from "src/components/shared/CustomerAvatar.vue";
  import CustomerBalance from "./CustomerBalance.vue";

  const props = defineProps({
    item: Object,
    title: String,
    inside: Boolean,
  });

  const route = useRoute();
  const model = ref({});
  const formStore = useFormActions("crm/customer", model);
  const id = computed(() => props.item?.id ?? route.params.id);

  const loadData = async () => {
    await formStore.getById(id.value);
  };

  onMounted(() => {
    loadData();
  });

  watch(
    () => route.params.id,
    (newId) => {
      loadData(newId);
    }
  );
</script>
