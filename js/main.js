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
        var weeks = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
        for (var i = 0; i < 7; i++) {
            var $current = $("<select id='" + new Date().getTime() + "'></select>");
            $("table#table tbody").find('tr').eq(0).find("td[name='" + weeks[i] + "']:first").html($current);
            $current.html(optionElements).select2({
                placeholder: '请选择项目',
                allowClear: true,
                templateResult: formatState,
                matcher: matchCustom,
                width: 'resolve'
            });
            $current.on('select2:select', function(e) {
                console.log($(this).val() + '-' + $(this).find(':selected').text());
                var data = e.params.data;
                console.log(data);
                console.log($(data.element).data('code'));
            }).on('select2:open', function(e) {
                console.log('下拉框弹出');
            }).on('select2:close', function(e) {
                console.log('下拉框关闭');
                $(this).parent().next().find('select:first').select2('open');
            }).on('focus', function(e) {
                console.log('获得焦点');
            });
        }
    });

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
}

function matchCustom(params, data) {
    // console.log('>>>>>>>>', params);
    console.log('>>>>>>>>', data);
    // If there are no search terms, return all of the data
    console.log(params.term);
    if ($.trim(params.term) === '') {
        return data;
    }

    // Do not display the item if there is no 'text' property
    if (typeof data.text === 'undefined') {
        return null;
    }

    // `params.term` should be the term that is used for searching
    // `data.text` is the text that is displayed for the data object
    if (data.text.indexOf(params.term) > -1 || getPinyinFromZHHans(data.text).indexOf(params.term) > -1){
        var modifiedData = $.extend({}, data, true);
        // modifiedData.text += ' (matched)';

        // You can return modified objects from here
        // This includes matching the `children` how you want in nested data sets
        return modifiedData;
    }

    // Return `null` if the term should not be displayed
    return null;
}

function getPinyinFromZHHans(str) {
    if (str == null || str.length <= 0) return "";
    var pinyin = Utils.CSpell.getSpell(str, function(charactor, spell) {
        console.log(charactor, spell);
        return spell[1];
    });
    return pinyin.split(',').join('');
}