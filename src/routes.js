import LoggedIn from './components/LoggedIn.vue';
import NotLoggedIn from './components/NotLoggedIn.vue';
import DreamList from './components/DreamsList.vue';
import ViewDream from './components/ViewDream.vue';
import NewDream from './components/NewDream.vue';
import EditDream from './components/EditDream.vue';

export default [
    { path: '/', component: LoggedIn},
    { path: '/login', component: NotLoggedIn },
    { path: '/dreams', component: DreamList },
    { path: '/dream/:id', component: ViewDream},
    { path: '/dream/:id/edit', component: EditDream },
    { path: '/newdream', component: NewDream }
]