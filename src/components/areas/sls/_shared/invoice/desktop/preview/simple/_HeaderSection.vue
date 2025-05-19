<template>
  <table style="width: 100%">
    <tbody>
      <tr>
        <td style="width: 25%">
          <img
            v-if="
              showLogo &&
              configStore.model?.value?.companySetting
                ?.invoiceShowLogo &&
              logoSource
            "
            :src="logoSource"
            alt="logo"
          />
        </td>
        <td>
          <div class="text-center text-body2 text-bold">
            {{ title }}
          </div>
        </td>
        <td style="width: 25%">
          <div>
            <span>{{ $t("shared.labels.no") }}:</span>
            <span class="q-px-sm text-weight-600">
              {{ model.no }}
            </span>
          </div>

          <div>
            <span>{{ $t("shared.labels.date") }}:</span>
            <span class="q-px-sm text-weight-600">
              {{ model.date?.substring(0, 10) }}
            </span>
          </div>

          <div v-if="showDueDate">
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
            <span
              class="q-px-sm text-roboto text-weight-500"
              style="font-size: 12px"
            >
              {{ model.lastApiLogModel.taxId }}
            </span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
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
