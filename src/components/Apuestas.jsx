import React, { Component } from 'react'
import ServiceFutbol from '../services/serviceFutbol';
import { NavLink } from 'react-router-dom';

export default class Apuestas extends Component {

    service = new ServiceFutbol();
    
        state = {
            Apostadores: [], // Guardamos los jugadores aquí
            status: false
        }
    
        loadApostadores = () => {
            let id = this.props.Apostadores;
            console.log("ID del Apostador recibido:", id);
    
            // ATENCIÓN: Asegúrate de llamar al método correcto de tu servicio para los jugadores de este equipo.
            // Si tu servicio tiene un método específico para jugadores por equipo, úsalo:
            this.service.getDetallesApostadores(id).then((result) => {
                this.setState({
                    Apostadores: result,
                    status: true
                });
            }).catch((error) => {
                console.log("Error al cargar apostadores:", error);
                this.setState({ status: true, Apostadores: [] });
            });
        }
    
        componentDidMount = () => {
            this.loadApostadores();
        }
    
        componentDidUpdate = (prevProps) => {
            if (prevProps.Apostadores !== this.props.Apostadores) {
                this.loadApostadores();
            }
        }
  render() {
    return (
      <div style={{ margin: "auto", width: "60%", textAlign: "center", marginTop: "40px" }}>
                <h1>LOCAL REAL MADRID, VISITANTE ATLETICO DE MADRID</h1>   
            <NavLink
                to={"/apostar" }
                className="btn btn-success mt-3"
            >
                Apostar
            </NavLink> 
    
                    {
                        this.state.Apostadores.length > 0 ? (
                            <table className="table table-light table-striped">
                                <thead>
                                    <tr>
                                        <th>Usuario</th>
                                        <th>Resultado</th>
                                        
                                        <th>Apuesta</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.Apostadores.map((jugador, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{jugador.usuario}</td>
                                                    <td>{jugador.resultado}</td>
                                                    <td>{jugador.fecha}</td>
                                                    
                                                    
                                                    
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-muted mt-4">No hay jugadores registrados para este equipo.</p>
                        )
                    }
                </div>
            );
        
    
  }
}
