// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.7;
contract Diocese {
    struct membre{
        uint id;
        string nom;
        string prenom;
        string pere;
        string mere;
        string naissance;
        address paroisse;
    }
    struct sacrement{
        bool bapteme;
        string lieuB;
        string dateB;
        string numeroB;
        string parrainB;
        string suppletionB;

        bool Eucaristie;
        string lieuEu;
        string dateEu;

        bool confirmation;
        string lieuCo;
        string dateCo;

        bool mariage;
        string numeroM;
        string paroisseM;
        string partenaireM;
        string lieudateBaptPartenaireM;
        string numeroBaptPartenaireM;
        string dateBenedictionM;

        string lieuDecespartM;
        string dateDecespartM;
        string lieuRemariage;
        string dateRemariage;
        string numeroRemariage;
        string partenaireRemariage;
        string lieudateBaptPartenaireR;
        string numeroBaptPartenaireR;

        bool consecrationReligieuse;
        string vocationCR;
        string dateCR;
        string lieuCR;
        string dateVoeux;
        string lieuVoeux;


    }
    membre [] public Members;
    sacrement [] internal Sacrement;
    mapping(uint => membre) Membre;
    address paroisse1;
    address paroisse2;
    address paroisse3;
    address paroisse4;
    address paroisse5;
    address paroisse6;
    address paroisse7;
    address paroisse8;
    address paroisse9;
    address paroisse10;
    uint MemberSize=0;
    modifier OnlyParoisse() {
        require(
            msg.sender == paroisse1 || msg.sender == paroisse2 || msg.sender == paroisse3 ||
            msg.sender == paroisse4 || msg.sender == paroisse5 || msg.sender == paroisse6 ||
            msg.sender == paroisse7 || msg.sender == paroisse8 || msg.sender == paroisse9 ||
            msg.sender == paroisse10 ,
            "Seule une paroisse du Diocese du saint sacrement peut acceder a ce registre"
        );
        _;
    }

    constructor() {
        paroisse1 = msg.sender;
        paroisse2 = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8;
        paroisse3 = 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC;
        /*
        paroisse4 = 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB;
        paroisse5 = 0x617F2E2fD72FD9D5503197092aC168c91465E7f2;
        paroisse6 = 0x17F6AD8Ef982297579C203069C1DbfFE4348c372;
        paroisse7 = 0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678;
        paroisse8 = 0x03C6FcED478cBbC9a4FAB34eF9f40767739D1Ff7;
        paroisse9 = 0x1aE0EA34a72D944a8C7603FfB3eC30a6669E454C;*/



    }

    function setMember (string memory _nom, string memory prenom,
                        string memory pere,string memory mere, string memory naissance, uint id) public OnlyParoisse{
        address paroisse = msg.sender;
        Members.push(membre(id, _nom, prenom,pere,mere,naissance,paroisse));
    }

    function quickSetMember (string memory _nom) public OnlyParoisse{
        address paroisse = msg.sender;
        Members.push(membre(1, _nom, "Sam","Dad","Mum","25/12/1028", paroisse));
    }

    function getInfoById (uint id) public OnlyParoisse view returns(membre memory){
        if(Members[id].paroisse == msg.sender) {
            return Members[id];
        }
    }

    function getAllMember () public OnlyParoisse view returns(membre [] memory) {
       
            return Members;
        
    }

}