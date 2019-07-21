<template>
    <section>
            <b-table
                :data="data"
                :selected.sync="selected"
                focusable>

                <template slot-scope="props">
                    <div class="media">
                        <b-table-column field="image" label="" width="60" class="media-left">
                            <img width="60" :src="props.row.image">
                        </b-table-column>
                        <b-table-column field="title" label="" class="media-left">
                            {{ props.row.title }}
                            <br>
                            <small>
                                {{ props.row.vicinity }}
                            </small>
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
                data: [{
                    'image': 'https://www.tupelo.net/wp-content/uploads/2017/08/Pizza-Hut-logo-220-840x459.png',
                    'title': 'Pizza Hut',
                    'vicinity': '728 Geary St, San Francisco, CA 94109',
                    'city': 'San Francisco, CA 94109'
                },
                {
                    'image': 'http://appevent.com/wp-content/uploads/2015/02/app-icon-21184-mzl.ppwgqryt.png',
                    'title': 'New York Pizza',
                    'vicinity': '12 Braynt St, San Francisco, CA 94109',
                    'city': 'San Francisco, CA 94109'
                },
                {
                    'image': 'https://mouthbysouthwest.com/wp-content/uploads/2016/07/Giordanos072816.jpg',
                    'title': 'Chicago Deep Dish',
                    'vicinity': '2 Tehame St, San Francisco, CA 94109',
                    'city': 'San Francisco, CA 94109'
                },
                ],
                selected: null,
                isFetching: false
            }
        },
        props: {
            placeholder: String
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
            }
        }
    }
</script>