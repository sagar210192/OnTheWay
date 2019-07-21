<template>
    <div class="here-map">
        <div ref="map" v-bind:style="{ width: width, height: height }"></div>
    </div>
</template>

<script>
    export default {
        name: "HereMap",
        data() {
            return {
                map: {},
                platform: {},
                defaultLayers: {}
            }
        },
        props: {
            appId: String,
            appCode: String,
            lat: String,
            lng: String,
            width: String,
            height: String
        },
        created() {
            this.platform = new H.service.Platform({
                "app_id": this.appId,
                "app_code": this.appCode
            });
        },
        mounted() {
            this.defaultLayers = this.platform.createDefaultLayers();
            this.map = new H.Map(
                this.$refs.map,
                this.defaultLayers.normal.map,
                    {
                        zoom: 15,
                        center: { lng: 13.3779, lat: 52.5160 }
                    }  
                );
            // add a resize listener to make sure that the map occupies the whole container
            window.addEventListener('resize', () => map.getViewPort().resize());

            //Step 3: make the map interactive
            // MapEvents enables the event system
            // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
            var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));

            // Create the default UI components
            var ui = H.ui.UI.createDefault(this.map, this.defaultLayers);
            this.setInteractive
            this.setupRoute(this.map);
        },
        methods: {
            setupRoute() {
                var router = this.platform.getRoutingService(),
                routeRequestParams = {
                mode: 'fastest;car',
                representation: 'display',
                routeattributes : 'waypoints,summary,shape,legs',
                maneuverattributes: 'direction,action',
                waypoint0: '52.5160,13.3779', // Brandenburg Gate
                waypoint1: '52.5206,13.3862'  // Friedrichstraße Railway Station
                };


                router.calculateRoute(
                    routeRequestParams,
                    this.plotRoute,
                    this.onError
                );
            },
            plotRoute(result) {
                var route = result.response.route[0];
                /*
                * The styling of the route response on the map is entirely under the developer's control.
                * A representitive styling can be found the full JS + HTML code of this example
                * in the functions below:
                */
                this.addRouteShapeToMap(route);
                //addManueversToMap(route);

                //addWaypointsToPanel(route.waypoint);
                //addManueversToPanel(route);
                //addSummaryToPanel(route.summary);
            },
            onError(error) {
                alert('Can\'t reach the remote server');
            },
            addRouteShapeToMap(route){
                var lineString = new H.geo.LineString(),
                    routeShape = route.shape,
                    polyline;

                routeShape.forEach(function(point) {
                    var parts = point.split(',');
                    lineString.pushLatLngAlt(parts[0], parts[1]);
                });

                var polyline = new H.map.Polyline(lineString, {
                    style: {
                    lineWidth: 4,
                    strokeColor: 'rgba(0, 128, 255, 0.7)'
                    }
                });
                //console.log(polyline)
                // Add the polyline to the map
                this.map.addObject(polyline);
                //bb = polyline.getBoundingBox()
                // And zoom to its bounding rectangle
                //this.map.getViewModel().setLookAtData({
                //    bounds: bb
                //});
            },
            addWaypointsToPanel(waypoints){
                var nodeH3 = document.createElement('h3'),
                    waypointLabels = [],
                    i;


                for (i = 0;  i < waypoints.length; i += 1) {
                    waypointLabels.push(waypoints[i].label)
                }

                nodeH3.textContent = waypointLabels.join(' - ');

                routeInstructionsContainer.innerHTML = '';
                routeInstructionsContainer.appendChild(nodeH3);
            },
            setInteractive(map){
                // get the vector provider from the base layer
                var provider = map.getBaseLayer().getProvider();

                // get the style object for the base layer
                var style = provider.getStyle();

                var changeListener = (evt) => {
                    if (style.getState() === H.map.Style.State.READY) {
                    style.removeEventListener('change', changeListener);

                    // enable interactions for the desired map features
                    style.setInteractive(['places', 'places.populated-places'], true);

                    // add an event listener that is responsible for catching the
                    // 'tap' event on the feature and showing the infobubble
                    provider.addEventListener('tap', onTap);
                    }
                };
                style.addEventListener('change', changeListener);
            }
        }
    }
</script>

<style scoped></style>