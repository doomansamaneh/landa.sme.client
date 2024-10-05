<template>
  <q-card class="shadow fit bordered q-pa-none" flat>
    <q-card-section class="q-pr-md q-pl-lg q-pt-lg q-pb-none">
      <div>
        <div class="float-right">
          <q-btn
            round
            unelevated
            dense
            :text-color="$q.dark.isActive ? 'white' : 'grey-8'"
            icon="o_info"
          >
            <q-tooltip
              anchor="bottom right"
              self="top middle"
              style="width: 400px"
              class="q-ma-md q-pa-md border-radius-lg custom-tooltip"
            >
              <slot name="info"></slot>
            </q-tooltip>
          </q-btn>
        </div>
        <slot name="avatar"></slot>
        <div class="q-mt-md text-h6 text-weight-700">{{ title }}</div>
      </div>
    </q-card-section>

    <q-card-section class="q-px-lg q-pt-none">
      <div class="row items-center q-gutter-x-sm">
        <div class="text-h2 text-weight-700">
          {{ helper.formatNumber(ratio, fraction) }}
        </div>
        <div class="text-h6 text-weight-700">
          {{ ratioSign }}
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";
  import { helper } from "src/helpers";

  const props = defineProps({
    title: String,
    ratio: Number,
    ratioSign: String,
    fraction: {
      type: Number,
      default: 0,
    },
  });

  const showInfo = ref(false);
</script>
