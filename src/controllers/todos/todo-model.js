import * as _ from "lodash";
import {v4 as uuid} from 'uuid';
import moment from "moment";

class TodoModel {
    /**
     * Initialize Todo item
     *
     * @param {object} todoData
     * @param {string} todoData.id
     * @param {string} todoData.title
     * @param {string} todoData.description
     * @param {Date} todoData.createdAt
     * @param {Date} todoData.updatedAt
     * @param {Date | null} todoData.finishedAt
     * @param {array} todoData.items
     * @param {object} controller
     * */
    constructor(todoData, controller) {
        // create visible properties
        Object.defineProperties(this, {
            id: {
                enumerable: true,
                configurable: false,
                get(){
                    return `${this.$$currentValues.id}`;
                }
            },
            title: {
                enumerable: true,
                configurable: false,
                get(){
                    return `${this.$$currentValues.title}`;
                },
                set(value){
                    this.$$currentValues.title = value;
                    this.$$changed();
                }
            },
            description: {
                enumerable: true,
                configurable: false,
                get() {
                    return `${this.$$currentValues.description}`;
                },
                set(value) {
                    this.$$currentValues.description = value;
                    this.$$changed();
                }
            },
            items: {
                enumerable: true,
                configurable: false,
                get(){
                    return this.$$currentValues.items
                },
                set(value){
                    if(!_.isArray(value)) return false;

                    this.$$currentValues.items = value.map(item => {
                        return {
                            id: uuid(),
                            title: item.title,
                            completed: item.completed || false
                        };
                    });
                }
            },
            progress: {
                enumerable: true,
                configurable: false,
                get(){
                    return `${this.items.filter(item => item.completed).length} of ${this.items.length}`;
                }
            },
            finished: {
                enumerable: true,
                configurable: false,
                get() {
                    return this.items.filter(item => item.completed).length === this.items.length;
                }
            },
            createdAt: {
                enumerable: true,
                configurable: false,
                get() {
                    return this.$$currentValues.createdAt;
                }
            },
            updatedAt: {
                enumerable: true,
                configurable: false,
                get() {
                    return this.$$currentValues.updatedAt;
                }
            },
            finishedAt: {
                enumerable: true,
                configurable: false,
                get() {
                    return this.$$currentValues.finishedAt;
                }
            }
        });

        // create system properties
        Object.defineProperties(this, {
            $$controller: {
                enumerable: false,
                writable: false,
                configurable: false,
                value: controller
            },
            $$originalValues: {
                enumerable: false,
                writable: false,
                configurable: false,
                value: {...todoData}
            },
            $$currentValues: {
                enumerable: false,
                writable: false,
                configurable: false,
                value: {...todoData}
            },
            $$previousValues: {
                enumerable: false,
                writable: false,
                configurable: false,
                value: {...todoData}
            },
            $$changedValues: {
                enumerable: false,
                configurable: false,
                get(){
                    const ignoreProps = ['createdAt', 'updatedAt', 'finishedAt'];
                    const changed = [];

                    Object.keys(this).map(keyName => {
                        if(!_.includes(ignoreProps, keyName) && !_.isEqual(this.$$currentValues[keyName],this.$$previousValues[keyName])) changed.push(keyName);

                        return keyName;
                    });

                    return changed;
                }
            },
        });

        this.items = todoData.items;
    }

    save(){
        if(this.changed()) {
            this.$$controller.todos = [...this.$$controller.todos.map(todo => {
                if(todo.id === this.id) return this;

                return todo;
            })];

            this.$$controller.ls.set(this.$$controller.keyOfTodos, this.$$controller.todos.map(todo => todo.toJSON()));

            this.$$controller.$$initialize();

            Object.keys(this.$$previousValues).map(keyName => {
                this.$$previousValues[keyName] = this.$$currentValues[keyName];
            });
        }
    }
    changed(){
        return !!this.$$changedValues.length;
    }
    changes(){
        return this.$$changedValues;
    }
    diff(){
        const keys = this.$$changedValues;

        const current = {};
        const previous = {};

        keys.map(keyName => {
            current[keyName] = this.$$currentValues[keyName];
            previous[keyName] = this.$$previousValues[keyName];

            return keyName;
        });

        return {
            current,
            previous,
            keys
        };
    }
    prev(keyName = null){
        if(keyName) return this.$$previousValues[keyName] || null;

        return this.$$previousValues;
    }
    get(keyName = null){
        if(keyName) return this.$$currentValues[keyName] || null;

        return this.$$currentValues;
    }
    set(keyName, value){
        if(this[keyName])
            this[keyName] = value;
    }

    delete(){
        this.$$controller.todos = this.$$controller.todos.filter(todo => todo.id !== this.id);
        this.$$controller.save();
    }

    /**
     * @param {string} itemId
     * @param {boolean | null} value
     * */
    toggleItem(itemId, value){
        this.$$currentValues.items = this.$$currentValues.items.map(item => {
            if(item.id !== itemId) return item;

            return {
                ...item,
                completed: value ? !!value : !item.completed
            };
        });

        this.$$finished();
    }
    dropItem(itemId){
        this.$$currentValues.items = this.$$currentValues.items.filter(item => item.id !== itemId);
    }
    createItem(title){
        const newIndex = this.$$currentValues.items.push({
            id: uuid(),
            title,
            completed: false
        });

        return this.$$currentValues.items[newIndex];
    }
    renameItem(itemId, title){
        this.$$currentValues.items = this.$$currentValues.items.map(item => {
            if(item.id !== itemId) return itemId;

            return {
                ...item,
                title
            };
        });
    }

    toJSON(){
        return {...this.get()};
    }

    $$changed(){
        this.$$currentValues.updatedAt = this.$$changedValues.length ? moment().format() : this.$$previousValues.updatedAt;
    }
    $$finished(){
       this.$$currentValues.finishedAt = this.finished ? moment().format() : (this.$$previousValues.finishedAt || null);
    }
}

export default TodoModel;