<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    :maximized="$q.screen.xs"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card :style="$q.screen.xs ? '' : 'min-width: 750px'">
      <q-card-section
        class="row items-center justify-between z-1"
        :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
        style="position: sticky; top: 0"
      >
        <div class="col-8 text-body1 text-weight-700">
          پرسشهای متداول در اتصال به سامانه مودیان
        </div>

        <div>
          <q-btn
            no-caps
            icon="close"
            class="col-1 icon-hover dark-3"
            flat
            round
            dense
            v-close-popup
          />
        </div>

        <q-separator class="absolute-bottom" />
      </q-card-section>

      <q-card-section>
        <div class="text-body1 text-weight-700">
          وضعیت
          <q-badge
            class="text-weight-500 text-body3 bg-yellow-3 text-orange-9"
            rounded
            outline
          >
            {{ getStatusTranslation("IN_PROGRESS") }}
          </q-badge>
          به چه معناست؟
        </div>
        <p class="text-body2 q-mt-sm">
          {{ getStatusDescription("IN_PROGRESS") }}
        </p>
        <div class="text-body1 text-weight-700">
          وضعیت
          <q-badge
            class="text-weight-500 text-body3 bg-red-2 text-red-8"
            rounded
            outline
          >
            {{ getStatusTranslation("FAILED") }}
          </q-badge>
          به چه معناست؟
        </div>
        <p class="text-body2 q-mt-sm">
          {{ getStatusDescription("FAILED") }}
        </p>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import { useI18n } from "vue-i18n";

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(["update:modelValue"]);

  const { t } = useI18n();

  const getStatusTranslation = (status) => {
    return t(
      `shared.labels.taxApiStatusTranslations.${status}`,
      status
    );
  };

  const getStatusDescription = (status) => {
    return t(`shared.labels.taxApiStatusDescriptions.${status}`, "");
  };
</script>
