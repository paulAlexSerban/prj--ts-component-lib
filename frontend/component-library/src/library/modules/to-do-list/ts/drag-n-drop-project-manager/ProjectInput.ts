import config from "./config";
import { findOne, validate } from "./utils";
import { Autobind } from "./decorators";
import { Validatable } from "./interfaces";

class ProjectInput {
    private templateElement?: HTMLTemplateElement;
    private hostElement?: HTMLDivElement;
    private element?: HTMLFormElement;
    private titleInputElement?: HTMLInputElement;
    private descriptionInputElement?: HTMLInputElement;
    private peopleInputElement?: HTMLInputElement;
    private config: {
        selectors: {
            [key: string]: string;
        };
        ids: {
            [key: string]: string;
        };
    };

    constructor() {
        this.config = { ...config };
    }

    // This function attaches the form to the host element
    private _attach() {
        if (this.element && this.hostElement) {
            this.hostElement.insertAdjacentElement("afterbegin", this.element);
        }
    }

    // This function initializes references to the DOM elements
    private _setupDOMRefs() {
        const { selectors } = this.config;
        this.templateElement = findOne<HTMLTemplateElement>(selectors.templateElement)!;
        this.hostElement = findOne<HTMLDivElement>(selectors.hostElement)!;
    }

    // This function initializes references to the template elements
    private _setupTemplateRefs() {
        const { selectors } = this.config;
        this.titleInputElement = findOne<HTMLInputElement>(selectors.titleInputElement, this.element)!;
        this.descriptionInputElement = findOne<HTMLInputElement>(selectors.descriptionInputElement, this.element)!;
        this.peopleInputElement = findOne<HTMLInputElement>(selectors.peopleInputElement, this.element)!;
    }

    // This function gets the user input
    private _getUsersInput(): [string, string, number] | void {
        const title = this.titleInputElement!.value;
        const description = this.descriptionInputElement!.value;
        const people = this.peopleInputElement!.value;

        const titleValidatable: Validatable = {
            value: title,
            required: true,
        };

        const descriptionValidatable: Validatable = {
            value: description,
            required: true,
            minLength: 5,
        };

        const peopleValidatable: Validatable = {
            value: +people,
            required: true,
            min: 1,
            max: 5,
        };

        if (!validate(titleValidatable) || !validate(descriptionValidatable) || !validate(peopleValidatable)) {
            alert("Invalid input, please try again!");
            return;
        }

        if (title.trim().length === 0 || description.trim().length === 0 || people.trim().length === 0) {
            alert("Invalid input, please try again!");
            return;
        }
        // +people converts the string to a number, which is what we want here
        return [title, description, +people];
    }

    private _clearInputs() {
        this.titleInputElement!.value = "";
        this.descriptionInputElement!.value = "";
        this.peopleInputElement!.value = "";
    }

    // This function handles the form submission
    @Autobind
    private _submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this._getUsersInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            console.log(title, description, people);
            this._clearInputs();
        }
    }

    // This function configures the component
    private _configure() {
        this.element!.addEventListener("submit", this._submitHandler);
    }

    // This function initializes the component
    init() {
        const { ids } = this.config;
        this._setupDOMRefs();

        if (this.templateElement) {
            const importedNode = document.importNode(this.templateElement.content, true);
            this.element = importedNode.firstElementChild as HTMLFormElement;
            this.element.id = ids.form;
            this._setupTemplateRefs();
            this._configure();
            this._attach();
        }
    }
}

export default ProjectInput;
