import { findOne } from "./utils";
import config from "./config";

class ProjectList {
    templateElement?: HTMLTemplateElement;
    hostElement?: HTMLDivElement;
    element?: HTMLFormElement;
    private config: {
        selectors: {
            [key: string]: string;
        };
        ids: {
            [key: string]: string;
        };
    };

    // type is either "active" or "finished", which is used to determine the id of the element
    // "active" and "finished" are of literal type
    constructor(private type: "active" | "finished") {
        this.config = { ...config };
    }

    private _attach() {
        if (this.element && this.hostElement) {
            this.hostElement.insertAdjacentElement("beforeend", this.element);
        }
    }

    private _setupDOMRefs() {
        const { selectors } = this.config;
        this.templateElement = findOne<HTMLTemplateElement>(selectors.projectListElement, document)!;
        this.hostElement = findOne<HTMLDivElement>(selectors.hostElement, document)!;
    }

    private _renderedContent() {
        const listId = `${this.type}-projects-list`;
        if (this.element) {
            const list = findOne<HTMLUListElement>("ul", this.element);
            const h2 = findOne<HTMLHeadingElement>("h2", this.element);
            if (!list || !h2) {
                return;
            }
            list.id = listId;
            h2.textContent = `${this.type.toUpperCase()} PROJECTS`;
        }
    }

    init() {
        this._setupDOMRefs();

        if (this.templateElement) {
            const importedNode = document.importNode(this.templateElement.content, true);
            this.element = importedNode.firstElementChild as HTMLFormElement;
            this.element.id = `${this.type}-projects`;
            this._attach();
            this._renderedContent();
        }
    }

    // addProject(project: string) {
    //     this.projectList.push(project);
    // }

    // moveProject(projectId: string, newProjectId: string) {
    //     const projectIndex = this.projectList.findIndex((project) => project === projectId);
    //     const newProjectIndex = this.projectList.findIndex((project) => project === newProjectId);
    //     const project = this.projectList[projectIndex];
    //     const newProject = this.projectList[newProjectIndex];
    //     this.projectList[projectIndex] = newProject;
    //     this.projectList[newProjectIndex] = project;
    // }

    // removeProject(projectId: string) {
    //     const projectIndex = this.projectList.findIndex((project) => project === projectId);
    //     this.projectList.splice(projectIndex, 1);
    // }

    // getProjectList() {
    //     return [...this.projectList];
    // }

    // setProjectList(projectList: string[]) {
    //     this.projectList = projectList;
    // }

    // getProject(projectId: string) {
    //     const projectIndex = this.projectList.findIndex((project) => project === projectId);
    //     return this.projectList[projectIndex];
    // }

    // setProject(projectId: string, project: string) {
    //     const projectIndex = this.projectList.findIndex((project) => project === projectId);
    //     this.projectList[projectIndex] = project;
    // }

    // getProjectIndex(projectId: string) {
    //     return this.projectList.findIndex((project) => project === projectId);
    // }
}

export default ProjectList;
