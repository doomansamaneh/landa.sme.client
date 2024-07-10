<template>
  <div class="q-pa-md">
    <div class="q-gutter-x-sm">
      <q-btn
        unelevated
        :rounded="$q.screen.gt.xs"
        :round="$q.screen.xs"
        class="text-body2 no-letter-spacing primary-shadow primary-gradient"
        :padding="$q.screen.gt.xs ? '6px 12px' : '5px'"
        text-color="white"
      >
        <q-icon
          size="20px"
          name="o_add"
          :class="$q.screen.gt.xs ? 'q-mr-xs' : ''"
        />
        <span v-if="$q.screen.gt.xs">افزودن تماس</span>
        <q-menu class="border-radius-lg" cover>
          <q-list dense padding style="width: 200px">
            <template
              v-for="ct in helper.getEnumOptions(
                contactType,
                'contactType'
              )"
              :key="ct.value"
            >
              <q-item
                v-if="ct.value !== contactType.address"
                clickable
                v-close-popup
                tabindex="0"
                @click="addContact(ct.value)"
              >
                <div class="q-py-sm">
                  <q-item-section avatar>
                    <q-avatar class="bg-on-dark" size="sm">
                      <q-icon
                        :name="contactTypeIcons[ct.value]"
                        size="16px"
                      />
                    </q-avatar>
                  </q-item-section>
                </div>
                <q-item-section>
                  <div class="text-body2 no-letter-spacing">
                    {{ ct.label }}
                  </div>
                </q-item-section>
              </q-item>
            </template>
          </q-list>
        </q-menu>
      </q-btn>

      <q-btn
        unelevated
        round
        class="text-on-dark"
        @click="tableStore.reloadData()"
      >
        <q-icon name="o_refresh" size="20px" />
      </q-btn>
    </div>

    <div v-for="contact in tableStore.rows.value" :key="contact.id">
      <contact-item :item="contact" :table-store="tableStore" />
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { useQuasar } from "quasar";
  import { helper } from "src/helpers";
  import {
    contactType,
    contactTypeIcons,
    formAction,
    sqlOperator,
  } from "src/constants";
  import { useDataTable } from "src/composables/useDataTable";

  import ContactItem from "./_ContactItem.vue";
  import CreateFormDialog from "../../../customerContact/shared/forms/CreateFormDialog.vue";

  const props = defineProps({
    item: Object,
  });
  const $q = useQuasar();
  const tableStore = useDataTable({
    dataSource: "crm/customerContact/getGridData",
  });

  tableStore.setFilterExpression([
    {
      fieldName: "cc.customerId",
      operator: sqlOperator.equal,
      value: props.item.id,
    },
  ]);

  const loadData = async () => {
    await tableStore.loadData();
  };

  const addContact = (typeId) => {
    $q.dialog({
      component: CreateFormDialog,
      componentProps: {
        customerId: props.item.id,
        action: formAction.create,
        typeId: typeId,
      },
    }).onOk(async () => {
      await tableStore.reloadData();
    });
  };

  onMounted(() => {
    loadData();
  });
</script>
