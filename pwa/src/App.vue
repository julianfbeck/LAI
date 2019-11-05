<template>
  <v-app id="sandbox">
    <v-navigation-drawer app expand-on-hover permanent clipped>
      <v-list nav >
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-help</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Help</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>info</v-icon>
          </v-list-item-icon>
          <v-list-item-title>About Lai</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>cloud_download</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Export Files</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>fingerprint</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Privacy</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
          <v-list nav >
        <v-list-item link>
          <v-list-item-icon red>
            <v-icon color="red">delete</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Help</v-list-item-title>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>
    <v-app-bar app clipped-left>
      <v-toolbar-title>LAI i i i</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>
