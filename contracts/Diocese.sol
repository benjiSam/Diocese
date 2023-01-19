// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.7;
contract Diocese {
    struct membre{
        string id;
        string nom;
        string prenom;
        string pere;
        string mere;
        string naissance;
        address paroisse;
    }
    struct bapteme {
        string id;
        bool bapteme;
        address lieuB;
        string dateB;
        string numeroB;
        string parrainB;
        string suppletionB;
    }
    struct eucharistie{
        string id;
        bool Eucaristie;
        address lieuEu;
        string dateEu;
    }
    struct confirmation{
        string id;
        bool confirmation;
        address lieuCo;
        string dateCo;
    }
    struct mariage{
        string id;
        bool mariage;
        string numeroM;
        address paroisseM;
        string partenaireM;
        string lieudateBaptPartenaireM;
        string numeroBaptPartenaireM;
        string dateBenedictionM;
    }
    struct remariage {
        string id;
        string lieudateDecespartM;
        address paroisseRM;
        string dateRM;
        string numeroRM;
        string partenaireRM;
        string lieudateBaptPartenaireRM;
        string numeroBaptPartenaireRM;
    }
    struct consecration {
        string id;
        bool consecrationReligieuse;
        string vocationCR;
        string dateCR;
        string lieuCR;
        string dateVoeux;
        string lieuVoeux;
    }
    
    membre [] public Members;
    bapteme [] public Baptemes;
    eucharistie [] public Eucharisties;
    confirmation [] public Confirmations;
    mariage [] public Mariages;
    remariage [] public Remariages;
    consecration [] public Consecrations;

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
        
        paroisse4 = 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB;
        paroisse5 = 0x617F2E2fD72FD9D5503197092aC168c91465E7f2;
        /*
        paroisse6 = 0x17F6AD8Ef982297579C203069C1DbfFE4348c372;
        paroisse7 = 0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678;
        paroisse8 = 0x03C6FcED478cBbC9a4FAB34eF9f40767739D1Ff7;
        paroisse9 = 0x1aE0EA34a72D944a8C7603FfB3eC30a6669E454C;*/



    }

    function setMember (string memory _nom, string memory prenom,
                        string memory pere,string memory mere, string memory naissance, string memory id) public OnlyParoisse{
        address paroisse = msg.sender;
        Members.push(membre(id, _nom, prenom,pere,mere,naissance,paroisse));
    }

    function setBapteme (string memory dateB, string memory numeroB,
                        string memory parrainB,string memory suppletionB, string memory id) public OnlyParoisse{
        address paroisse = msg.sender;
        Baptemes.push(bapteme(id, true,paroisse, dateB,numeroB,parrainB,suppletionB));
    }
    function setEucharistie (string memory dateEu, string memory id) public OnlyParoisse{
        address paroisse = msg.sender;
        Eucharisties.push(eucharistie(id, true,paroisse, dateEu));
    }
    function setConfirmation (string memory dateCo,string memory id) public OnlyParoisse{
        address paroisse = msg.sender;
        Confirmations.push(confirmation(id, true,paroisse, dateCo));
    }
    

    function setMariage (string memory numeroM, string memory partenaireM,
    string memory lieudateBaptPartenaireM,string memory numeroBaptPartenaireM,
    string memory dateBenedictionM, string memory id) public OnlyParoisse{
        address paroisse = msg.sender;
        Mariages.push(mariage(id, true, numeroM, paroisse, partenaireM, lieudateBaptPartenaireM,
        numeroBaptPartenaireM, dateBenedictionM));
    }
    function setRemariage (string memory lieudateDeces, string memory dateRM, string memory numeroRM,
    string memory partenaireRM,string memory lieudateBaptPartenaireRM,string memory numeroBaptPartenaireRM,
    string memory id) public OnlyParoisse{
        address paroisse = msg.sender;
        Remariages.push(remariage(id, lieudateDeces, paroisse, dateRM, numeroRM, partenaireRM, lieudateBaptPartenaireRM,
        numeroBaptPartenaireRM));
    }

    function getInfoById (string memory _id) public OnlyParoisse view returns(membre memory){
            for(uint i =0; i < Members.length; i++) {
                if(keccak256(abi.encodePacked(Members[i].id)) == keccak256(abi.encodePacked(_id))) {
                    return Members[i];
                }
            }
        
    }
    function getMarById (string memory _id) public OnlyParoisse view returns(mariage memory){
            for(uint i =0; i < Mariages.length; i++) {
                if(keccak256(abi.encodePacked(Mariages[i].id)) == keccak256(abi.encodePacked(_id))) {
                    return Mariages[i];
                }
            }
        
    }

    function getBaptById (string memory _id) public OnlyParoisse view returns(bapteme memory){
            for(uint i =0; i < Baptemes.length; i++) {
                if(keccak256(abi.encodePacked(Baptemes[i].id)) == keccak256(abi.encodePacked(_id))) {
                    return Baptemes[i];
                }
            }
        
    }
    function getEuchById (string memory _id) public OnlyParoisse view returns(eucharistie memory){
            for(uint i =0; i < Eucharisties.length; i++) {
                if(keccak256(abi.encodePacked(Eucharisties[i].id)) == keccak256(abi.encodePacked(_id))) {
                    return Eucharisties[i];
                }
            }
        
    }
    function getConfById (string memory _id) public OnlyParoisse view returns(confirmation memory){
            for(uint i =0; i < Confirmations.length; i++) {
                if(keccak256(abi.encodePacked(Confirmations[i].id)) == keccak256(abi.encodePacked(_id))) {
                    return Confirmations[i];
                }
            }
        
    }
    function getRemarById (string memory _id) public OnlyParoisse view returns(remariage memory){
            for(uint i =0; i < Remariages.length; i++) {
                if(keccak256(abi.encodePacked(Remariages[i].id)) == keccak256(abi.encodePacked(_id))) {
                    return Remariages[i];
                }
            }
        
    }
    function getAllMember () public OnlyParoisse view returns(membre [] memory) {
       
            return Members;
        
    }

}