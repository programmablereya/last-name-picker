<template>
    <div>
        <template v-if="!isEditing">
            <span>{{ text }}</span>
            <button v-on:click="enterEditMode()">Edit</button>
            <button v-on:click="requestDelete()">Delete</button>
        </template>
        <TemplateEntry v-if="isEditing" v-bind:name="name" v-bind:value="template"
                       v-on:save="requestCommitEdit($event)" v-on:cancel="exitEditMode()" />
    </div>
</template>

<script>
    import HandlebarsTemplate from "@/handlebars/HandlebarsTemplate";
    import TemplateEntry from "@/components/NameListItemEdit";

    export default {
        name: "NameListItem",
        components: {TemplateEntry},
        data() {
            return {
                isEditing: false,
            }
        },
        props: {
            name: Object,
            template: HandlebarsTemplate
        },
        methods: {
            enterEditMode() {
                this.isEditing = true;
            },
            exitEditMode() {
                this.isEditing = false;
            },
            requestCommitEdit(template) {
                if (this.canCompleteEdit) {
                    this.$emit("commitEdit", template);
                    this.exitEditMode();
                }
            },
            requestDelete() {
                this.$emit("delete");
            }
        },
        computed: {
            text: function() {
                return this.template.apply(this.name);
            },
        }
    }
</script>

<style scoped>
</style>