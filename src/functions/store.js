import {writable} from "svelte/store";

export let store=writable({
    DataChart:[]
});

export let baseApi="http://localhost:8080";