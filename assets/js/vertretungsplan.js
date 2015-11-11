/// <reference path="../../typings/jquery/jquery.d.ts" />
/**
 * VertretungsplanTP is a TypeScript library which allows the programmer to abstract the content from the model of the UNTIS web plans and from the model of the webapp itself.
 */
/**
 * Calculates the calendar week with Date objects.
 */
function getWeekNumber() {
    var d;
    d = new Date();
    d.setHours(0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    var d2;
    d2 = new Date(d.getFullYear(), 0, 1);
    return Math.ceil((((d - d2) / 8.64e7) + 1) / 7);
}
/**
 * Library to interface with UNTIS Web Plans.
 */
var Vertretungsplan = (function () {
    /**
     * VetretungsplanTP needs one parameter for the constructor: The ID of the iFrame that will show up all content.
     * @param settings JSON-Object with settings for Vertretungsplan
     */
    function Vertretungsplan(settings) {
        this.settings = settings;
        this.canvas = settings.canvas;
        this.language = settings.language || "de_DE";
        if (localStorage.getItem("classID") == null) {
            this.classID = 1;
        }
        else {
            this.classID = localStorage.getItem("classID");
        }
        this.CW = getWeekNumber();
        this.genericPlanStart = "http://www.bbs-lingen-gf.de/homepage/vertretungsplan/schueler/Vertretungen-Klassen/";
        this.genericTeacherPlanStart = "http://www.bbs-lingen-gf.de/homepage/vertretungsplan/lehrer/Vertretungen-Lehrer/";
        this.bigPlanEnding = "w/w00000.htm";
        if (localStorage.getItem("type") == null) {
            this.setType("bigplan");
        }
        else {
            this.setType(localStorage.getItem("type"));
        }
        this.classList = [];
        this.teacherList = [];
        this.roomList = [];
        this.teacherMode = false;
        this.username = "";
        this.password = "";
    }
    /**
     * Sets the view type of the plan.
     * @param type The type of the plan that will show up.
     */
    Vertretungsplan.prototype.setType = function (type) {
        this.currentType = type;
        localStorage.setItem("type", type);
    };
    /**
     * Creates the correct URI and sets the iFrame source to the configured web plan.
     */
    Vertretungsplan.prototype.navigate = function () {
        var navLink = "";
        if (!this.teacherMode) {
            if (this.currentType === "bigplan") {
                //localStorage.removeItem("classID");
                navLink = this.genericPlanStart + this.CW + "/" + this.bigPlanEnding;
            }
            else if (this.currentType === "calendar") {
                navLink = this.genericPlanStart + this.CW + "/c/c" + this.parseClassID() + ".htm";
            }
            else if (this.currentType === "list") {
                navLink = this.genericPlanStart + this.CW + "/w/w" + this.parseClassID() + ".htm";
            }
        }
        else {
            if (this.currentType === "bigplan") {
                //localStorage.removeItem("classID");
                navLink = this.genericTeacherPlanStart + this.CW + "/" + this.bigPlanEnding;
            }
            else if (this.currentType === "calendar") {
                navLink = this.genericTeacherPlanStart + this.CW + "/t/t" + this.parseClassID() + ".htm";
            }
            else if (this.currentType === "list") {
                navLink = this.genericTeacherPlanStart + this.CW + "/v/v" + this.parseClassID() + ".htm";
            }
        }
        document.getElementById(this.canvas).setAttribute("src", navLink);
    };
    /**
     * Returns the current calendar week based on calculations made inside getWeekNumber().
     * @returns current Calendar week
     */
    Vertretungsplan.prototype.getCurrentCW = function () {
        return getWeekNumber();
    };
    /**
     * Retrieves the list of the descriptive names with jQuery's AJAX methods.
     */
    Vertretungsplan.prototype.retrieveClassList = function () {
        if (!this.teacherMode) {
            //$.get("http://testapp-maikw.rhcloud.com/breakCORS/student", this.parseRawData);   
            $.ajax({
                url: "http://testapp-maikw.rhcloud.com/breakCORS/student",
                //url: "http://localhost:8888/breakCORS/student",
                type: "GET",
                cache: false,
                success: this.parseRawData
            });
        }
        else {
            /* Access with POST */
            var authData = {
                username: this.username,
                password: this.password
            };
            function errorHandler(jqXHR, errorStatus, errorHttpCode) {
                if (errorHttpCode === "Unauthorized") {
                    $('#wrongCredentialsAlert').show();
                }
            }
            $.ajax({
                url: "http://testapp-maikw.rhcloud.com/breakCORS/teacher",
                //url: "http://127.0.0.1:8888/breakCORS/teacher",
                type: "POST",
                cache: false,
                data: authData,
                success: this.parseTeacherRawData,
                error: errorHandler
            });
        }
    };
    /**
     * Parse the whole web page that is retrieved from the UNTIS web plans.
     * @param newRawData Represents the html of the whole page that is retrieved with retrieveClassList from the API-Server
     */
    Vertretungsplan.prototype.parseRawData = function (newRawData) {
        // Cut top 
        var workingData = newRawData.slice(newRawData.search("classes"));
        // Cut out classes
        workingData = workingData.slice(workingData.indexOf("["), workingData.indexOf("]") + 1);
        this.classList = JSON.parse(workingData);
        localStorage.setItem("classList", JSON.stringify(this.classList));
    };
    /**
     * Parse the whole web page that is retrieved from the UNTIS teacher web plans.
     * @param newRawData  epresents the html of the whole page that is retrieved with retrieveClassList from the API-Server
     */
    Vertretungsplan.prototype.parseTeacherRawData = function (newRawData) {
        this.username = "";
        this.password = "";
        // TODO: Get credentials to test this code
        // Cut top 
        var workingData = newRawData.slice(newRawData.search("classes"));
        // Cut out classes
        workingData = workingData.slice(workingData.indexOf("["), workingData.indexOf("]") + 1);
        this.classList = JSON.parse(workingData);
        // TODO: Add roomList
        localStorage.setItem("teacherList", JSON.stringify(this.classList));
    };
    /**
     * Gets the classlist out of localStorage.
     * @param listType This parameter tells the getClassList() method what list should be loaded out of storage.
     * @returns list of classes
     */
    Vertretungsplan.prototype.getClassList = function (listType) {
        if (listType === "classes") {
            return JSON.parse(localStorage.getItem("classList"));
        }
        else if (listType === "teachers") {
            return JSON.parse(localStorage.getItem("teacherList"));
        }
        else if (listType === "rooms") {
            return JSON.parse(localStorage.getItem("roomList"));
        }
    };
    /**
     * Sets the class ID property.
     * @param id The new class ID which should saved into the class property.
     */
    Vertretungsplan.prototype.setClassID = function (id) {
        this.classID = id;
        localStorage.setItem("classID", this.classID.toString());
    };
    /**
     * Parse the class ID property and returns a string with leading zeros for use in the URI.
     * @returns A string like `00273` that addresses the specified class in the URI path.
     */
    Vertretungsplan.prototype.parseClassID = function () {
        var classID = this.classID;
        var classNumberString;
        if (classID < 10) {
            classNumberString = "0000" + classID.toString();
        }
        else if (classID < 100) {
            classNumberString = "000" + classID.toString();
        }
        else if (classID < 1000) {
            classNumberString = "00" + classID.toString();
        }
        else if (classID < 10000) {
            classNumberString = "0" + classID.toString();
        }
        else if (classID < 100000) {
            classNumberString = classID.toString();
        }
        return classNumberString;
    };
    return Vertretungsplan;
})();
