import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Resumen(){
    const navigate = useNavigate();

    return(
        <div className="max-w-3xl mx-auto bg-neutral-900 shadow-md rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-center">¡Su gasto se ha registrado exitosamente!</h2>
            <button onClick={() => navigate("/dashboard")}>volver al dashboard</button>
        </div>
    )
}

export default Resumen;