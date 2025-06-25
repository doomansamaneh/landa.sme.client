<template>
  <toolbar-desktop
    v-if="model"
    :inside="inside"
    :margin="!inside"
    :title="title"
    :menu-items="menuItems"
    back-button
  />

  <div class="row q-col-gutter-lg">
    <div class="col-md-8 col-sm-12 col-xs-12">
      <q-card bordered>
        <div :ref="printStore.printRef">
          <header-section
            :model="model"
            :title="$t('main-menu-items.Inv_CloseOrder_View')"
          >
            <template #header>
              انبار: {{ model?.inventoryTitle }}
            </template>
          </header-section>

          <q-card-section class="q-gutter-y-sm_">
            <body-section v-if="model" :model="model" />
          </q-card-section>
        </div>
      </q-card>
    </div>
    <div class="col-md-4 col-sm-12 col-xs-12">
      <detail-section :model="model" />
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { usePrint } from "src/composables/usePrint";
  import { useFormActions } from "src/composables/useFormActions";
  import { useCloseOrderPreviewMenu } from "src/components/areas/inv/_menus/useCloseOrderPreviewMenu.js";
  import { usePreviewMenuContext } from "src/components/areas/_shared/menus/usePreviewMenuContext";

  import ToolbarDesktop from "src/components/shared/toolbars/DynamicToolBarDesktop.vue";
  import HeaderSection from "src/components/areas/_shared/preview/VoucherHeader.vue";
  import DetailSection from "src/components/areas/_shared/preview/VoucherDetail.vue";
  import BodySection from "./BodySection.vue";

  const props = defineProps({
    item: Object,
    title: String,
    inside: Boolean,
  });

  const baseRoute = "inv/closeOrder";
  const model = ref(null);

  const crudStore = useFormActions(baseRoute, model);
  const printStore = usePrint();
  const route = useRoute();
  const router = useRouter();

  const id = computed(() => props.item?.id ?? route.params.id);

  function deleteCallBack() {
    //voucherStore.state.firstLoad.value = false;
    router.back();
  }

  const context = usePreviewMenuContext(model.value, baseRoute);

  const menuItems = computed(() =>
    useCloseOrderPreviewMenu(context.value)
  );

  onMounted(() => {
    crudStore.getById(id.value);
  });
</script>
