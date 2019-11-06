<template>
  <v-app id="sandbox">
    <v-navigation-drawer app expand-on-hover permanent clipped>
      <v-list nav>
        <v-list-item link router to="/">
          <v-list-item-icon red>
            <v-icon>home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item link router to="help">
          <v-list-item-icon>
            <v-icon>mdi-help</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Help</v-list-item-title>
        </v-list-item>
        <v-list-item link router to="about">
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
        <v-list-item link router to="privacy">
          <v-list-item-icon>
            <v-icon>fingerprint</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Privacy</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list nav>
        <v-list-item link>
          <v-list-item-icon red>
            <v-icon color="red">delete</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Reset</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar dark app clipped-left color="red darken-3">
      <v-toolbar-title link router to="about">LAI</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-title link router to="about">Let's Analyze ILIAS!</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>
