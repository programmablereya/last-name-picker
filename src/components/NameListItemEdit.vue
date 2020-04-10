<template>
    <div>
        <span v-bind:class="{ result: true, error: hasError }">{{ text }}</span>
        <label>
            <span class="label">Template </span>
            <input type="text" v-model="source">
        </label>
        <button v-on:click="requestSave()" v-bind:disabled="!canCompleteEdit">Save</button>
        <button v-on:click="requestCancel()">Cancel</button>
    </div>
</template>

<script>
    import HandlebarsTemplate from "@/handlebars/HandlebarsTemplate";

    export default {
        name: "NameListItemEdit",
        data() {
            return {
                source: this.value.source,
                compileResult: {
                    template: this.value
                },
                renderedTemplate: this.value
            }
        },
        props: {
            name: Object,
            value: {
                type: HandlebarsTemplate,
                default: () => HandlebarsTemplate.EMPTY
            },
        },
        watch: {
            value() {
                this.source = this.value.source;
                this.compileResult = {
                    template: this.value
                };
            },
            source() {
                try {
                    this.compileResult = {
                        template: new HandlebarsTemplate({
                            id: this.value ? this.value.id : null,
                            source: this.source.trim(),
                            compilationMode: HandlebarsTemplate.CompileMode.COMPILE_AND_CHECK_ERRORS
                        })
                    };
                } catch (ex) {
                    this.compileResult = {
                        error: ex
                    };
                }
            },
            compileResult() {
                if (this.compileResult.template) {
                    this.renderedTemplate = this.compileResult.template;
                }
            }
        },
        methods: {
            requestSave() {
                if (this.canCompleteEdit) {
                    this.$emit("save", this.compileResult.template);
                }
            },
            requestCancel() {
                this.$emit("cancel");
            }
        },
        computed: {
            hasError() {
                return this.compileResult && this.compileResult.error;
            },
            templateIsEdited() {
                return this.compileResult && this.compileResult.template &&
                    !(this.value && this.compileResult.template === this.value.template);
            },
            canCompleteEdit() {
                return this.templateIsEdited && !this.hasError;
            },
            text() {
                return this.renderedTemplate.apply(this.name);
            }
        }
    }
</script>

<style scoped>
    .result.error {
        background-color: indianred;
    }
</style>