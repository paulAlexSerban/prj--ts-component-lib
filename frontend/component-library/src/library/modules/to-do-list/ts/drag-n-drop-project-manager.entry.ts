import ProjectInput from "./drag-n-drop-project-manager/ProjectInput";
import ProjectList from "./drag-n-drop-project-manager/ProjectList";
const projectInput = new ProjectInput();
projectInput.init();

const activeProjectList = new ProjectList("active");
activeProjectList.init();

const finishedProjectList = new ProjectList("finished");
finishedProjectList.init();