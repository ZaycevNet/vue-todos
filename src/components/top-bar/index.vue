<template>
    <div class="top-bar-main">
        <div class="logo">
            VueJS Todos
        </div>
        <div class="controls">
            <router-link to="/create" class="controls-item">
                Add new todo
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TopBar"
    }
</script>

<style scoped lang="scss">
    * {
        position: relative;
        top: 0;
        left: 0;
    }

    .top-bar-main {
        position: sticky;
        top: 0;
        width: calc(100% - 100px);
        height: 70px;
        background-color: steelblue;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 20px 50px;
        box-shadow: 0 0 100px rgba(0, 0, 0, .2);
    }

    .logo {
        text-align: center;
        line-height: 70px;
        font-size: 30px;
        color: azure;
    }

    .controls {
        display: flex;
        flex-direction: row;
        justify-content: center;

        &-item {
            color: lavender;
            font-size: 20px;
            line-height: 70px;
            cursor: pointer;
            transition: .3s ease-in-out 0s;
            padding: 0 10px;
            text-decoration: none;

            &::after {
                content: "";
                position: absolute;
                left: 0;
                right: 0;
                margin: 0 auto;
                bottom: 15px;
                display: block;
                width: 0;
                height: 2px;
                background-color: azure;
                transition: .3s ease-in-out 0s;
            }

            &:hover {
                color: azure;

                &::after {
                    width: 100%;
                }
            }
        }
    }
</style>