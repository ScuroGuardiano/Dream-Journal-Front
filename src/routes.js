import Dashboard from './components/Dashboard.vue';
import NotLoggedIn from './components/NotLoggedIn.vue';
import DreamList from './components/DreamsList.vue';
import ViewDream from './components/ViewDream.vue';
import NewDream from './components/NewDream.vue';
import EditDream from './components/EditDream.vue';

export default [
    { path: '/', component: Dashboard},
    { path: '/login', component: NotLoggedIn },
    { path: '/dreams', component: DreamList },
    { path: '/dream/:id', component: ViewDream},
    { path: '/dream/:id/edit', component: EditDream },
    { path: '/newdream', component: NewDream }
]