import Handlebars from 'handlebars';

export default class HandlebarsTemplate {
    constructor({id, source, compilationMode}) {
        this.id = id;
        this.source = source;
        compilationMode = compilationMode || HandlebarsTemplate.CompileMode.COMPILE_AND_CHECK_ERRORS;
        this.compilationMode = compilationMode;
        const compiled = Handlebars.compile(source);
        switch (compilationMode) {
            case HandlebarsTemplate.CompileMode.COMPILE_ONLY:
                this.compiled = compiled;
                break;
            case HandlebarsTemplate.CompileMode.COMPILE_AND_CHECK_ERRORS:
                this.compiled = compiled;
                // This will throw if the template has syntax errors
                compiled({});
                break;
            case HandlebarsTemplate.CompileMode.CHECK_ERRORS_ONLY:
                // This will throw if the template has syntax errors
                compiled({});
                break;
            default:
                throw Error(`Unknown compilation mode: ${compilationMode}`);
        }
        Object.freeze(this);
    }

    apply(name) {
        if (!this.compiled) {
            throw Error("This instance was built with compileMode set to checkErrorsOnly.")
        }
        return this.compiled(name);
    }
}

HandlebarsTemplate.CompileMode = {
    // Compiles, but does not run the function to check for syntax errors.
    COMPILE_ONLY: "compile_only",
    // Compiles only to check errors and then throws out the function.
    CHECK_ERRORS_ONLY: "check_errors_only",
    // Compiles and runs the function to check for errors.
    COMPILE_AND_CHECK_ERRORS: "compile_and_check_errors"
};

HandlebarsTemplate.EMPTY = new HandlebarsTemplate({
    id: null, source: "", compilationMode: HandlebarsTemplate.CompileMode.COMPILE_ONLY});