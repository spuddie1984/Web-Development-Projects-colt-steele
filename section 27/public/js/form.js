
window.addEventListener("DOMContentLoaded", () => {
    // Validate form inputs before sending to Server
    // (this is the basic Bootstrap example)
    // You can find it here https://getbootstrap.com/docs/4.3/components/forms/?#validation  
    const forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    const validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    }); 
});

