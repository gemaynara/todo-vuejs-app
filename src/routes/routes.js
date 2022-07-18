import Login from "../components/Login";
import Register from "../components/Register";
import TaskList from "../components/TaskList";
import AddTask from "../components/AddTask";
import EditTask from "../components/EditTask";
import UserList from "../components/UserList";
import AddUser from "../components/AddUser";
import EditUser from "../components/EditUser";
import {createRouter, createWebHistory} from "vue-router";


const routes = [
    {
        name: 'Home',
        path: '/',
        component: Login,
        meta: {
            auth: false
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

    {
        name: 'UserList',
        path: '/users',
        component: UserList,
        meta: {
            auth: true
        }
    },
    {
        name: 'AddUser',
        path: '/add-user',
        component: AddUser,
        meta: {
            auth: true
        }
    },
    {
        name: 'EditUser',
        path: '/edit-user/:id?',
        component: EditUser,
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

