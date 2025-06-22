<template>
  <tool-bar
    :inside="inside"
    :margin="!inside"
    :title="title"
    buttons
    back-button
  >
    <template #buttons>
      <menu-button-edit
        :to="`/${baseRoute}/edit/${id}`"
        class="primary-gradient primary-shadow text-white text-body2"
      />
      <menu-button-copy :to="`/${baseRoute}/copy/${id}`" />
      <menu-button-delete @click="crudStore.deleteById(id)" />
      <menu-button-print @click="printStore.handlePrint()" />
    </template>
  </tool-bar>

  <div class="row q-col-gutter-lg">
    <div class="col-md-8 col-sm-12 col-xs-12">
      <q-card bordered>
        <div :ref="printStore.printRef">
          <header-section
            :model="model"
            :title="$t('main-menu-items.Inv_ModifyStock_View')"
          >
            <!-- <template #header>
              <div class="q-gutter-sm">
                <span>{{ $t("shared.labels.from") }}:</span>
                <span class="q-px-sm">
                  {{ model?.inventoryTitle }}
                </span>
                <span>{{ $t("shared.labels.to") }}:</span>
                <span class="q-px-sm">
                  {{ model?.toInventoryTitle }}
                </span>
              </div>
            </template> -->
          </header-section>

          <q-card-section class="q-gutter-y-sm_">
            <reposition-items :model="model" />
            <footer-section :model="model" />
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

  import ToolBar from "src/components/shared/toolbars/ToolBarDesktop.vue";
  import HeaderSection from "src/components/areas/_shared/preview/VoucherHeader.vue";
  import FooterSection from "src/components/areas/_shared/preview/VoucherFooter.vue";
  import DetailSection from "src/components/areas/_shared/preview/VoucherDetail.vue";
  import RepositionItems from "src/components/areas/_shared/preview/RepositionItems.vue";
  import MenuButtonCopy from "src/components/shared/buttons/MenuButtonCopy.vue";
  import MenuButtonDelete from "src/components/shared/buttons/MenuButtonDelete.vue";
  import MenuButtonEdit from "src/components/shared/buttons/MenuButtonEdit.vue";
  import MenuButtonPrint from "src/components/shared/buttons/MenuButtonPrint.vue";

  const props = defineProps({
    item: Object,
    title: String,
    inside: Boolean,
  });

  const baseRoute = "inv/reposition";
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

  onMounted(() => {
    crudStore.getById(id.value);
  });
</script>
