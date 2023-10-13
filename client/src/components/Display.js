import { useState, useEffect } from "react";

const Display = ({ contract, account }) => {
    
    const [dataArray, setDataArray] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const data = await contract.getAllImages();
            console.log(data);
            setDataArray(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    return (
        <div>
            <div>Image Display</div>
            <div>
                {dataArray.length > 0 ? (
                    <ul>
                        {dataArray.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No data available.</p>
                )}
            </div>
        </div>
    );
};

export default Display;
