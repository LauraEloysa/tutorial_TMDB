import { createRouter, createWebHistory } from "vue-router";
import HomeView from '@/views/HomeView.vue';
import TvView from '@/views/TVView.vue';
import MoviesView from '@/views/MoviesView.vue';
import DetailsView from "@/views/DetailsView.vue";

const routes = [{
    path: '/',
    name: 'Home',
    component: HomeView,
},
{
    path: '/tv',
    name: 'Tv',
    component: TvView, 
},
{
    path: '/movies',
    name: 'Movie',
    component: MoviesView,
},
{
    path: '/movies/:movieId',
    name: 'MovieDetails',
    component: DetailsView,
    props: true,
},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;