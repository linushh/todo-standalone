<template>
    <div class="mb-3">
        <ul class="list-group d-flex">
            <li 
                @click="startEditing(index)" 
                v-for="(task, index) in tasks" 
                :key="task.id"
                class="
                list-group-item 
                d-flex 
                justify-content-between 
                align-items-center"
                :style="{
                    backgroundColor: task.completed ? '#c8e6c9' : '#FFFFFF',
                    textDecoration: task.completed ? 'line-through' : 'none'
                }"
            >

                <Checkbox 
                    @click="markDoneSender(task, index)"
                    v-model="task.completed"
                    class="me-3"
                    :binary="true">
                </Checkbox>

                <div class="flex-grow-1">
                    <div>
                        <div>
                            <div>
                                <input 
                                    @blur="this.editTask(task, this.getAccessTokens())"
                                    v-if="task.completed !== true && editIndex === index"  
                                    v-model="task.name" 
                                    placeholder="Task"
                                    type="text"
                                    style="border: 0px; outline: none">
                                <div v-else>
                                    {{ task.name }}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div v-if="task.completed !== true && editIndex === index">
                                <Calendar 
                                    @blur="this.editTask(task, this.getAccessTokens())"
                                    @date-select="this.editTask(task, this.getAccessTokens())"
                                    v-if="task.completed !== true" 
                                    v-model="task.date" 
                                    showTime 
                                    hourFormat="24"
                                    date-format="yy/mm/dd">
                                </Calendar>
                                <Button 
                                    @click="clearDate(task)">
                                        {{ $t('clear') }}
                                </Button>

                            </div>
                            <div v-else>
                                {{ task.date }}
                            </div>
                        </div>
                    </div>
                </div>
                <Button 
                    @click.stop.prevent="deleteTasks(task, index)"
                    v-if="editIndex === index" 
                    severity="danger"
                    icon="pi pi-trash">
                </Button>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useTodoStore } from '@/stores/todoStore.js'
import { userStore } from '../stores/userStore';

import TaskEditor from '@/components/TaskEditor.vue';
import Checkbox from 'primevue/checkbox';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';

export default {
    components: { TaskEditor, Checkbox, Calendar, Button, },

    computed: {
        ...mapState(useTodoStore, ["tasks", "getData"])
    },

    data() {
        return {
            editIndex: null,
            editName: '',
            editDate: '',
        };
    },

    methods: {
        ...mapActions(userStore, ['getAccessTokens']),
        ...mapActions(useTodoStore, ["markDone", "removeTasks", 'editTask']),

        startEditing(index) {
            this.editIndex = index
        },

        clearDate(task) { // TODO might remove the clear button since the blur works, kind of how i want it?
            task.date = ''
            this.editTask(task, this.getAccessTokens())
        },

        markDoneSender(task, index) {
            this.markDone(task, index, this.getAccessTokens())
        },

        deleteTasks(task, index) {
            this.removeTasks({
                indexFromTasks: index,
                taskId: task.id
            }, this.getAccessTokens())
        },
    },
}
</script>