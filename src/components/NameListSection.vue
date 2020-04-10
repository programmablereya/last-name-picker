<template>
    <section>
        <div class="namemain">
            <nav class="headingright">
                <div>
                    <a href="#">(Expand link)</a>
                </div>
            </nav>
            <h2>Name Previews</h2>
        </div>
        <div>
            <NameList v-bind:name="name" v-bind:templates="templates"
                      v-on:addTemplate="addTemplate($event)"
                      v-on:modifyTemplate="editTemplate($event)"
                      v-on:deleteTemplate="removeTemplate($event)"/>
        </div>
    </section>
</template>

<script>
    import NameList from "@/components/NameList";
    import Handlebars from "handlebars";
    import HandlebarsTemplate from "@/handlebars/HandlebarsTemplate";
    export default {
        name: "NameListSection",
        props: {
            lastName: String
        },
        data() {
            return {
                name: {
                    first: "Marissa",
                    middle: "Victoria",
                    last: this.lastName
                },
                templates: [new HandlebarsTemplate({id: -1, source: "{{ first }} {{ middle }} {{ last }}", compilationMode: HandlebarsTemplate.CompileMode.COMPILE_ONLY })],
                nextId: 0
            }
        },
        methods: {
            addTemplate({source}) {
                const id = this.nextId;
                this.nextId += 1;
                const compiled = Handlebars.compile(source);
                this.templates.push({
                    id, source, compiled
                });
            },
            editTemplate({id, source}) {
                for (let index = 0; index < this.templates.length; index += 1) {
                    if (this.templates[index].id === id) {
                        this.templates[index].source = source;
                        this.templates[index].compiled = Handlebars.compile(source);
                        return;
                    }
                }
            },
            removeTemplate({id}) {
                for (let index = 0; index < this.templates.length; index += 1) {
                    if (this.templates[index].id === id) {
                        this.templates.splice(index, 1);
                        return;
                    }
                }
            }
        },
        components: {NameList}
    }
</script>

<style scoped>

</style>