<template>
  <div
    class="row q-gutter-y-md"
    :class="$q.screen.gt.xs ? 'q-py-md' : 'q-pb-md'"
  >
    <div
      class="row col-md col-sm col-xs-12 items-center"
      :class="$q.screen.lt.sm ? 'justify-center' : ''"
    >
      <img
        v-if="showLogo && logoSource"
        :src="logoSource"
        alt="logo"
      />
    </div>
    <div
      class="col-md col-sm-5 col-xs-12 items-center justify-center"
    >
      <div
        class="row items-center justify-center text-body2 text-bold"
      >
        {{ title }}
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
            {{ model.value.no }}
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
            {{ model.value.date.substring(0, 10) }}
          </span>
        </div>

        <div
          v-if="showDueDate"
          class="row"
          :class="
            $q.screen.lt.sm ? 'justify-center' : 'justify-start'
          "
        >
          <span>{{ $t("shared.labels.dueDate") }}:</span>
          <span class="q-px-sm text-weight-700">
            {{ model.value.dueDate?.substring(0, 10) }}
          </span>
        </div>

        <div
          v-if="model.value.lastApiLogModel?.taxId"
          class="row"
          :class="
            $q.screen.lt.sm ? 'justify-center' : 'justify-start'
          "
        >
          <span>{{ $t("shared.labels.taxId") }}:</span>
          <span class="q-px-sm">
            {{ model.value.lastApiLogModel.taxId }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { useQuasar } from "quasar";
  import { mediaType } from "src/constants";
  import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";

  const $q = useQuasar();

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
