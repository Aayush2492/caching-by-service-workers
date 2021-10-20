// Making sure sw's are supported
if ("serviceWorker" in navigator) {
  //if(navigator.serviceWorker) ..... navigator is browser object

  console.log("Logging to check if shit works");

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("../cached_pages.js")
      //then(on success) and catch(on failure) are part of *promises* in js
      .then((reg) =>
        console.log("Service Worker has been registered with scope", reg.scope)
      )
      .catch((err) => console.log("Service Worker registration failed", err));
  });
}
