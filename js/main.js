$(document).ready(function() {
	$.getJSON('../jsondata/项目.json', function(data) {
		var options = data.RECORDS;
		var optionElements = "<option></option>";
		if (options != null && options.length > 0) {
			var optionsStr = JSON.stringify(options);
			for (var tag in options) {
				var project = options[tag];
				var projectId = project.proj_id;
				var projectName = project.name;
				var projectLevel = parseInt(project.depth);
				var projectPID = project.parent;
				if (projectLevel == 1 && projectName.indexOf('已结项目') != -1) break;
				optionElements = optionElements.concat("<option value='" + projectId + "' data-level='" + projectLevel + "' data-code='" + project.code + "'");
				if (optionsStr.match("\"parent\":\"" + projectId + "\"") || optionsStr.match("\"parent\":" + projectId)) optionElements = optionElements.concat(" disabled='disabled'");
				optionElements = optionElements.concat(">" + projectName + "</option>");
			}
		}

		$("select[name='monProject']").html(optionElements).select2({
			placeholder: '请选择项目',
			allowClear: true,
			templateResult: formatState,
			width: 'resolve'
		});
	});
	$("select[name='monProject']").on('select2:select', function(e) {
		console.log($(this).val() + '-' + $(this).find(':selected').text());
		var data = e.params.data;
		console.log(data);
		console.log($(data.element).data('code'));
	});
	var tueProject = $("select[name='monProject']").clone(true);
	console.log(tueProject);
	$("div[name='projectWeek']").append('<div class="uk-width-1-6"></div>');
});


function formatState(state) {
	if (!state.id) return state.text;
	var projectLevel = $(state.element).data('level');
	var $state;
	switch (projectLevel) {
		case 1:
			$state = $(
				"<span class='uk-text-bold'>" + state.text + '</span>'
			);
			break;
		case 2:
			$state = $(
				"<span>&nbsp;&nbsp;<i class='uk-icon-language'></i> " + state.text + '</span>'
			);
			break;
		case 3:
			$state = $(
				"<div class='uk-grid uk-text-primary'><div class='uk-push-1-10 uk-width-9-10'><i class='uk-icon-houzz'></i> " + state.text + '</div></div>'
			);
			break;
		case 4:
			break;
		default:
			$state = state.text;
			break;
	}
	return $state;
};