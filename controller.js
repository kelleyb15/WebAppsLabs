/*
 * controller.js
 *
 * Controls the interaction between the page and an array of values
 */

/*global $*/

/*
 * Used to create a new "controller".
 * "element" needs to be a DOM or jQuery "ul" element.
 */
var makeController = function(element) {
   "use strict";

   // el is a jQuery object wrapping "element", in case it wasn't a jQuery
   // object already.
   // "tasks" is an array of strings for the tasks to be shown.
   var el = $(element), tasks = [];

   // add an "add" button right after the element
   addAddButton();
   // Bind events to controller functions
   bindEvents();

   /*
    * Everything below here is the functions you need to implement.
    */

   /*
    * HELPER FUNCTIONS
    *
    * These functions are meant to be used from the handlers
    */

   /*
    * Given a string "str", should return the html string that has a
    * list item, and in it a "span" containing the string, followed by
    * an "input" button for "remove". See examples in sample.html
    */
   function newTaskHTML(str) {
      var htmlString = "<li><span>" + str + "</span>";
      htmlString += "<input type='button' class='remove' value='Remove'></li>";

      return htmlString;
   }

   /*
    * Given an event that occured in an element within a "list element"
    * returns that "li" element (in jQuery wrapper).
    * Use jQuery's "closest".
    */
   function getLi(ev) {
      var listEl = $(ev.target).closest("li");
      return listEl;
   }

   /*
    * Given a list item (as jQuery wrapper) returns its index among its
    * "li"-siblings.
    * Use jQuery's "prevAll".
    */
   function getIndex(li) {
      var index = li.prevAll().length - 1;
      return index;
   }

   /*
    * Given a jQuery wrapper for a list item, enables "Edit mode" for that
    * item, namely:
    * - Sets a class of "hidden" on all elements in the list item
    * - Creates and adds in the list element an "input" element of type
    *     text and class "edit"
    * - Returns a reference to the jQuery wrapper of that edit element.
    */
   function enableEditMode(li) {
      var inputHtml = $("<input>", {
         type: "text",
         class: "edit"
      });
      $(li).children().each(function() {
         $(this).toggleClass("hidden");
      });
      $(li).append(inputHtml);

      return inputHtml;
   }

   /*
    * Given a jQuery wrapper for a list item, disables "Edit mode" for that
    * item, namely:
    * - Removes any "input" element of class "edit" in the list item
    *       if there was one
    * - Removes the class of "hidden" from all elements in the list item
    * - Returns the list item
    */
   function disableEditMode(li) {
      $(".edit").remove();

      $("li").children().each(function() {
         $(this).toggleClass("hidden");
      });


      return li;
   }

   /*
    * EVENT HANDLERS
    *
    * All functions below are handling events
    */

   /*
    * Adds an input tag as a sibling immediately after the element.
    * Input tag should be a button, saying "New" on it.
    * You need to bind the button's click event to the "addNewTask"
    * function.
    */
   function addAddButton() {
      var button = $("<input/>", {
         type: "button",
         value: "New"
      });
      button.on("click", addNewTask);
      el.after(button);

      return this;
   }

   /*
    * Adds a new "Task". In this method you should:
    * - Push a new string with the text "New Task" at the end of the tasks array.
    * - Create a new "li" using newTaskHTML and jQuery
    * - Put that "li" at the end of the "el".
    * - Return true to not prevent propagation.
    */
   function addNewTask(ev) {
      tasks.push("New Task");
      el.append(newTaskHTML("New Task"));
      return true;
   }

   /*
    * This method triggers in response to clicking the button with class
    * remove. It should:
    * - Identify the "li" element containing the button. (use a helper method)
    * - Identify the index of this element (use helper method)
    * - Remove the correspondingly-indexed element from the tasks array.
    * - Remove the "li" element from the list.
    * - Return true to not prevent propagation.
    */
   function removeElement(ev) {
      var liEl = getLi(ev), elIndex = getIndex(liEl);
      tasks.splice(elIndex, 1);
      liEl.remove();
      return true;
   }


   /*
    * This method is meant to allow editing of an item. It does this by
    * inserting an input element and hiding the existing elements.
    * It should do the following:
    * - Identify the "li" element that was clicked
    * - Invoke the "enableEditMode" function on that element
    * - Set the focus to the input element that enableEditMode created.
    * - Return true to allow propagation.
    */
   function editElement(ev) {
      var liEl = getLi(ev);
      enableEditMode(liEl).focus();

      return true;
   }

   /*
    * This method happens when the text input where the user was editing a
    * text is registering a change, typically associated with tabbing out
    * or pressing "return". This should commit the change. However, this
    * event can trigger even in cases where an escape was pressed. In that
    * case checkForCancel has run and possibly already removed the edit
    * text input from the DOM. When this method is subsequently called,
    * the edit element might not exist, and/or might not be an element
    * inside "li".
    *
    * So you need to do the following:
    * - Determine if the edit element still exists and is inside an "li".
    *       If it is not, you can immediately return true.
    * - Find the "li" element containing the edit element. (helper method)
    * - Get the value of the edit element.
    * - Find the index of the list element within its siblings (helper method)
    * - Set the string at the corresponding index in the "tasks" array to
    *       the new value (from the edit element)
    * - Set the contents of the "span" to the value you read from the edit
    *     element.
    * - Call on "disableEditMode" to fix the interface and remove the edit element
    * - Return true to allow propagation
    */
   function commitEditing(ev) {
      var value;
      if ($(ev.target).siblings(".edit").length === 1) {
         return true;
      } else {
         value = getLi(ev).find("input").html();
         tasks[getIndex($(ev.target).closest("li"))] = value;

         console.log(value);

         $(ev.target).closest("span").html(value);
         disableEditMode();
      }

      return true;
   }

   /*
    * This method is meant to react to the case where the user has pressed
    * the "esc" button to aknowledge that they did not mean to edit the
    * item. You should do the following:
    * - Read the keyboard code of the event, and if it is not "Escape"
    *       then return. This part is done for you.
    * - If it was an "Escape", we need to cancel the current editing field.
    * - Find the "li" element containing the text input element (helper method)
    * - Use a helper method to disable the editing mode.
    * - Return "false" to prevent propagation in the case of an escape.
    */
   function checkForCancel(ev) {
      if (ev.keyCode !== 0x1B) {
         return true;
      } else {
         disableEditMode(ev.target);
      }

      return false;
   }

   /* You do not need to change anything below this line */

   /*
    * Binds UI events to specific object methods.
    * You do not need to change this method.
    */
   function bindEvents() {
      el.on("dblclick", "li", editElement);
      el.on("change", ".edit", commitEditing);
      el.on("click", ".remove", removeElement);
      el.on("keydown", ".edit", checkForCancel);
   }

   return {
      el: element,
      tasks: tasks
   };
};


// jQuery with function. This function runs when the page has finished
// loading. It gets everything started
//
// Normally this would have been on a different file.
$(function() {
   "use strict";

   // Create the specific controller object initialized to work with our page
   makeController($("#main ul"));
});
