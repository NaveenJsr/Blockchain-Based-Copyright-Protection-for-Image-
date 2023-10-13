import axios from "axios";
import { useState } from "react";

const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const resFile = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            maxBodyLength: "Infinity",
            headers: {
              'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkYmU3ZDQ1Ni0wYTVkLTQzNDMtODdjOS0xYmUwOTY1YzgxYzgiLCJlbWFpbCI6Im5hdmVlbmpzcjk5QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJjOWJlOTY1NzZiNTRhMWJmNjcyOCIsInNjb3BlZEtleVNlY3JldCI6ImIwZmE2ZTI2MTY1MTg1Yjg4Mzc4NWI5ZTZkOTU5MTVhNzM5NTRmNTU4ZjhjZjAwZmJiZDZjNWQ1ZmI1NTIwMDgiLCJpYXQiOjE2OTcxMDQ1MjB9.Iphth19Zqhz4Sg1exXQfTKjg9v0yqSgxfVpLvgQ7X8M', // Replace with your Pinata API key
            }
          }
        );
        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        await contract.addImage(account, ImgHash);
        alert("Successfully uploaded image...");
        setFileName("No Image Selected");
        setFile(null);
      } catch (error) {
        console.error("Error:", error);
        alert("Image Copyright cannot be Uploaded...");
      }
    }
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    console.log(data);
    const reader = new FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(data);
    };
    setFileName(data.name);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="file-upload">Choose Image</label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        {/* <span>Image: {fileName}</span> */}
        <button type="submit" disabled={!file}>Upload</button>
      </form>
    </div>
  );
};

export default FileUpload;