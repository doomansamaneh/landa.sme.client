<template>
  <div>
    <div class="flex q-gutter-md justify-between items-center">
      <div v-if="taxStore.apiResult.value.data">
        <div class="flex items-center q-gutter-xs">
          <div class="text-body2 text-bold">
            {{ t("shared.labels.taxApiHistory") }}
          </div>
          <q-btn
            no-caps
            unelevated
            round
            dense
            size="sm"
            @click="openHelpDialog"
          >
            <q-icon name="help_outline" size="xs" />
          </q-btn>
        </div>
      </div>

      <q-card class="bg-primary border-radius-xs fit help-card">
        <q-card-section class="text-center">
          <a
            class="text-body2 text-white"
            href="https://landa-sme.ir/LandaKnowledge/b2b39ffb-51cb-4781-8e20-b44ca1e46d0c"
            target="_blank"
          >
            {{ t("shared.labels.taxApiGuide") }}
          </a>
        </q-card-section>
      </q-card>

      <q-btn
        padding="8px 16px"
        no-caps
        v-if="!taxStore.apiResult.value.data"
        unelevated
        rounded
        text-color="white"
        class="primary-gradient primary-shadow"
        @click="taxStore.sendToTax(model.id, taxGrid?.reloadData)"
      >
        <q-icon name="o_arrow_upward" size="xs" class="q-mr-xs" />
        <span>{{ t("shared.labels.taxApiStatus") }}</span>
      </q-btn>

      <q-btn
        v-if="
          authStore.currentUser?.id ===
            'a2bacd9e-8b88-4d15-aa86-93e6b642c558' ||
          authStore.currentUser?.id ===
            '749c90c7-7229-44fe-8b0d-a1207b5614cb'
        "
        padding="8px 16px"
        no-caps
        unelevated
        rounded
        text-color="white"
        class="primary-gradient primary-shadow"
        @click="
          taxStore.sendCancelToTax(model.id, taxGrid?.reloadData)
        "
      >
        <q-icon name="o_arrow_upward" size="xs" class="q-mr-xs" />
        <span>send cancel invoice</span>
      </q-btn>
    </div>
    <data-grid
      ref="taxGrid"
      class="border-radius-sm q-mt-md"
      flat
      hide-filter-row
      :invoice-id="model.id"
      no-fullscreen
    />

    <help-dialog v-model="helpDialog" />
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { useI18n } from "vue-i18n";
  import { useAuthStore } from "src/stores";
  import { useTaxApiLogModel } from "src/components/areas/sls/_composables/useTaxApiLogModel";

  import DataGrid from "src/components/areas/sls/invoiceTaxApiLog/shared/index/DataGrid.vue";
  import HelpDialog from "./HelpDialog.vue";

  const props = defineProps({
    model: Object,
  });
  const { t } = useI18n();
  const taxGrid = ref(null);
  const taxStore = useTaxApiLogModel();
  const authStore = useAuthStore();
  const helpDialog = ref(false);

  const openHelpDialog = () => {
    helpDialog.value = true;
  };

  onMounted(() => {
    taxStore.isSentApiSuccessfully(props.model.id);
  });
</script>

<style lang="scss" scoped>
  .help-card {
    position: relative;
    overflow: hidden;
  }

  .help-card::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url("/favicon.ico");
    background-repeat: repeat;
    background-size: calc((100% / 15) - 14px);
    background-position: center;
    opacity: 0.2;
    pointer-events: none;
    background-color: $primary;
    z-index: 0;
  }
</style>
