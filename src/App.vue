<template>
    <div id="app" style="height: 100vh;">
        <Autocomplete style="padding: 5px;" placeholder="Source" @onSelect="setSource"/>
        <Autocomplete style="padding: 5px;" placeholder="Destination" @onSelect="setDestination"/>
        <OnTheGoOptions style="padding: 5px;" placeholder="On the way task" v-model="options" @onSelect="showOptions"/>

        <option-list v-if="showOptionList" @onSelect="setOption"/>
        <results-list ref="resultsComponent"/>
        <HereMap
            appId="j4v3GnGNQNr6OQEWeMaV"
            appCode="A_w_5ugF64DW8KgbRbryhQ"
            lat="37.7397"
            lng="-121.4252"
            width="100%"
            height="76vh" />
        <b-button class="is-primary" style="width: 100%;" @click="getLocations"> Go </b-button>
    </div>
</template>

<script>
    import HereMap from "./components/HereMap.vue"
    import Autocomplete from "./components/Autocomplete.vue"
    import OnTheGoOptions from "./components/OnTheGoOptions.vue"
    import OptionList from "./components/OptionList.vue"
    import ResultsList from "./components/ResultsList.vue"
    
    import {findOptimalStops} from '@/services/OnTheWayService';

    export default {
        data() {
            return {
                source: [],
                destination: [],
                taskLocation: [],
                showOptionList: false
            }
        },
        name: 'app',
        methods: {
            setSource(source) {
                console.log('Source')
                console.log(source);
                this.source = source;
            },
            setDestination(destination) {
                this.destination = destination;
            },
            taskAction() {
                this.$notification.open('Task Selected!!')
            },
            cardModal() {
                this.$modal.open({
                    parent: this,
                    component: OptionList,
                    hasModalCard: true,
                    customClass: 'custom-class custom-class-2'
                })
            },
            showOptions() {
                this.showOptionList = true;
            },
            setOption(option) {
                this.showOptionList = false;
                this.options = option.title;
                this.taskLocation = option.location;
            },
            getLocations() {
                let self = this;
                let refs = this.$refs;
                findOptimalStops(this.source, this.destination, this.taskLocation, function(response) {
                    console.log('Response');
                    console.log(response.data);
                    self.results = response.data.meetpoints;
                    self.showResults = true;
                    self.results.map(result => {result['carbon_saved'] = response.data.worst_carbon - result.carbon});
                    self.results.map(result => {result['time_saved'] = response.data.worst_time - result.time});
                    refs.resultsComponent.setResults(self.results);
                })
            }
        },
        components: {
            HereMap,
            Autocomplete,
            OnTheGoOptions,
            OptionList,
            ResultsList
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        padding-bottom: 0px;
        margin-bottom: 0px;
        color: #2c3e50;
    }
</style>