<template>
  <tool-bar
    :inside="inside"
    :margin="!inside"
    :title="title"
    buttons
    back-button
  >
    <template #buttons>
      <q-btn
        :to="`/${baseRoute}/edit/${id}`"
        class="text-caption"
        round
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_edit" class="q-mr-xs" />
      </q-btn>

      <q-btn
        @click="onBottomSheetShow"
        class="text-caption"
        round
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_more_vert" />
      </q-btn>

      <!-- <q-btn
        :to="`/${baseRoute}/copy/${id}`"
        class="text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_copy" class="q-mr-xs" />
        {{ $t("shared.labels.copy") }}
      </q-btn>

      <q-btn
        @click="formStore.crudStore.deleteById(id, deleteCallBack)"
        class="text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_delete" class="q-mr-xs" />
        {{ $t("shared.labels.delete") }}
      </q-btn>

      <slot name="toolbar-custom" :form-store="formStore"></slot>

      <q-btn
        @click="helper.print('invoicePreview')"
        class="text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_print" class="q-mr-xs" />
        چاپ
      </q-btn>

      <q-btn
        @click="formStore.downloadPdf(id)"
        class="text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="download" class="q-mr-xs" />
        تبدیل به pdf
      </q-btn>

      <q-btn
        @click="sendEmail"
        class="text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="send" class="q-mr-xs" />
        ارسال ایمیل
      </q-btn> -->
    </template>
  </tool-bar>

  <bottom-sheet
    v-if="bottomSheetStatus"
    header
    :status="bottomSheetStatus"
    @hide="onBottomSheetHide"
  >
    <template #header-title>
      {{ $t("shared.labels.more") }}
    </template>

    <template #body>
      <q-list padding>
        <q-item
          :to="`/${baseRoute}/copy/${id}`"
          clickable
          v-close-popup
          tabindex="0"
        >
          <q-item-section avatar>
            <q-avatar class="bg-on-dark text-on-dark">
              <q-icon name="o_copy" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <div class="text-body2 no-letter-spacing">
              {{ $t("shared.labels.copy") }}
            </div>
          </q-item-section>
        </q-item>

        <!-- <template v-if="activation && selectedIds?.length > 0">
          <q-separator size="0.5px" class="q-my-sm" />

          <q-item
            clickable
            v-close-popup
            tabindex="0"
            @click="
              formStore.crudStore.deleteById(id, deleteCallBack)
            "
          >
            <q-item-section avatar>
              <q-avatar class="bg-on-dark text-on-dark">
                <q-icon name="o_check" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <div class="text-body2 no-letter-spacing">
                {{ $t("shared.labels.activate") }}
              </div>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-close-popup
            tabindex="0"
            @click="
              crudStore.deactivate(selectedIds, tableStore.reloadData)
            "
          >
            <q-item-section avatar>
              <q-avatar class="bg-on-dark text-on-dark">
                <q-icon name="o_close" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <div class="text-body2 no-letter-spacing">
                {{ $t("shared.labels.deactivate") }}
              </div>
            </q-item-section>
          </q-item>
        </template> -->

        <slot name="buttons-custom" />

        <q-separator size="0.5px" class="q-my-sm" />

        <q-item
          clickable
          v-close-popup
          tabindex="0"
          @click="helper.print('invoicePreview')"
        >
          <q-item-section avatar>
            <q-avatar class="bg-on-dark text-on-dark">
              <q-icon name="o_print" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <div class="text-body2 no-letter-spacing">
              {{ $t("shared.labels.print") }}
            </div>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-close-popup
          tabindex="0"
          @click="formStore.downloadPdf(id)"
        >
          <q-item-section avatar>
            <q-avatar class="bg-on-dark text-on-dark">
              <q-icon name="o_print" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <div class="text-body2 no-letter-spacing">
              تبدیل به pdf
            </div>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-close-popup
          tabindex="0"
          @click="sendEmail"
        >
          <q-item-section avatar>
            <q-avatar class="bg-on-dark text-on-dark">
              <q-icon name="o_send" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <div class="text-body2 no-letter-spacing">
              ارسال ایمیل
            </div>
          </q-item-section>
        </q-item>

        <q-separator size="0.5px" class="q-my-sm" />

        <q-item
          clickable
          v-close-popup
          tabindex="0"
          @click="formStore.crudStore.deleteById(id, deleteCallBack)"
        >
          <q-item-section avatar>
            <q-avatar class="bg-on-dark text-on-dark">
              <q-icon name="o_delete" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <div class="text-body2 no-letter-spacing">
              {{ $t("shared.labels.delete") }}
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </template>
  </bottom-sheet>
</template>

<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useQuasar } from "quasar";
  import { helper } from "src/helpers";
  import { useQuoteState } from "src/components/areas/sls/_composables/useQuoteState";

  import ToolBar from "src/components/shared/ToolBarMobile.vue";
  import SendEmailDialog from "../forms/SendEmailDialog.vue";
  import BottomSheet from "src/components/shared/BottomSheet.vue";

  const props = defineProps({
    id: String,
    title: String,
    inside: Boolean,
    baseRoute: String,
    formStore: Object,
  });

  const router = useRouter();
  const $q = useQuasar();
  const quoteStore = useQuoteState();

  const bottomSheetStatus = ref(false);

  const onBottomSheetShow = () => {
    bottomSheetStatus.value = true;
  };

  const onBottomSheetHide = () => {
    bottomSheetStatus.value = false;
  };

  function deleteCallBack() {
    quoteStore.state.firstLoad.value = false;
    router.back();
  }

  function sendEmail() {
    $q.dialog({
      component: SendEmailDialog,
      componentProps: {
        id: props.id,
        baseRoute: props.baseRoute,
      },
    }).onOk(async () => {
      await reloadData();
    });
  }
</script>
