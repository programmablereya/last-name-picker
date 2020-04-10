<template>
    <ul>
        <li v-for="template in templates" v-bind:key="template.id">
            <NameListItem v-bind:name="name" v-bind:template="template"
                          v-on:commitEdit="modify($event)"
                          v-on:delete="remove(template)"/>
        </li>
        <li>
            <template v-if="!adding">
                <button v-on:click="beginAdd()">Add New</button>
            </template>
            <NameListItemEdit v-if="adding" v-bind:name="name" v-on:save="commitAdd($event)" v-on:cancel="endAdd()" />
        </li>
    </ul>
</template>

<script>
    import NameListItem from "@/components/NameListItem";
    import NameListItemEdit from "@/components/NameListItemEdit";

    export default {
        name: "NameList",
        components: {
            NameListItem,
            NameListItemEdit,
        },
        props: {
            name: Object,
            templates: Array
        },
        data() {
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
                this.endAdd();
            },
            endAdd() {
                this.adding = false;
            },
            modify(templateId, newTemplate) {
                this.$emit("modifyTemplate", newTemplate);
            },
            remove(template) {
                this.$emit("deleteTemplate", template);
            }
        }
    }
</script>

<style scoped>

</style>