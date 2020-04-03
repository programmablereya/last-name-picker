<template>
    <div id="app">
        {{ template }}
        <NameDisplay v-bind:name="name" v-bind:template="template" v-bind:precompiled-template="precompiledTemplate"
                     v-on:edit="update($event)" v-on:delete="remove()"/>
    </div>
</template>

<script>
    import NameDisplay from "./components/NameDisplay";
    import Handlebars from "handlebars";

    export default {
        name: 'App',
        data: function () {
            return {
                name: {
                    first: "Marissa",
                    middle: "Victoria",
                    last: "Lyndon"
                },
                template: "{{ first }} {{ middle }} {{ last }}",
            }
        },
        computed: {
            precompiledTemplate: function () {
                return Handlebars.compile(this.template);
            }
        },
        methods: {
            update: function (newTemplate) {
                this.template = newTemplate;
            },
            remove: function () {
                this.template = "(deleted)"
            }
        },
        components: {
            NameDisplay
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
        height: 90px;
        background-color: #42b983;
    }
</style>
