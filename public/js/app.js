const weatherForm = document.querySelector("form");
const addressUrl = document.querySelector(".address");
const messageOne = document.querySelector("#m-1");
const messageTwo = document.querySelector("#m-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  fetch(`http://localhost:3000/weather?address=${addressUrl.value}`).then(
    (response) =>
      response.json().then((data) => {
        console.log(data);
        data.error
          ? (messageOne.textContent = data.error)
          : ((messageOne.textContent = `${data.location}`),
            (messageTwo.textContent = `${data.forecast}`));
      })
  );
});
