import { useState, useEffect }from "react";
import "./App.css";
import materialSymbolsnote1 from "./assets/materialSymbolsnote1.svg";
import jamwrite from "./assets/jamwrite.svg";
import materialSymbolsnote from "./assets/materialSymbolsnote.svg";
import materialSymbolscont from "./assets/materialSymbolscont.svg";

import { ethers } from "ethers";
import Diocese from "./artifacts/contracts/Diocese.sol/Diocese.json";

let ContractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const initialValues = {
  nom: "",
  prenom: "",
  naissance: "",
  pere: "",
  mere: "",
  id: 1,
  bapteme
};
const App = () => {
  const [values, setValues] = useState(initialValues);









  const [error, setError] = useState('');
  const [errorMotif, setErrorMotif] = useState(''); /* erreur personaliser  */
  const [success, setSuccess] = useState('');
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };
  async function setMembre() {
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ContractAddress, Diocese.abi, signer);
      setError('');
      setSuccess('');
      try {
        let tx = await contract.setMember("Benji", "Sam","Dad","Mum","25/12/1028", 1);
        await tx.wait();
        setSuccess('Enregistrement effectué avec succes !');
      } catch (err) {
        setError("une erreur est survenue lors   de l'enregistrement de type" + err);
        console.log(err.error.data);
      }
    }
  }
  console.log(values.nom)






  return (
    <div className="container">
      <div className="Navbar">
        <span className="paroisse-notre-dame">Paroisse notre dame</span>
        <a href="#" className="enregistrer">Enregistrer</a>
        <img className="material-symbolsnote-1" alt="icone" src={materialSymbolsnote1} />
        <a className="rechercher">Rechercher</a>
        <img className="material-symbolscont" alt="icone" src={materialSymbolscont} />
        <span className="administrer-un-sacre">Administrer un sacrement</span>
        <img className="jamwrite" alt="icone" src={jamwrite} />
      </div>
      <div className="flex-container">
        <img className="material-symbolsnote" alt="icone" src={materialSymbolsnote} />
        <span className="enregistrement-de-me">Enregistrement de membres</span>
      </div>
      <div className="flex-box">
        <div className="flex-container-1">
          <h3 className="identit">Identité</h3>
          <span>Prénom</span>
          <input className="rectangle-1" type="text" name="prenom"
          value={values.prenom} onChange={handleInputChange} />
          <span>Nom</span>
          <input className="rectangle-1" type="text" name="nom"
          value={values.nom} onChange={handleInputChange}/>
          <span>Né a </span>
          <input className="rectangle-1" type="text" name="naissance"
          value={values.naissance} onChange={handleInputChange}/>
          <span>Père</span>
          <input className="rectangle-1" type="text" name="pere"
          value={values.pere} onChange={handleInputChange}/>
          <span>Mère</span>
          <input className="rectangle-1" type="text" name="mere"
          value={values.mere} onChange={handleInputChange}/>

        </div>
        <div className="flex-container-2">
          <h3>Baptême</h3>
          <span className="lieu">Lieu</span>
          <input className="rectangle-1-1" type="text" />
          <span className="date">Date</span>
          <input className="rectangle-1-4" type="text" />
          <span className="n-rg">N. rég</span>
          <input className="rectangle-1-7" type="text" />
          <span className="parrain-marr">Parrain (Marr.)</span>
          <input className="rectangle-1-9" type="text" />
          <span className="suppletion">Suppletion</span>
          <input className="rectangle-1-12" type="text" />
        </div>
        <div className="flex-container-4">

          <h3 className="eucharistie">Eucharistie</h3>

          <span className="lieu">Lieu</span>
          <input className="rectangle-1-1" type="text" />
          <span className="date-1">Date</span>
          <input className="rectangle-1-5" type="text" />

          <h3 className="confirmation">Confirmation</h3>
          <span className="lieu-2">Lieu</span>
          <input className="rectangle-1-10" type="text" />
          <span className="date-2">Date</span>
          <input className="rectangle-1-13" type="text" />

        </div>

      </div>
      
      <h3 className="mariage">Mariage</h3>
      <div className="flex-box2">
        
        <div className="flex-container-6">
          <span className="paroisse">Paroisse</span>
          <input className="group-17" type="text" />
          <span className="n-rg-1">N. Rég</span>
          <input className="rectangle-1-14" type="text" />
          <span className="avec">Avec</span>
          <input className="rectangle-1-16" type="text" />
          <span className="bapteme">Bapteme à</span>
          <input className="rectangle-1-18" type="text" />
          <span className="n-rg-2">N. Rég</span>
          <input className="rectangle-1-22" type="text" />
          <span>Bénédiction nuptiale</span>
          <input className="rectangle-1-25" type="text" />
        </div>
        <div className="flex-container-7">
          <span className="dcs-du-de-la-conjoin">
            Décès du (de la) conjoint(e) à
          </span>
          <input className="group-25" type="text" />
          <span className="date-du-dcs">Date du décès</span>
          <input className="rectangle-1-15" type="text" />
          <span className="remariage">Remariage à</span>
          <input className="rectangle-1-17" type="text" />
          <span className="date-remariage">Date remariage</span>
          <input className="rectangle-1-19" type="text" />
          <span className="numero">Numero</span>
          <input className="rectangle-1-21" type="text" />
          <span className="avec-1">Avec</span>
          <input className="rectangle-1-23" type="text" />
          <span className="baptme">Baptême à</span>
          <input className="rectangle-1-26" type="text" />

        </div>

        <div className="flex-container-8">
          <span className="date-3">Date</span>
          <input className="rectangle-1-20" type="text" />
          <span className="numero-1">Numero</span>
          <input className="rectangle-1-27" type="text" />
        </div>
      </div>
      
      <h3 className="consecration-religie">Consecration religieuse</h3>
      <div className="flex-box3">
        <div className="flex-container-9">
          <span>Prêtre ordonné le </span>
          <input className="rectangle-1-28" type="text" />
          <span>Laïc consacré le </span>
          <input className="rectangle-1-30" type="text" />
          <span>A fait ses voeux le</span>
          <input className="rectangle-1-32" type="text" />
        </div>
        <div className="flex-container-10">
          <span className="lieu-3">Lieu</span>
          <input className="rectangle-1-29" type="text" />
          <span className="lieu-4">Lieu</span>
          <input className="rectangle-1-31" type="text" />
          <span className="lieu-5">Lieu</span>
          <input className="rectangle-1-33" type="text" />
        </div>
      </div>
      
      <div className="flex-container-17">
      </div>
      <button onClick={setMembre}>
        inscrire
      </button>
      <div>{success}</div>
      <div>{error}</div>
    </div>
  );
};
export default App;
