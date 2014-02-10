angular.module('openproject.uiComponents')

  .filter('historicalDateKind', function() {
    return function(object, dateOption) {
      if (!object.does_historical_differ()) return;

      var newDate = object[dateOption];
      var oldDate = object.historical()[dateOption];

      if (oldDate && newDate) {
        return (newDate < oldDate ? 'postponed' : 'preponed');
      }
      return "changed";
    };
  })

  // timelines
  .filter('getOptionColumn', function() {
    var map = {
      "type": "getTypeName",
      "status": "getStatusName",
      "responsible": "getResponsibleName",
      "assigned_to": "getAssignedName",
      "project": "getProjectName"
    };

    return function(object, option) {
      switch(option) {
        case 'start_date':
          return object.start_date;
        case 'due_date':
          return object.due_date;
        default:
          return object[map[option]]();
      }
    };
  })

  // work packages
  .filter('columnContent', function(){
    return function(object, option) {
      var content = object[option];
      switch(typeof(content)) {
        case 'string':
          return content;
        case 'object':
          return content.name;
        default:
          return '';
      }
    };
  });
