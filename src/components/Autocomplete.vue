<template>
    <section>
        <!--<p class="content"><b>Selected:</b> {{ selected }}</p>-->
        <b-field>
            <b-autocomplete
                :data="data"
                :placeholder="placeholder"
                field="title"
                :loading="isFetching"
                @typing="getAsyncData"
                @select="selectOption">

                <template slot-scope="props">
                    <div class="media">
                        <!--<div class="media-left">
                            <img width="32" :src="`https://image.tmdb.org/t/p/w500/${props.option.poster_path}`">
                        </div>-->
                        <div class="media-content">
                            {{ props.option.title }}
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
                if (!name.length) {
                    this.data = []
                    return
                }
                this.isFetching = true
                /*axios.get(`https://api.themoviedb.org/3/search/movie?api_key=bb6f51bef07465653c3e553d6ab161a8&query=${name}`)
                    .then(({ data }) => {
                        this.data = []
                        data.results.forEach((item) => this.data.push(item))
                    })
                    .catch((error) => {
                        this.data = []
                        throw error
                    })
                    .finally(() => {
                        this.isFetching = false
                    })*/
                let self = this;
                this.data = getAutosuggestions(name, function(results) {
                    console.log('Resilt')
                    console.log(results);
                    self.data = results.data.results;
                    self.isFetching = false;
                });    
            }, 500),
            selectOption(option) {
                this.selected = option;
                this.$emit('onSelect', option.position);
            }
        }
    }
</script>