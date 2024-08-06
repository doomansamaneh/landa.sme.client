<template>
  <q-card class="fit bordered q-pa-none" flat>
    <q-card-section class="q-pr-md q-pl-lg q-pt-lg q-pb-none">
      <div class="row items-center justify-between">
        <div class="justify-start">
          <q-item class="no-padding">
            <q-item-section avatar>
              <slot name="avatar"></slot>
            </q-item-section>
            <q-item-section class="q-pl-xs">
              <q-item-label class="text-h6 text-weight-700 q-mb-xs">
                {{ title }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>
        <div class="justify-end">
          <q-btn
            round
            unelevated
            dense
            :text-color="$q.dark.isActive ? 'white' : 'grey-8'"
            icon="info"
            @click="showInfo = !showInfo"
          />
        </div>
      </div>

      <!-- <div class="row justify-between">
        <slot name="avatar"></slot>
        <div class="row items-center justify-end">
          <q-btn
            unelevated
            round
            dense
            :text-color="$q.dark.isActive ? 'white' : 'grey-8'"
            size="md"
            icon="info"
            @click="showInfo = !showInfo"
          />
        </div>
      </div> -->
    </q-card-section>

    <q-card-section
      v-if="!showInfo"
      class="column q-gutter-y-sm q-px-lg q-py-lg"
    >
      <div class="row items-center q-gutter-x-sm">
        <div class="text-h2 text-weight-700 text-accent">
          {{ ratioSign }}
        </div>
        <div
          class="text-weight-700 text-secondary"
          style="font-size: 42px"
        >
          {{ helper.formatNumber(ratio, fraction) }}
        </div>
      </div>
    </q-card-section>
    <q-card-section v-if="showInfo">
      <slot name="info"></slot>
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
