import Login from "../components/Login";
import Register from "../components/Register";
import TaskList from "../components/TaskList";
import AddTask from "../components/AddTask";
import EditTask from "../components/EditTask";
import {createRouter, createWebHistory} from "vue-router";


const routes = [
    {
        name: 'Login',
        path: '/login',
        component: Login,
        meta: {
            auth: false
        }
    },
    {
        name: 'Register',
        path: '/register',
        component: Register,
        meta: {
            auth: false
        }
    },

    {
        name: 'TaskList',
        path: '/tasks',
        component: TaskList,

    },
    {
        name: 'AddTask',
        path: '/add-task',
        component: AddTask,

    },
    {
        name: 'EditTask',
        path: '/edit-task/:id?',
        component: EditTask,
        meta: {
            auth: true
        }
    },

    // { path: '*', redirect: '/' }
];

const router = createRouter({
    history: createWebHistory(), routes
});


export default router;