<template>
    <div :class="headerMargin()">
        <div :class="titlePadding()" class="text-h6 text-weight-700 no-letter-spacing">
            راه اندازی اولیه کسب و کار
        </div>

        <div :class="cardWidth()">
            <q-stepper contracted class="border-radius-xl" :class="styles()" v-model="step" ref="stepper"
                color="primary" animated>
                <q-step prefix="1" :name="1" title="اطلاعات اصلی" icon="info" :done="step > 1">
                    <basic-info inside />
                </q-step>

                <q-step prefix="2" :name="2" title="تماس" icon="phone" :done="step > 2">
                    <contact-info inside />
                </q-step>

                <q-step prefix="3" :name="3" title="مالیات" icon="paid" :done="step > 3">
                    <vat-info inside />
                </q-step>

                <q-step prefix="4" :name="4" title="بیمه" icon="local_hospital" :done="step > 4">
                    <insurance-info inside />
                </q-step>

                <q-step prefix="5" :name="5" title="حقوق و دستمزد" icon="payments" :done="step > 5">
                    <salary-info inside />
                </q-step>

                <q-step prefix="6" :name="6" title="بازرگانی، خرید و فروش" icon="storefront" :done="step > 6">
                    <sales-info inside />
                </q-step>

                <q-step prefix="7" :name="7" title="لوگو" icon="diamond" :done="step > 7">
                    <logo-info inside />
                </q-step>

                <template v-slot:navigation>
                    <q-stepper-navigation>
                        <q-btn class="primary-shadow" unelevated rounded @click="$refs.stepper.next()" color="primary"
                            :label="step === 7 ? 'پایان' : 'به پیش'" />
                        <q-btn rounded v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()"
                            label="پسین" class="q-ml-sm" />
                    </q-stepper-navigation>
                </template>

                <template v-slot:message>
                    <q-banner class="bg-on-dark" v-if="step === 1">
                        <div class="row items-center q-gutter-sm">
                            <q-icon size="24px" name="o_info" />
                            <div class="text-body1 text-weight-700 no-letter-spacing">
                                اطلاعات اصلی
                            </div>
                        </div>
                    </q-banner>

                    <q-banner class="bg-on-dark" v-if="step === 2">
                        <div class="row items-center q-gutter-sm">
                            <q-icon size="24px" name="o_phone" />
                            <div class="text-body1 text-weight-700 no-letter-spacing">
                                تماس
                            </div>
                        </div>
                    </q-banner>

                    <q-banner class="bg-on-dark" v-if="step === 3">
                        <div class="row items-center q-gutter-sm">
                            <q-icon size="24px" name="o_paid" />
                            <div class="text-body1 text-weight-700 no-letter-spacing">
                                مالیات
                            </div>
                        </div>
                    </q-banner>

                    <q-banner class="bg-on-dark" v-if="step === 4">
                        <div class="row items-center q-gutter-sm">
                            <q-icon size="24px" name="o_local_hospital" />
                            <div class="text-body1 text-weight-700 no-letter-spacing">
                                بیمه
                            </div>
                        </div>
                    </q-banner>

                    <q-banner class="bg-on-dark" v-if="step === 5">
                        <div class="row items-center q-gutter-sm">
                            <q-icon size="24px" name="o_payments" />
                            <div class="text-body1 text-weight-700 no-letter-spacing">
                                حقوق و دستمزد
                            </div>
                        </div>
                    </q-banner>

                    <q-banner class="bg-on-dark" v-if="step === 6">
                        <div class="row items-center q-gutter-sm">
                            <q-icon size="24px" name="storefront" />
                            <div class="text-body1 text-weight-700 no-letter-spacing">
                                بازرگانی، خرید و فروش
                            </div>
                        </div>
                    </q-banner>

                    <q-banner class="bg-on-dark" v-if="step === 7">
                        <div class="row items-center q-gutter-sm">
                            <q-icon size="24px" name="o_diamond" />
                            <div class="text-body1 text-weight-700 no-letter-spacing">
                                لوگو و امضا
                            </div>
                        </div>
                    </q-banner>

                </template>

            </q-stepper>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useQuasar } from "quasar";

import BasicInfo from "src/components/areas/cmn/appConfig/BasicInfo.vue";
import ContactInfo from "src/components/areas/cmn/appConfig/ContactInfo.vue";
import VatInfo from "src/components/areas/cmn/appConfig/VATInfo.vue";
import InsuranceInfo from "src/components/areas/cmn/appConfig/InsuranceInfo.vue";
import SalaryInfo from "src/components/areas/cmn/appConfig/SalaryInfo.vue";
import SalesInfo from "src/components/areas/cmn/appConfig/SalesInfo.vue";
import LogoInfo from "src/components/areas/cmn/appConfig/LogoInfo.vue";

const $q = useQuasar()
const step = ref(1)

const cardWidth = () => {
    return $q.screen.gt.sm ? 'step-card' : ''
}

const styles = () => {
    return $q.screen.gt.xs ? 'q-card bordered' : 'no-border no-shadow'
}

const headerMargin = () => {
    return $q.screen.gt.xs ? 'q-mt-lg q-pt-md q-pb-md q-mb-xl' : 'q-my-lg'
}

const titlePadding = () => {
    return $q.screen.gt.xs ? 'q-mb-md' : 'q-px-lg'
}
</script>

<style lang="scss">
.step-card {
    width: 900px;
}
</style>