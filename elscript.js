const { useState, useEffect, useCallback } = React;


const data = [{ id: 0, label: "Αγγλικά - English" }, { id: 1, label: "Ισπανικά - Español" }, { id: 2, label: "Ινδονησιακά - Bahasa Indonesia" }, { id: 3, label: "Ελληνικά" }];

const results = [
{ href: 'https://result.websearch-via-camera.com/el/%CE%9F%CE%B9%20%CE%B4%CE%AD%CE%BA%CE%B1%20%CE%B5%CE%BD%CF%84%CE%BF%CE%BB%CE%AD%CF%82', title: 'Οι δέκα εντολές' },
{ href: 'https://result.websearch-via-camera.com/el/%CF%84%CE%BF%20%CE%B2%CE%B9%CE%B2%CE%BB%CE%AF%CE%BF%20%CF%84%CF%89%CE%BD%20%CF%88%CE%B1%CE%BB%CE%BC%CF%8E%CE%BD', title: 'το βιβλίο των ψαλμών'},
{ href: 'https://result.websearch-via-camera.com/el/%CF%84%CE%BF%20%CE%BA%CE%BF%CF%81%CE%AC%CE%BD%CE%B9', title: 'το κοράνι'}];


// const results = [
//     { href: 'https://websearch-via-camera.com/The%20Ten%20Commandments', title: 'The Ten Commandments'}, { href: '#', title: 'The Psalms'},{ href: '#', title: 'The Quran'},
// ]

const Dropdown = () => {
  const [isOpen, setOpen] = useState(false);
  const [items, setItem] = useState(data);
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(()=>{    
  let x = document.cookie;
  const parts = x.split(`; lang=`);
  if (parts.length === 2) {
    cLang = parts.pop().split(';').shift();
    if (cLang == 'en') {
      window.location.href = 'https://websearch-via-camera.com';
      setSelectedItem(0);
    }
    if (cLang == 'es') {
      window.location.href = '/es';
      setSelectedItem(1);
    }
    if (cLang == 'id') {
      window.location.href = '/id';
      setSelectedItem(2);
    }
    if (cLang == 'el') {
      setSelectedItem(3);
    }
  }
    }, [])
  const [newName, setnewName] = useState(results[0]);
  let ind = 0;
  const shuffle = useCallback(() => {
    if (ind + 1 >= results.length){
      ind = 0
      setnewName(results[0]);
    } else {
      setnewName(results[ind+1]);
      ind = ind + 1;
    }
  }, []);

  useEffect(() => {
    const intervalID = setInterval(shuffle, 3000);
    return () => clearInterval(intervalID);
  }, [shuffle]);


  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = id => {
    selectedItem == id ? setSelectedItem(null) : setSelectedItem(id);
    if (id == 0){
    document.cookie = 'lang=en;';
    window.location.href = 'https://websearch-via-camera.com';
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
      document.cookie = 'lang=el;';
    }

    toggleDropdown();
  };

  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("h1", null, "\u0391\u03BD\u03B1\u03B6\u03AE\u03C4\u03B7\u03C3\u03B7 \u03C3\u03C4\u03BF\u03BD \u0399\u03C3\u03C4\u03CC ", /*#__PURE__*/React.createElement("br", null), "\u03BC\u03AD\u03C3\u03C9 \u03C4\u03B7\u03C2 \u03BA\u03AC\u03BC\u03B5\u03C1\u03B1\u03C2 \u03C3\u03B1\u03C2"), /*#__PURE__*/

    React.createElement("h4", null, "\u039C\u03B5 \u03C4\u03B7\u03BD \u03C5\u03C0\u03BF\u03C3\u03C4\u03AE\u03C1\u03B9\u03BE\u03B7 \u03C4\u03BF\u03C5 GPT Vision"), /*#__PURE__*/
    React.createElement("div", { className: "dropdown" }, /*#__PURE__*/
    React.createElement("div", { className: "dropdown-header", onClick: toggleDropdown },
    selectedItem ? items.find(item => item.id == selectedItem).label : "Επιλέξτε την γλώσσα σας", /*#__PURE__*/
    React.createElement("i", { className: `fa fa-chevron-right icon ${isOpen && "open"}` })), /*#__PURE__*/

    React.createElement("div", { className: `dropdown-body ${isOpen && 'open'}` },
    items.map((item) => /*#__PURE__*/
    React.createElement("div", { className: "dropdown-item", onClick: e => handleItemClick(e.target.id), id: item.id }, /*#__PURE__*/
    React.createElement("span", { className: `dropdown-item-dot ${item.id == selectedItem && 'selected'}` }, "\u2022 "),
    item.label)))), /*#__PURE__*/





    React.createElement("div", { style: { padding: '25px', paddingLeft: 0 } }, "\u03A0\u03B1\u03C1\u03B1\u03B4\u03B5\u03AF\u03B3\u03BC\u03B1\u03C4\u03B1 \u03B1\u03C0\u03BF\u03C4\u03B5\u03BB\u03B5\u03C3\u03BC\u03AC\u03C4\u03C9\u03BD: ", /*#__PURE__*/

    React.createElement("a", { href: newName.href }, newName.title)), /*#__PURE__*/

    React.createElement("a", { style: { textDecoration: 'none' }, href: "page.html" }, /*#__PURE__*/
    React.createElement("div", {
      className: "start" }, /*#__PURE__*/

    React.createElement("div", { style: { padding: '25px 31px 31px', fontWeight: '1200', color: 'white', underline: 'None' } }, "\u0391\u03C1\u03C7\u03AE"))), /*#__PURE__*/




    React.createElement("div", { style: { padding: '110px' } }, /*#__PURE__*/
    React.createElement("a", { href: "https://websearch-via-camera.com/privacy%20policy.html" }, "\u03A0\u03BF\u03BB\u03B9\u03C4\u03B9\u03BA\u03AE \u0391\u03C0\u03BF\u03C1\u03C1\u03AE\u03C4\u03BF\u03C5"))));



};

ReactDOM.render( /*#__PURE__*/React.createElement(Dropdown, null), document.getElementById('app'));
