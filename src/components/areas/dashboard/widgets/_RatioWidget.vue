<template>
  <q-card
    :class="[isShakingComputed ? 'widget' : '']"
    class="shadow fit bordered q-pa-none"
    flat
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
      <q-card-section class="q-pb-none">
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
          <div class="q-mt-md text-body1">
            {{ title }}
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-px-md q-pt-none">
        <div class="row items-center q-gutter-x-sm">
          <div class="text-h3 line-height-xl text-weight-700">
            {{ helper.formatNumber(ratio, fraction) }}
          </div>
          <div class="text-h6 text-weight-700">
            {{ ratioSign }}
          </div>
        </div>
      </q-card-section>
    </div>
  </q-card>
</template>

<script setup>
  import { computed } from "vue";
  import { helper } from "src/helpers";
  import { useGeneralTab } from "src/components/areas/dashboard/_composables/generalTab/useGeneralTab";

  const draggable = useGeneralTab();

  const props = defineProps({
    title: String,
    ratio: Number,
    ratioSign: String,
    fraction: {
      type: Number,
      default: 0,
    },
  });

  const emit = defineEmits(["hideWidget"]);

  const hideWidget = () => {
    emit("hideWidget");
  };

  const isShakingComputed = computed(
    () => draggable.state.isShaking.value
  );
</script>
