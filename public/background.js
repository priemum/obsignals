const url = "https://painel.obsignals.com/api";

const fetchPlatform = (async() => fetch(`${url}/get/platformas`).then(response => response.json()).then(data => data))()

// eslint-disable-next-line no-undef
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
     fetchPlatform.then((platforms) => {
        if (changeInfo.status !== 'complete') {
            return 
         }
         platforms.plataformas.map((item) => {
            const atributeRedirect = item.atributo_redirecionamento
            const code = item.codigo
            const atribute = `${atributeRedirect}=${code}`
            const domain = item.dominio
            if (tab.url.includes(domain) && !tab.url.includes(atribute)) {
                changeUrl(atribute)
            }
         })
    })

    function changeUrl(atribute){
        // eslint-disable-next-line no-undef
        chrome.tabs.query({currentWindow: true, active: true}, (tab) => {
            const url = tab[0].url
            // eslint-disable-next-line no-undef
            chrome.tabs.update(tab.id, {
                url: `${url}?${atribute}`
            });
        });
    }
})

// eslint-disable-next-line no-undef
chrome.action.onClicked.addListener(async(tab) => {
  // eslint-disable-next-line no-undef
  chrome.tabs.create({
      url: "index.html",
  });
});