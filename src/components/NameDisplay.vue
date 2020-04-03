<template>
    <div>
        <span v-bind:class="{ result: !hasError, error: hasError }">{{ text }}</span>
        <template v-if="!isEditing">
            <button v-on:click="beginEdit()">Edit</button>
            <button v-on:click="requestDelete()">Delete</button>
        </template>
        <template v-if="isEditing">
            <label>
                <span class="label">Template </span>
                <input type="text" v-model="editedTemplate">
            </label>
            <button v-on:click="requestCommitEdit()" v-bind:disabled="!canCompleteEdit">Save</button>
            <button v-on:click="cancelEdit()">Cancel</button>
        </template>
    </div>
</template>

<script>
    import Handlebars from "handlebars";

    export default {
        name: "NameDisplay",
        data: function() {
            return {
                editedTemplate: null,
                compiledTemplate: null,
                compilationError: null
            }
        },
        props: {
            name: Object,
            template: String,
            precompiledTemplate: Function
        },
        watch: {
            templateToCompile: function() {
                if (this.templateToCompile === null) {
                    this.compiledTemplate = null;
                    this.compilationError = null;
                    return;
                }
                const template = Handlebars.compile(this.templateToCompile);
                try {
                    template({});
                } catch (e) {
                    this.compilationError = e;
                    console.log(this.compilationError);
                    return;
                }
                this.compiledTemplate = template;
                this.compilationError = null;
            }
        },
        methods: {
            beginEdit: function() {
                this.editedTemplate = this.template;
            },
            requestCommitEdit: function() {
                if (this.canCompleteEdit) {
                    this.$emit("edit", this.editedTemplate);
                    this.cancelEdit();
                }
            },
            cancelEdit: function() {
                this.editedTemplate = null;
            },
            requestDelete: function() {
                this.$emit("delete");
            }
        },
        computed: {
            isEditing: function() {
                return this.editedTemplate !== null;
            },
            hasError: function() {
                return !!this.compilationError;
            },
            templateIsEdited: function() {
                return (this.editedTemplate !== null
                    && this.editedTemplate !== this.template
                    && this.editedTemplate.trim() !== "");
            },
            templateToCompile: function() {
                return (this.templateIsEdited
                    ? this.editedTemplate
                    : null)
            },
            canCompleteEdit: function() {
                return this.templateIsEdited && !this.hasError;
            },
            compiledTemplateToUse: function() {
                if (this.compiledTemplate === null) {
                    return this.precompiledTemplate;
                } else {
                    return this.compiledTemplate;
                }
            },
            text: function() {
                return this.compiledTemplateToUse(this.name);
            },
        }
    }
</script>

<style scoped>

</style>