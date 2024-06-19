<template>
  <q-card-section>
    <div
      class="row q-gutter-y-md"
      :class="$q.screen.gt.xs ? 'q-py-md' : 'q-pb-md'"
    >
      <div
        class="row col-md col-sm col-xs-12 items-center"
        :class="$q.screen.lt.sm ? 'justify-center' : ''"
      >
        <img
          style="width: 72px"
          src="/landa-sme-logo.png"
          alt="landa-SME logo"
        />
      </div>
      <div
        class="col-md col-sm-5 col-xs-12 items-center justify-center"
      >
        <div class="text-center">
          <h6>
            {{ appConfigStore.model.value.companySetting.name }}
          </h6>
          <div class="text-body2 text-bold">انتقال وجه</div>
        </div>
      </div>
      <div
        class="col-md col-sm col-xs-12 row items-center"
        :class="$q.screen.lt.sm ? 'justify-center' : 'justify-end'"
      >
        <div class="column q-gutter-sm text-right_text-caption">
          <div
            class="row"
            :class="
              $q.screen.lt.sm ? 'justify-center' : 'justify-start'
            "
          >
            <span>{{ $t("shared.labels.no") }}:</span>
            <span class="q-px-sm text-weight-700">
              {{ model?.rowNo }}
            </span>
          </div>

          <div
            class="row"
            :class="
              $q.screen.lt.sm ? 'justify-center' : 'justify-start'
            "
          >
            <span>{{ $t("shared.labels.date") }}:</span>
            <span class="q-px-sm text-weight-700">
              {{ model?.date.substring(0, 10) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </q-card-section>

  <q-separator />
</template>

<script setup>
  import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";

  const props = defineProps({
    model: Object,
  });
  const appConfigStore = useAppConfigModel();
</script>

<style lang="scss">
  .sme-logo {
    width: 72px;
  }
</style>
