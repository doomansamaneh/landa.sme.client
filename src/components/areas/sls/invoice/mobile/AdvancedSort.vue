<template>
  <q-card class="no-border q-pt-sm q-px-sm">
    <q-card-section>
      <div class="row justify-between items-center">
        <span class="text-body1 no-letter-spacing">
          مرتب‌سازی پیشرفته
        </span>
        <q-btn
          round
          unelevated
          text-color="white"
          class="red-gradient red-shadow col-1"
          padding="5px"
          v-close-popup
        >
          <q-icon size="16px" name="o_close" />
        </q-btn>
      </div>
    </q-card-section>

    <q-card-section>
      <div class="q-mb-md">
        <div class="row items-center q-gutter-md">
          <q-radio
            dense
            size="40px"
            v-model="radio"
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            label="اول به آخر"
            val="AtoZ"
          />
          <q-radio
            dense
            size="40px"
            v-model="radio"
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            label="آخر به اول"
            val="ZtoA"
          />
        </div>
      </div>

      <div>
        <div class="text-body2 no-letter-spacing q-mb-sm">براساس</div>
        <q-select
          dropdown-icon="keyboard_arrow_down"
          outlined
          dense
          v-model="model"
          :options="options"
        />
        <q-input
          outlined
          type="textarea"
          class="q-mt-md"
          v-model="input"
        />
      </div>
    </q-card-section>

    <div class="row q-my-lg q-mx-lg">
      <q-btn
        padding="10px 12px"
        rounded
        unelevated
        outline
        class="q-mb-sm full-width"
      >
        <div class="row items-center">
          <q-icon size="xs" name="o_close" class="q-mr-xs" />
          <span>حذف فیلتر</span>
        </div>
      </q-btn>

      <q-btn
        padding="10px 12px"
        rounded
        unelevated
        color="primary"
        class="q-mb-sm full-width"
      >
        <div class="row items-center">
          <q-icon size="xs" name="o_sort" class="q-mr-xs" />
          <span>مرتب‌سازی</span>
        </div>
      </q-btn>
    </div>
  </q-card>
</template>

<script setup>
  import { ref, onMounted } from "vue";

  import { useDataTable } from "src/composables/useDataTable";

  const props = {
    dataSource: String,
    dataColumns: String,
    store: Object,
  };

  const tableStore = useDataTable({
    dataSource: props.dataSource,
    dataColumns: props.dataColumns,
    store: props.store,
  });

  const model = ref(null);

  //Todo: We should read options data from tableStore?.cloumns.value
  const options = ref([
    "شماره",
    "تاریخ",
    "مشتری",
    "شرح",
    "جمع کل",
    "دریافت شده",
    "مانده",
  ]);

  const radio = ref("AtoZ");
  const input = ref(null);

  onMounted(() => {
    tableStore.loadData();
  });
</script>
