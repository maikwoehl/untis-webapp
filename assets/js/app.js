$(document).ready(function () {

	/* Initialization */
	{
		/* Resize WebView to fit screen */
		$('#webview').css("height", window.innerHeight - 50);
		
		/* Set CW */
		$('#cwDisplay').html(vp.CW.toString());
		
		/* Check if there is a classList. If not, download it */
		if (localStorage.getItem("classList") == null) {
			vp.retrieveClassList();
		}
		
		/* Global Variable for Favorite List */
		var classFavList = [];

		/* First visit dialog */
		if (localStorage.getItem("first-visit") == null) {
			$('#getStartedModal').modal("show");
		}

		/* Check if there is a classID in LocalStorage */
		if (localStorage.getItem("classID") == null) {
			vp.setType("bigplan");
			vp.navigate();
		} else {
			vp.navigate();
		}
		
		/* Check if favorite class list exists in LocalStorage */
		if (localStorage.getItem("classFavList") == null) {
			localStorage.setItem("classFavList", JSON.stringify([]));
			refreshFavListSelector();
		} else {
			refreshFavListSelector();
		}
		
		/* Check if favorite class list exists in LocalStorage */
		if (localStorage.getItem("teacherFavList") == null) {
			localStorage.setItem("teacherFavList", JSON.stringify([]));
			refreshFavListSelector();
		} else {
			refreshFavListSelector();
		}
	}

	/* Event Handler */
	{
		/* If Window was resized, adjust WebView-Height */
		$(window).resize(function () {
			$('#webview').css("height", window.innerHeight - 50);
		});
		
		/* Accept get started message */
		$('#getStartedBtn').click(function (e) {
			localStorage.setItem("first-visit", "false");
		});
		
		/* Choose plan */
		{
			$('#setClassBtn').click(function () {
				refreshFavListSelector();
				$('.classSelectionModal').modal('show');
			});
	
			/* Show Event for class selection modal dialog */
			$('.classSelectionModal').on("show.bs.modal", function (e) {
				$('#classListSelector').empty();
				var classList = vp.getClassList("classes");

				for (var i = 0; i < classList.length; i++) {
					$('#classListSelector').append('<option value="' + 
					(i + 1) + 
					'">' + 
					classList[i] + 
					'</option>');
				}

				if (localStorage.getItem("classID") != null) {
					$('#classListSelector option[value="' + vp.classID.toString() + '"]')
						.attr("selected", "true");
				}
			});
			
			/* Switch to Big Plan */
			$('.setBigPlanBtn').click(function () {
				//$('#webview').attr("src", vp.getBigPlanURL());
				vp.setType("bigplan");
				vp.navigate();
				$('.classSelectionModal').modal('hide');
			});
			
			/* Select the BIG plan with all classes */
			$('#setPlanBtn').click(function () {
				vp.setClassID($('#classListSelector').val());

				if (vp.currentType === "bigplan") {
					vp.currentType = "calendar";
				}

				vp.navigate();
				$('.classSelectionModal').modal("hide");
			});
		}
		
		/* CW management */
		{
			/* Switch CW to previous week */
			$('#prevWeekBtn').click(function () {
				if (vp.getCurrentCW() < vp.CW) {
					vp.CW = vp.CW - 1;
					$('#cwDisplay').html(vp.CW.toString());
					vp.navigate();
				}

				/* Disable button when the next step would go to the past */
				if (vp.getCurrentCW() == vp.CW) {
					document.getElementById("prevWeekBtn").setAttribute("disabled", "disabled");
				}
			});

			/* Switch CW to next week */
			$('#nextWeekBtn').click(function () {
				vp.CW = vp.CW + 1;
				$('#cwDisplay').html(vp.CW.toString());
				vp.navigate();

				/* Enable button */
				$('#prevWeekBtn').removeAttr("disabled");
			});
		}

		/* View Management */
		{
			/* Set viewport to calendar mode */
			$('.setCalendarViewBtn').click(function () {
				vp.setType("calendar");
				vp.navigate();
				$('#menuModal').modal("hide");
			});
			
			/* Set viewport to list mode */
			$('.setListViewBtn').click(function () {
				vp.setType("list");
				vp.navigate();
				$('#menuModal').modal("hide");
			});
			
			$('#activateTeacherMode').click(function() {
				if (!vp.teacherMode) {
					vp.teacherMode = true;
					$('.authModal').modal("show");
				} else {
					vp.teacherMode = false;
				}
			});
			
			$('#authLoginCancel').click(function() {
				vp.teacherMode = false;
				$('#activateTeacherMode').button("toggle");
				$('.authModal').modal("hide");
			});
			
			$('#authLogin').click(function() {
				$('#wrongCredentialsAlert').hide();
				
				vp.username = $('#authUsername').val();
				vp.password = $('#authPassword').val();
				
				vp.retrieveClassList();
			});
		}

		/* Favorites Management */
		{
			/* Refresh the favorite list selector */
			function refreshFavListSelector() {
				var classFavList;
				if (!vp.teacherMode) {
					classFavList = JSON.parse(localStorage.getItem("classFavList"));
				} else {
					classFavList = JSON.parse(localStorage.getItem("teacherFavList"));
				}
				
				$('#favListSelector').empty();
				var classList = vp.getClassList("classes");

				var isFaved = false;

				$('#favListSelector').append('<option value="0">' + lang.classPicker["favClassListSelectorPlaceholder"] + '</option>');

				for (var i = 0; i < classFavList.length; i++) {

					if (classFavList[i] == vp.classID) {
						isFaved = true;
					}

					$('#favListSelector').append('<option value="' + 
						classFavList[i] + 
						'">' + 
						classList[classFavList[i] - 1] + 
						'</option>');
				}

				if (isFaved) {
					$('#makeFavLabel').html(lang.classPicker["favRemove"]);
					$('.makeFavGlyphiconStar').show();
					$('.makeFavGlyphiconStarEmpty').hide();

				} else {
					$('#makeFavLabel').html(lang.classPicker["favReady"]);
					$('.makeFavGlyphiconStar').hide();
					$('.makeFavGlyphiconStarEmpty').show();
				}
			}
					
			/* Add a new favorite to favorite list */
			$('.makeFav').click(function () {
				isAlreadyFav = false;
				classID = null;

				for (var i = 0; i < classFavList.length; i++) {
					if (classFavList[i] == vp.classID) {
						isAlreadyFav = true;
						classID = i;
						break;
					}
				}

				if (!isAlreadyFav) {
					classFavList[classFavList.length] = vp.classID;
						
					if (!vp.teacherMode) {
						localStorage.setItem("classFavList", JSON.stringify(classFavList));
					} else {
						localStorage.setItem("teacherFavList", JSON.stringify(classFavList));
					}
	
					refreshFavListSelector();
				} else {
					classFavList.splice(classID, 1);
					
					if (!vp.teacherMode) {
						localStorage.setItem("classFavList", JSON.stringify(classFavList));
					} else {
						localStorage.setItem("teacherFavList", JSON.stringify(classFavList));
					}

					refreshFavListSelector();
					$('#makeFavLabel').html(lang.classPicker["favReady"]);
					$('.makeFavGlyphiconStar').hide();
					$('.makeFavGlyphiconStarEmpty').show();
				}
			});

			/* Change event handler of class selection (auto-change plan) */
			$('#classListSelector').change(function () {
				vp.setClassID($('#classListSelector').val());

				if (vp.currentType === "bigplan") {
					vp.currentType = "calendar";
				}

				vp.navigate();
				$('.classSelectionModal').modal("hide");
			});

			/* Change event handler of favorite selection (auto-change plan) */
			$('#favListSelector').change(function () {
				if ($('#favListSelector').val() != 0)
					vp.setClassID($('#favListSelector').val());

				if (vp.currentType === "bigplan") {
					vp.currentType = "calendar";
				}

				vp.navigate();
				$('.classSelectionModal').modal("hide");

			});
		}

		/* Menu event handlers */
		{
			/* Refresh the class list / download a new version of classlist */
			$('#refreshClassList').click(function () {
				vp.retrieveClassList();
				$('#menuModal').modal("hide");
			});

			/* Show about content */
			$('#aboutBtn').click(function () {
				$('#aboutContent').show();
			});
		}
	}
});