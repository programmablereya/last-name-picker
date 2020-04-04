<template>
    <div id="app">
        <NamesDisplay v-bind:name="name" v-bind:templates="templates"
                      v-on:addTemplate="addTemplate($event)"
                      v-on:modifyTemplate="editTemplate($event)"
                      v-on:deleteTemplate="removeTemplate($event)"/>
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
                });
            },
            editTemplate({id, newSource}) {
                for (let index = 0; index < this.templates.length; index += 1) {
                    if (this.templates[index].id === id) {
                        this.templates[index].source = newSource;
                        this.templates[index].compiled = Handlebars.compile(newSource);
                        return;
                    }
                }
            },
            removeTemplate(id) {
                console.log(`Removing template ${id}`);
                for (let index = 0; index < this.templates.length; index += 1) {
                    console.log(`Checking template #${index} with id ${this.templates[index].id}`);
                    if (this.templates[index].id === id) {
                        console.log(`Splicing...`);
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
