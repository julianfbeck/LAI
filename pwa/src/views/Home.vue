<template>
    <v-container>
        <v-col cols="12" class="text-center">
            <h1>Welcome to LAI</h1>
            <p>Choose what you like to analyze:</p>

            <router-link to="analyze-test" tag="button">
                <v-btn class="ma-2 hska-btn-primary" tile x-large>
                    <v-icon left>mdi-target-account</v-icon>
                    Let's analyze a Test
                </v-btn>
            </router-link>

            <router-link to="analyze-course" tag="button" disabled="">
                <v-btn class="ma-2 hska-btn-primary" tile x-large disabled>
                    <v-icon left>mdi-account-group</v-icon>
                    Let's analyze a Course
                </v-btn>
            </router-link>

        </v-col>
    </v-container>
</template>
