/// <reference path="../../../typings/jquery/jquery.d.ts" />
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
     */
    constructor(webViewElementID: string);
    /**
     * Sets the view type of the plan.
     */
    setType(type: string): void;
    /**
     * Creates the correct URI and sets the iFrame source to the configured web plan.
     */
    navigate(): void;
    /**
     * Returns the current calendar week based on calculations made inside getWeekNumber().
     */
    getCurrentCW(): number;
    /**
     * Retrieves the list of the descriptive names with jQuery's AJAX methods.
     */
    retrieveClassList(): void;
    /**
     * Parse the whole web page that is retrieved from the UNTIS web plans.
     */
    parseRawData(newRawData: any): void;
    /**
     * Parse the whole web page that is retrieved from the UNTIS teacher web plans.
     */
    parseTeacherRawData(newRawData: string): void;
    /**
     * Gets the classlist out of localStorage.
     */
    getClassList(listType: string): void;
    /**
     * Sets the class ID property.
     */
    setClassID(id: number): void;
    /**
     * Parse the class ID property and returns a string with leading zeros to use in the URI.
     */
    parseClassID(): string;
}
