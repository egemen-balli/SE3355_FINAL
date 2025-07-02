<script setup lang="ts">
//import { onMounted, onUnmounted, ref } from 'vue';
//import { remult } from 'remult';

/*onMounted(() =>
  onUnmounted(taskRepo.liveQuery({
    //limit: 2,
    //page: 2,
    orderBy: {
      //id: "asc"
      //createdAt: "asc"
    },
    //where: {
    //completed: false
    //}
  }).subscribe(info => tasks.value = info.applyChanges(tasks.value))
  )
);*/

//const newTaskTitle = ref("");

/*async function addTask() {
  try {
    const newTask = await taskRepo.insert({ title: newTaskTitle.value });
    //tasks.value.push(newTask);
    newTaskTitle.value = "";
  }
  catch (error: any) {
    alert(error.message)
  }
}
async function deleteTask(task: Task) {
  try {
    await taskRepo.delete(task);
    //tasks.value = tasks.value.filter(t => t !== task);
    newTaskTitle.value = "";
  }
  catch (error: any) {
    alert(error.message)
  }
}
async function saveTask(task: Task) {
  try {
    await taskRepo.save(task)
  }
  catch (error: any) {
    alert(error.message)
  }
}

async function setAllCompleted(completed: boolean) {
  await TasksController.setAllCompleted(completed)
}*/






</script>

<template>
  <router-view />
</template>

