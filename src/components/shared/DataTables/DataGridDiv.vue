<template>
    <div class="data-table">
        <div class="data-row">
            <div class="data-cell">Name</div>
            <div class="data-cell">Age</div>
            <div class="data-cell">Country</div>
        </div>
        <div class="data-row">
            <div class="data-cell">John</div>
            <div class="data-cell">30</div>
            <div class="data-cell">USA</div>
        </div>
        <div class="data-row expanded">
            <div class="data-cell">Jane</div>
            <div class="data-cell">25</div>
            <div class="data-cell">Canada</div>
            <div class="detail">Additional details for John.</div>
        </div>
        <div class="data-row">
            <div class="data-cell">Bob</div>
            <div class="data-cell">35</div>
            <div class="data-cell">UK</div>
        </div>
    </div>
</template>
<style>
.data-table {
    display: flex;
    flex-direction: column;
    width: 80%;
    border: 1px solid #ccc;
    margin: 20px auto;
}

.data-row {
    display: flex;
    justify-content: space-between;
    text-align: center;
    position: relative;
}

.data-cell {
    flex: 1;
    border: 1px solid #ccc;
    padding: 8px;
}

/* .data-row:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    margin-top: 10px;
    margin-bottom: 10px;
} */

.data-row.expanded {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    margin-top: 10px;
    margin-bottom: 10px;
}

.data-row.expanded .detail {
    display: block;
    margin-top: 10px;
    padding: 10px;
    background-color: #faf9f9;
}

.detail {
    display: none;
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
}
</style>