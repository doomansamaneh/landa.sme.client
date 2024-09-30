<template>
  <bottom-sheet header :status="status" @hide="hide">
    <template #header-title>
      {{ item.no }} / {{ item.subject }}
    </template>

    <template #body>
      <q-list padding>
        <sheet-item-edit :to="`/acc/voucher/edit/${item.id}`" />
        <sheet-item-copy :to="`/acc/voucher/copy/${item.id}`" />
        <q-separator class="q-my-sm" />
        <sheet-item
          :title="$t('shared.labels.sendEmail')"
          icon="send"
          @click="sendEmail"
        />
        <q-separator class="q-my-sm" />
        <sheet-item-print @click="downloadPdf" />
        <q-separator class="q-my-sm" />
        <sheet-item-delete @click="deleteItem" />
      </q-list>
    </template>
  </bottom-sheet>

  <q-dialog
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
    v-model="printDialog"
  >
    <q-card class="q-mt-xl">
      <q-card-section>
        <div class="row items-center justify-between">
          <span class="text-body1 no-letter-spacing">چاپ</span>
          <q-btn round unelevated icon="o_close" v-close-popup />
        </div>
      </q-card-section>

      <q-card-section class="no-padding">
        <q-list padding>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar
                class="bg-on-dark text-on-dark"
                icon="o_print"
              />
            </q-item-section>

            <q-item-section class="text-body1 no-letter-spacing">
              چاپ مستقیم
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar
                class="bg-on-dark text-on-dark"
                icon="o_crop_portrait"
              />
            </q-item-section>

            <q-item-section class="text-body1 no-letter-spacing">
              پی دی اف - A4
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar
                class="bg-on-dark text-on-dark"
                icon="o_crop_landscape"
              />
            </q-item-section>

            <q-item-section class="text-body1 no-letter-spacing">
              پی دی اف - A4 - افقی
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar
                class="bg-on-dark text-on-dark"
                icon="o_crop_portrait"
              />
            </q-item-section>

            <q-item-section class="text-body1 no-letter-spacing">
              پی دی اف - A5
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar
                class="bg-on-dark text-on-dark"
                icon="o_crop_landscape"
              />
            </q-item-section>

            <q-item-section class="text-body1 no-letter-spacing">
              پی دی اف - A5 - افقی
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar
                class="bg-on-dark text-on-dark"
                icon="o_contact_mail"
              />
            </q-item-section>

            <q-item-section class="text-body1 no-letter-spacing">
              چاپ برچسب نشانی
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import { useQuasar } from "quasar";
  import { useDataTable } from "src/composables/useDataTable";
  import { downloadManager } from "src/helpers";
  import { useFormActions } from "src/composables/useFormActions";

  import BottomSheet from "components/shared/BottomSheet.vue";
  import SendEmailDialog from "../../shared/forms/SendEmailDialog.vue";
  import SheetItem from "src/components/shared/buttons/SheetItem.vue";
  import SheetItemEdit from "src/components/shared/buttons/SheetItemEdit.vue";
  import SheetItemCopy from "src/components/shared/buttons/SheetItemCopy.vue";
  import SheetItemPrint from "src/components/shared/buttons/SheetItemPrint.vue";
  import SheetItemDelete from "src/components/shared/buttons/SheetItemDelete.vue";

  const props = defineProps({
    tableStore: useDataTable,
    title: String,
    status: Boolean,
    item: Object,
    deleteCallBack: Function,
  });
  const $q = useQuasar();
  const baseRoute = "acc/voucher";

  const emits = defineEmits(["hide"]);
  const crudStore = useFormActions(baseRoute);

  const downloadPdf = () => {
    downloadManager.downloadGet(
      `${baseRoute}/generatePdf/${props.item.id}`
    );
  };

  const deleteItem = () => {
    crudStore.deleteById(
      props.item.id,
      props.deleteCallBack ?? props.tableStore?.reloadData
    );
  };

  function sendEmail() {
    $q.dialog({
      component: SendEmailDialog,
      componentProps: {
        id: props.item.id,
        baseRoute: baseRoute,
      },
    }).onOk(async () => {
      //await props.tableStore.reloadData();
    });
  }

  const hide = () => {
    emits("hide");
  };
</script>
