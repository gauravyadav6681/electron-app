
function toggleSettings() {
    const settingsMenu = document.getElementById('settings-menu');
    settingsMenu.style.display = settingsMenu.style.display === 'none' ? 'block' : 'none';
  }
document.addEventListener('DOMContentLoaded', () => {
    toggleHome(); 
  });
  
  function toggleTheme() {
    document.body.classList.toggle('dark');
  }
  
  const checkbox = document.getElementById("checkbox")
  checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode")
  })