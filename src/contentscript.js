import Vue from 'vue'
import NameListSection from "@/components/NameListSection";

console.log("Last name picker: Content script loaded");

Vue.config.productionTip = false;

const nameText = document.querySelector("h1.namebanner-title").textContent;
const firstSection = document.querySelector("article section");
const newSection = document.createElement("section");
firstSection.parentElement.insertBefore(newSection, firstSection);

new Vue({
    render: h => h(NameListSection, { props: { lastName: nameText } }),
}).$mount(newSection);
