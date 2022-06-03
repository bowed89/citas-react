import { useState, useEffect } from 'react';
import Error from './Error';

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {

    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');

    const [error, setError] = useState(false);

    useEffect(() => {
        //seteamos para que muestre los datos de paciente que queremos editar en el formulario 
        if (Object.keys(paciente).length > 0) {
            console.log('Si hay PACIENTE');
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
        }
    }, [paciente])

    // Generamos un ID para usar en el 'key' en ListadoPacientes
    const generarId = () => {
        const random = Math.random().toString(36).substr(2);
        const fecha = Date.now().toString(36);

        return random + fecha
    }

    const handleSubmit = (e) => {
        e.preventDefault(); // para que no se reinicie el formulario al hacer submit
        // Validacion del formulario
        if ([nombre, propietario, email, fecha, sintomas].includes('')) {
            console.log('Existe al menos un campo vacio');
            setError(true)
            return;
        }
        setError(false);

        const objectoPaciente = {
            nombre,
            propietario,
            email,
            fecha,
            sintomas
        }

        if (paciente.id) {
            console.log('Editando el registro');
            objectoPaciente.id = paciente.id
            console.log('ACTUALIZADO', objectoPaciente);
            console.log('ANTERIOR', paciente);
            const pacientesActualizados = pacientes.map(pacienteState =>
                pacienteState.id === paciente.id ? objectoPaciente : pacienteState)
            setPacientes(pacientesActualizados)
            setPaciente({})
        } else {
            console.log('Nuevo Registro');
            objectoPaciente.id = generarId();
            // operador spread en vez de .push
            setPacientes([...pacientes, objectoPaciente])
        }

        //Reiniciar el formulario
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
    }

    return (
        <div className="md:w-1/2 lg:w-2/5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y {""}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
                {/* { error ? 'Si hay un error' : 'No hay un error' } */}
                {error && <Error>Todos los campos son obligatorios!</Error>}

                <div className="mb-5">
                    <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
                        Nombre Mascota
                    </label>
                    <input
                        id="mascota"
                        type="text"
                        placeholder="Nombre de la Mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="proppietario" className="block text-gray-700 uppercase font-bold">
                        Nombre Propietario
                    </label>
                    <input
                        id="proppietario"
                        type="text"
                        placeholder="Nombre del Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={propietario}
                        onChange={(e) => setPropietario(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email Contacto Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
                        Alta
                    </label>
                    <input
                        id="alta"
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
                        Sintomas
                    </label>
                    <textarea
                        id="sintomas"
                        placeholder="Describe los Síntomas"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={sintomas}
                        onChange={(e) => setSintomas(e.target.value)}
                    />
                </div>
                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase 
                    font-bold hover:bg-indigo-800 cursor-pointer transition-colors"
                    value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
                />
            </form>
        </div>
    )
}

export default Formulario