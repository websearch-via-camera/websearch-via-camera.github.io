/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
  async fetch(request, env, ctx) {

      // Search API
      const apiurl = "https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-2b706faa-8009-4af8-9ba2-0d52f5a1bed1/default/doSearch"
      let url = new URL(request.url);
      let path = url.pathname;
      path = decodeURI(path)
      path = path.replace(/^\//, "")
      const pathParts = path.split("/")

      if(pathParts.length != 2) {
          return new Response('Invalid method', {
              status: 405
          });
      }

      const lang = pathParts[0]
      const query = pathParts[1]
      console.log(path)
      console.log(lang)
      console.log(query)
      let resultFor = "Result for"
      let slow = "Slow, please wait."
      let slowText = "GPT is doing work. This takes upto two minutes. The result will appear below!"
      let GPTKnowledge = "GPT knowledge"
      let SummarizeBtn = "Summarize results"
      let powered = "Powered by GPT."
      let apiurlsummary = "https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-2b706faa-8009-4af8-9ba2-0d52f5a1bed1/default/doSummary";
      if(lang == 'es') {
          slow = "Lento, por favor espera."
          slowText = "GPT está trabajando. Esto lleva hasta dos minutos. ¡El resultado aparecerá a continuación!"
          GPTKnowledge = "Conocimiento GPT"
          SummarizeBtn = "Resumir resultados"
          resultFor = "Resultado para"
          powered = "Desarrollado por GPT."
          apiurlsummary = 'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-2b706faa-8009-4af8-9ba2-0d52f5a1bed1/default/doEsSummary'
      }
      if(lang == 'el') {
          slow = "Σιγά, παρακαλώ περιμένετε."
          slowText = "Το GPT κάνει δουλειά. Αυτό διαρκεί έως και δύο λεπτά. Το αποτέλεσμα θα εμφανιστεί παρακάτω!"
          GPTKnowledge = "Γνώση GPT"
          SummarizeBtn = "Συνοψίστε τα αποτελέσματα"
          resultFor = "Αποτέλεσμα για"
          powered = "Με την υποστήριξη του GPT."
          apiurlsummary = 'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-2b706faa-8009-4af8-9ba2-0d52f5a1bed1/default/doElSummary'
      }
      if(lang == 'id') {
          slow = "Lambat, harap tunggu."
          slowText = "GPT sedang melakukan pekerjaan. Ini memakan waktu hingga dua menit. Hasilnya akan tampak di bawah!"
          GPTKnowledge = "pengetahuan GPT"
          SummarizeBtn = "Ringkaslah hasilnya"
          resultFor = "Hasil untuk"
          powered = "Didukung oleh GPT."
          apiurlsummary = 'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-2b706faa-8009-4af8-9ba2-0d52f5a1bed1/default/doIdSummary'
      }
      console.log(apiurl)
      console.log(apiurlsummary)
      if(['es', 'el', 'en', 'id'].indexOf(lang) > -1 && request.method === 'GET') {
          async function gatherResponse(response) {
              const {
                  headers
              } = response;
              const contentType = headers.get("content-type") || "";
              if(contentType.includes("application/json")) {
                  return JSON.stringify(await response.json());
              }
              return response.text();
          }

          const response = await fetch(apiurl, {
              method: "POST",
              body: JSON.stringify({
                  query: `${query}`,
                  lang: `${lang}`
              }),
              headers: {
                  "Content-Type": "application/json"
              }
          });

          let resultsPart = ``

          const results = await gatherResponse(response);
          const json = JSON.parse(results)
          for(var i = 0; i < json.webPages?.value.length; i++) {
              let name = json.webPages?.value[i]?.name;
              let displayUrl = json.webPages?.value[i]?.displayUrl;
              let snippet = json.webPages?.value[i]?.snippet;
              let template = `<div class="max-w-3xl w-full lg:m-4 lg:flex">

  <div class="m-5 border border-gray-400 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
    <div class="mb-8">
      <div class="text-gray-900 font-bold text-xl mb-2">${name}</div>
      <p class="text-gray-700 text-base">
      ${snippet}
      </p>
    </div>
    <div class="flex items-center">

      <div class="text-sm">
        <a href="${displayUrl}" class="text-sm leading-none underline text-blue-600 hover:text-blue-800 visited:text-purple-600">${displayUrl}</a>

      </div>
    </div>
  </div>
</div>`;
              resultsPart += template;

          }

          const topHtml = `<!DOCTYPE html>
  <html lang="${lang}" >
  <head>
    <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=0.8">
     <link href="https://websearch-via-camera.com/output.css" rel="stylesheet">


     <script src="https://cdn.intake-lr.com/LogRocket.min.js" crossorigin="anonymous"></script>
<script>window.LogRocket && window.LogRocket.init('rikjv0/websearch-via-camera');</script>


     <link rel="apple-touch-icon" sizes="180x180" href="https://websearch-via-camera.com/apple-touch-icon.png">
     <link rel="manifest" href="https://websearch-via-camera.com/site.webmanifest">
     <link rel="icon" type="image/png" sizes="32x32" href="https://websearch-via-camera.com/favicon-32x32.png">
     <link rel="icon" type="image/png" sizes="16x16" href="https://websearch-via-camera.com/favicon-16x16.png">
     <link rel="icon" href="https://websearch-via-camera.com/favicon.ico">

     <script type="text/javascript">
     const jsn =  JSON.stringify( ${  JSON.stringify(json.webPages)} );
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
    async function getText2(url) {
      let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          json: jsn
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      let text = await response.text();
      return text;
    }
    
    function showGPT(query) {
      document.getElementById("notif").style.display = "block";
      document.getElementById("gpt").style.display = "block";

      const url =
        "https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-2b706faa-8009-4af8-9ba2-0d52f5a1bed1/default/doGPT";
      let container = document.getElementById("gptText");
      obj = getText(url, query).then((data) =>
        console.log((container.innerHTML = data))
      );

    }

    function showSummary() {
      document.getElementById("notif").style.display = "block";
      document.getElementById("summary").style.display = "block";

      const url = "${apiurlsummary}";
      let container = document.getElementById("summaryText");
      obj = getText2(url).then((data) =>
        console.log((container.innerHTML = data))
      );
    }
    
     </script>

  <script type="application/ld+json">
  [
  {
    "@context": "https://schema.org/", 
    "@type": "BreadcrumbList", 
    "itemListElement": [{
      "@type": "ListItem", 
      "position": 1, 
      "name": "Search",
      "item": "https://websearch-via-camera.com"  
    },{
      "@type": "ListItem", 
      "position": 2, 
      "name": "Result",
      "item": "https://result.websearch-via-camera.com"  
    },{
      "@type": "ListItem", 
      "position": 3, 
      "name": "${query}",
      "item": ""  
    }]
  }
  ,{
    "@context": "https://schema.org/", 
    "@type": "BreadcrumbList", 
    "itemListElement": [{
      "@type": "ListItem", 
      "position": 1, 
      "name": "Search",
      "item": "https://websearch-via-camera.com"  
    },{
      "@type": "ListItem", 
      "position": 2, 
      "name": "${query}",
      "item": ""  
    }]
  }]
  </script>
  <style>
  .resp-sharing-button__link,
.resp-sharing-button__icon {
display: inline-block
}

.resp-sharing-button__link {
text-decoration: none;
color: #fff;
margin: 0.5em
}

.resp-sharing-button {
border-radius: 5px;
transition: 25ms ease-out;
padding: 0.5em 0.75em;
font-family: Helvetica Neue,Helvetica,Arial,sans-serif
}

.resp-sharing-button__icon svg {
width: 1em;
height: 1em;
margin-right: 0.4em;
vertical-align: top
}

.resp-sharing-button--small svg {
margin: 0;
vertical-align: middle
}

/* Non solid icons get a stroke */
.resp-sharing-button__icon {
stroke: #fff;
fill: none
}

/* Solid icons get a fill */
.resp-sharing-button__icon--solid,
.resp-sharing-button__icon--solidcircle {
fill: #fff;
stroke: none
}

.resp-sharing-button--twitter {
background-color: #55acee
}

.resp-sharing-button--twitter:hover {
background-color: #2795e9
}

.resp-sharing-button--pinterest {
background-color: #bd081c
}

.resp-sharing-button--pinterest:hover {
background-color: #8c0615
}

.resp-sharing-button--facebook {
background-color: #3b5998
}

.resp-sharing-button--facebook:hover {
background-color: #2d4373
}

.resp-sharing-button--tumblr {
background-color: #35465C
}

.resp-sharing-button--tumblr:hover {
background-color: #222d3c
}

.resp-sharing-button--reddit {
background-color: #5f99cf
}

.resp-sharing-button--reddit:hover {
background-color: #3a80c1
}

.resp-sharing-button--google {
background-color: #dd4b39
}

.resp-sharing-button--google:hover {
background-color: #c23321
}

.resp-sharing-button--linkedin {
background-color: #0077b5
}

.resp-sharing-button--linkedin:hover {
background-color: #046293
}

.resp-sharing-button--email {
background-color: #777
}

.resp-sharing-button--email:hover {
background-color: #5e5e5e
}

.resp-sharing-button--xing {
background-color: #1a7576
}

.resp-sharing-button--xing:hover {
background-color: #114c4c
}

.resp-sharing-button--whatsapp {
background-color: #25D366
}

.resp-sharing-button--whatsapp:hover {
background-color: #1da851
}

.resp-sharing-button--hackernews {
background-color: #FF6600
}
.resp-sharing-button--hackernews:hover, .resp-sharing-button--hackernews:focus {   background-color: #FB6200 }

.resp-sharing-button--vk {
background-color: #507299
}

.resp-sharing-button--vk:hover {
background-color: #43648c
}

.resp-sharing-button--facebook {
background-color: #3b5998;
border-color: #3b5998;
}

.resp-sharing-button--facebook:hover,
.resp-sharing-button--facebook:active {
background-color: #2d4373;
border-color: #2d4373;
}

.resp-sharing-button--twitter {
background-color: #55acee;
border-color: #55acee;
}

.resp-sharing-button--twitter:hover,
.resp-sharing-button--twitter:active {
background-color: #2795e9;
border-color: #2795e9;
}

.resp-sharing-button--email {
background-color: #777777;
border-color: #777777;
}

.resp-sharing-button--email:hover,
.resp-sharing-button--email:active {
background-color: #5e5e5e;
border-color: #5e5e5e;
}

.resp-sharing-button--linkedin {
background-color: #0077b5;
border-color: #0077b5;
}

.resp-sharing-button--linkedin:hover,
.resp-sharing-button--linkedin:active {
background-color: #046293;
border-color: #046293;
}

.resp-sharing-button--whatsapp {
background-color: #25D366;
border-color: #25D366;
}

.resp-sharing-button--whatsapp:hover,
.resp-sharing-button--whatsapp:active {
background-color: #1DA851;
border-color: #1DA851;
}

</style>

          </head>
  <body>
  <!-- partial:index.partial.html -->
  <div class="bg-white grid place-items-center min-h-screen w-full">
    <h1 class="text-xl m3 p-4 font-bold underline">
      ${resultFor} "${query}".
    </h1>
    <div class=" p-4">
    <!-- Sharingbutton Facebook -->
<a class="resp-sharing-button__link" href="https://facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwebsearch-via-camera.com" target="_blank" rel="noopener" aria-label="">
<div class="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--small"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--circle">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11.5"/><path d="M15.84 9.5H13.5V8.48c0-.53.35-.65.6-.65h1.4v-2.3h-2.35c-2.3 0-2.65 1.7-2.65 2.8V9.5h-2v2h2v7h3v-7h2.1l.24-2z"/></svg>
  </div>
</div>
</a>

<!-- Sharingbutton Twitter -->
<a class="resp-sharing-button__link" href="https://twitter.com/intent/tweet/?text=GPT%20powered%20websearch%20results&amp;url=https%3A%2F%2Fwebsearch-via-camera.com" target="_blank" rel="noopener" aria-label="">
<div class="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--small"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--circle">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.5 7.4l-2 .2c-.4-.5-1-.8-2-.8C13.3 6.8 12 8 12 9.4v.6c-2 0-4-1-5.4-2.7-.2.4-.3.8-.3 1.3 0 1 .4 1.7 1.2 2.2-.5 0-1 0-1.2-.3 0 1.3 1 2.3 2 2.6-.3.4-.7.4-1 0 .2 1.4 1.2 2 2.3 2-1 1-2.5 1.4-4 1 1.3 1 2.7 1.4 4.2 1.4 4.8 0 7.5-4 7.5-7.5v-.4c.5-.4.8-1.5 1.2-2z"/><circle cx="12" cy="12" r="11.5"/></svg>
  </div>
</div>
</a>

<!-- Sharingbutton E-Mail -->
<a class="resp-sharing-button__link" href="mailto:?subject=GPT%20powered%20websearch%20results&amp;body=https%3A%2F%2Fwebsearch-via-camera.com" target="_self" rel="noopener" aria-label="">
<div class="resp-sharing-button resp-sharing-button--email resp-sharing-button--small"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--circle">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19.5 16c0 .8-.7 1.5-1.5 1.5H6c-.8 0-1.5-.7-1.5-1.5V8c0-.8.7-1.5 1.5-1.5h12c.8 0 1.5.7 1.5 1.5v8zm-2-7.5L12 13 6.5 8.5m11 6l-4-2.5m-7 2.5l4-2.5"/><circle cx="12" cy="12" r="11.5"/></svg>
  </div>
</div>
</a>

<!-- Sharingbutton LinkedIn -->
<a class="resp-sharing-button__link" href="https://www.linkedin.com/shareArticle?mini=true&amp;url=https%3A%2F%2Fwebsearch-via-camera.com&amp;title=GPT%20powered%20websearch%20results&amp;summary=GPT%20powered%20websearch%20results&amp;source=https%3A%2F%2Fwebsearch-via-camera.com" target="_blank" rel="noopener" aria-label="">
<div class="resp-sharing-button resp-sharing-button--linkedin resp-sharing-button--small"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--circle">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11.5"/><path d="M15 12.5c-.28 0-.5.22-.5.5v3.5h-3s.03-6.48 0-7h3v.83s.46-.75 1.7-.75c1.56 0 2.3 1.12 2.3 3.3v3.62h-3V13c0-.28-.23-.5-.5-.5zm-7.5-3h2v7h-2z"/><circle cx="8.5" cy="6.5" r="1"/></svg>
  </div>
</div>
</a>

<!-- Sharingbutton WhatsApp -->
<a class="resp-sharing-button__link" href="whatsapp://send?text=GPT%20powered%20websearch%20results%20https%3A%2F%2Fwebsearch-via-camera.com" target="_blank" rel="noopener" aria-label="">
<div class="resp-sharing-button resp-sharing-button--whatsapp resp-sharing-button--small"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--circle">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle xmlns="http://www.w3.org/2000/svg" cx="12" cy="12" r="11.5"/><path stroke-width="1px" d="M17.6 6.2c-1.5-1.5-3.4-2.3-5.5-2.3-4.3 0-7.8 3.5-7.8 7.8 0 1.4.4 2.7 1 3.9l-1.1 4 4.1-1.1c1.1.6 2.4.9 3.7.9 4.3 0 7.8-3.5 7.8-7.8.1-2-.7-3.9-2.2-5.4zm-5.5 11.9c-1.2 0-2.3-.3-3.3-.9l-.2-.1-2.4.6.7-2.4-.2-.2c-.6-1-1-2.2-1-3.4 0-3.6 2.9-6.5 6.5-6.5 1.7 0 3.3.7 4.6 1.9 1.2 1.2 1.9 2.8 1.9 4.6-.1 3.5-3 6.4-6.6 6.4zm3.5-4.8c-.2-.1-1.1-.6-1.3-.6-.2-.1-.3-.1-.4.1-.1.2-.5.6-.6.8-.1.1-.2.1-.4 0s-.8-.3-1.6-1c-.6-.5-1-1.2-1.1-1.3-.1-.2 0-.3.1-.4l.3-.3s.1-.2.2-.3c.1-.1 0-.2 0-.3s-.4-1.1-.6-1.4c-.2-.4-.3-.3-.4-.3h-.4s-.3 0-.5.2-.7.7-.7 1.6c0 1 .7 1.9.8 2s1.4 2.1 3.3 2.9c.5.2.8.3 1.1.4.5.1.9.1 1.2.1.4-.1 1.1-.5 1.3-.9.2-.5.2-.8.1-.9 0-.2-.2-.3-.4-.4z"/></svg>
  </div>
</div>
</a>

    </div>

    <div id="buttons" class="inline-flex divide-x divide-dashed border p-10 rounded">
      <div>
        <button id="knowledgeBtn" onclick="showGPT(' ${query.replace(/'/g, "")} ')" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mx-10">
        ${GPTKnowledge}
        </button>
      </div>
      <div>
        <button onclick="showSummary()"  class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mx-10">
          ${SummarizeBtn}
        </button>
      </div>
      
      
    </div>


    <div id="notif"  style="display:none" class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
    <p class="font-bold">${slow}</p>
    <p class="text-sm">${slowText}</p>
    </div>
    
    <div id="summary" style="display:none">
    <div class="max-w-xl rounded overflow-hidden shadow-lg">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">${SummarizeBtn}: ${query}</div>
        <p id="summaryText" class="text-pretty mb-3  text-gray-700 dark:text-gray-400"></p>
      </div>
    </div>
  </div>

     <div id="gpt" style="display:none">
      <div class="max-w-xl rounded overflow-hidden shadow-lg">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">${GPTKnowledge}: ${query}</div>
          <p id="gptText" class="text-pretty mb-3  text-gray-700 dark:text-gray-400"></p>
        </div>
      </div>
    </div>


    ${resultsPart}
  
    <h6 class="text-sm p-4">${powered}</h6>
  
  </div>
  <!-- partial -->
  
  </body>
  </html>
  `

          return new Response(topHtml, {
              headers: {
                  "content-type": "text/html;charset=UTF-8",
              },
          });


      } else {
          return new Response('Invalid method', {
              status: 405
          });
      }

  },
};
