<template>
    <section>
            <b-table
                :data="data"
                :selected.sync="selected"
                focusable>

                <template slot-scope="props">
                    <div class="media">
                        <b-table-column field="image" label="" width="35" margin-top="10px" padding-top="10px" class="media-left">
                            <img width="35" src="http://www.dewebsite.org/logo/shell/shell_logo.png">
                        </b-table-column>
                        <b-table-column field="title" label="" width="80">
                            {{ props.row.title }}
                            <br>
                            <small>
                                <span v-html="props.row.address"></span>
                            </small>
                            <!--<br/>
                            <br/>
                            <small>
                                Time saved
                            </small>
                            <h1 style="font-weight: bold; color: green">
                            {{ Math.round(props.row.time_saved / 60,2) }}  mins
                            </h1>
                            ,
                            <small>
                                Carbon saved
                            </small>
                            <h1 style="font-weight: bold; color: green">
                            {{ Math.round(props.row.carbon_saved,2) }} 
                            </h1>-->
                        </b-table-column>
                        
                        <b-table-column>
                            <small>
                                Time saved
                            </small>
                            <h1 style="font-weight: bold; color: green">
                            {{ Math.round(props.row.time_saved / 60,2) }}  mins
                            </h1>
                            <br/>
                            <small>
                                Carbon saved
                            </small>
                            <h1 style="font-weight: bold; color: green">
                            {{ Math.round(Math.abs(props.row.carbon_saved)*10)/100 }} lbs of CO2
                            </h1>
                        </b-table-column>
                    </div>
                </template>
            </b-table>
    </section>
</template>

<script>
    import debounce from 'lodash/debounce'
    import axios from 'axios'

    import {getAutosuggestions} from '@/services/HereMapService';

    export default {
        data() {
            return {
                data: [],
                selected: null,
                isFetching: false
            }
        },
        watch: {
            'selected': function(newVal, oldVal) {
                if(newVal) {
                    this.$emit('onSelect', newVal);
                }
            }
        },  
        methods: {
            // You have to install and import debounce to use it,
            // it's not mandatory though.
            getAsyncData: debounce(function (name) {
                this.data = [{
                    'image': 'https://www.tupelo.net/wp-content/uploads/2017/08/Pizza-Hut-logo-220-840x459.png',
                    'title': 'Pizza Hut'
                },
                {
                    'image': 'http://appevent.com/wp-content/uploads/2015/02/app-icon-21184-mzl.ppwgqryt.png',
                    'title': 'New York Pizza'
                },
                {
                    'image': 'https://mouthbysouthwest.com/wp-content/uploads/2016/07/Giordanos072816.jpg',
                    'title': 'Chicago Deep Dish'
                }]    
            }, 500),
            selectOption(option) {
                this.selected = option;
                this.$emit('onSelect', option.position);
            },
            setResults(data) {
                this.data = data;
            }
        }
    }
</script>