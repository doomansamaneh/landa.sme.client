<template>
  <div v-if="showBanner">
    <q-banner inline-actions class="z-max bg-warning">
      <div class="row items-center text-black">
        <q-icon
          name="public"
          size="22px"
          class="q-icon-banner q-mx-xs"
          color="black"
        />
        <strong class="q-px-lg">{{ status }}</strong>
        <span v-if="message">
          {{ $t(`errors.${message}`) }}
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
  const status = computed(() =>
    alertStore.alert != null ? alertStore.alert.status : 0
  );
  const message = computed(() =>
    alertStore.alert != null ? alertStore.alert.message : ""
  );

  const errors = computed(() => alertStore.alert?.errors);

  function hideBanner() {
    alertStore.hide();
  }
</script>
