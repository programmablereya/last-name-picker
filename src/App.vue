<template>
    <div id="app">
        <NameListSection />
    </div>
</template>

<script>
    import NameListSection from "@/components/NameListSection";

    export default {
        name: 'App',
        components: {
            NameListSection
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
