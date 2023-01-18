import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
  id: "",
  bapteme: "",
  lieuB: "",
  dateB: "",
  numeroB: "",
  parrainB: "",
  suppletionB: "",

  Eucaristie: "",
  lieuEu: "",
  dateEu: "",

  confirmation: "",
  lieuCo: "",
  dateCo: "",

  mariage: false,
  numeroM: "",
  paroisseM: "",
  partenaireM: "",
  lieudateBaptPartenaireM: "",
  numeroBaptPartenaireM: "",
  dateBenedictionM: "",

  Remariage: false,
  lieuDecespartM: "",
  dateDecespartM: "",
  lieuRemariage: "",
  dateRemariage: "",
  numeroRemariage: "",
  partenaireRemariage: "",
  lieudateBaptPartenaireR: "",
  numeroBaptPartenaireR: "",

  consecrationReligieuse: "",
  vocationCR: "",
  dateCR: "",
  lieuCR: "",
  dateVoeux: "",
  lieuVoeux: "",
};
const App = () => {
  const [values, setValues] = useState(initialValues);
  const [identite, setIdentite] = useState([]);
  const [singlePerson, setSinglePerson] = useState({});
  const [identificateur, setIdentificateur] = useState("");







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

  const renderIdentity = identite.map((item, index) =>

    <tr key={index}>
      <td>
        {item.id}
      </td>
      <td>
        {item.prenom}
      </td>
      <td>
        {item.nom}
      </td>
      <td>
        {item.naissance}
      </td>
      <td>
        {item.pere}
      </td>
      <td>
        {item.mere}
      </td>
    </tr>

  );

  async function setMembre() {
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ContractAddress, Diocese.abi, signer);
      setError('');
      setSuccess('');
      try {
        let tx = await contract.setMember(values.nom,
          values.prenom, values.pere, values.mere,
          values.naissance, values.id);
        await tx.wait();
        setSuccess('Enregistrement effectué avec succes !')
      } catch (err) {
        setError("une erreur est survenue lors   de l'enregistrement de type" + err);
        console.log(err.error.data);
      }
    }
  }
  async function getMembre() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(ContractAddress, Diocese.abi, provider);
      try {
        const data = await contract.getInfoById(identificateur);
        setSinglePerson(data);
        console.log(singlePerson.prenom)

      } catch (err) {
        setError("une erreur est survenue de type" + err);
      }
    }
  }
  async function getAllMembre() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(ContractAddress, Diocese.abi, provider);
      try {
        const data = await contract.getAllMember();
        setIdentite(data);

      } catch (err) {
        setError("une erreur est survenue de type" + err);
      }
    }
  }




  return (
    <div className="container">
      <div className="Navbar">
        <span className="paroisse-notre-dame">Paroisse notre dame</span>
        <a className="enregistrer">Enregistrer</a>
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
          
          <span>Identificateur</span>
          <input className="rectangle-1" type="text" name="id"
            value={values.id} onChange={handleInputChange} />
          <span>Prénom</span>
          <input className="rectangle-1" type="text" name="prenom"
            value={values.prenom} onChange={handleInputChange} />
          <span>Nom</span>
          <input className="rectangle-1" type="text" name="nom"
            value={values.nom} onChange={handleInputChange} />
          <span>Né a </span>
          <input className="rectangle-1" type="text" name="naissance"
            value={values.naissance} onChange={handleInputChange} />
          <span>Père</span>
          <input className="rectangle-1" type="text" name="pere"
            value={values.pere} onChange={handleInputChange} />
          <span>Mère</span>
          <input className="rectangle-1" type="text" name="mere"
            value={values.mere} onChange={handleInputChange} />

        </div>
        <div className="flex-container-2">
          <h3>Baptême</h3>
          <span className="lieu">Lieu</span>
          <input className="rectangle-1-1" type="text" name="lieuB"
            value={values.lieuB} onChange={handleInputChange} />
          <span className="date">Date</span>
          <input className="rectangle-1-4" type="text" name="dateB"
            value={values.dateB} onChange={handleInputChange} />
          <span className="n-rg">N. rég</span>
          <input className="rectangle-1-7" type="text" name="numeroB"
            value={values.numeroB} onChange={handleInputChange} />
          <span className="parrain-marr">Parrain (Marr.)</span>
          <input className="rectangle-1-9" type="text" name="parrainB"
            value={values.parrainB} onChange={handleInputChange} />
          <span className="suppletion">Suppletion</span>
          <input className="rectangle-1-12" type="text" name="suppletionB"
            value={values.suppletionB} onChange={handleInputChange} />
        </div>
        <div className="flex-container-4">

          <h3 className="eucharistie">Eucharistie</h3>

          <span className="lieu">Lieu</span>
          <input className="rectangle-1-1" type="text" name="lieuEu"
            value={values.lieuEu} onChange={handleInputChange} />
          <span className="date-1">Date</span>
          <input className="rectangle-1-5" type="text" name="dateEu"
            value={values.dateEu} onChange={handleInputChange} />

          <h3 className="confirmation">Confirmation</h3>
          <span className="lieu-2">Lieu</span>
          <input className="rectangle-1-10" type="text" name="lieuCo"
            value={values.lieuCo} onChange={handleInputChange} />
          <span className="date-2">Date</span>
          <input className="rectangle-1-13" type="text" name="dateCo"
            value={values.dateCo} onChange={handleInputChange} />

        </div>

      </div>

      <h3 className="mariage">Mariage</h3>
      <div className="flex-box2">

        <div className="flex-container-6">
          <span className="paroisse">Paroisse</span>
          <input className="group-17" type="text" name="paroisseM"
            value={values.paroisseM} onChange={handleInputChange} />
          <span className="n-rg-1">N. Rég</span>
          <input className="rectangle-1-14" type="text" name="numeroM"
            value={values.numeroM} onChange={handleInputChange} />
          <span className="avec">Avec</span>
          <input className="rectangle-1-16" type="text" name="partenaireM"
            value={values.partenaireM} onChange={handleInputChange} />
          <span className="bapteme">Bapteme à</span>
          <input className="rectangle-1-18" type="text" name="lieudateBaptPartenaireM"
            value={values.lieudateBaptPartenaireM} onChange={handleInputChange} />
          <span className="n-rg-2">N. Rég</span>
          <input className="rectangle-1-22" type="text" name="numeroBaptPartenaireM"
            value={values.numeroBaptPartenaireM} onChange={handleInputChange} />
          <span>Bénédiction nuptiale</span>
          <input className="rectangle-1-25" type="text" name="dateBenedictionM"
            value={values.dateBenedictionM} onChange={handleInputChange} />
        </div>
        <div className="flex-container-7">
          <span className="dcs-du-de-la-conjoin">
            Décès du (de la) conjoint(e) à
          </span>
          <input className="group-25" type="text" name="lieuDecespartM"
            value={values.lieuDecespartM} onChange={handleInputChange} />
          <span className="date-du-dcs">Date du décès</span>
          <input className="rectangle-1-15" type="text" name="dateDecespartM"
            value={values.dateDecespartM} onChange={handleInputChange} />
          <span className="remariage">Remariage à</span>
          <input className="rectangle-1-17" type="text" name="lieuRemariage"
            value={values.lieuRemariage} onChange={handleInputChange} />
          <span className="date-remariage">Date remariage</span>
          <input className="rectangle-1-19" type="text" name="dateRemariage"
            value={values.dateRemariage} onChange={handleInputChange} />
          <span className="numero">Numero</span>
          <input className="rectangle-1-21" type="text" name="numeroRemariage"
            value={values.numeroRemariage} onChange={handleInputChange} />
          <span className="avec-1">Avec</span>
          <input className="rectangle-1-23" type="text" name="partenaireRemariage"
            value={values.partenaireRemariage} onChange={handleInputChange} />
          <span className="baptme">Baptême à</span>
          <input className="rectangle-1-26" type="text" name="lieudateBaptPartenaireR"
            value={values.lieudateBaptPartenaireR} onChange={handleInputChange} />

        </div>

        <div className="flex-container-8">
          <span className="baptme">Numero</span>
          <input className="rectangle-1-26" type="text" name="numeroBaptPartenaireR"
            value={values.numeroBaptPartenaireR} onChange={handleInputChange} />

        </div>
      </div>

      <h3 className="consecration-religie">Consecration religieuse</h3>
      <div className="flex-box3">
        <div className="flex-container-9">
          <span>Prêtre ordonné le </span>
          <input className="rectangle-1-28" type="text" name="vocationCR"
            value={values.vocationCR} onChange={handleInputChange} />
          <span>Laïc consacré le </span>
          <input className="rectangle-1-30" type="text" />
          <span>A fait ses voeux le</span>
          <input className="rectangle-1-32" type="text" name="dateVoeux"
            value={values.dateVoeux} onChange={handleInputChange} />
        </div>
        <div className="flex-container-10">
          <span className="lieu-3">Lieu</span>
          <input className="rectangle-1-29" type="text" name="lieuCR"
            value={values.lieuCR} onChange={handleInputChange} />
          <span className="lieu-4">Lieu</span>
          <input className="rectangle-1-31" type="text" name="lieuCR"
            value={values.lieuCR} onChange={handleInputChange} />
          <span className="lieu-5">Lieu</span>
          <input className="rectangle-1-33" type="text" name="lieuVoeux"
            value={values.lieuCR} onChange={handleInputChange} />
        </div>
      </div>

      <div className="flex-container-17">
      </div>
      <button onClick={setMembre}>
        inscrire
      </button>
      <div>{success}</div>
      <div>{error}</div>
      <div>
        <button onClick={getMembre}>voir membre</button>
      </div>
      <div id="Tous les membres">
        <button onClick={getAllMembre}>voir tous les membre</button>
        <div>
          <table>
            <tr>
              <th>Id</th>
              <th>
                prenom
              </th>
              <th>
                nom
              </th>
              <th>
                lieu et date de naissance
              </th>
              <th>
                pere
              </th>
              <th>
                mere
              </th>
            </tr>
            {renderIdentity}
          </table>
        </div>
      </div>
      <div id="Rechercher membre">
        <h2>
          Rechercher un membre de paroisse
        </h2>
        <input type="text" value={identificateur} placeholder="Entrer l'identificateur du membre" 
        onChange={(e) => setIdentificateur(e.target.value)} />
        <button onClick={getMembre}>Rechercher </button>

      </div>
    </div>
  );
};
export default App;
