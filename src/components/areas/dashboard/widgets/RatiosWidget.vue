<template>
  <div
    v-access="`acc.report.accountReview`"
    class="row q-col-gutter-md"
  >
    <div class="col-md-6 col-sm-6 col-xs-12">
      <ratio-widget
        :title="$t('shared.labels.ratios_net_margin_title')"
        :ratio="ratioStore.model.value.netMargin"
        ratio-sign="%"
        @hide-widget="hideWidget"
      >
        <template #avatar>
          <q-avatar
            round
            text-color="white"
            icon="o_attach_money"
            size="xl"
            class="bluegrey-gradient bluegrey-shadow"
          />
        </template>
        <template #info>
          <div
            v-html="
              $t('shared.labels.ratios_net_margin_info').replace(
                /\n/g,
                '<br>'
              )
            "
          ></div>
        </template>
      </ratio-widget>
    </div>
    <div class="col-md-6 col-sm-6 col-xs-12">
      <ratio-widget
        :title="$t('shared.labels.ratios_debt_ratio_title')"
        :ratio="ratioStore.model.value.debtRatio"
        ratio-sign="%"
        @hide-widget="hideWidget"
      >
        <template #avatar>
          <q-avatar
            round
            text-color="white"
            icon="o_group_remove"
            size="xl"
            class="primary-gradient primary-shadow"
          />
        </template>
        <template #info>
          <div
            v-html="
              $t('shared.labels.ratios_debt_ratio_info').replace(
                /\n/g,
                '<br>'
              )
            "
          ></div>
        </template>
      </ratio-widget>
    </div>
    <div class="col-md-6 col-sm-6 col-xs-12">
      <ratio-widget
        :title="$t('shared.labels.ratios_current_ratio_title')"
        :ratio="ratioStore.model.value.currentRatio"
        ratio-sign=""
        :fraction="2"
        @hide-widget="hideWidget"
      >
        <template #avatar>
          <q-avatar
            round
            text-color="white"
            icon="o_exposure_plus_2"
            size="xl"
            class="green-gradient green-shadow"
          />
        </template>
        <template #info>
          <div
            v-html="
              $t('shared.labels.ratios_current_ratio_info').replace(
                /\n/g,
                '<br>'
              )
            "
          ></div>
        </template>
      </ratio-widget>
    </div>
    <div class="col-md-6 col-sm-6 col-xs-12">
      <ratio-widget
        :title="$t('shared.labels.ratios_dso_title')"
        :ratio="ratioStore.model.value.dso"
        :ratio-sign="$t('shared.labels.day')"
        @hide-widget="hideWidget"
      >
        <template #avatar>
          <q-avatar
            round
            text-color="white"
            icon="o_hourglass_empty"
            size="xl"
            class="pink-gradient pink-shadow"
          />
        </template>
        <template #info>
          <div
            v-html="
              $t('shared.labels.ratios_dso_info').replace(
                /\n/g,
                '<br>'
              )
            "
          ></div>
        </template>
      </ratio-widget>
    </div>
  </div>
</template>

<script setup>
  import { useRatios } from "../../acc/_composables/useRatios";
  import RatioWidget from "./_RatioWidget.vue";

  const ratioStore = useRatios();

  const emit = defineEmits(["hideWidget"]);

  const hideWidget = () => {
    emit("hideWidget");
  };
</script>
<style>
  .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: end;
    gap: 24px;
  }

  .gap-24 {
    gap: 24px;
  }
</style>
