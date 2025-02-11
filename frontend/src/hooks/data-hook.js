import { useEffect, useState } from "react";
import { getClasses, getRoles } from "../lib/api";

const useGameData = () => {
    const [roles, setRoles] = useState({});
    const [classes, setClasses] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const rolesData = await getRoles();
                const classesData = await getClasses();

                // 1) Transformer les rôles en objet indexé par id
                const rolesMap = Object.fromEntries(
                    rolesData.map((r) => [r.id, r.label])
                );

                // 2) Transformer les classes en objet indexé par id,
                //    avec label, color et gradient
                const classesMap = Object.fromEntries(
                    classesData.map((c) => [
                        c.id,
                        {
                            label: c.label,
                            color: c.color,
                            gradient: c.gradient,
                        },
                    ])
                );

                setRoles(rolesMap);
                setClasses(classesMap);
            } catch (error) {
                console.error("Erreur lors du chargement des données :", error);
            }
        };

        fetchData();
    }, []);

    return { roles, classes };
};

export default useGameData;
