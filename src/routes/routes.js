import TaskList from "../components/TaskList";
import AddTask from "../components/AddTask";
import EditTask from "../components/EditTask";
import Login from "../components/Login";
import Register from "../components/Register";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        name: 'TaskList',
        path: '/',
        component: TaskList,
        meta: {
            auth: true
        }
    },
    {
        name: 'AddTask',
        path: '/add-task',
        component: AddTask,
        meta: {
            auth: true
        }
    },
    {
        name: 'EditTask',
        path: '/edit-task/:id?',
        component: EditTask,
        meta: {
            auth: true
        }
    },
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
];

const router = createRouter({
    history: createWebHistory(), routes
});


export default router;