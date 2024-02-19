const { useState, useEffect, useCallback } = React;


const data = [{ id: 0, label: "English" }, { id: 1, label: "Spanish - Español" }, { id: 2, label: "Indonesian - Bahasa Indonesia" }, { id: 3, label: "Greek - Ελληνικά" }];


const results = [
{ href: 'https://websearch-via-camera.com/result/The%20Ten%20Commandments', title: 'The Ten Commandments' },
{ href: 'https://websearch-via-camera.com/result/The%20Book%20of%20Psalms', title: 'The Book of Psalms' },
{ href: 'https://websearch-via-camera.com/result/The%20Quran', title: 'The Quran' }];
const recents = [
    
    { href: 'https://result.websearch-via-camera.com/en/Flying cat illustration', title: 'Flying cat illustration'},
    { href: 'https://result.websearch-via-camera.com/en/Sandwich recipe', title: 'Sandwich recipe'},
    { href: 'https://result.websearch-via-camera.com/en/Freshwater fish', title: 'Freshwater fish'},
    { href: 'https://result.websearch-via-camera.com/en/Sea otter habitat', title: 'Sea otter habitat'},
    { href: 'https://result.websearch-via-camera.com/en/what are the theories of religion', title: 'what are the theories of religion'},
  { href: 'https://result.websearch-via-camera.com/en/Valentine', title: 'Valentine'},
  { href: 'https://result.websearch-via-camera.com/en/Outdoor leisure activities with pets', title: 'Outdoor leisure activities with pets'},
  { href: 'https://result.websearch-via-camera.com/en/Avocado, egg, and bread meal', title: 'Avocado, egg, and bread meal'},
  { href: 'https://result.websearch-via-camera.com/en/Flaky bread recipe', title: 'Flaky bread recipe'},
  { href: 'https://result.websearch-via-camera.com/en/Decorative owl sculpture', title: 'Decorative owl sculpture'},
  { href: 'https://result.websearch-via-camera.com/en/Persian rug designs', title: 'Persian rug designs'}
];

const Dropdown = () => {
  const [isOpen, setOpen] = useState(false);
  const [items, setItem] = useState(data);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newName, setnewName] = useState({ href: 'https://websearch-via-camera.com/result/The%20Ten%20Commandments', title: 'The Ten Commandments' });
  const [newRecent, setnewRecent] = useState(recents[0]);

  let x = document.cookie;
  const parts = x.split(`; lang=`);
  if (parts.length === 2) {
    cLang = parts.pop().split(';').shift();
    if (cLang == 'es') {
      window.location.href = '/es';
      setSelectedItem(1);
    }
    if (cLang == 'id') {
      window.location.href = '/id';
      setSelectedItem(2);
    }
    if (cLang == 'el') {
      window.location.href = '/el';
      setSelectedItem(3);
    }
                           
  }
  let ind2 = 0;
  const shuffle2 = useCallback(() => {
    if (ind2 + 1 >= recents.length) {
      ind2 = 0;
    } else {
      ind2 = ind2 + 1;
    }
    setnewRecent(recents[ind2]);
    }, []);

  let ind = 0;
  const shuffle = useCallback(() => {
    if (ind + 1 >= results.length) {
      ind = 0;
    } else {
      ind = ind + 1;
    }
    setnewName(results[ind]);
  }, []);

  useEffect(() => {
    const intervalID = setInterval(shuffle, 5000);
    return () => clearInterval(intervalID);
  }, [shuffle]);
    
  useEffect(() => {
    const intervalID = setInterval(shuffle2, 2500);
    return () => clearInterval(intervalID);
  }, [shuffle2]);
    
  useEffect(() => {
    const url = "https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-2b706faa-8009-4af8-9ba2-0d52f5a1bed1/default/logger";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json" } });
  }, []);

  const toggleDropdown = () => setOpen(!isOpen);
  const handleItemClick = e => {
    // e.preventDefault()
    let id = e.target.id;
    selectedItem == id ? setSelectedItem(null) : setSelectedItem(id);
    console.log("handleClick");
    if (id == 0) {
    document.cookie = 'lang=en;';
    }
    if (id == 1) {
      window.location.href = '/es';
      document.cookie = 'lang=es;';
    }
    if (id == 2) {
      window.location.href = '/id';
      document.cookie = 'lang=id;';
    }
    if (id == 3) {
      window.location.href = '/el';
      document.cookie = 'lang=el;';
    }
    toggleDropdown();
  };

  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("img", { src: "https://websearch-via-camera.com/logo.png", width: "600", height: "400", alt: "Websearch via camera logo" }), /*#__PURE__*/

    React.createElement("h1", null, "Find what you’re", /*#__PURE__*/React.createElement("br", null) ,"looking for ", /*#__PURE__*/React.createElement("br", null), "with just an image."), /*#__PURE__*/

    React.createElement("div", { className: "dropdown" }, /*#__PURE__*/
    React.createElement("div", { className: "dropdown-header", onClick: toggleDropdown },
    selectedItem ? items.find(item => item.id == selectedItem).label : "Select your language", /*#__PURE__*/
    React.createElement("i", { className: `fa fa-chevron-right icon ${isOpen && "open"}` })), /*#__PURE__*/

    React.createElement("div", { className: `dropdown-body ${isOpen && 'open'}` },
    items.map((item) => /*#__PURE__*/
    React.createElement("div", { className: "dropdown-item", onClick: handleItemClick, id: item.id }, /*#__PURE__*/
    React.createElement("span", { className: `dropdown-item-dot ${item.id == selectedItem && 'selected'}` }, "\u2022 "),
    item.label)))), /*#__PURE__*/

                        
    React.createElement("div", { style: { paddingLeft: 0, paddingTop: 0 } }, "Recent searches: ", /*#__PURE__*/
    React.createElement("a", { href: newRecent.href }, newRecent.title)), /*#__PURE__*/

                        
    React.createElement("a", { style: { textDecoration: 'none' }, href: "camera/" }, /*#__PURE__*/
    React.createElement("div", {
      className: "start" }, /*#__PURE__*/

    React.createElement("div", { style: { padding: '25px 31px 31px', fontWeight: '1200', color: 'white', underline: 'None' } }, " Start"))), /*#__PURE__*/


    React.createElement("h4", null, "Powered by GPT Vision"), /*#__PURE__*/
    React.createElement("a", { href: "https://websearch-via-camera.com/privacy%20policy.html" }, "Privacy Policy"),
                       
    React.createElement("a", { style: { paddingLeft: 100 }, href: "https://websearch-via-camera.com/privacy%20policy.html" }, "Sitemap")));


};

ReactDOM.render( /*#__PURE__*/React.createElement(Dropdown, null), document.getElementById('app'));
