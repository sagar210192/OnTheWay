<template>
    <section>
       
        <b-field>
            <b-select multiple
                :data="data"
                v-model="selectedOptions"
                field="title"
                :loading="isFetching"
                @typing="getAsyncData"
                @select="selectOption">

                <template slot-scope="props">
                    <option class="media">
                        <div class="media-left">
                            <img width="32" src="https://www.tupelo.net/wp-content/uploads/2017/08/Pizza-Hut-logo-220-840x459.png">
                        </div>
                        <div class="media-content">
                            'Pizza Hut'
                            <br>
                            <small>
                                Somewhere in the lala land
                            </small>
                        </div>
                    </option>
                </template>
            </b-select>
        </b-field>
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
                isFetching: false,
                selectedOptions: []
            }
        },
        props: {
            placeholder: String
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