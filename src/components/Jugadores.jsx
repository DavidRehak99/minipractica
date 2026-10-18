import React, { Component } from 'react';
import ServiceFutbol from '../services/serviceFutbol';
import { useParams, NavLink } from 'react-router-dom';

// 1. Wrapper funcional para capturar parámetros de la URL de forma flexible
export function JugadoresWrapper() {
    const { idEquipo } = useParams();
    return <Jugadores idEquipo={idEquipo} />;
}

class Jugadores extends Component {
    service = new ServiceFutbol();

    state = {
        jugadores: [], 
        status: false
    }

    loadJugadores = () => {
        let idEquipoUrl = this.props.idEquipo;
        let nombreBusqueda = this.props.nombre; // Por si recibe props opcionales de búsqueda

        console.log("Cargando jugadores con filtro ID:", idEquipoUrl, "o Nombre:", nombreBusqueda);

        // Llamamos al servicio general de jugadores
        this.service.getJugadores().then((result) => {
            let datosFiltrados = result;

            // TRUCO DEL EXAMEN: Comprobamos por IF qué prop nos llega
            if (idEquipoUrl) {
                datosFiltrados = result.filter(j => j.idEquipo == idEquipoUrl);
            } else if (nombreBusqueda) {
                datosFiltrados = result.filter(j => j.nombre.toLowerCase().includes(nombreBusqueda.toLowerCase()));
            }

            this.setState({
                jugadores: datosFiltrados,
                status: true
            });
        }).catch((error) => {
            console.log("Error al cargar jugadores:", error);
            this.setState({ status: true, jugadores: [] });
        });
    }

    componentDidMount = () => {
        this.loadJugadores();
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.idEquipo !== this.props.idEquipo || prevProps.nombre !== this.props.nombre) {
            this.loadJugadores();
        }
    }

    render() {
        if (this.state.status === true) {
            return (
                <div style={{ margin: "auto", width: "80%", textAlign: "center", marginTop: "40px" }}>
                    <h1>Lista de Jugadores</h1>
                    
                    {/* Botón para volver al equipo si viene de uno */}
                    {
                        this.props.idEquipo && (
                            <div style={{ marginBottom: "20px", textAlign: "left" }}>
                                <NavLink to={"/equipos/" + this.props.idEquipo} className="btn btn-secondary">
                                    Volver al Equipo
                                </NavLink>
                            </div>
                        )
                    }

                    {
                        this.state.jugadores.length > 0 ? (
                            // CLASE EXACTA PEDIDA EN EL ENUNCIADO: table table-info
                            <table className="table table-info mt-3">
                                <thead>
                                    <tr>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Posición</th>
                                        <th>Pais</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.jugadores.map((jugador, index) => {
                                            return (
                                                <tr key={index} className="align-middle">
                                                    <td>
                                                        <img 
                                                            src={jugador.imagen} 
                                                            alt={jugador.nombre} 
                                                            style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "50%" }} 
                                                        />
                                                    </td>
                                                    <td>{jugador.nombre}</td>
                                                    <td>{jugador.posicion}</td>
                                                    <td>{jugador.pais}</td>
                                                    <td>
                                                        {/* CORREGIDO: El botón de detalles ahora va dentro de un <td> y apunta al idJugador */}
                                                        <NavLink 
                                                                                        to={"/jugadores/" + jugador.idJugador} 
                                                                                        className="btn btn-success mt-3"
                                                                                    >
                                                                                        Ver Jugadores
                                                                                    </NavLink>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-muted mt-4">No hay jugadores registrados para este criterio.</p>
                        )
                    }
                </div>
            );
        } else {
            return (
                <div style={{ textAlign: "center", marginTop: "50px" }}>
                    <p>Cargando jugadores...</p>
                </div>
            );
        }
    }
}

// 2. Exportamos el Wrapper correctamente
export default JugadoresWrapper;