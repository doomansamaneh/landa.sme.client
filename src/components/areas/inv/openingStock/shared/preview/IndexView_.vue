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

      <!-- <q-btn
        :to="`/${baseRoute}/edit/${id}`"
        class="primary-gradient primary-shadow text-white text-body2 "
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_edit" class="q-mr-xs" />
        {{ $t("shared.labels.edit") }}
      </q-btn>
      <q-btn
        :to="`/${baseRoute}/copy/${id}`"
        class="text-body2 "
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_copy" class="q-mr-xs" />
        {{ $t("shared.labels.copy") }}
      </q-btn>
      <q-btn
        @click="crudStore.deleteById(id)"
        class="text-body2 "
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_delete" class="q-mr-xs" />
        {{ $t("shared.labels.delete") }}
      </q-btn>
      <q-btn
        @click="printStore.handlePrint()"
        class="text-body2 "
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
    <div class="col-md-8 col-sm-12 col-xs-12">
      <q-card bordered>
        <div :ref="printStore.printRef">
          <header-section
            :model="model"
            :title="$t('main-menu-items.Inv_OpeningStock_View')"
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

  import ToolBar from "src/components/shared/ToolBarDesktop.vue";
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

  const baseRoute = "inv/openingStock";
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
