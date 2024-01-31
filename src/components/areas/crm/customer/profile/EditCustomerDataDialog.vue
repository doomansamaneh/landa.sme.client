<template>
  <q-dialog
    ref="dialogRef"
    transition-show="slide-down"
    transition-hide="fade"
    transition-duration="600"
    no-backdrop-dismiss
  >
    <edit-customer-data
      :title="title"
      @submitted="submitted"
    >
      <template #close-icon>
        <q-btn
          icon="close"
          class="icon-hover dark-3"
          flat
          round
          dense
          v-close-popup
        />
      </template>
      <template #body>
        <edit-contact-data />
        <!-- <edit-address-data /> -->
        <!-- <edit-bank-data /> -->
        <!-- <edit-business-data /> -->
      </template>
    </edit-customer-data>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue"
import { useDialogPluginComponent } from "quasar"
import EditCustomerData from "src/components/areas/crm/customer/profile/EditCustomerData.vue"
import EditContactData from "src/components/areas/crm/customer/profile/EditContactData.vue"
import EditAddressData from "src/components/areas/crm/customer/profile/EditAddressData.vue"
import EditBankData from "src/components/areas/crm/customer/profile/EditBankData.vue"
import EditBusinessData from "src/components/areas/crm/customer/profile/EditBusinessData.vue"

const title = "ویرایش اطلاعات تماس مخاطب"

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent()

function submitted(response) {
  onDialogOK()
}

</script>

