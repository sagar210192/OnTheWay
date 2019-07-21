<template>
    <section>
        <!--<p class="content"><b>Selected:</b> {{ selected }}</p>-->
        <b-field>
            <b-autocomplete
                v-model="searchText"
                :data="data"
                :placeholder="placeholder"
                field="title"
                :loading="isFetching"
                @typing="getAsyncData"
                @input="getAsyncData"
                @select="selectOption">

                <template slot-scope="props">
                    <div class="media">
                        <div class="media-left">
                            <img width="45" :src="props.option.image">
                        </div>
                        <div class="media-content">
                            <h1> {{ props.option.title }} </h1>
                            <br>
                            <small>
                                {{ props.option.vicinity }}
                            </small>
                        </div>
                    </div>
                </template>
            </b-autocomplete>
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
                searchText: '',
                data: [],
                selected: null,
                isFetching: false
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
                    'image': 'https://cdn4.iconfinder.com/data/icons/food-color-1/100/Pizza-512.png',
                    'title': 'Get food'
                },
                {
                    'image': 'https://cdn2.iconfinder.com/data/icons/smashicons-gastronomy-retro-vol-3/58/140_-_Groceries_gastronomy_food_cooking-512.png',
                    'title': 'Shop groceries'
                },
                {
                    'image': 'https://previews.123rf.com/images/dstarky/dstarky1701/dstarky170100438/69262804-laundry-icon-or-logo-in-modern-line-style-high-quality-black-outline-pictogram-for-web-site-design-a.jpg',
                    'title': 'Pickup laundry'
                }]    
            }, 500),
            selectOption(option) {
                this.selected = option;
                /*this.data = [{
                    'image': 'https://cdn4.iconfinder.com/data/icons/food-color-1/100/Pizza-512.png',
                    'title': 'Get food'
                },
                {
                    'image': 'https://cdn4.iconfinder.com/data/icons/food-color-1/100/Pizza-512.png',
                    'title': 'Get food'
                },
                {
                    'image': 'https://cdn4.iconfinder.com/data/icons/food-color-1/100/Pizza-512.png',
                    'title': 'Get food'
                }];*/
                console.log(this.searchText);
                this.searchText = ' ';
                this.$emit('onSelect', option.position);
            }
        }
    }
</script>