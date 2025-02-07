<template>
  <div class="row">
    <div class="col">
      <div class="column q-gutter-lg">
        <div>
          <div
            class="text-weight-500 text-body1 no-letter-spacing q-mb-md"
          >
            جهت
          </div>
          <q-option-group
            :options="orientationOptions"
            type="radio"
            dense
            size="40px"
            class="text-body2 no-letter-spacing q-gutter-md"
            inline
            v-model="printStore.orientation.value"
          />
        </div>
        <div>
          <div
            class="text-weight-500 text-body1 no-letter-spacing q-mb-md"
          >
            ابعاد صفحه
          </div>
          <q-option-group
            :options="formatOptions"
            type="radio"
            dense
            size="40px"
            class="text-body2 no-letter-spacing q-gutter-md"
            inline
            v-model="printStore.format.value"
          />
        </div>
      </div>
    </div>
    <div class="col-5">
      <div
        v-if="printStore.orientation.value === 'p'"
        class="rectangle vertical-rectangle text-black"
      >
        عمودی
      </div>
      <div
        v-if="printStore.orientation.value === 'l'"
        class="rectangle horizontal-rectangle text-black"
      >
        افقی
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { usePrint } from "src/composables/usePrint";

  const props = defineProps({
    tableStore: Object,
    title: String,
  });

  const printStore = usePrint();

  const orientationOptions = ref([
    { label: "عمودی", value: "p" },
    { label: "افقی", value: "l" },
  ]);

  const formatOptions = ref([
    { label: "کاغذ A4", value: "a4" },
    { label: "کاغذ A5", value: "a5" },
  ]);
</script>

<style scoped>
  .rectangle {
    width: 100%;
    height: 250px;
    background-color: lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    font-size: 16px;
  }

  .vertical-rectangle {
    width: 100px;
    height: 200px;
  }

  .horizontal-rectangle {
    width: 200px;
    height: 100px;
  }
</style>
