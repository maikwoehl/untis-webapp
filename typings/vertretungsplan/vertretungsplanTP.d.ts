/// <reference path="../jquery/jquery.d.ts" />
/**
 * VertretungsplanTP is a TypeScript library which allows the programmer to abstract the content from the model of the UNTIS web plans and from the model of the webapp itself.
 */
/**
 * Calculates the calendar week with Date objects.
 */
declare function getWeekNumber(): number;
/**
 * Library to interface with UNTIS Web Plans.
 */
declare class VertretungsplanTP {
    webViewElementID: string;
    /**
     * The DOM-ID of the iFrame-Object where the UNTIS web plan will show up.
     */
    webView: string;
    /**
     * Sets and gets the class identifier which corresponds to different classes and courses inside the web plan.
     */
    classID: number;
    /**
     * Sets and gets the calendar week which will show up.
     */
    CW: number;
    /**
     * Set/Get the current view type (e.g. calendar).
     */
    currentType: string;
    /**
     * The first URI part that points to the server of the UNTIS Web Plans.
     */
    genericPlanStart: string;
    /**
     * The first URI part that points to the server of the UNTIS Teacher Web Plans.
     */
    genericTeacherPlanStart: string;
    /**
     * The last URI part that points to the UNTIS web plan with all classes.
     */
    bigPlanEnding: string;
    /**
     * An array with descriptive names of classes.
     */
    classList: string[];
    /**
     * An array with descriptive names of teachers.
     */
    teacherList: string[];
    /**
     * An array with descriptive names of rooms.
     */
    roomList: string[];
    /**
     * (De-)Activates the teacher mode that will give access to teacher web plans.
     */
    teacherMode: boolean;
    /**
     * Set/Get the username to access teacher web plans (should only be temporarily stored) (HTTP BASIC Auth).
     */
    username: string;
    /**
     * Set/Get the password to access teacher web plans (should only be temporarily stored) (HTTP BASIC Auth).
     */
    password: string;
    /**
     * VetretungsplanTP needs one parameter for the constructor: The ID of the iFrame that will show up all content.
     * @param webViewElementID DOM-ID of the iFrame Element where plans are loaded.
     */
    constructor(webViewElementID: string);
    /**
     * Sets the view type of the plan.
     * @param type The type of the plan that will show up.
     */
    setType(type: string): void;
    /**
     * Creates the correct URI and sets the iFrame source to the configured web plan.
     */
    navigate(): void;
    /**
     * Returns the current calendar week based on calculations made inside getWeekNumber().
     * @returns current Calendar week
     */
    getCurrentCW(): number;
    /**
     * Retrieves the list of the descriptive names with jQuery's AJAX methods.
     */
    retrieveClassList(): void;
    /**
     * Parse the whole web page that is retrieved from the UNTIS web plans.
     * @param newRawData Represents the html of the whole page that is retrieved with retrieveClassList from the API-Server
     */
    parseRawData(newRawData: string): void;
    /**
     * Parse the whole web page that is retrieved from the UNTIS teacher web plans.
     * @param newRawData  epresents the html of the whole page that is retrieved with retrieveClassList from the API-Server
     */
    parseTeacherRawData(newRawData: string): void;
    /**
     * Gets the classlist out of localStorage.
     * @param listType This parameter tells the getClassList() method what list should be loaded out of storage.
     */
    getClassList(listType: string): void;
    /**
     * Sets the class ID property.
     * @param id The new class ID which should saved into the class property.
     */
    setClassID(id: number): void;
    /**
     * Parse the class ID property and returns a string with leading zeros for use in the URI.
     * @returns A string like `00273` that addresses the specified class in the URI path.
     */
    parseClassID(): string;
}
