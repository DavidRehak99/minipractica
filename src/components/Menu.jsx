import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import Global from '../Global' 

export default class Menu extends Component {
 
  urlEquipos = Global.urlApiFutbol; 
  
  state = {
    equipos: []
  }


  loadEquipos = () => {
    let request = "api/equipos"; 
    axios.get(this.urlEquipos + request).then((response) => {
      this.setState({
        equipos: response.data
      })
    })
  }
  


  componentDidMount = () => {
    this.loadEquipos();
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              
              <li className="nav-item">
                <NavLink className="nav-link" to="/">Home</NavLink>
              </li>
              
              <li className="nav-item">
                <NavLink className="nav-link" to="/apuestas">Apuestas</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/buscador">Buscador</NavLink>
              </li>
              
              

              {/* 4. TRANSFORMAMOS ESTE LI EN UN DROPDOWN DINÁMICO DE BOOTSTRAP */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Desplegable Equipos
                </a>
                
                <ul className="dropdown-menu">
                  {
                    this.state.equipos.map((eq, index) => {
                      return (
                        <li key={index}>
                          {/* Usamos NavLink para ir a la vista de detalles del equipo al seleccionarlo */}
                          <NavLink className="dropdown-item" to={"/equipos/" + eq.idEquipo}>
                            {eq.nombre}
                          </NavLink>
                        </li>
                      )
                    })
                  }
                </ul>
              </li>

              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">Disabled</a>
              </li>
            </ul>

            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    )
  }
}