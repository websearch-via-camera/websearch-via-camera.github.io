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
      let ogImage = "";

      const lang = pathParts[0]
      const query = pathParts[1]
  
      let tryText = "Try Websearch via camera"
      let resultFor = "Results for"
      let slow = "Slow, please wait."
      let slowText = "GPT is doing work. This takes upto two minutes. The result will appear below!"
      let GPTKnowledge = "GPT knowledge"
      let SummarizeBtn = "Summarize results"
      let powered = "Powered by GPT."
      let apiurlsummary = "https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-2b706faa-8009-4af8-9ba2-0d52f5a1bed1/default/doSummary";
      if(lang == 'es') {
          tryText = "Pruebe la búsqueda web a través de la cámara"
          slow = "Lento, por favor espera."
          slowText = "GPT está trabajando. Esto lleva hasta dos minutos. ¡El resultado aparecerá a continuación!"
          GPTKnowledge = "Conocimiento GPT"
          SummarizeBtn = "Resumir resultados"
          resultFor = "resultados para"
          powered = "Desarrollado por GPT."
          apiurlsummary = 'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-2b706faa-8009-4af8-9ba2-0d52f5a1bed1/default/doEsSummary'
      }
      if(lang == 'el') {
           tryText = "Δοκιμάστε την Αναζήτηση στο Web μέσω κάμερας"
          slow = "Σιγά, παρακαλώ περιμένετε."
          slowText = "Το GPT κάνει δουλειά. Αυτό διαρκεί έως και δύο λεπτά. Το αποτέλεσμα θα εμφανιστεί παρακάτω!"
          GPTKnowledge = "Γνώση GPT"
          SummarizeBtn = "Συνοψίστε τα αποτελέσματα"
          resultFor = "Αποτελέσματα για"
          powered = "Με την υποστήριξη του GPT."
          apiurlsummary = 'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-2b706faa-8009-4af8-9ba2-0d52f5a1bed1/default/doElSummary'
      }
      if(lang == 'id') {
          tryText = "Coba Penelusuran Web melalui kamera"
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
          let photosPart = `<div style="background-color: #333;  overflow: auto;  white-space: nowrap;  padding: 10px;">   `
          const results = await gatherResponse(response);
          const json = JSON.parse(results);
          //console.log(json.images?.value[0]);
          ogImage = json.images?.value[0]?.thumbnailUrl;
          for(var i = 0; i < Math.min(4,json.images?.value.length); i++) {
            let contentUrl = json.images?.value[i]?.contentUrl;
            let followUrl = json.images?.value[i]?.hostPageUrl;
            let name = json.images?.value[i]?.hostPageDisplayUrl;
            let thumbnailUrl = json.images?.value[i]?.thumbnailUrl;
            let width = json.images?.value[i]?.thumbnail.width;
            let height = json.images?.value[i]?.thumbnail.height;
            //console.log([contentUrl,followUrl,name ,thumbnailUrl,width, height])
              let template = `<a href="${contentUrl}"><img  alt="${query}" style="padding: 10px;" width=${width} height=${height} src="${thumbnailUrl}"/>
              </a>`;
              photosPart += template;
          }
          photosPart += `</div>`
          if (!ogImage) photosPart=``

          for(var i = 0; i < json.webPages?.value.length; i++) {
              let name = json.webPages?.value[i]?.name;
              let followUrl = json.webPages?.value[i]?.url;
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
        <a href="${followUrl}" class="text-sm leading-none underline text-blue-600 hover:text-blue-800 visited:text-purple-600">${displayUrl}</a>

      </div>
    </div>
  </div>
</div>`;
              resultsPart += template;

          }

          const topHtml = `<!DOCTYPE html>
  <html lang="${lang}" itemscope="" itemtype="http://schema.org/WebPage" >
  <head>
    <meta charset="UTF-8">
    <meta content="https://websearch-via-camera.com/logo.png" itemprop="image">

     <meta name="viewport" content="width=device-width">
     <title>${query} - Websearch via camera</title>

     <meta property="og:title" content="${query}">
     <meta property="og:site_name" content="Websearch via camera">
     <meta property="og:url" content="https://result.websearch-via-camera.com/${lang}/${query}">

     <meta property="og:type" content="article">
     <meta property="og:image" content="${ogImage}">
     <meta property="fb:app_id" content="382707904455456">


<script type="application/ld+json">
{
"@context":"http://schema.org",
"@graph":[
  {
     "@type":"Article",
     "image":{
        "@type":"ImageObject",
        "url":"${ogImage}"
     },
     "inLanguage":"en-us",
     "mainEntityOfPage":"https://result.websearch-via-camera.com/${lang}/${query}",
     "name":"${query}",
     "publisher":{
        "@id":"https://websearch-via-camera.com#creator"
     },
     "url":"https://result.websearch-via-camera.com/${lang}/${query}"
  },
  {
     "@id":"https://websearch-via-camera.com#creator",
     "@type":"WebSite",
     "image":{
        "@type":"ImageObject",
        "height":"316",
        "url":"https://websearch-via-camera.com/logo.png",
        "width":"474"
     },
     "inLanguage":"${lang}",
     "name":"Websearch via camera",
     "url":"https://websearch-via-camera.com"
  },
  {
     "@type":"BreadcrumbList",
     "description":"Breadcrumbs list",
     "itemListElement":[
        {
           "@type":"ListItem",
           "item":"https://websearch-via-camera.com",
           "name":"Search",
           "position":1
        },
        {
           "@type":"ListItem",
           "item":"https://result.websearch-via-camera.com/${lang}/${query}",
           "name":"${query}",
           "position":2
        }
     ],
     "name":"Breadcrumbs"
  }
]
}
</script>


     <link href="https://websearch-via-camera.com/output.css" rel="stylesheet">


 <meta name="robots" content="noindex">


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

  <style>.resp-sharing-button__link,
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
<div class="bg-white grid place-items-center min-h-screen w-full">

          </head>
  <body>
  <header style="display: flex; justify-content: center;">
        <a href="https://websearch-via-camera.com">
        <img src="https://websearch-via-camera.com/logo.png" style="max-width:100%;" width="600" height="400" alt="Websearch via camera logo"></a>
  </header>
  <div style="
    justify-content: center;
    display: flex;
    justify-content: center;
">
<a href="https://websearch-via-camera.com/${lang}" target="_blank">
              <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                ${tryText}
              </button>
           </a></div>
  <!-- partial:index.partial.html -->
  <a href="https://result.websearch-via-camera.com/${lang}/${query}">
    <h1 style="color: crimson;" class="text-xl m3 p-4 font-bold underline">
      ${resultFor} "${query}".
    </h1>
    </a>
    <div class=" p-4">

    <!-- Sharingbutton E-Mail -->
    <a class="resp-sharing-button__link" href="mailto:?subject=Websearch%20via%20camera%20is%20a%20new%20way%20to%20Search!&amp;body=https%3A%2F%2Fwebsearch-via-camera.com" target="_self" rel="noopener" aria-label="E-Mail">
      <div class="resp-sharing-button resp-sharing-button--email resp-sharing-button--medium"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--normal">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.5 18c0 .8-.7 1.5-1.5 1.5H2c-.8 0-1.5-.7-1.5-1.5V6c0-.8.7-1.5 1.5-1.5h20c.8 0 1.5.7 1.5 1.5v12zm-3-9.5L12 14 3.5 8.5m0 7.5L7 14m13.5 2L17 14"/></svg></div>E-Mail</div>
    </a>
    
    <!-- Sharingbutton LinkedIn -->
    <a class="resp-sharing-button__link" href="https://www.linkedin.com/shareArticle?mini=true&amp;url=https%3A%2F%2Fwebsearch-via-camera.com&amp;title=Websearch%20via%20camera%20is%20a%20new%20way%20to%20Search!&amp;summary=Websearch%20via%20camera%20is%20a%20new%20way%20to%20Search!&amp;source=https%3A%2F%2Fwebsearch-via-camera.com" target="_blank" rel="noopener" aria-label="LinkedIn">
      <div class="resp-sharing-button resp-sharing-button--linkedin resp-sharing-button--medium"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--normal">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 21.5h-5v-13h5v13zM4 6.5h-.04c-1.5 0-2.5-1.18-2.5-2.48 0-1.33 1.02-2.4 2.56-2.4s2.5 1.1 2.52 2.43c0 1.3-.98 2.45-2.55 2.45zm11.5 6c-1.1 0-2 .9-2 2v7h-5s.06-12 0-13h5V10s1.55-1.46 3.94-1.46c2.96 0 5.06 2.15 5.06 6.3v6.66h-5v-7c0-1.1-.9-2-2-2z"/></svg></div>LinkedIn</div>
    </a>
    
    <!-- Sharingbutton WhatsApp -->
    <a class="resp-sharing-button__link" href="whatsapp://send?text=Websearch%20via%20camera%20is%20a%20new%20way%20to%20Search!%20https%3A%2F%2Fwebsearch-via-camera.com" target="_blank" rel="noopener" aria-label="WhatsApp">
      <div class="resp-sharing-button resp-sharing-button--whatsapp resp-sharing-button--medium"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--normal">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path stroke-width="1px" d="M20.1 3.9C17.9 1.7 15 .5 12 .5 5.8.5.7 5.6.7 11.9c0 2 .5 3.9 1.5 5.6L.6 23.4l6-1.6c1.6.9 3.5 1.3 5.4 1.3 6.3 0 11.4-5.1 11.4-11.4-.1-2.8-1.2-5.7-3.3-7.8zM12 21.4c-1.7 0-3.3-.5-4.8-1.3l-.4-.2-3.5 1 1-3.4L4 17c-1-1.5-1.4-3.2-1.4-5.1 0-5.2 4.2-9.4 9.4-9.4 2.5 0 4.9 1 6.7 2.8 1.8 1.8 2.8 4.2 2.8 6.7-.1 5.2-4.3 9.4-9.5 9.4zm5.1-7.1c-.3-.1-1.7-.9-1.9-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1s-1.2-.5-2.3-1.4c-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6s.3-.3.4-.5c.2-.1.3-.3.4-.5.1-.2 0-.4 0-.5C10 9 9.3 7.6 9 7c-.1-.4-.4-.3-.5-.3h-.6s-.4.1-.7.3c-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.3-.3-.4-.6-.5z"/></svg></div>WhatsApp</div>
    </a>
    

    </div>
    
    ${photosPart}

    <div id="buttons" class="inline-flex divide-x divide-dashed border p-10 rounded">
      <div>
        <button id="knowledgeBtn" onclick="showGPT(' ${query.replace(/'/g, "")} ')" style="background-color: #1d4ed8;color: white;" class="hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mx-10">
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
