<template>
<div>
    <admin-board-users>
    </admin-board-users>
    <admin-board-projects>
    </admin-board-projects>
</div>
</template>

<script>
import AdminBoardUsers from "./AdminBoardUsers";
import AdminBoardProjects from "./AdminBoardProjects";

export default {
    name: "AdminBoard",
    components: {
        AdminBoardUsers,
        AdminBoardProjects
    }
    
}
</script>

<style scoped>

</style>