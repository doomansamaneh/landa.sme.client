<template>
    <div>
        <slot></slot>
        <div class="header">
            <h2>this is header slot</h2>
            <slot name="header"></slot>
        </div>
        <div class="body">
            <slot name="body"></slot>
        </div>
        <div class="footer">
            <slot class="footer" name="footer"></slot>
        </div>
    </div>
</template>

<script setup>

</script>

<style>
    .header {
        background-color: #dddd;
        padding: 15px;
    }

    .footer {
        background-color: #e5e5e5;
        padding: 10px;
        border: 1px solid #dddd;
    }
</style>