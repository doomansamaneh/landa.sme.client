<template>
  <toolbar-observer ref="observer">
    <q-toolbar :style="customStyles">
      <div class="q-gutter-x-sm">
        <slot name="buttons">
          <q-btn
            class="primary-gradient primary-shadow text-white text-body2"
            padding="6px 12px"
            rounded
            unelevated
            @click="save"
          >
            <q-icon name="o_save" size="20px" class="q-mr-sm" />
            {{ $t("shared.labels.save") }}
          </q-btn>
        </slot>
      </div>
      <div class="q-space" />
      <div class="row items-center">
        <slot name="header">
          <span
            :style="
              $q.screen.gt.xs ? 'width: auto;' : 'max-width: 160px;'
            "
            class="ellipsis-2-lines text-weight-700"
            :class="$q.screen.gt.sm ? 'text-h6' : 'text-body1'"
          >
            <slot name="header-title">
              {{ title }}
            </slot>
          </span>
          <back-button
            :class="$q.screen.xs ? 'q-mr-sm' : 'q-ml-sm'"
          />
        </slot>
      </div>
    </q-toolbar>
  </toolbar-observer>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useQuasar } from "quasar";
  import BackButton from "src/components/shared/buttons/GoBackLink.vue";
  import ToolbarObserver from "src/components/shared/ToolBarObserver.vue";

  const props = defineProps({
    title: String,
  });

  const emit = defineEmits(["submit-call-back"]);

  const $q = useQuasar();
  const observer = ref(null);

  const save = () => {
    emit("submit-call-back");
  };

  const customStyles = computed(() => {
    const padding = $q.screen.sm
      ? "24px"
      : $q.screen.gt.sm
      ? "38px"
      : "";
    return {
      "margin-top": "4px",
      "margin-bottom": "4px",
      "padding-left": padding,
      "padding-right": padding,
    };
  });
</script>
