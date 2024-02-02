const { useState, useEffect, useCallback } = React;


const data = [{ id: 0, label: "Αγγλικά" }, { id: 1, label: "Ισπανικά" }, { id: 2, label: "Ινδονησιακά" }, { id: 3, label: "Ελληνικά" }];

const results = [
{ href: 'https://result.websearch-via-camera.com/%CE%9F%CE%B9%20%CE%B4%CE%AD%CE%BA%CE%B1%20%CE%B5%CE%BD%CF%84%CE%BF%CE%BB%CE%AD%CF%82', title: 'Οι δέκα εντολές' }];

// const results = [
//     { href: 'https://websearch-via-camera.com/The%20Ten%20Commandments', title: 'The Ten Commandments'}, { href: '#', title: 'The Psalms'},{ href: '#', title: 'The Quran'},
// ]

const Dropdown = () => {
  const [isOpen, setOpen] = useState(false);
  const [items, setItem] = useState(data);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newName, setnewName] = useState({ href: '#', title: ' ' });

  const shuffle = useCallback(() => {
    const index = Math.floor(Math.random() * results.length);
    setnewName(results[index]);
  }, []);

  useEffect(() => {
    const intervalID = setInterval(shuffle, 2000);
    return () => clearInterval(intervalID);
  }, [shuffle]);


  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = id => {
    selectedItem == id ? setSelectedItem(null) : setSelectedItem(id);
    if (id == 0) {
      window.location.href = 'https://websearch-via-camera.com';
    }
    if (id == 2) {
      window.location.href = 'https://websearch-via-camera.com/id';
    }
    if (id == 1) {
      window.location.href = 'https://websearch-via-camera.com/es';
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
