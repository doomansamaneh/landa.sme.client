<template>
  <q-card
    :class="[isShakingComputed ? 'widget' : '']"
    class="shadow border-radius-lg bordered fit"
  >
    <template v-if="isShakingComputed">
      <q-btn
        class="off-btn bordered absolute-top-right q-ma-sm z-1"
        round
        dense
        unelevated
        @click="hideWidget"
      >
        <q-icon name="o_visibility_off" />
      </q-btn>
    </template>

    <div
      :class="
        isShakingComputed ? 'no-pointer-events' : 'pointer-events-all'
      "
    >
      <q-card-section class="q-pt-lg q-px-lg q-pb-none">
        <div class="row justify-between items-center">
          <div>
            <q-item class="no-padding">
              <q-item-section avatar>
                <q-avatar
                  rounded
                  text-color="white"
                  icon="o_receipt_long"
                  size="md"
                  class="primary-gradient primary-shadow"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-h6 text-weight-700">
                  مخارج و درآمد عملیاتی
                </q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-md q-px-lg q-pb-lg">
        <q-markup-table
          dir="ltr"
          flat
          bordered
          wrap-cells
          class="fit border-radius-xs"
        >
          <thead>
            <tr>
              <th class="text-left">%</th>
              <th class="text-left">سال پیش</th>
              <th class="text-left">سال مالی ۱۴۰۱</th>
              <th class="text-left"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, index) in rows"
              :key="row.title"
              :class="{
                'green-gradient text-white text-weight-600':
                  index === rows.length - 1,
              }"
            >
              <td class="text-left">
                <q-icon
                  :name="
                    row.percentage > 0
                      ? 'arrow_upward'
                      : 'arrow_downward'
                  "
                  :color="row.percentage > 0 ? 'green' : 'red'"
                />
                {{ row.percentage }}%
              </td>
              <td class="text-left">{{ row.lastYear }}</td>
              <td class="text-left">{{ row.thisYear }}</td>
              <td class="text-left">{{ row.title }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>
    </div>
  </q-card>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useDraggableWidgets } from "src/composables/useDraggableWidgets";

  const emit = defineEmits(["hideWidget"]);
  const draggable = useDraggableWidgets();

  const hideWidget = () => {
    emit("hideWidget");
  };

  const isShakingComputed = computed(() => draggable.isShaking.value);

  const rows = ref([
    {
      title: "فروش و درآمد",
      thisYear: "(۹۹,۲۶۶,۰۰۰)",
      lastYear: "۲,۸۹۰,۰۰۰",
      percentage: -53.81,
    },
    {
      title: "بهای تمام شده کالای فروش رفته و خدمات ارائه شده",
      thisYear: "۹,۶۰۰,۰۰۰",
      lastYear: "۰",
      percentage: 0,
    },
    {
      title: "هزینه‌ها",
      thisYear: "۲۵۷,۸۵۰,۰۰۰",
      lastYear: "۱۲۶,۴۶۰,۰۰۰",
      percentage: 102.9,
    },
    {
      title: "درآمد خالص",
      thisYear: "(۳۶۶,۷۱۶,۰۰۰)",
      lastYear: "(۱۳۳,۵۷۰,۰۰۰)",
      percentage: 196.77,
    },
  ]);
</script>

<style lang="scss" scoped>
  .q-table {
    td,
    th {
      padding: 6px 12px;
    }
  }
</style>
