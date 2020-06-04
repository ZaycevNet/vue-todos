<template>
    <div>
        <div class="content">
            <div class="content-wrapper">
                <form class="create-block" v-on:submit.prevent="create()">
                    <div class="child-row">
                        <label>
                            <div>Title:</div>
                            <input class="input" placeholder="Create todos app" v-model="title" required>
                        </label>
                    </div>
                    <div class="child-row">
                        <label>
                            <div>Description:</div>
                            <input class="input" placeholder="Create todos on VueJS" v-model="description" required>
                        </label>
                    </div>
                    <div class="child-row">
                        <div>Todos <a href="#" v-on:click.prevent="addItem()">Add todo</a></div>
                        <label v-for="(item, i) in items" v-bind:key="i" class="item">
                            <input class="input" v-bind:placeholder="(`Todo #${i + 1}`)" v-model="items[i].title" v-bind:required="i === 0">
                            <a href="#" v-on:click.prevent="dropItem(i)" v-if="(items.length > 1)">Drop item</a>
                        </label>
                    </div>
                    <div class="child-row">
                        <button type="submit">Create</button>
                    </div>
                </form>
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
    export default {
        name: "create-todo",
        data(){
            return {
                title: '',
                description: '',
                items: [
                    {
                        title: ''
                    }
                ]
            };
        },
        methods: {
            create(){
                if(!this.title || !this.items.filter(item => !!item.title).length) return false;

                this.$store.state.Todos.create(this.title, this.description || '', this.items.filter(item => !!item.title));

                this.$router.push('/');
            },
            addItem(){
                this.items.push({
                    title: ''
                });
            },
            dropItem(index){
                this.items = this.items.filter((t, i) => i !== index);
            }
        }
    }
</script>

<style scoped lang="scss">
    .create-block {
        width: 100%;
        display: flex;
        flex-direction: column;
        background-color: ghostwhite;
        border: 1px solid #d6d6d6;
        text-align: left;
        padding: 20px 20px;

        .child-row {
            margin-bottom: 30px;

            > div {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;

                a {
                    text-decoration: none;
                    font-size: 14px;
                }
            }

            label {
                > div {
                    font-size: 18px;
                    margin-bottom: 10px;
                }

                input {
                    width: calc(100% - 30px);
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

                &.item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 10px;

                    a {
                        text-decoration: none;
                        font-size: 14px;
                        color: red;
                        margin-left: 10px;
                        white-space: nowrap;
                    }
                }
            }
        }
    }
</style>