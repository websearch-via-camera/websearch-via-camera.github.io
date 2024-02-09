const { useState, useEffect, useCallback } = React;


const data = [{ id: 0, label: "Inglés - English" }, { id: 1, label: "Español" }, { id: 2, label: "Indonesio - Bahasa Indonesia" }, { id: 3, label: "Griego" }];

const results = [
{ href: 'https://result.websearch-via-camera.com/es/Los%20diez%20Mandamientos', title: 'Los diez Mandamientos' }, { href: 'https://result.websearch-via-camera.com/es/el%20libro%20de%20los%20salmos', title: 'el libro de los salmos'},{ href: 'https://result.websearch-via-camera.com/es/El corán', title: 'El corán'}];

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
      console.log("here");
      setSelectedItem(1);
      console.log("here2");
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
    React.createElement("h1", null, "Busque en la web ", /*#__PURE__*/React.createElement("br", null), "a trav\xE9s de su c\xE1mara"), /*#__PURE__*/

    React.createElement("h4", null, "Desarrollado por GPT Visi\xF3n"), /*#__PURE__*/
    React.createElement("div", { className: "dropdown" }, /*#__PURE__*/
    React.createElement("div", { className: "dropdown-header", onClick: toggleDropdown },
    selectedItem ? items.find(item => item.id == selectedItem).label : "elige tu idioma", /*#__PURE__*/
    React.createElement("i", { className: `fa fa-chevron-right icon ${isOpen && "open"}` })), /*#__PURE__*/

    React.createElement("div", { className: `dropdown-body ${isOpen && 'open'}` },
    items.map((item) => /*#__PURE__*/
    React.createElement("div", { className: "dropdown-item", onClick: e => handleItemClick(e.target.id), id: item.id }, /*#__PURE__*/
    React.createElement("span", { className: `dropdown-item-dot ${item.id == selectedItem && 'selected'}` }, "\u2022 "),
    item.label)))), /*#__PURE__*/





    React.createElement("div", { style: { padding: '25px', paddingLeft: 0 } }, "Resultados de ejemplo: ", /*#__PURE__*/

    React.createElement("a", { href: newName.href }, newName.title)), /*#__PURE__*/

    React.createElement("a", { style: { textDecoration: 'none' }, href: "/camera/es" }, /*#__PURE__*/
    React.createElement("div", {
      className: "start" }, /*#__PURE__*/

    React.createElement("div", { style: { padding: '25px 15px 31px', fontWeight: '1200', color: 'white', underline: 'None' } }, "Comenzar"))), /*#__PURE__*/




    React.createElement("div", { style: { padding: '110px' } }, /*#__PURE__*/

    React.createElement("a", { href: "https://websearch-via-camera.com/privacy%20policy.html" }, "pol\xEDtica de privacidad")), /*#__PURE__*/

    React.createElement("img", { src: "https://logs-01.loggly.com/inputs/8d9d949e-8908-4525-9085-6039883fbb55/tag/ESPANOLhomepage/1*1.gif" })));


};

ReactDOM.render( /*#__PURE__*/React.createElement(Dropdown, null), document.getElementById('app'));
