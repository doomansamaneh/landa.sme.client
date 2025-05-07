<template>
  <q-page-sticky
    v-if="$q.screen.gt.sm"
    class="z-top q-pa-md"
    position="bottom-right"
  >
    <q-btn
      round
      color="primary"
      :icon="isFullscreen ? 'fullscreen_exit' : 'fullscreen'"
      class="primary-gradient primary-shadow"
      @click="toggleFullscreen"
    />
  </q-page-sticky>

  <form-toolbar-container
    buttons
    :title="title"
    @submit-call-back="formStore.submitForm(form, action)"
  />

  <q-card
    :class="fullscreen ? 'fullscreen scroll fit' : 'form-container'"
    :square="fullscreen"
    :flat="fullscreen"
  >
    <div
      v-if="fullscreen"
      class="bg-main z-1"
      style="position: sticky; top: 0"
    >
      <form-toolbar-container
        buttons
        inside
        :title="title"
        @submit-call-back="formStore.submitForm(form, action)"
      />
    </div>

    <q-card-section
      :class="fullscreen ? 'q-px-lg q-pb-lg q-pt-none' : ''"
    >
      <q-form ref="form" autofocus>
        <desktop-form
          v-if="$q.screen.gt.sm"
          :form-store="formStore"
        />
        <mobile-form v-else :form-store="formStore" />
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { useBillModel } from "../../../_composables/useBillModel";

  import FormToolbarContainer from "src/components/shared/FormToolbarContainer.vue";
  import DesktopForm from "../../desktop/forms/CreateForm.vue";
  import MobileForm from "../../mobile/forms/CreateForm.vue";

  const props = defineProps({
    title: String,
    action: String,
    method: String,
  });

  const route = useRoute();
  const formStore = useBillModel({ baseRoute: "trs/bill" });
  const form = ref(null);
  const fullscreen = ref(true);

  const isFullscreen = computed(() => fullscreen.value);

  const toggleFullscreen = () => {
    fullscreen.value = !fullscreen.value;
  };

  onMounted(() => {
    formStore.getById(route.params.id, props.method);
  });
</script>