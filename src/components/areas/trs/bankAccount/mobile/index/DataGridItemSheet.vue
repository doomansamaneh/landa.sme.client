<template>
  <bottom-sheet header :status="status" @hide="hide">
    <template #header-title>
      {{ item?.bankTitle }} / {{ item?.bankBranchCode }} / {{ item?.bankBranchTitle }}
    </template>

    <template #body>
      <q-list padding>
        <q-separator class="q-my-sm" />
        <menu-item
          icon="o_file_download"
          title="تبدیل به اکسل"
          @click="exportToExcel"
        />
        <menu-item-print @click="handlePrint" />
        <menu-item
          icon="o_refresh"
          title="تازه سازی"
          @click="refreshPage"
        />
      </q-list>
    </template>
  </bottom-sheet>
</template>

<script setup>
  import { useFormActions } from "src/composables/useFormActions";
  import { usePrint } from "src/composables/usePrint";

  import BottomSheet from "components/shared/BottomSheet.vue";
  import MenuItemPrint from "src/components/shared/buttons/MenuItemPrint.vue";
  import MenuItem from "src/components/shared/buttons/MenuItem.vue";

  const props = defineProps({
    status: Boolean,
    item: Object,
    baseRoute: String,
    crudStore: Object,
    printStore: Object,
  });

  const emits = defineEmits(["hide"]);

  const hide = () => {
    emits("hide");
  };

  const exportToExcel = () => {
    console.log("Exporting to Excel for bank account");
    hide();
  };

  const handlePrint = () => {
    if (props.printStore) {
      props.printStore.handlePrint();
    }
    hide();
  };

  const refreshPage = () => {
    if (props.crudStore && props.item?.id) {
      props.crudStore.getById(props.item.id);
    }
    hide();
  };
</script>
