import { useState, useEffect } from "react";
import axios from "axios";

const getAllSessions = (token,hasSearched) => {
    const [sessionData, setSessionData] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSessionDetails = async () => {
        try {
            const response = await axios.post("http://localhost:8081/api/query/getAllSessions",{},{
                headers: {
                    Authorization: token,
                }
            });
            setSessionData(response.data.reverse());
            setDataFetched(true);
        } catch (err) {
            console.error("Error fetching session data:", err);
            setError(err);
        }
        };

        fetchSessionDetails();
    }, [token,hasSearched]);

    return { sessionData, dataFetched, error };
};

export default getAllSessions;
