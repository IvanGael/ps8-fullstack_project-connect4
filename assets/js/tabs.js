const buttons = document.querySelectorAll('.tab-button');
const contents = document.querySelectorAll('[id$="-content"]');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonId = button.getAttribute('id');
    const contentId = `${buttonId}-content`;

    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    contents.forEach(content => content.classList.remove('active'));
    document.getElementById(contentId).classList.add('active');
  });
});
