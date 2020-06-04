<template>
    <div>
<!--        <div class="content">-->
<!--            <div class="content-wrapper">-->
<!--                <div class="search-block">-->
<!--                    <input type="text" class="input" placeholder="Input to filter">-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
        <div class="content">
            <div class="content-wrapper">
                <div class="todos-block">
                    <router-link class="item" v-for="todo in $todos" :key="todo.id" v-bind:to="(`/view/${todo.id}`)">
                        <div class="item-content">
                            <div class="title">{{todo.title}}</div>
                            <div class="description">{{todo.description}}</div>
                        </div>
                        <div class="item-meta">
                            <div class="finished" v-bind:class="{done: todo.finished}">{{todo.finished ? 'Completed' : `In progress (${todo.progress})`}}</div>
                            <div class="created">Created at {{createdAt(todo.createdAt)}}</div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        name: "index",
        computed: {
            $todos(){
                return this.$store.state.Todos.findAll();
            },
        },
        mounted() {
            console.log(this);

            window.Todos = this.$store.state.Todos;
        },
        methods: {
            createdAt(timestamp){
                return moment(timestamp).format('DD.MM.YYYY HH:mm');
            }
        }
    }
</script>

<style scoped lang="scss">
    .search-block {
        width: 100%;
        height: 70px;
        background-color: ghostwhite;
        border: 1px solid #d6d6d6;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 0 100px rgba(0, 0, 0, .2);

        .input {
            width: calc(100% - 70px);
            padding: 10px 15px;
            border: 1px solid lightgrey;
            border-radius: 4px;
            font-size: 16px;
            color: darkslategrey;
            font-style: italic;

            &:focus {
                outline: 0;
            }
        }
    }

    .todos-block {
        margin-bottom: 60px;

        .item {
            width: 100%;
            min-height: 70px;
            background-color: ghostwhite;
            border: 1px solid #d6d6d6;
            display: flex;
            flex-direction: column;
            margin-bottom: 10px;
            border-radius: 6px;
            box-shadow: 0 0 0px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            transition: .3s ease-in-out 0s;
            text-decoration: none;

            &:hover {
                box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
            }

            .item-content, .item-meta {
                display: flex;
                padding: 14px;
            }

            .item-content {
                flex-direction: column;
                justify-content: space-between;
                text-align: left;

                .title {
                    font-size: 18px;
                    color: #2c3e50;
                }
                .description {
                    font-size: 16px;
                    color: dimgray;
                }
            }

            .item-meta {
                flex-direction: row;
                justify-content: space-between;
                color: gray;
                font-size: 14px;
                border-top: 1px solid #d6d6d6;
                background-color: whitesmoke;

                .finished {
                    &.done {
                        color: green;
                    }
                }
            }
        }
    }
</style>