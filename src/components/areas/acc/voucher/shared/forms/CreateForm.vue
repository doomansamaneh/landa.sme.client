<template>
  <!-- Desktop View -->
  <template v-if="$q.screen.gt.sm">
    <q-page-sticky class="z-top q-pa-md" position="bottom-right">
      <q-btn
        no-caps
        round
        color="primary"
        :icon="isFullscreen ? 'fullscreen_exit' : 'fullscreen'"
        class="primary-gradient primary-shadow"
        @click="toggleFullscreen"
      />
    </q-page-sticky>

    <!-- Desktop, not fullscreen: Toolbar outside -->
    <form-toolbar-container
      v-if="!fullscreen"
      buttons
      :title="title"
      @submit-call-back="formStore.submitForm(form, action)"
    />

    <q-card
      :class="fullscreen ? 'fullscreen scroll fit' : 'form-container'"
      :square="fullscreen"
      :flat="fullscreen"
    >
      <!-- Desktop, fullscreen: Toolbar inside -->
      <div
        v-if="fullscreen"
        class="bg-on-dark z-1"
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
          <desktop :form-store="formStore" />
        </q-form>
      </q-card-section>
    </q-card>
  </template>

  <!-- Mobile View -->
  <template v-else>
    <!-- Mobile: Simple layout with toolbar always outside -->
    <form-toolbar-container
      buttons
      :title="title"
      @submit-call-back="formStore.submitForm(mobileForm, action)"
    />

    <q-form ref="mobileForm" autofocus>
      <mobile :form-store="formStore" />
    </q-form>
  </template>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { useVoucherModel } from "../../../_composables/useVoucherModel";

  import FormToolbarContainer from "src/components/shared/toolbars/FormToolbarContainer.vue";
  import Desktop from "src/components/areas/acc/voucher/desktop/forms/CreateForm.vue";
  import Mobile from "src/components/areas/acc/voucher/mobile/forms/CreateForm.vue";

  const props = defineProps({
    title: String,
    action: String,
    method: String,
    getOpening: Boolean,
  });

  const route = useRoute();
  const formStore = useVoucherModel({ baseRoute: "acc/voucher" });
  const form = ref(null);
  const mobileForm = ref(null);
  const fullscreen = ref(true);

  const isFullscreen = computed(() => fullscreen.value);

  const toggleFullscreen = () => {
    fullscreen.value = !fullscreen.value;
  };

  onMounted(async () => {
    if (props.getOpening) formStore.getOpeningModel();
    else await formStore.getById(route.params.id, props.method);
  });
</script>
