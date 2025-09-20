<template>
  <toolbar-observer ref="observer" :inside="inside">
    <q-toolbar :style="customStyles">
      <div class="q-gutter-x-sm">
        <slot name="buttons">
          <q-btn
            padding="8px 16px"
            no-caps
            class="primary-gradient primary-shadow text-white text-body2"
            rounded
            unelevated
            @click="save"
          >
            <q-icon name="o_save" size="20px" class="q-mr-sm" />
            {{ $t("shared.labels.save") }}
          </q-btn>

          <q-btn
            padding="8px 16px"
            no-caps
            v-if="showSaveAndNew"
            class="text-body2"
            rounded
            unelevated
            @click="saveAndNew"
          >
            <q-icon name="o_add" size="20px" class="q-mr-sm" />
            {{ $t("shared.labels.saveAndNew") }}
          </q-btn>
        </slot>
      </div>
      <div class="q-space" />
      <div class="row items-center">
        <slot name="header">
          <span
            :style="
              $q.screen.gt.xs ? 'width: auto;' : 'max-width: auto;'
            "
            class="ellipsis-2-lines text-weight-700"
            :class="$q.screen.gt.sm ? 'text-h6' : 'text-body1'"
          >
            <slot name="header-title">
              {{ title }}
            </slot>
          </span>
          <back-button
            v-if="!noBackButton"
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
  import ToolbarObserver from "src/components/shared/toolbars/ToolBarObserver.vue";

  const props = defineProps({
    title: String,
    inside: Boolean,
    showSaveAndNew: Boolean,
    noBackButton: Boolean,
  });

  const emit = defineEmits([
    "submit-call-back",
    "submit-and-new-call-back",
  ]);

  const $q = useQuasar();
  const observer = ref(null);

  const save = () => {
    emit("submit-call-back");
  };

  const saveAndNew = () => {
    emit("submit-and-new-call-back");
  };

  const customStyles = computed(() => {
    let padding = "";

    if (props.inside) {
      padding = "24px";
    } else {
      padding = $q.screen.sm ? "24px" : $q.screen.gt.sm ? "38px" : "";
    }

    return {
      "margin-top": "4px",
      "margin-bottom": "4px",
      "padding-left": padding,
      "padding-right": padding,
    };
  });
</script>
