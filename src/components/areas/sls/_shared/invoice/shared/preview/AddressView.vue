<template>
  <toolbar-mobile
    v-if="$q.screen.xs"
    :title="title"
    :menu-items="menuItems"
    margin
    back-button
  />
  <toolbar-desktop
    v-else
    :title="title"
    :menu-items="menuItems"
    margin
    back-button
  />

  <q-card bordered>
    <div :ref="printStore.printRef">
      <q-card-section>
        <div class="row" style="gap: 16px">
          <div class="col-md col-sm-12 col-xs-12">
            <address-card
              title="فرستنده"
              :name="appConfigStore.model.value.companySetting.name"
              :location="
                appConfigStore.model.value.companySetting.location
              "
              :address="
                appConfigStore.model.value.companySetting.address
              "
              :postal-code="
                appConfigStore.model.value.companySetting.postalCode
              "
              :phone="appConfigStore.model.value.companySetting.phone"
            />
          </div>

          <div class="column col-md col-sm-12 col-xs-12">
            <address-card
              title="گیرنده"
              :name="customerData?.name"
              :location="customerData?.address?.locationTitle"
              :address="customerData?.address?.address"
              :postal-code="customerData?.address?.postalCode"
              :phone="customerData?.phone?.value"
            />
          </div>
        </div>
      </q-card-section>
    </div>
  </q-card>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { useFormActions } from "src/composables/useFormActions";
  import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";
  import { usePrint } from "src/composables/usePrint";

  import { usePreviewMenuContext } from "src/components/areas/_shared/menus/usePreviewMenuContext";
  import { useExitPreviewMenu } from "src/components/areas/sls/_menus/useExitPreviewMenu";

  import ToolbarDesktop from "src/components/shared/toolbars/DynamicToolBarDesktop.vue";
  import ToolbarMobile from "src/components/shared/toolbars/MobilePreviewToolbar.vue";
  import AddressCard from "./AddressCard.vue";

  const props = defineProps({
    title: String,
  });
  const appConfigStore = useAppConfigModel();
  const printStore = usePrint();
  const route = useRoute();
  const id = computed(() => route.params.id);
  const model = ref({});
  const crudStore = useFormActions("", model, true);

  const customerData = computed(() => model.value?.data);

  const context = usePreviewMenuContext(model.value);
  const menuItems = computed(() => useExitPreviewMenu(context.value));

  onMounted(async () => {
    model.value = await crudStore.customGetAction(
      `sls/invoice/getAddress/${id.value}`
    );
  });
</script>
