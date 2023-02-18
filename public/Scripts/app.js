/* File Name: app.js
   Name: Sorada Prathan
   Student ID: 301270677
   Date: February 18, 2023
*/
// IIFE -- Immediately Invoked function Expression
(function () {
    function Start() {
      console.log('App Started...');
  
      let deleteButtons = document.querySelectorAll('.btn-danger');
      
      for(button of deleteButtons)
      {
        button.addEventListener('click', (event)=>{
          if(!confirm("Are you sure?"))
          {
            event.preventDefault();
            window.location.assign('/contact-list');
          }
        });
      }
    }
  
    window.addEventListener('load', Start);
  })();