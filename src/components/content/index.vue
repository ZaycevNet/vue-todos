<template>
    <div class="content">
        <div class="content-wrapper"></div>
        <div class="content-separate"></div>
        <div class="content-wrapper"></div>
    </div>
</template>

<script>
    export default {
        name: "Content",
    }
</script>

<style scoped lang="scss">
    * {
        position: relative;
        top: 0;
        left: 0;
    }

    .content {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin: 80px 0;

        &-wrapper {
            width: 100%;
            max-width: 700px;
            min-height: 150px;
            background-color: #2c3e50;
        }

        &-separate {
            height: 60px;
        }
    }
</style>