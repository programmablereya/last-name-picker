<template>
    <div id="app">
        <NamesDisplay v-bind:name="name" v-bind:templates="templates"
                     v-on:edit="update($event)" v-on:delete="remove()"/>
    </div>
</template>

<script>
    import NamesDisplay from "./components/NamesDisplay";
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
                templates: [],
                nextId: 0
            }
        },
        methods: {
            addTemplate(source) {
                const id = this.nextId;
                this.nextId += 1;
                const compiled = Handlebars.compile(source);
                this.templates.push({
                    id, source, compiled
                })
            },
            editTemplate(id, source) {
                for (let index = 0; index < this.templates.length; index += 1) {
                    if (this.templates[index].id === id) {
                        this.templates[index].source = source;
                        this.templates[index].compiled = Handlebars.compile(source);
                        return;
                    }
                }
            },
            removeTemplate(id) {
                for (let index = 0; index < this.templates.length; index += 1) {
                    if (this.templates[index].id === id) {
                        this.templates.splice(index, 1);
                        return;
                    }
                }
            }
        },
        components: {
            NamesDisplay
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
