$(document).ready(function(){
   
   // Data storage
   function saveInfo(task){
      localStorage.setItem(task, task);
      console.log(localStorage);
   }

   var listo = [];

   // Load local information
   function loadInfo(){
      if(localStorage.theList){
         for(var j=0;j<localStorage.theList.length;j++){
            listo[j] = localStorage.theList[j];
         }
      }
   }

   // Get local time
   function getTime(){
      var now = new Date();
      var hour = now.getHours() - 12;
      var min = now.getMinutes();
      var letters;
      if(min < 10){
         min = "0" + min;
      }
      if(now.getHours() > 12){
         letters = 'pm';
      } else {
         letters = 'am';
      }
      $('#hour').html(hour);
      $('#minute').html(min);
      $('#ampm').html(letters);
   }
   getTime();

   $('#newTaskForm').hide();

   

   // Constructor function for new Tasks
   var Task = function(task){
      this.task = task;
      this.id = 'new';
   };

   // Main function for adding the task
   var addTask = function(task) {
    if(task) {
        task = new Task(task);
        listo.push(task);

         $('#newItemInput').val('');
         $('#newList').append(
            '<a href="#finish" class="" id="item">' +
            '<li class="list-group-item">' +
            '<h3>' + task.task + '</h3>'+
            '<span class="arrow pull-right">' +
            '<i class="glyphicon glyphicon-arrow-right">' +
            '</span>' +
            '</li>' +
            '</a>'
         );
    }
    $('#newTaskForm').slideToggle('fast', 'linear');
};

   // Move tasks between windows
   var advanceTask = function(task){
      var modified = task.innerText.trim();
      for (var i = 0; i < listo.length; i++) {
         if (listo[i].task === modified) {
            if (listo[i].id === 'new') {
               listo[i].id = 'inProgress';
            } else if (listo[i].id === 'inProgress') {
               listo[i].id = 'archived';
            } else {
               listo.splice(i, 1);
            }
            break;
         }
      }
      task.remove();
   };

   // Calls addTask when we click the saveNewItem button
   $('#saveNewItem').on('click', function (e) {
      e.preventDefault();
      var task = $('#newItemInput').val().trim();
      addTask(task);
      saveInfo(task);
   });

   // Opens form
   $('#add-todo').on('click', function(){
      $('#newTaskForm').fadeToggle('fast', 'linear');
   });

   // Closes form
   $('#cancel').on('click', function(){
      $('#newTaskForm').fadeToggle('fast', 'linear');
   });

   // Move an item from 'new' to 'inProgress'
   $(document).on('click', '#item', function(e){
         e.preventDefault();
      var task = this;
      advanceTask(task);
      this.id = 'inProgress';
      $('#currentList').append(this.outerHTML);
   });

   // Move an item from 'inProgress' to 'archived'
   $(document).on('click', '#inProgress', function(e){
         e.preventDefault();
      var task = this;
      task.id = "archived";
      var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
      advanceTask(task);
      $('#archivedList').append(changeIcon);
   });

   $(document).on('click', '#archived', function(e){
         e.preventDefault();
         var task = this;
         advanceTask(task);
   });
});