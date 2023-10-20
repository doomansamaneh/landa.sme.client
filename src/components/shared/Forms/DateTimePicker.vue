<template>
  <q-input
    v-model="value"
    outlined
    dense
    mask="date"
    clearable
    clear-icon="clear"
    :label="label"
    :placeholder="placeholder"
    class="text-caption"
  >
    <template v-slot:append>
      <q-icon
        name="event"
        class="cursor-pointer"
      >
        <q-popup-proxy
          cover
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date
            v-model="value"
            :calendar="calendar"
            today-btn
          />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script setup>
import { computed } from "vue"
import { useCulture } from "src/composables/useCulture"
import customInput from "src/components/shared/Forms/CustomInput.vue"

const props = defineProps(['modelValue', 'placeholder', 'label'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const cultureStore = useCulture()
const calendar = computed(() => cultureStore.culture.value.calendar)
</script>
<style>
.q-date {
  width: 300px;
}
</style>
