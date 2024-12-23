<template>
  <custom-input
    v-model="modelValue"
    :label="label"
    :required="required"
    clearable
    mask="date"
  >
    <template #append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy
          class="q-mx-xl border-radius-lg"
          cover
          transition-show="scale"
          transition-hide="scale"
          @before-show="updateProxy"
        >
          <q-date
            style="width: 300px"
            v-model="proxyDate"
            :calendar="calendar"
            today-btn
            bordered
          >
            <div class="row items-center justify-end q-gutter-sm rtl">
              <q-btn
                :label="$t('shared.labels.cancel')"
                color="primary"
                flat
                rounded
                v-close-popup
              />
              <q-btn
                rounded
                :label="$t('shared.labels.select')"
                color="primary"
                text-color="white"
                unelevated
                @click="save"
                v-close-popup
              />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </custom-input>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useCulture } from "src/composables/useCulture";
  import CustomInput from "./CustomInput.vue";

  const props = defineProps({
    label: String,
    required: Boolean,
  });
  const modelValue = defineModel("modelValue");

  const cultureStore = useCulture();

  const proxyDate = ref("");

  const calendar = computed(
    () => cultureStore.culture.value.calendar
  );

  const updateProxy = () => {
    proxyDate.value = modelValue.value;
  };

  const save = () => {
    modelValue.value = proxyDate.value;
  };
</script>
