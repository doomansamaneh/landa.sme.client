<template>
  <q-page class="row justify-center items-center">
  <div class="q-pa-md q-mt-md q-mb-xl row items-start q-gutter-md md">
    <q-card class="select-business-card q-card-desktop" bordered>
      <q-item class="q-px-lg q-py-lg">
        <q-item-section>
          <q-item-label
            class="text-weight-bold text-grey-10"
            style="font-size: 18px"
            >My Businesses</q-item-label
          >
          <q-item-label
            class="text-body text-grey-7"
            caption
            style="font-size: 13px"
          >
            Click on the business name to enter
          </q-item-label>
        </q-item-section>
        <div class="flex items-center q-gutter-md">
          <q-icon color="grey" size="md" name="o_help_outline" />
          <q-btn unelevated round color="green-7" icon="add">
            <q-tooltip anchor="top right" self="top left">
              Add New Business
            </q-tooltip>
          </q-btn>
        </div>
      </q-item>

      <q-separator />
      <q-card-section class="q-pa-lg q-gutter-md">
        <q-card
          class="selectable my-inner-card row justify-around items-center no-shadow q-pl-sm"
          bordered
        >
          <div class="icon flex items-center q-gutter-md col-6">
            <q-avatar
              color="grey-4"
              text-color="dark"
              icon="o_person_add"
              size="lg"
            />

            <q-btn
              class="business-name-btn"
              flat
              no-caps
              text-color="dark"
              :ripple="{ color: 'grey-6' }"
            >
              <div
                class="text-weight-bold business-name-desktop ellipsis-2-lines"
                style="font-size: 12px"
              >
                Dooman Samaneh for Test
              </div>
              <q-icon right size="xs" name="o_login" />
            </q-btn>
          </div>

          <div class="flex items-center q-gutter-xs col-4 q-pl-md">
            <div class="">
              <q-chip
                class="chips expire-date flex items-center"
                square
                icon="o_history"
                :ripple="false"
                style="font-size: 12px; background-color: #ffe1b4"
                >1402/08/09</q-chip
              >
            </div>
            <div class="">
              <q-btn
                class="service-extension"
                unelevated
                color="orange"
                icon="o_shopping_bag"
                size="sm"
              />
            </div>
          </div>
          <div class="more-options col-1 q-pl-xs">
            <q-btn
              class="more-icon"
              style="color: grey"
              unelevated
              falt
              round
              :ripple="false"
              icon="more_vert"
              size="md"
            />
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup>
                  <q-item-section>
                    <div class="flex items-center q-gutter-sm">
                      <q-avatar
                        color="grey-4"
                        text-color="dark"
                        icon="login"
                        size="sm"
                      />
                      <div class="text-body" style="font-size: 12px">
                        Entering the Business
                      </div>
                    </div>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section
                    ><div class="flex items-center q-gutter-sm">
                      <q-avatar
                        color="grey-4"
                        text-color="dark"
                        icon="o_person_add"
                        size="sm"
                      />
                      <div class="text-body" style="font-size: 12px">
                        Invite User
                      </div>
                    </div></q-item-section
                  >
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup>
                  <q-item-section>
                    <div class="flex items-center q-gutter-sm">
                      <q-avatar
                        color="grey-4"
                        text-color="dark"
                        icon="o_delete"
                        size="sm"
                      />
                      <div class="text-body" style="font-size: 12px">
                        Delete
                      </div>
                    </div>
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup>
                  <q-item-section>
                    <div class="flex items-center q-gutter-sm">
                      <q-avatar
                        color="grey-4"
                        text-color="dark"
                        icon="credit_card"
                        size="sm"
                      />
                      <div class="text-body" style="font-size: 12px">
                        Payment History
                      </div>
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </div>
        </q-card>

        <q-card
          class="selectable my-inner-card row justify-around items-center no-shadow q-pl-sm"
          bordered
        >
          <div class="icon flex items-center q-gutter-md col-6">
            <div class="">
              <q-avatar
                color="grey-4"
                text-color="dark"
                icon="o_person"
                size="lg"
              />
            </div>

            <div class="">
              <q-btn
                class="business-name-btn"
                flat
                no-caps
                text-color="dark"
                :ripple="{ color: 'grey-6' }"
              >
                <div
                  class="text-weight-bold business-name-desktop ellipsis-2-lines"
                  style="font-size: 12px"
                >
                  Daftar Kargosha (Demo)
                </div>
                <q-icon right size="xs" name="o_login" />
              </q-btn>
            </div>
          </div>

          <div class="flex items-center q-gutter-xs col-4 q-pl-md">
            <div class="">
              <q-chip
                class="chips expire-date flex items-center"
                square
                icon="o_history"
                :ripple="false"
                style="font-size: 12px; background-color: #ffe1b4"
                >1402/08/09</q-chip
              >
            </div>
          </div>
          <div class="more-options col-1 q-pl-xs">
            <q-btn
              class="more-icon"
              style="color: grey"
              unelevated
              falt
              :ripple="false"
              round
              icon="more_vert"
              size="md"
            />
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup>
                  <q-item-section>
                    <div class="flex items-center q-gutter-sm">
                      <q-avatar
                        color="grey-4"
                        text-color="dark"
                        icon="login"
                        size="sm"
                      />
                      <div class="text-body" style="font-size: 12px">
                        Entering the Business
                      </div>
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </div>
        </q-card>
      </q-card-section>
    </q-card>
  </div>
  </q-page>
</template>

<style>
.q-card-desktop {
  width: 620px;
}

.select-business-card {
  border-radius: 10px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
}

.my-inner-card {
  width: auto;
  height: 90px;
  border-radius: 5px;
}

.business-name-btn {
  border-radius: 5px;
  padding: 8px 12px;
  border: 1px solid rgb(230, 230, 230);
}

.chips {
  padding: 21px 15px;
}

.service-extension {
  padding: 12px 12px;
  border-radius: 5px;
}

.q-btn .q-focus-helper {
  display: none;
}

.selectable {
  cursor: pointer;
}

.card-selection {
  border: 1.5px solid #2196f3;
}

.more-icon {
  margin-left: 2px;
}

.business-name-desktop {
  width: 130px;
}
</style>
