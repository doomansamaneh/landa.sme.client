<template>
  <div class="row items-center q-gutter-y-md">
    <div class="row col-md col-sm col-xs-12 items-center">
      <img
        v-if="showLogo && logoSource"
        :src="logoSource"
        alt="logo"
      />
    </div>
    <div
      class="col-md col-sm-5 col-xs-12 items-center justify-center"
    >
      <div class="text-center text-body2 text-bold">
        {{ title }}
      </div>
    </div>
    <div class="col-md col-sm col-xs-12 row items-center justify-end">
      <div class="column q-gutter-sm">
        <div class="row">
          <span>{{ $t("shared.labels.no") }}:</span>
          <span class="q-px-sm text-weight-600">
            {{ model.no }}
          </span>
        </div>

        <div class="row justify-start">
          <span>{{ $t("shared.labels.date") }}:</span>
          <span class="q-px-sm text-weight-600">
            {{ model.date?.substring(0, 10) }}
          </span>
        </div>

        <div v-if="showDueDate" class="row justify-start">
          <span>{{ $t("shared.labels.dueDate") }}:</span>
          <span class="q-px-sm text-weight-600">
            {{ model.dueDate?.substring(0, 10) }}
          </span>
        </div>

        <div
          v-if="model?.lastApiLogModel?.taxId"
          class="row justify-start"
        >
          <span>{{ $t("shared.labels.taxId") }}:</span>
          <span class="q-px-sm text-roboto text-weight-500">
            {{ model.lastApiLogModel.taxId }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { mediaType } from "src/constants";
  import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";

  const props = defineProps({
    model: Object,
    showDueDate: Boolean,
    showLogo: Boolean,
    title: String,
  });

  const logoSource = ref(null);
  const configStore = useAppConfigModel();

  onMounted(async () => {
    logoSource.value = await configStore.getAvatar(
      mediaType.avatar,
      120,
      55
    );
  });
</script>

<style lang="scss">
  .sme-logo_ {
    width: 72px;
  }
</style>
