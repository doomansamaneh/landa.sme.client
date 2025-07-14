<template>
  <div class="q-mt-lg">
    <card-tabs
      v-model="tab"
      :indicator-color="tabColor"
      :active-color="tabColor"
      @tabChanged="tabChanged"
    >
      <card-tab
        name="production-used-items"
        :title="$t('shared.labels.productionUsedItems')"
        icon="o_assignment"
        avatar-class="primary-gradient primary-shadow"
      />

      <card-tab
        name="production-costs"
        :title="$t('shared.labels.productionCosts')"
        icon="o_assignment"
        avatar-class="red-gradient red-shadow"
      />

      <card-tab
        name="product"
        :title="$t('shared.labels.producedProducts')"
        icon="o_keyboard"
        avatar-class="green-gradient green-shadow"
      />

      <card-tab
        name="scrap"
        :title="$t('shared.labels.scrap')"
        icon="o_assignment"
        avatar-class="orange-gradient red-shadow"
      />
    </card-tabs>
  </div>

  <q-tab-panels class="q-mt-md" v-model="tab" keep-alive animated>
    <q-tab-panel class="no-padding" name="production-used-items">
      <production-used-items :form-store="formStore" />
    </q-tab-panel>

    <q-tab-panel class="no-padding" name="production-costs">
      <production-costs :form-store="formStore" />
    </q-tab-panel>

    <q-tab-panel class="no-padding" name="product">
      <product-items :form-store="formStore" />
    </q-tab-panel>

    <q-tab-panel class="no-padding" name="scrap">
      <scrap-items :form-store="formStore" />
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useI18n } from "vue-i18n";
  import { useQuasar } from "quasar";

  import ProductItems from "./_ProductItems.vue";
  import ScrapItems from "./_ScrapItems.vue";
  import ProductionUsedItems from "./ProductionUsedItems.vue";
  import ProductionCosts from "./ProductionCosts.vue";
  import CardTabs from "src/components/shared/CardTabs.vue";
  import CardTab from "src/components/shared/CardTab.vue";

  const { t } = useI18n();

  const props = defineProps({
    formStore: Object,
  });

  const $q = useQuasar();

  const tab = ref("production-used-items");

  const tabColor = computed(() => {
    if ($q.dark.isActive) {
      return "yellow";
    }

    switch (tab.value) {
      case "production-costs":
        return "negative";
      case "product":
        return "green-8";
      case "scrap":
        return "orange-8";
      default:
        return "primary";
    }
  });
</script>
