<template>
  <div v-if="showBanner">
    <q-banner
      inline-actions
      :class="`alert-banner alert-banner-${bannerStatus} fixed-bottom z-max`"
    >
      <div class="flex items-center q-gutter-sm text-black">
        <q-btn
          round
          unelevated
          padding="0px"
          :text-color="iconColor"
          color="white"
          :icon="icon"
          size="20px"
          class="no-pointer-events q-mr-md"
        />

        <q-badge
          color="negative"
          class="border-radius-sm text-body1 text-weight-500 no-letter-spacing q-px-sm"
        >
          {{ status }}
        </q-badge>

        <span v-if="message">
          {{ $t(`errors.${message}`) }}
          <div v-if="comment" class="row items-center text-black">
            {{ comment }}
          </div>
        </span>
      </div>

      <div v-if="errors" class="row items-center text-black">
        <ul class="q-gutter-sm q-pa-md">
          <li
            class="q-ml-xl"
            v-for="key in Object.keys(errors)"
            :key="key"
          >
            {{ key }}:
            <span v-for="error in errors[key]" :key="error">
              {{ $t(`errors.${error}`) }}
            </span>
          </li>
        </ul>
      </div>

      <template #action>
        <q-btn
          @click="hideBanner"
          flat
          dense
          unelevated
          icon="close"
          color="black"
          size="sm"
          round
        />
      </template>
    </q-banner>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useAlertStore } from "stores";

  const alertStore = useAlertStore();

  const showBanner = computed(() => alertStore.showAlert());
  const alert = computed(() => alertStore.alert);

  const status = computed(() => alert.value?.status);
  const message = computed(() => alert.value?.message);
  const comment = computed(() => alert.value?.comment);
  const errors = computed(() => alert.value?.errors);

  const bannerStatus = ref("warning");

  const icon = computed(
    () =>
      ({ warning: "o_report", error: "o_dangerous", info: "info" }[
        bannerStatus.value
      ])
  );

  const iconColor = computed(
    () =>
      ({ warning: "orange-10", error: "negative", info: "blue" }[
        bannerStatus.value
      ])
  );

  function hideBanner() {
    alertStore.hide();
  }
</script>
