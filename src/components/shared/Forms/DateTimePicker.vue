<template>
  <q-input
    v-model="value"
    outlined
    dense
    mask="date"
    clearable
    clear-icon="clear"
    class="text-body1 no-letter-spacing"
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
                v-close-popup
              />
              <q-btn
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
  </q-input>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCulture } from "src/composables/useCulture";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const cultureStore = useCulture();

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const proxyDate = ref("");

const calendar = computed(() => cultureStore.culture.value.calendar);

const updateProxy = () => {
  proxyDate.value = value.value;
};

const save = () => {
  value.value = proxyDate.value;
};
</script>
