document.addEventListener("DOMContentLoaded",(function(){const e=document.querySelectorAll(".buttonModalOpen"),t=document.getElementById("buttonModalClose"),o=document.getElementById("modalWrapper");e&&t&&o&&(e.forEach((e=>{e.addEventListener("click",(e=>{e.stopPropagation(),o.classList.add("active")}))})),t.addEventListener("click",(e=>{e.stopPropagation(),o.classList.remove("active")})))}));