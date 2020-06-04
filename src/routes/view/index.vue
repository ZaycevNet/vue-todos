<template>
    <div>
        <div class="content">
            <div class="content-wrapper">
                <div class="view-block">
                    <div class="title-block">
                        <div>{{todo.title}}</div>
                        <span v-bind:class="{done: todo.finished}">{{todo.finished ? 'Completed' : `In progress (${progress})`}}</span>
                    </div>
                    <div class="description-block" v-if="!!todo.description">{{todo.description}}</div>
                    <div class="items-block">
                        <label class="item" v-for="item in todo.items" v-bind:key="item.id">
                            <span>{{item.title}}</span>
                            <input type="checkbox" v-bind:checked="item.completed" v-on:change="toggleItem(item.id)"/>
                        </label>
                    </div>
                    <div class="meta-block">
                        <span>Created at {{dateFormat(todo.createdAt)}}</span>
                        <span>Last updated at {{dateFormat(todo.updatedAt)}}</span>
                        <span v-if="todo.finished">Completed at {{dateFormat(todo.finishedAt)}}</span>
                    </div>
                    <div class="delete-block">
                        <router-link v-bind:to="(`/delete/${todo.id}`)">Delete todo</router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="content-wrapper">
                <div class="back-block">
                    <router-link to="/">Back to todos</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        name: "create-todo",
        data(){
            return {
                todo: null
            };
        },
        beforeMount() {
            this.updateTodo();
        },
        mounted() {
            if(!this.todo) this.$router.push('/');
        },
        computed: {
            progress(){
                return this.todo.progress;
            }
        },
        methods: {
            updateTodo(){
                this.todo = this.$store.state.Todos.findByPk(this.$route.params.id);
            },
            toggleItem(itemId){
                this.todo.toggleItem(itemId);

                this.todo.save();

                this.updateTodo();
            },
            // meta
            dateFormat(timestamp){
                return moment(timestamp).format('DD.MM.YYYY HH:mm');
            }
        }
    }
</script>

<style scoped lang="scss">
    .view-block {
        width: 100%;
        display: flex;
        flex-direction: column;
        background-color: ghostwhite;
        border: 1px solid #d6d6d6;
        text-align: left;
        padding: 20px 20px;

        .title-block {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            font-size: 16px;
            color: #2c3e50;
            margin-bottom: 10px;

            div {
                font-size: 22px;
            }

            span {
                color: dimgray;
                &.done {
                    color: green;
                }
            }
        }

        .description-block {
            display: flex;
            justify-content: start;
            align-items: baseline;
            font-size: 16px;
            color: #2c3e50;
            margin-bottom: 10px;
        }

        .items-block {
            display: flex;
            justify-content: center;
            flex-direction: column;
            margin-top: 20px;
            margin-bottom: 10px;

            .item {
                display: flex;
                flex-direction: row-reverse;
                justify-content: flex-end;
                align-items: center;
                margin-bottom: 10px;

                input {
                    margin-right: 15px;
                }

                span {
                    color: dimgrey;
                    font-size: 16px;
                }
            }
        }

        .meta-block {
            display: flex;
            flex-direction: column;
            justify-content: end;
            text-align: right;
            font-size: 16px;
            color: gray;
            margin-bottom: 10px;
            font-style: italic;

            .item {}
        }

        .delete-block {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 10px 0;

            a {
                text-decoration: none;
                color: red;
                font-size: 14px;
            }
        }
    }
</style>