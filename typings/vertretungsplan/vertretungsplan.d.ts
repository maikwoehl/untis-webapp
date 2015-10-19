// interface VP {
// 	new (webViewElementID: string): VP;
// 	prototype: VP;
// 	
// 	username: string;
// 	password: string;
// 	webView: string;
// 	classID: number;
// 	CW: number;
// 	genericPlanStart: string;
// 	genericTeacherPlanStart: string;
// 	classList: string[];
// 	teacherList: string[];
// 	roomList: string[];
// 	teacherMode: boolean;
// 	
// 	setType(type: string): void;
// 	navigate(): void;
// 	getCurrentCW(): number;
// 	retrieveClassList(): void;
// 	parseRawData(newRawData: string): void;
// 	parseTeacherRawData(newRawData: string): void;
// 	getClassList(listType: string): string[];
// 	setClassID(id: number): void;
// 	parseClassID(): string;
// }
// 
// declare var Vertretungsplan: VP;

declare var classFavList: string[];
declare var classList: string[];
declare var isFaved: boolean; 
declare var isAlreadyFav: boolean;
declare var classID: number;

declare function refreshFavListSelector(): void;