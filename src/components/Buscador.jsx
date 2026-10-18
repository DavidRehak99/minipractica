import React, { Component } from 'react';
import ServiceFutbol from '../services/serviceFutbol';
import Jugadores from './Jugadores'; // O importas el componente de jugadores

export default class Buscador extends Component {
    service = new ServiceFutbol();

    selectEquipo = React.createRef();
    cajaNombre = React.createRef();

    state = {
        equipos: [],
        idEquipoSeleccionado: null,
        nombreBuscado: "",
        statusEquipos: false
    }

    componentDidMount = () => {
        this.service.getEquipos().then((result) => {
            this.setState({
                equipos: result,
                statusEquipos: true
            });
        });
    }

    // Buscar por equipo desde el select
    buscarPorEquipo = (e) => {
        e.preventDefault();
        let id = this.selectEquipo.current.value;
        this.setState({
            idEquipoSeleccionado: id,
            nombreBuscado: "" // Limpiamos la otra búsqueda si la hubiera
        });
    }

    // Buscar por nombre desde la caja de texto
    buscarPorNombre = (e) => {
        e.preventDefault();
        let texto = this.cajaNombre.current.value;
        this.setState({
            nombreBuscado: texto,
            idEquipoSeleccionado: null // Limpiamos el select si buscamos por texto
        });
    }

    render() {
        return (
            <div style={{ margin: "auto", width: "60%", textAlign: "center", marginTop: "30px" }}>
                <h1>Buscador de Jugadores</h1>

                <div className="row mb-4">
                    {/* SELECT DE EQUIPOS */}
                    <div className="col-md-6">
                        <form onSubmit={this.buscarPorEquipo}>
                            <label className="form-label">Selecciona un Equipo:</label>
                            <select className="form-control mb-2" ref={this.selectEquipo}>
                                <option value="">-- Todos los equipos --</option>
                                {
                                    this.state.equipos.map((eq, index) => (
                                        <option key={index} value={eq.idEquipo}>{eq.nombre}</option>
                                    ))
                                }
                            </select>
                            <button type="submit" className="btn btn-primary btn-sm">Buscar por Equipo</button>
                        </form>
                    </div>

                    {/* INPUT DE NOMBRE */}
                    <div className="col-md-6">
                        <form onSubmit={this.buscarPorNombre}>
                            <label className="form-label">Buscar por Nombre:</label>
                            <input type="text" className="form-control mb-2" ref={this.cajaNombre} placeholder="Nombre del jugador..." />
                            <button type="submit" className="btn btn-success btn-sm">Buscar por Nombre</button>
                        </form>
                    </div>
                </div>

                <hr />

                {/* AQUÍ PASAMOS LAS PROPS OPCIONALES AL COMPONENTE DE JUGADORES */}
                <Jugadores 
                    idequipo={this.state.idEquipoSeleccionado} 
                    nombre={this.state.nombreBuscado} 
                />
            </div>
        );
    }
}