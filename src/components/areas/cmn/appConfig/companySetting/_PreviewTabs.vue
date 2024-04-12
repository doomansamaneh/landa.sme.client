<template>
    <q-tabs v-model="tab" class="border-radius-lg bg-primary text-white q-mt-lg" indicator-color="white" align="start"
        inline-label narrow-indicator>
        <q-tab name="basic-info" label="اطلاعات پایه" icon="o_person" />
        <q-tab name="contact-info" label="تماس" icon="o_phone" />
        <q-tab name="vat-info" label="مالیات" icon="o_attach_money" />
        <q-tab name="insurance-info" label="بیمه" icon="o_health_and_safety" />
        <q-tab name="salary-info" label="حقوق و دستمزد" icon="o_payments" />
        <q-tab name="sales-info" label="بازرگانی، خرید و فروش" icon="o_currency_exchange" />
    </q-tabs>

    <q-tab-panels class="bordered border-radius-lg q-mt-md"  v-model="tab" animated>

        <q-tab-panel class="no-padding no-border no-shadow bg-main" name="basic-info">
            <basic-info />
        </q-tab-panel>
        
        <q-tab-panel class="no-padding no-border no-shadow bg-main" name="contact-info">
            <contact-info />
        </q-tab-panel>

        <q-tab-panel class="no-padding no-border no-shadow bg-main" name="vat-info">
            <vat-info />
        </q-tab-panel>

        <q-tab-panel class="no-padding no-border no-shadow bg-main" name="insurance-info">
            <insurance-info />
        </q-tab-panel>

        <q-tab-panel class="no-padding no-border no-shadow bg-main" name="salary-info">
            <salary-info />
        </q-tab-panel>

        <q-tab-panel class="no-padding no-border no-shadow bg-main" name="sales-info">
            <sales-info />
        </q-tab-panel>

    </q-tab-panels>
</template>

<script setup>
import { ref, computed } from "vue";
import { useQuasar } from "quasar"

import BasicInfo from "src/components/areas/cmn/appConfig/companySetting/_TabPanelBasicInfo.vue";
import ContactInfo from "src/components/areas/cmn/appConfig/companySetting/_TabPanelContactInfo.vue";
import VatInfo from "src/components/areas/cmn/appConfig/companySetting/_TabPanelVATInfo.vue";
import InsuranceInfo from "src/components/areas/cmn/appConfig/companySetting/_TabPanelInsuranceInfo.vue";
import SalaryInfo from "src/components/areas/cmn/appConfig/companySetting/_TabPanelSalaryInfo.vue";
import SalesInfo from "src/components/areas/cmn/appConfig/companySetting/_TabPanelSalesInfo.vue";

const $q = useQuasar()
const tab = ref("basic-info");

</script>