const { useState, useEffect, useCallback } = React;


const data = [{ id: 0, label: "Bahasa inggris - English" }, { id: 1, label: "Orang Spanyol - Español" }, { id: 2, label: "Bahasa Indonesia" }, { id: 3, label: "Orang yunani - Ελληνικά" }];

const results = [
{ href: 'https://result.websearch-via-camera.com/id/Sepuluh%20Perintah%20Allah', title: 'Sepuluh Perintah Allah' }, 
  { href: 'https://result.websearch-via-camera.com/id/kitab%20mazmur', title: 'kitab mazmur'},
  { href: 'https://result.websearch-via-camera.com/id/Al-Quran', title: 'Al-Quran'}
];

// const results = [
//     { href: 'https://websearch-via-camera.com/The%20Ten%20Commandments', title: 'The Ten Commandments'}, { href: 'https://result.websearch-via-camera.com/es/el%20libro%20de%20los%20salmos', title: 'el libro de los salmos'},{ href: 'https://result.websearch-via-camera.com/id/Al-Qur'an', title: 'Al-Qur'an'},
// ]

const Dropdown = () => {
  const [isOpen, setOpen] = useState(false);
  const [items, setItem] = useState(data);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newName, setnewName] = useState({ href: '#', title: ' ' });
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
    if (id == 0) {
      window.location.href = 'https://websearch-via-camera.com';
    } 
    if (id == 1) {
      window.location.href = 'https://websearch-via-camera.com/es';
    } 
    if (id == 3) {
      window.location.href = 'https://websearch-via-camera.com/el';
    }
    toggleDropdown();
  };

  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("h1", null, "Cari di Web ", /*#__PURE__*/React.createElement("br", null), "melalui kamera Anda"), /*#__PURE__*/

    React.createElement("h4", null, "Dikembangkan oleh Visi GPT"), /*#__PURE__*/
    React.createElement("div", { className: "dropdown" }, /*#__PURE__*/
    React.createElement("div", { className: "dropdown-header", onClick: toggleDropdown },
    selectedItem ? items.find(item => item.id == selectedItem).label : "Pilih bahasamu", /*#__PURE__*/
    React.createElement("i", { className: `fa fa-chevron-right icon ${isOpen && "open"}` })), /*#__PURE__*/

    React.createElement("div", { className: `dropdown-body ${isOpen && 'open'}` },
    items.map((item) => /*#__PURE__*/
    React.createElement("div", { className: "dropdown-item", onClick: e => handleItemClick(e.target.id), id: item.id }, /*#__PURE__*/
    React.createElement("span", { className: `dropdown-item-dot ${item.id == selectedItem && 'selected'}` }, "\u2022 "),
    item.label)))), /*#__PURE__*/





    React.createElement("div", { style: { padding: '25px', paddingLeft: 0 } }, "Contoh hasil: ", /*#__PURE__*/

    React.createElement("a", { href: newName.href }, newName.title)), /*#__PURE__*/

    React.createElement("a", { style: { textDecoration: 'none' }, href: "page.html" }, /*#__PURE__*/
    React.createElement("div", {
      className: "start" }, /*#__PURE__*/

    React.createElement("div", { style: { padding: '25px 31px 31px', fontWeight: '1200', color: 'white', underline: 'None' } }, "Mulai"))), /*#__PURE__*/




    React.createElement("div", { style: { padding: '110px' } }, /*#__PURE__*/
    React.createElement("a", { href: "https://websearch-via-camera.com/privacy%20policy.html" }, "Kebijakan pribadi"))));



};

ReactDOM.render( /*#__PURE__*/React.createElement(Dropdown, null), document.getElementById('app'));
