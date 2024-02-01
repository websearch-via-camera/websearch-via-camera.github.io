async function getText(url, query) {
  let response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      query: query
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  let text = await response.text();
  return text;
}

function showGPT(query) {
  document.getElementById("gpt").style.display = "block";
  document.getElementById("buttons").style.display = "none";

  const url =
    "https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-2b706faa-8009-4af8-9ba2-0d52f5a1bed1/default/doGPT";
  let container = document.getElementById("gptText");
  obj = getText(url, query).then((data) =>
    console.log((container.innerHTML = `${data}`))
  );
}

function showInput() {
  document.getElementById("input").style.display = "block";
  document.getElementById("buttons").style.display = "none";
}
