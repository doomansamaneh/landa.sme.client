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
        v-for="(menu, index) in menuItems"
        :key="index"
        :class="menu.cssClass"
        class="text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" :name="menu.icon" class="q-mr-xs" />
        {{ $t(`shared.labels.${menu.title}`) }}
      </q-btn>

      <q-btn
        class="bg-red-5 primary-shadow_ text-white text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
        @click="crudStore.deleteById(model.id, null, 'deleteById')"
      >
        <q-icon size="20px" name="o_delete" class="q-mr-xs" />
        {{ $t("shared.labels.deleteCheckLog") }}
      </q-btn>

      <!-- <q-btn
        @click="helper.print('invoicePreview')"
        class="text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_print" class="q-mr-xs" />
        {{ $t("shared.labels.print") }}
      </q-btn> -->
    </template>
  </tool-bar>

  <div class="row q-col-gutter-lg">
    <div class="col-md-5 col-sm-12 col-xs-12">
      <q-card bordered>
        <q-card-section class="bg-green-5 text-white">
          <h5>مشخصات چک</h5>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section class="q-gutter-y-sm_">
          <div id="invoicePreview">
            <body-section :model="model" />
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-md-7 col-sm-12 col-xs-12">
      <q-card bordered>
        <q-card-section class="bg-blue-12 text-white">
          <h5>تاریخچه سند</h5>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-px-none">
          <item-log v-if="model" :model="model" flat />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { helper } from "src/helpers";
  import { documentType, paymentStatus } from "src/constants";
  import { useFormActions } from "src/composables/useFormActions";

  import ToolBar from "src/components/shared/ToolBarDesktop.vue";
  import BodySection from "./_BodySection.vue";
  import ItemLog from "./_ItemLog.vue";

  const props = defineProps({
    item: Object,
    title: String,
    inside: Boolean,
  });

  const route = useRoute();
  const baseRoute = "trs/paymentItemCheck";
  const model = ref(null);
  const menuItems = ref([]);
  const crudStore = useFormActions(baseRoute, model);

  const id = computed(() => props.item?.id ?? route.params.id);

  function addMenuItems() {
    if (model?.value.documentTypeId === documentType.receipt)
      addReceiptMenuItems();
    else addNonReceiptMenuItems();
  }

  function addReceiptMenuItems() {
    if (model?.value.statusId === paymentStatus.normal) {
      addMenuItem(
        "transferToBank",
        "bg-red-5_primary-shadow_text-white",
        "account_balance",
        `/trs/paymentItemCheck/TransferToBank/${model?.value.Id}`
      );
      addMenuItem(
        "cashTheCheck",
        "bg-red-5_primary-shadow_text-white",
        "attach_money",
        `/trs/paymentItemCheck/CashReceiptCheck/${model?.value.Id}`
      );
      addMenuItem(
        "bounceTheCheck",
        "bg-red-5_primary-shadow_text-white",
        "undo",
        `/trs/paymentItemCheck/BounceReceiptCheck/${model?.value.Id}`
      );
    } else if (statusId === paymentStatus.transferedToBank) {
      addMenuItem(
        "cashTheCheck",
        "bg-red-5_primary-shadow_text-white",
        "attach_money",
        `/trs/paymentItemCheck/CashReceiptCheck/${model?.value.Id}`
      );
      addMenuItem(
        "bounceTheCheck",
        "bg-red-5_primary-shadow_text-white",
        "undo",
        `/trs/paymentItemCheck/BounceReceiptCheck/${model?.value.Id}`
      );
    }
  }

  function addNonReceiptMenuItems() {
    if (model?.value.statusId === paymentStatus.normal) {
      addMenuItem(
        "cashTheCheck",
        "bg-red-5_primary-shadow_text-white",
        "attach_money",
        `/trs/paymentItemCheck/CashPayedCheck/${model?.value.Id}`
      );
      addMenuItem(
        "bounceTheCheck",
        "bg-red-5_primary-shadow_text-white",
        "undo",
        `/trs/paymentItemCheck/BouncePayedCheck/${model?.value.Id}`
      );
    }
  }

  function addMenuItem(title, cssClass, icon, url) {
    menuItems.value.push({
      title: title,
      cssClass: cssClass,
      icon: icon,
      url: url,
    });
  }

  onMounted(async () => {
    await crudStore.getById(id.value);
    addMenuItems();
  });
</script>
