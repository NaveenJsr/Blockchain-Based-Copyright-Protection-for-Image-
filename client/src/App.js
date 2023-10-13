import './App.css';
import CopyrightArtifact from "../src/artifacts/contracts/Copyright.sol/Copyright.json"; // Import the JSON artifact
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import FileUpload from './components/FileUpload';

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const loadProvider = async () => {
      if (provider) {

        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () =>{
          window.location.reload();
        });

        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        const contractAddress = "0xA76B7d4bB4F9a8481fFdD4645804a0f82eb51E46";

        // Use the imported JSON artifact to get the contract's ABI
        const contract = new ethers.Contract(
          contractAddress,
          CopyrightArtifact.abi, // Use CopyrightArtifact.abi
          signer
        );
        console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.log("Unable to fetch Metamask");
      }
    };

    provider && loadProvider();
  }, []);

  return (
    <div className="App">
      <h1> Blockchain Based Image Copyright Protection </h1>
      <p>Account: {account ? account: "Connect with Metamask"} </p>

      <FileUpload account = {account} provider = {provider} contract = {contract}></FileUpload>
    </div>
  );
}

export default App;