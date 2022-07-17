import TaskList from "../components/TaskList";
import AddTask from "../components/AddTask";
import EditTask from "../components/EditTask";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        name: 'TaskList',
        path: '/',
        component: TaskList
    },
    {
        name: 'AddTask',
        path: '/add-task',
        component: AddTask
    },
    {
        name: 'EditTask',
        path: '/edit-task/:id?',
        component: EditTask
    },
];

const router = createRouter({
    history: createWebHistory(), routes
});


export default router;