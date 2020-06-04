<template>
    <div>
        <div class="content">
            <form class="content-wrapper block">
                <h2>Confirm delete todo <b><i>{{todo.title}}</i></b></h2>
                <p>Please confirm your action</p>
                <br/>
                <button v-on:click.prevent="confirmed()">Confirm</button>
            </form>
        </div>
        <div class="content">
            <div class="content-wrapper">
                <router-link v-bind:to="(`/view/${todo.id}`)">Back to todo</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "delete-todo",
        data(){
            return {
                todo: null
            };
        },
        beforeMount() {
            this.todo = this.$store.state.Todos.findByPk(this.$route.params.id);
        },
        mounted(){
            if(!this.todo) return this.$router.push('/');
        },
        methods: {
            confirmed(){
                this.todo.delete();

                this.$router.push('/');
            }
        }
    }
</script>

<style scoped lang="scss">
    .block {
        background-color: ghostwhite;
        border: 1px solid #d6d6d6;
        padding: 20px 20px;

        h2 {
            font-weight: 300;
        }
    }
</style>