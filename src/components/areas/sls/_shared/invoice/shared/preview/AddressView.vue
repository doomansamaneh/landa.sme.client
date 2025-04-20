<template>
  <toolbar-mobile
    v-if="$q.screen.xs"
    buttons
    margin
    :title="title"
    back-button
  >
    <template #buttons>
      <menu-button-print
        class="primary-gradient primary-shadow text-white text-body2"
        @click="printStore.handlePrint()"
      />
    </template>
  </toolbar-mobile>

  <toolbar-desktop v-else buttons margin :title="title" back-button>
    <template #buttons>
      <menu-button-print
        class="primary-gradient primary-shadow text-white text-body2"
        @click="printStore.handlePrint()"
      />
    </template>
  </toolbar-desktop>

  <q-card bordered square>
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

  import ToolbarDesktop from "src/components/shared/ToolBarDesktop.vue";
  import ToolbarMobile from "src/components/shared/ToolBarPreviewMobile.vue";
  import MenuButtonPrint from "src/components/shared/buttons/MenuButtonPrint.vue";
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

  onMounted(async () => {
    model.value = await crudStore.customGetAction(
      `sls/invoice/getAddress/${id.value}`
    );
  });
</script>
