export async function getClasses() {
    try {
        const back_url = import.meta.env.VITE_BACK_URL;
        const res = await fetch(`${back_url}/classes`);

        if (!res.ok) {
            console.error(`Erreur API : ${res.status} ${res.statusText}`);
            return [];
        }

        const data = await res.json();

        return Array.isArray(data.data) ? data.data : [];
    } catch (error) {
        console.error("Erreur de fetch :", error);
        return [];
    }
}

export async function getRoles() {
    try {
        const back_url = import.meta.env.VITE_BACK_URL;
        const res = await fetch(`${back_url}/roles`);

        if (!res.ok) {
            console.error(`Erreur API : ${res.status} ${res.statusText}`);
            return [];
        }

        const data = await res.json();

        return Array.isArray(data.data) ? data.data : [];
    } catch (error) {
        console.error("Erreur de fetch :", error);
        return [];
    }
}

export async function getRolesByClassId(characterClass) {
    try {
        const back_url = import.meta.env.VITE_BACK_URL;
        const res = await fetch(`${back_url}/roles/class/${characterClass}`);

        if (!res.ok) {
            console.error(`Erreur API : ${res.status} ${res.statusText}`);
            return [];
        }

        const data = await res.json();

        return Array.isArray(data.data) ? data.data : [];
    } catch (error) {
        console.error("Erreur de fetch :", error);
        return [];
    }
}

export async function getCharacters() {
    try {
        const back_url = import.meta.env.VITE_BACK_URL;
        if (!back_url) {
            console.error("VITE_BACK_URL n'est pas défini !");
            return [];
        }

        const res = await fetch(`${back_url}/characters`);

        if (!res.ok) {
            console.error(`Erreur API : ${res.status} ${res.statusText}`);
            return [];
        }

        const data = await res.json();

        return Array.isArray(data.data)
            ? data.data.map((char) => ({
                  id: char.id,
                  name: char.name,
                  class_id: char.class_id,
                  role_id: char.role_id,
                  ilvl: char.ilvl,
                  rio: char.rio,
                  player_id: char.player_id,
              }))
            : [];
    } catch (error) {
        console.error("Erreur de fetch :", error);
        return [];
    }
}

export async function getClassById(class_id) {
    try {
        const back_url = import.meta.env.VITE_BACK_URL;
        const res = await fetch(`${back_url}/classes/${class_id}`);

        if (!res.ok) {
            console.error(`Erreur API : ${res.status} ${res.statusText}`);
            return null;
        }

        const data = await res.json();

        return data.data ?? null;
    } catch (error) {
        console.error("Erreur de fetch :", error);
        return null;
    }
}

export async function getRoleById(role_id) {
    try {
        const back_url = import.meta.env.VITE_BACK_URL;
        const res = await fetch(`${back_url}/roles/${role_id}`);

        if (!res.ok) {
            console.error(`Erreur API : ${res.status} ${res.statusText}`);
            return null;
        }

        const data = await res.json();

        return data.data ?? null;
    } catch (error) {
        console.error("Erreur de fetch :", error);
        return null;
    }
}

export async function generateTeams(number) {
    try {
        const back_url = import.meta.env.VITE_BACK_URL;
        const res = await fetch(`${back_url}/parties/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                number: number,
            }),
        });

        if (!res.ok) {
            console.error(`Erreur API : ${res.status} ${res.statusText}`);
            return [];
        }

        const data = await res.json();

        return Array.isArray(data.data) ? data.data : [];
    } catch (error) {
        console.error("Erreur de fetch :", error);
        return [];
    }
}

export async function CreateTeamAPI(newTeam) {
    try {
        const back_url = import.meta.env.VITE_BACK_URL;
        const res = await fetch(`${back_url}/parties`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTeam),
        });

        if (!res.ok) {
            console.error(`Erreur API : ${res.status} ${res.statusText}`);
            return null;
        }

        const data = await res.json();

        return data.data ?? null;
    } catch (error) {
        console.error("Erreur de fetch :", error);
        return null;
    }
}

export async function getTeams() {
    try {
        const back_url = import.meta.env.VITE_BACK_URL;
        const res = await fetch(`${back_url}/parties`);

        if (!res.ok) {
            console.error(`Erreur API : ${res.status} ${res.statusText}`);
            return [];
        }

        const data = await res.json();

        return Array.isArray(data.data) ? data.data : [];
    } catch (error) {
        console.error("Erreur de fetch :", error);
        return [];
    }
}

export async function getTeamsCharacters() {
    try {
        const back_url = import.meta.env.VITE_BACK_URL;
        const res = await fetch(`${back_url}/parties/with_characters`);

        if (!res.ok) {
            console.error(`Erreur API : ${res.status} ${res.statusText}`);
            return [];
        }

        const data = await res.json();

        return Array.isArray(data.data) ? data.data : [];
    } catch (error) {
        console.error("Erreur de fetch :", error);
        return [];
    }
}

export async function deleteTeamById(partyId) {
    try {
        const back_url = import.meta.env.VITE_BACK_URL;
        const res = await fetch(`${back_url}/parties/${partyId}`, {
            method: "DELETE",
        });

        if (!res.ok) {
            console.error(`Erreur API : ${res.status} ${res.statusText}`);
            return false;
        }

        return true;
    } catch (error) {
        console.error("Erreur de fetch :", error);
        return false;
    }
}
