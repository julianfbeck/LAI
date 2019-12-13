<template>
    <v-toolbar class="lai-color-gray" elevation="0" v-bind:class="{ 'pl-navigation': !responsive }">

        <v-app-bar-nav-icon v-if="responsive" @click.stop="onClickToggleNavigation" />
        <v-toolbar-title>Welcome to LAI - Let's Analyze ILIAS!</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>
            <div class="flex align-center layout py-2">

                <!-- TODO: Download and Delete should be only visible if required 
                <v-list-item link>
                    <v-list-item-icon>
                        <v-icon>cloud_download</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title v-if="!responsive">Download Results</v-list-item-title>
                </v-list-item>

                <v-list-item link>
                    <v-list-item-icon>
                        <v-icon color="red">delete</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title v-if="!responsive">Delete</v-list-item-title>
                </v-list-item>
                -->

                <!-- TODO: Should open a modal which describes what could be done depending on the current page -->
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on">
                            <v-icon>mdi-help-circle</v-icon>
                        </v-btn>
                    </template>
                    <span>Help</span>
                </v-tooltip>
            </div>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
    import {
        mapMutations
    } from 'vuex'

    export default {
        data: () => ({
            responsive: false
        }),

        // Listen for resize
        mounted () {
            this.onResponsiveInverted()
            window.addEventListener('resize', this.onResponsiveInverted)
        },
        beforeDestroy () {
            window.removeEventListener('resize', this.onResponsiveInverted)
        },

        methods: {
            ...mapMutations('app', ['showNavigation', 'toggleNavigation']),
            onClickToggleNavigation () {
                this.showNavigation(!this.$store.state.app.navigationIsVisible)
            },
            onResponsiveInverted () {
                if (window.innerWidth < 991) {
                    this.responsive = true
                } else {
                    this.responsive = false
                }
            }
        }
    }
</script>

<style>
    .v-toolbar .v-list-item__icon {
        margin-right: 16px!important;
    }

    /* TODO: Should be removed with a better solution - looks visual ugly */
    .pl-navigation {
        padding-left: 260px;
    }
</style>
