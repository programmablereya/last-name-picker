<template>
    <ul>
        <li v-for="template in templates" v-bind:key="template.id">
            <NameDisplay v-bind:name="name" v-bind:template="template.source" v-bind:edit-only="false"
                         v-bind:precompiled-template="template.compiled"
                         v-on:commitEdit="modify(template.id, $event)"
                         v-on:delete="remove(template.id)"/>
        </li>
        <li>
            <NameDisplay v-if="adding" v-bind:name="name" v-bind:edit-only="true"
                         v-on:cancelEdit="cancelAdd()" v-on:commitEdit="commitAdd($event)" />
            <button v-if="!adding" v-on:click="beginAdd()">Add New</button>
        </li>
    </ul>
</template>

<script>
    import NameDisplay from "./NameDisplay";

    export default {
        name: "NamesDisplay",
        components: {
            NameDisplay,
        },
        props: {
            name: Object,
            templates: Array
        },
        data: function() {
            return {
                adding: false
            }
        },
        methods: {
            beginAdd() {
                this.adding = true;
            },
            commitAdd(newTemplate) {
                this.$emit("addTemplate", newTemplate);
                this.adding = false;
            },
            cancelAdd() {
                this.adding = false;
            },
            modify(templateId, newTemplate) {
                this.$emit("modifyTemplate", {id: templateId, newSource: newTemplate});
            },
            remove(templateId) {
                this.$emit("deleteTemplate", templateId);
            }
        }
    }
</script>

<style scoped>

</style>