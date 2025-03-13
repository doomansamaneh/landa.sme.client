<template>
  <div class="column reverse q-col-gutter-lg">
    <div class="col-md col-sm-5 col-xs-12">
      <div class="column q-gutter-lg">
        <div>
          <div class="text-weight-500 text-body1 q-mb-md">جهت</div>
          <q-option-group
            :options="orientationOptions"
            type="radio"
            dense
            size="40px"
            class="text-body2 q-gutter-md"
            inline
            v-model="printStore.orientation.value"
          />
        </div>
        <div>
          <div class="text-weight-500 text-body1 q-mb-md">
            ابعاد صفحه
          </div>
          <q-option-group
            :options="formatOptions"
            type="radio"
            dense
            size="40px"
            class="text-body2 q-gutter-md"
            inline
            v-model="printStore.format.value"
          />
        </div>
      </div>
    </div>
    <div
      class="col-md col-sm-5 col-xs-12 flex justify-center"
    >
     <div class="column items-center justify-center" style="height: 180px">
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
    width: 120px;
    height: 200px;
  }

  .horizontal-rectangle {
    width: 200px;
    height: 120px;
  }
</style>
