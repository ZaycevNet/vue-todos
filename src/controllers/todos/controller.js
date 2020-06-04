import * as ls from "local-storage";
import * as _ from "lodash";
import {v4 as uuid} from "uuid";
import moment from "moment";

import TodoModel from './todo-model';

class Controller {
    constructor() {
        this.ls = ls;
        this.keyOfTodos = 'vue-todos';

        this.todos = [];

        this.$$initialize();
    }

    $$initialize() {
        let localTodos = this.ls.get(this.keyOfTodos);

        this.todos = _.isArray(localTodos) ? localTodos.map(todo => new TodoModel(todo, this)) : [];
    }

    get $$changed(){
        return !!this.todos.filter(todo => todo.$$changed);
    }

    /**
     * @param {object} [filter]
     * @param {object} [order]
     * */
    findAll(filter, order){
        this.$$initialize();

        let todos = this.todos;

        if(filter && _.isFunction(filter)) todos = filter(todos);

        if(order && _.isFunction(order)) todos = order(todos);
        else todos = _.orderBy(todos, ['finished', 'finishedAt', 'createdAt'], ['ask', 'desc', 'desc']);

        todos = todos.map(todo => {
            const originalIndex = _.findIndex(this.todos, _todo => _todo.id === todo.id);

            return this.todos[originalIndex];
        });

        return todos;
    }

    /**
     * @param {object} filter
     * */
    findOne(filter){
        return filter(this.todos);
    }

    /**
     * @param {string} id
     * */
    findByPk(id) {
        return this.todos.filter(todo => todo.id === id)[0] || null;
    }

    /**
     * @param {string} title
     * @param {string} description
     * @param {array} todos
     * */
    create(title, description, todos){
        const todoData = {
            id: uuid(),
            title: `${title}`,
            description: `${description}`,
            items: todos,
            createdAt: moment().format(),
            updatedAt: moment().format(),
            finishedAt: null
        };

        const todo = new TodoModel(todoData, this);

        this.todos.push(todo);
        this.save();

        return this.findByPk(todo.id);
    }

    save(){
        if(this.$$changed){
            this.ls.set(this.keyOfTodos, [...this.todos]);

            this.$$initialize();
        }
    }
}

export default Controller;