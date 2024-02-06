const { useState, useEffect, useCallback } = React;


const data = [{ id: 0, label: "English" }, { id: 1, label: "Spanish - Español" }, { id: 2, label: "Indonesian - Bahasa Indonesia" }, { id: 3, label: "Greek - Ελληνικά" }];


const results = [
{ href: 'https://websearch-via-camera.com/result/The%20Ten%20Commandments', title: 'The Ten Commandments' },
{ href: 'https://websearch-via-camera.com/result/The%20Book%20of%20Psalms', title: 'The Book of Psalms' },
{ href: 'https://websearch-via-camera.com/result/The%20Quran', title: 'The Quran' }];
// const results = [
//     { href: 'https://websearch-via-camera.com/The%20Ten%20Commandments', title: 'The Ten Commandments'}, { href: '#', title: 'The Psalms'},{ href: '#', title: 'The Quran'},
// ]

const Dropdown = () => {
  const [isOpen, setOpen] = useState(false);
  const [items, setItem] = useState(data);
  const [selectedItem, setSelectedItem] = useState(null);
  let x = document.cookie;
  const parts = x.split(`; lang=`);
  if (parts.length === 2) {console.log(parts.pop().split(';').shift());
  }

  const [newName, setnewName] = useState({ href: 'https://websearch-via-camera.com/result/The%20Ten%20Commandments', title: 'The Ten Commandments' });
  let ind = 0;
  const shuffle = useCallback(() => {
    if (ind + 1 >= results.length) {
      ind = 0;
      setnewName(results[0]);
    } else {
      setnewName(results[ind + 1]);
      ind = ind + 1;
    }
  }, []);

  useEffect(() => {
    const intervalID = setInterval(shuffle, 3000);
    return () => clearInterval(intervalID);
  }, [shuffle]);


  const toggleDropdown = () => setOpen(!isOpen);
  const handleItemClick = e => {
    // e.preventDefault()
    let id = e.target.id;
    selectedItem == id ? setSelectedItem(null) : setSelectedItem(id);

    document.cookie = 'lang=en;';
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
    React.createElement("h1", null, "Search the Web ", /*#__PURE__*/React.createElement("br", null), "via your camera"), /*#__PURE__*/

    React.createElement("h4", null, "Powered by GPT Vision"), /*#__PURE__*/
    React.createElement("div", { className: "dropdown" }, /*#__PURE__*/
    React.createElement("div", { className: "dropdown-header", onClick: toggleDropdown },
    selectedItem ? items.find(item => item.id == selectedItem).label : "Select your language", /*#__PURE__*/
    React.createElement("i", { className: `fa fa-chevron-right icon ${isOpen && "open"}` })), /*#__PURE__*/

    React.createElement("div", { className: `dropdown-body ${isOpen && 'open'}` },
    items.map((item) => /*#__PURE__*/
    React.createElement("div", { className: "dropdown-item", onClick: handleItemClick, id: item.id }, /*#__PURE__*/
    React.createElement("span", { className: `dropdown-item-dot ${item.id == selectedItem && 'selected'}` }, "\u2022 "),
    item.label)))), /*#__PURE__*/





    React.createElement("div", { style: { padding: '25px', paddingLeft: 0 } }, "Example results: ", /*#__PURE__*/

    React.createElement("a", { href: newName.href }, newName.title)), /*#__PURE__*/

    React.createElement("a", { style: { textDecoration: 'none' }, href: "page.html" }, /*#__PURE__*/
    React.createElement("div", {
      className: "start" }, /*#__PURE__*/

    React.createElement("div", { style: { padding: '25px 31px 31px', fontWeight: '1200', color: 'white', underline: 'None' } }, " Start"))), /*#__PURE__*/




    React.createElement("div", { style: { padding: '110px' } }, /*#__PURE__*/
    React.createElement("a", { href: "https://websearch-via-camera.com/privacy%20policy.html" }, "Privacy Policy"))));



};

ReactDOM.render( /*#__PURE__*/React.createElement(Dropdown, null), document.getElementById('app'));
