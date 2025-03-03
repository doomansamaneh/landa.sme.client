<template>
  <custom-input-number v-model="model">
    <template #append>
      <q-btn
        size="8px"
        class="cursor-pointer"
        :color="$q.dark.isActive ? 'yellow' : 'primary'"
        round
        outline
        @click="toggleType"
      >
        <q-icon
          size="14px"
          :name="isCash ? 'attach_money' : 'o_percent'"
        />
      </q-btn>
    </template>
  </custom-input-number>
</template>

<script setup>
  import { ref, defineModel } from "vue";

  import CustomInputNumber from "src/components/shared/Forms/CustomInputNumber.vue";

  const model = defineModel("modelValue");

  const isCash = ref(true);

  const toggleType = () => {
    isCash.value = !isCash.value;
  };

  
</script>
