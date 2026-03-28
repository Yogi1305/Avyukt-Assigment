import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../main";

export const ProtectRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/user/checkauth`, {
                    withCredentials: true,
                });
                setIsAuthenticated(Boolean(response.data.success));
            } catch {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    if (isAuthenticated === null) {
        return null;
    }

    if (!isAuthenticated) {
        return null;
    }

    return children;
};