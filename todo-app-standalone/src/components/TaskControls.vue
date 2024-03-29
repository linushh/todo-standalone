<template>
    <div class="switch-container">
        <div class="switch-group">
            <label class="switch-label">
                <input type="checkbox" v-model="checkedToggleAll" @change="toggleAll()" />
                <span class="slider round" />
            </label>
            <span class="switch-text">{{ $t('showAll') }} </span>
        </div>

        <div class="switch-group">
            <label class="switch-label">
                <input type="checkbox" v-model="checkedCompleted" @change="toggleCompleted()" />
                <span class="slider round" />
            </label>
            <span class="switch-text">{{ $t('showDone') }}</span>
        </div>
        
        <div class="switch-group">
            <label class="switch-label">
                <input type="checkbox" v-model="checkedDataTable" @change="toggleDataTable()" />
                <span class="slider round" />
            </label>
            <span class="switch-text">{{ $t('showDataTable') }}</span>
        </div>
    </div>
</template>

<script>
import { mapState, mapWritableState, mapActions } from "pinia";
import { useTodoStore } from "@/stores/todoStore.js"

export default {
    props: {
        toggleAll: Function,
        toggleCompleted: Function,
        toggleEdit: Function,
        toggleDataTable: Function
    },

    computed: {
        ...mapState(useTodoStore, ["tasks"]),
        ...mapWritableState(useTodoStore, ["tasks"]),
    },

    data() {
        return {
            checkedToggleAll: true,
            checkedCompleted: false,
            checkedToggleEdit: false,
            checkedDataTable: false,
        }
    },

    methods: {
        ...mapActions(useTodoStore, ["markDone"]),

        callOnToggleAll() {
            this.checkedToggleAll = !this.checkedToggleAll
        },

        callOnToggleCompleted() {
            this.checkedCompleted = !this.checkedCompleted
        },

        callOnCheckedDataTable() {
            this.checkedDataTable = !this.checkedDataTable
        }
    }
}
</script>

<style scoped>
.switch-container {
    display: flex;
    flex-direction: column;
}

.switch-group {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.switch-label {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
    margin-right: 10px;
}

.switch-text {
    font-size: 1rem;
    color: #333;
}

.switch-label input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 10px;
}

.slider::before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
}

.switch-label input:checked + .slider {
    background-color: #0DC0F0;
}

.switch-label input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
}

.switch-label input:checked + .slider::before {
    transform: translateX(20px);
}

.slider.round {
    border-radius: 10px;
}

.slider.round::before {
    border-radius: 50%;
}
</style>