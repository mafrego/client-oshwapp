<template>
<div>
    <admin-board-users/>
    <!-- </admin-board-users> -->
    <admin-board-projects/>
    <!-- </admin-board-projects> -->
    <admin-board-download-bop/>
</div>
</template>

<script>
import AdminBoardUsers from "./AdminBoardUsers";
import AdminBoardProjects from "./AdminBoardProjects";
import AdminBoardDownloadBop from "./AdminBoardDownloadBop";

export default {
    name: "AdminBoard",
    components: {
        AdminBoardUsers,
        AdminBoardProjects,
        AdminBoardDownloadBop
    }
    
}
</script>

<style scoped>

</style>