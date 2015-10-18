Date.prototype.getWeekNumber = function () {
    var d = new Date(+this);
    d.setHours(0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
};

function Vertretungsplan(webViewElementID) {
    this.webView = webViewElementID;

    if (localStorage.getItem("classID") == null) {
        this.classID = 1;
    } else {
        this.classID = localStorage.getItem("classID");
    }

    this.CW = (new Date()).getWeekNumber();
    this.genericPlanStart = "http://www.bbs-lingen-gf.de/homepage/vertretungsplan/schueler/Vertretungen-Klassen/";
    this.genericTeacherPlanStart = "http://www.bbs-lingen-gf.de/homepage/vertretungsplan/lehrer/Vertretungen-Lehrer/";
    this.bigPlanEnding = "w/w00000.htm";

    if (localStorage.getItem("type") == null) {
        this.setType("bigplan")
    } else {
        this.setType(localStorage.getItem("type"));
    }

    this.classList = [];
    this.teacherList = [];
    this.roomList = [];
    this.rawData = "";
    this.teacherMode = false;
}

Vertretungsplan.prototype = {
    constructor: Vertretungsplan,
    setType: function (type) {
        this.currentType = type;
        localStorage.setItem("type", type);
    },

    navigate: function () {
        var navLink = "";

        if (!this.teacherMode) {
            if (this.currentType === "bigplan") {
                //localStorage.removeItem("classID");
                navLink = this.genericPlanStart + this.CW + "/" + this.bigPlanEnding;
            } else if (this.currentType === "calendar") {
                navLink = this.genericPlanStart + this.CW + "/c/c" + this.parseClassID() + ".htm";
            } else if (this.currentType === "list") {
                navLink = this.genericPlanStart + this.CW + "/w/w" + this.parseClassID() + ".htm";
            }
        } else {
            if (this.currentType === "bigplan") {
                //localStorage.removeItem("classID");
                navLink = this.genericTeacherPlanStart + this.CW + "/" + this.bigPlanEnding;
            } else if (this.currentType === "calendar") {
                navLink = this.genericTeacherPlanStart + this.CW + "/t/t" + this.parseClassID() + ".htm";
            } else if (this.currentType === "list") {
                navLink = this.genericTeacherPlanStart + this.CW + "/v/v" + this.parseClassID() + ".htm";
            }
        }

        document.getElementById(this.webView).setAttribute("src", navLink);
    },

    getCurrentCW: function () {
        return (new Date()).getWeekNumber();
    },

    retrieveClassList: function () {
        if (!this.teacherMode) {
            $.get("http://home.pierewoehl.de:8080/breakCORS.php", this.parseRawData);    
        } else {
            /* Access with POST */
            var username = prompt("Benutzername:");
            var password = prompt("Passwort");
            var authData = {
                mode: "teacher",
                username: username,
                password: password
            };
            
            $.ajax({
                url: "http://home.pierewoehl.de:8080/breakCORS.php",
                type: "POST",
                data: authData,
                success: this.parseRawData
            });
        }
    },

    parseRawData: function (newRawData) {
        // Cut top 
        var workingData =newRawData.slice(this.rawData.search("classes"));

        // Cut out classes
        workingData = workingData.slice(workingData.indexOf("["), workingData.indexOf("]") + 1);

        this.classList = JSON.parse(workingData);

        localStorage.setItem("classList", JSON.stringify(this.classList));
    },
    
    parseTeacherRawData: function (newRawData)
    {
        this.rawData = newRawData;

        // Cut top 
        var workingData = this.rawData.slice(this.rawData.search("classes"));

        // Cut out classes
        workingData = workingData.slice(workingData.indexOf("["), workingData.indexOf("]") + 1);

        this.classList = JSON.parse(workingData);

        localStorage.setItem("classList", JSON.stringify(this.classList));
    },

    getClassList: function () {
        return JSON.parse(localStorage.getItem("classList"));
    },

    setClassID: function (id) {
        this.classID = id;
        localStorage.setItem("classID", this.classID.toString());
    },

    parseClassID: function () {
        var classID = this.classID;
        var classNumberString;

        if (classID < 10) {
            classNumberString = "0000" + classID.toString();
        } else if (classID < 100) {
            classNumberString = "000" + classID.toString();
        } else if (classID < 1000) {
            classNumberString = "00" + classID.toString();
        } else if (classID < 10000) {
            classNumberString = "0" + classID.toString();
        } else if (classID < 100000) {
            classNumberString = classID.toString();
        }

        return classNumberString;
    }

};