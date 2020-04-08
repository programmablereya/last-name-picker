<template>
    <div>
        <span v-bind:class="{ result: true, error: hasError }">{{ text }}</span>
        <template v-if="!isEditing">
            <button v-on:click="beginEdit()">Edit</button>
            <button v-on:click="requestDelete()">Delete</button>
        </template>
        <template v-if="isEditing">
            <label>
                <span class="label">Template </span>
                <input type="text" v-model="editedTemplateSource">
            </label>
            <button v-on:click="requestCommitEdit()" v-bind:disabled="!canCompleteEdit">Save</button>
            <button v-on:click="cancelEdit()">Cancel</button>
        </template>
    </div>
</template>

<script>
    import HandlebarsTemplate from "@/handlebars/HandlebarsTemplate";

    export default {
        name: "NameDisplay",
        data: function() {
            return {
                editedTemplateSource: null,
                compiledTemplate: null,
                compilationError: null
            }
        },
        props: {
            name: Object,
            template: HandlebarsTemplate,
            editOnly: Boolean
        },
        created: function() {
            if (this.editOnly) {
                this.enterEditMode();
            }
        },
        watch: {
            editOnly: function() {
                if (this.editOnly && !this.isEditing) {
                    this.enterEditMode();
                }
            },
            templateToCompile: function() {
                if (this.templateToCompile === null) {
                    this.compiledTemplate = null;
                    this.compilationError = null;
                    return;
                }
                try {
                    this.compiledTemplate = new HandlebarsTemplate({
                        ...this.templateToCompile,
                        compilationMode: HandlebarsTemplate.CompileMode.COMPILE_AND_CHECK_ERRORS
                    });
                    this.compilationError = null;
                } catch (ex) {
                    this.compilationError = ex;
                }
            }
        },
        methods: {
            enterEditMode: function() {
                this.editedTemplateSource = this.template || "";
                this.compiledTemplate = null;
                this.compilationError = null;
            },
            exitEditMode: function() {
                if (!this.editOnly) {
                    this.editedTemplateSource = null;
                    this.compiledTemplate = null;
                    this.compilationError = null;
                }
            },
            beginEdit: function() {
                this.$emit("beginEdit");
                this.enterEditMode();
            },
            requestCommitEdit: function() {
                if (this.canCompleteEdit) {
                    this.$emit("commitEdit", this.compiledTemplate);
                    this.exitEditMode();
                }
            },
            cancelEdit: function() {
                this.$emit("cancelEdit");
                this.exitEditMode();
            },
            requestDelete: function() {
                this.$emit("delete");
            }
        },
        computed: {
            isEditing: function() {
                return this.editedTemplateSource !== null;
            },
            hasError: function() {
                return !!this.compilationError;
            },
            templateIsEdited: function() {
                return (!this.template
                    || (this.editedTemplateSource !== null
                        && this.editedTemplateSource !== this.template.source
                        && this.editedTemplateSource.trim() !== ""));
            },
            templateToCompile: function() {
                return (this.templateIsEdited
                    ? {id: this.template.id, source: this.editedTemplateSource}
                    : null)
            },
            canCompleteEdit: function() {
                return this.templateIsEdited && !this.hasError;
            },
            compiledTemplateToUse: function() {
                if (this.compiledTemplate === null) {
                    return this.template;
                } else {
                    return this.compiledTemplate;
                }
            },
            text: function() {
                if (!this.compiledTemplateToUse) {
                    return "";
                }
                return this.compiledTemplateToUse(this.name);
            },
        }
    }
</script>

<style scoped>
    .result.error {
        background-color: indianred;
    }
</style>