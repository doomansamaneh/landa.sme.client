<template>
  <div class="row gap-24">
    <div class="col col-md col-xs-12">
      <q-card
        class="fit bordered q-pa-none"
        flat
      >
        <q-card-section class="q-pr-md q-pl-lg q-pt-lg q-pb-none">
          <div class="row justify-between">
            <q-avatar
              round
              color="blue-grey"
              text-color="white"
              icon="o_attach_money"
              size="xl"
              class="bluegrey-shadow"
            />
            <div class="row items-center justify-end">
              <q-btn
                unelevated
                round
                dense
                :text-color="$q.dark.isActive ? 'white' : 'grey-8'"
                size="md"
                icon="o_more_vert"
              >

                <q-menu fit>
                  <q-list
                    dense
                    padding
                    style="width:200px"
                  >
                    <q-item
                      clickable
                      v-close-popup
                      tabindex="0"
                      @click="showSaleIncome"
                    >
                      <div class="q-py-sm">
                        <q-item-section avatar>
                          <q-avatar
                            class="bg-on-dark"
                            size="sm"
                          >
                            <q-icon
                              name="o_sell"
                              size="14px"
                            />
                          </q-avatar>
                        </q-item-section>
                      </div>
                      <q-item-section>
                        <div class="text-caption">فروش و درآمد، هزینه</div>
                      </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item
                      clickable
                      v-close-popup
                      tabindex="0"
                      @click="showSale"
                    >
                      <div class="q-py-sm">
                        <q-item-section avatar>
                          <q-avatar
                            class="bg-on-dark"
                            size="sm"
                          ><q-icon
                              name="o_close"
                              size="14px"
                            /></q-avatar>
                        </q-item-section>
                      </div>
                      <q-item-section>
                        <div class="text-caption">فروش</div>
                      </q-item-section>
                    </q-item>
                    <q-item
                      clickable
                      v-close-popup
                      tabindex="0"
                      @click="showCost"
                    >
                      <div class="q-py-sm">
                        <q-item-section avatar>
                          <q-avatar
                            class="bg-on-dark"
                            size="sm"
                          ><q-icon
                              name="o_check"
                              size="14px"
                            /></q-avatar>
                        </q-item-section>
                      </div>
                      <q-item-section>
                        <div class="text-caption">هزینه</div>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>

              </q-btn>
            </div>
          </div>
        </q-card-section>

        <q-card-section class="column q-gutter-y-sm q-px-lg q-py-lg">

          <div class="text-h6 text-weight-700">حاشیه سود</div>
          <div class="row items-center q-gutter-x-sm">
            <div class="text-body1 text-bold">(178,015.03) %</div>
            <div class="text-body2 text-bold text-negative">-%4</div>
          </div>
        </q-card-section>

      </q-card>
    </div>
    <div class="col col-md col-xs-12">

      <q-card
        class="fit bordered q-pa-none"
        flat
      >
        <q-card-section class="q-pr-md q-pl-lg q-pt-lg q-pb-none">
          <div class="row justify-between">
            <q-avatar
              round
              color="blue"
              text-color="white"
              icon="o_group_remove"
              size="xl"
              class="blue-shadow"
            />
            <div class="row items-center justify-end">
              <q-btn
                unelevated
                round
                dense
                :text-color="$q.dark.isActive ? 'white' : 'grey-8'"
                size="md"
                icon="o_more_vert"
              >

                <q-menu fit>
                  <q-list
                    dense
                    padding
                    style="width:200px"
                  >
                    <q-item
                      clickable
                      v-close-popup
                      tabindex="0"
                      @click="showSaleIncome"
                    >
                      <div class="q-py-sm">
                        <q-item-section avatar>
                          <q-avatar
                            class="bg-on-dark"
                            size="sm"
                          >
                            <q-icon
                              name="o_sell"
                              size="14px"
                            />
                          </q-avatar>
                        </q-item-section>
                      </div>
                      <q-item-section>
                        <div class="text-caption">فروش و درآمد، هزینه</div>
                      </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item
                      clickable
                      v-close-popup
                      tabindex="0"
                      @click="showSale"
                    >
                      <div class="q-py-sm">
                        <q-item-section avatar>
                          <q-avatar
                            class="bg-on-dark"
                            size="sm"
                          ><q-icon
                              name="o_close"
                              size="14px"
                            /></q-avatar>
                        </q-item-section>
                      </div>
                      <q-item-section>
                        <div class="text-caption">فروش</div>
                      </q-item-section>
                    </q-item>
                    <q-item
                      clickable
                      v-close-popup
                      tabindex="0"
                      @click="showCost"
                    >
                      <div class="q-py-sm">
                        <q-item-section avatar>
                          <q-avatar
                            class="bg-on-dark"
                            size="sm"
                          ><q-icon
                              name="o_check"
                              size="14px"
                            /></q-avatar>
                        </q-item-section>
                      </div>
                      <q-item-section>
                        <div class="text-caption">هزینه</div>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>

              </q-btn>
            </div>
          </div>
        </q-card-section>

        <q-card-section class="column q-gutter-y-sm q-px-lg q-py-lg">

          <div class="text-h6 text-weight-700">نسبت بدهی</div>
          <div class="row items-center q-gutter-x-sm">
            <div class="text-body1 text-bold">%0</div>
            <!-- <div class="text-body2 text-bold text-green">+%24</div> -->
          </div>
        </q-card-section>

      </q-card>

    </div>
  </div>
  <div class="row gap-24 q-mt-lg">
    <div class="col col-md col-xs-12">
      <q-card
        class="fit bordered q-pa-none"
        flat
      >
        <q-card-section class="q-pr-md q-pl-lg q-pt-lg q-pb-none">
          <div class="row justify-between">
            <q-avatar
              round
              color="green"
              text-color="white"
              icon="o_exposure_plus_2"
              size="xl"
              class="green-shadow"
            />
            <div class="row items-center justify-end">
              <q-btn
                unelevated
                round
                dense
                :text-color="$q.dark.isActive ? 'white' : 'grey-8'"
                size="md"
                icon="o_more_vert"
              >

                <q-menu fit>
                  <q-list
                    dense
                    padding
                    style="width:200px"
                  >
                    <q-item
                      clickable
                      v-close-popup
                      tabindex="0"
                      @click="showSaleIncome"
                    >
                      <div class="q-py-sm">
                        <q-item-section avatar>
                          <q-avatar
                            class="bg-on-dark"
                            size="sm"
                          >
                            <q-icon
                              name="o_sell"
                              size="14px"
                            />
                          </q-avatar>
                        </q-item-section>
                      </div>
                      <q-item-section>
                        <div class="text-caption">فروش و درآمد، هزینه</div>
                      </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item
                      clickable
                      v-close-popup
                      tabindex="0"
                      @click="showSale"
                    >
                      <div class="q-py-sm">
                        <q-item-section avatar>
                          <q-avatar
                            class="bg-on-dark"
                            size="sm"
                          ><q-icon
                              name="o_close"
                              size="14px"
                            /></q-avatar>
                        </q-item-section>
                      </div>
                      <q-item-section>
                        <div class="text-caption">فروش</div>
                      </q-item-section>
                    </q-item>
                    <q-item
                      clickable
                      v-close-popup
                      tabindex="0"
                      @click="showCost"
                    >
                      <div class="q-py-sm">
                        <q-item-section avatar>
                          <q-avatar
                            class="bg-on-dark"
                            size="sm"
                          ><q-icon
                              name="o_check"
                              size="14px"
                            /></q-avatar>
                        </q-item-section>
                      </div>
                      <q-item-section>
                        <div class="text-caption">هزینه</div>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>

              </q-btn>
            </div>
          </div>
        </q-card-section>

        <q-card-section class="column q-gutter-y-sm q-px-lg q-py-lg">

          <div class="text-h6 text-weight-700">نسبت جاری</div>
          <div class="row items-center q-gutter-x-sm">
            <div class="text-body1 text-bold">(30.53)</div>
            <div class="text-body2 text-bold text-green">+%24</div>
          </div>
        </q-card-section>

      </q-card>
    </div>
    <div class="col col-md col-xs-12">
      <q-card
        class="fit bordered q-pa-none"
        flat
      >
        <q-card-section class="q-pr-md q-pl-lg q-pt-lg q-pb-none">
          <div class="row justify-between">
            <q-avatar
              round
              color="pink"
              text-color="white"
              icon="o_hourglass_empty"
              size="xl"
              class="pink-shadow"
            />
            <div class="row items-center justify-end">
              <q-btn
                unelevated
                round
                dense
                :text-color="$q.dark.isActive ? 'white' : 'grey-8'"
                size="md"
                icon="o_more_vert"
              >

                <q-menu fit>
                  <q-list
                    dense
                    padding
                    style="width:200px"
                  >
                    <q-item
                      clickable
                      v-close-popup
                      tabindex="0"
                      @click="showSaleIncome"
                    >
                      <div class="q-py-sm">
                        <q-item-section avatar>
                          <q-avatar
                            class="bg-on-dark"
                            size="sm"
                          >
                            <q-icon
                              name="o_sell"
                              size="14px"
                            />
                          </q-avatar>
                        </q-item-section>
                      </div>
                      <q-item-section>
                        <div class="text-caption">فروش و درآمد، هزینه</div>
                      </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item
                      clickable
                      v-close-popup
                      tabindex="0"
                      @click="showSale"
                    >
                      <div class="q-py-sm">
                        <q-item-section avatar>
                          <q-avatar
                            class="bg-on-dark"
                            size="sm"
                          ><q-icon
                              name="o_close"
                              size="14px"
                            /></q-avatar>
                        </q-item-section>
                      </div>
                      <q-item-section>
                        <div class="text-caption">فروش</div>
                      </q-item-section>
                    </q-item>
                    <q-item
                      clickable
                      v-close-popup
                      tabindex="0"
                      @click="showCost"
                    >
                      <div class="q-py-sm">
                        <q-item-section avatar>
                          <q-avatar
                            class="bg-on-dark"
                            size="sm"
                          ><q-icon
                              name="o_check"
                              size="14px"
                            /></q-avatar>
                        </q-item-section>
                      </div>
                      <q-item-section>
                        <div class="text-caption">هزینه</div>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>

              </q-btn>
            </div>
          </div>
        </q-card-section>

        <q-card-section class="column q-gutter-y-sm q-px-lg q-py-lg">

          <div class="text-h6 text-weight-700">دوره وصول مطالبات</div>
          <div class="row items-center q-gutter-x-sm">
            <div class="text-body1 text-bold">234 روز</div>
            <div class="text-caption text-bold text-negative">فقط 2 روز مانده</div>
          </div>
        </q-card-section>

      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'

</script>

<style>
.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: end;
  gap: 24px;
}

.gap-24 {
  gap: 24px;
}
</style>
