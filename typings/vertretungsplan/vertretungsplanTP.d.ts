/// <reference path="typings/jquery/jquery.d.ts" />
declare function getWeekNumber(): number;
declare class VertretungsplanTP {
    webView: string;
    classID: number;
    CW: number;
    currentType: string;
    genericPlanStart: string;
    genericTeacherPlanStart: string;
    bigPlanEnding: string;
    classList: string[];
    teacherList: string[];
    roomList: string[];
    teacherMode: boolean;
    username: string;
    password: string;
    constructor(webViewElementID: string);
    setType(type: string): void;
    navigate(): void;
    getCurrentCW(): number;
    retrieveClassList(): void;
    parseRawData(newRawData: any): void;
    parseTeacherRawData(newRawData: string): void;
    getClassList(listType: string): void;
    setClassID(id: number): void;
    parseClassID(): string;
}
