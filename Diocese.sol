pragma solidity 0.8.7;
contract Diocese {
    struct membre{
        uint id;
        string nom;
        string prenom;
        string pere;
        string mere;
        string dateN;
        string lieuN;
        string parain;
        uint age;
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
        string lieuBaptPartenaireM;
        string dateBaptPartenaireM;
        string numeroBaptPartenaireM;
        string dateBenedictionM;

        string lieuDecespartM;
        string dateDecespartM;
        string lieuRemariage;
        string dateRemariage;
        string numeroRemariage;
        string partenaireRemariage;
        string lieuBaptPartenaireR;
        string dateBaptPartenaireR;
        string numeroBaptPartenaireR;

        bool consecrationReligieuse;
        string vocationCR;
        string dateCR;
        string lieuCR;
        string dateVoeux;
        string lieuVoeux;


    }
    membre[] public Members;
    sacrement[] internal Sacrement;
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
        paroisse2 = 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2;
        paroisse3 = 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db;
        paroisse4 = 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB;
        paroisse5 = 0x617F2E2fD72FD9D5503197092aC168c91465E7f2;
        paroisse6 = 0x17F6AD8Ef982297579C203069C1DbfFE4348c372;
        paroisse7 = 0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678;
        paroisse8 = 0x03C6FcED478cBbC9a4FAB34eF9f40767739D1Ff7;
        paroisse9 = 0x1aE0EA34a72D944a8C7603FfB3eC30a6669E454C;



    }

    function setMember (string memory _nom, string memory prenom,
                        string memory pere,string memory mere, string memory dateN,
                        string memory lieuN, string memory parain, uint age, uint id) public OnlyParoisse{
        
        Members.push(membre(id, _nom, prenom,pere,mere,dateN, lieuN, parain, age));
    }
    function getInfoById (uint id) public OnlyParoisse view returns(membre memory){
        
        return Membre[id];
    }
    function getAllMember () public OnlyParoisse view returns(membre memory) {
        for(uint i = 1; i < Members.length; i++ ){
            return Members[i];
        }
    }

}
