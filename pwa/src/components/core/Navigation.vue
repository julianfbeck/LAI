<template>
    <v-navigation-drawer app floating persistent dark
                         mobile-break-point="991"
                         v-model="navigation">
        <v-list>
            <v-list-item-group>
                <v-list-item>
                    <v-list-item-avatar color="white">
                        <v-img contain src="@/assets/hska_logo.png" alt="Logo" height="26"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>Let's Analyze ILIAS</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>

        <v-divider/>

        <v-list nav>
            <v-list-item link router to="/">
                <v-list-item-icon red>
                    <v-icon>home</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Home</v-list-item-title>
            </v-list-item>
        </v-list>

        <!-- interesting stuff -->
        <v-list nav>
            <v-list-item link router to="analyze-test">
                <v-list-item-icon>
                    <v-icon>mdi-target-account</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Analyze Test</v-list-item-title>
            </v-list-item>

            <v-list-item link router to="analyze-course">
                <v-list-item-icon>
                    <v-icon>mdi-account-group</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Analyze Course</v-list-item-title>
            </v-list-item>
        </v-list>

        <!-- useless stuff below -->
        <v-list nav dense>
            <v-list-item link router to="privacy">
                <v-list-item-icon>
                    <v-icon>fingerprint</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Privacy & Terms</v-list-item-title>
            </v-list-item>

            <v-list-item link router to="about">
                <v-list-item-icon>
                    <v-icon>info</v-icon>
                </v-list-item-icon>
                <v-list-item-title>About</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    import {
        mapMutations
    } from 'vuex'

    export default {
        computed: {
            navigation: {
                get () {
                    return this.$store.state.app.navigationIsVisible
                },
                set (val) {
                    this.showNavigation(val)
                }
            }
        },

        methods: {
            ...mapMutations('app', ['showNavigation', 'toggleNavigation'])
        }
    }
</script>
