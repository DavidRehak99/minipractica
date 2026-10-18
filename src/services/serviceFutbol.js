import axios from "axios";
import Global from "../Global";


export default class ServiceFutbol {

getEquipos() {

    return new Promise(function(resolve,reject){

        let url = Global.urlApiFutbol;
        let request = "api/equipos";
        axios.get(url + request).then((response) => {
            console.log("leyendo equipos");
            resolve(response.data);
        })
        .catch((error) => {
            console.log(error);
            reject([error]);
        });
    })
}
// 1. Para obtener TODOS los jugadores (útil para búsquedas por nombre o general)
    getJugadores() {
        return new Promise(function(resolve, reject){
            let url = Global.urlApiFutbol;
            let request = "api/jugadores";
            axios.get(url + request).then((response) => {
                console.log("leyendo todos los jugadores");
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject([error]);
            });
        })
    }

    // 2. Método específico exclusivo para el ID de equipo
    getJugadoresEquipo(idEquipo) {
        return new Promise(function(resolve, reject){
            let url = Global.urlApiFutbol;
            let request = "api/jugadores/jugadoresequipos/" + idEquipo;
            axios.get(url + request).then((response) => {
                console.log("leyendo jugadores del equipo");
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject([error]);
            });
        })
    }
getDetallesJugadores(idJugador) {

    return new Promise(function(resolve,reject){

        let url = Global.urlApiFutbol;
        let request = "api/jugadores/" +idJugador;
        axios.get(url + request).then((response) => {
            console.log("leyendo jugadores");
            resolve(response.data);
        })
        .catch((error) => {
            console.log(error);
            reject([error]);
        });
    })
}
getDetallesApostadores() {

    return new Promise(function(resolve,reject){

        let url = Global.urlApiFutbol;
        let request = "api/apuestas/" ;
        axios.get(url + request).then((response) => {
            console.log("leyendo apostadores");
            resolve(response.data);
        })
        .catch((error) => {
            console.log(error);
            reject([error]);
        });
    })
}

insertApuesta(apues) {
    return new Promise(function(resolve,reject){
    let url = Global.urlApiFutbol;
    let request = "api/apuestas";
    axios.post(url + request, apues).then((response) => {
        console.log("insertando apuesta");
        resolve(response.data);
    })
    .catch((error) => {
        console.log("Error insertando" + error);
        reject([error]);
    });

})
}


// insertDepartamento(departamento) {
//     return new Promise(function(resolve,reject){
//     let url = Global.urlApiDepartamentos;
//     let request = "api/departamentos";
//     axios.post(url + request, departamento).then((response) => {
//         console.log("insertando departamento");
//         resolve(response.data);
//     })
//     .catch((error) => {
//         console.log("Error insertando" + error);
//         reject([error]);
//     });

// })
// }



// updateDepartamento(departamento) {
//     return new Promise(function(resolve,reject){
//         let url = Global.urlApiDepartamentos;
//         let request = "api/departamentos";
//         axios.put(url + request, departamento).then((response) => {
//             console.log("Update departamento");
//             resolve(response.data);
//         })
//         .catch((error) => {
//             console.log("Error actualizando" + error);
//             reject([error]);
//         });

//     })

// }

// deleteDepartamento(iddepartamento) {

      

    
//     return new Promise(function(resolve,reject){
//         let url = Global.urlApiDepartamentos;
//         let request = "api/departamentos/" + iddepartamento;
//         axios.delete(url + request).then((response) => {
//             console.log("Delete departamento");
//             resolve(response.data);
//         })
//         .catch((error) => {
//             console.log("Error eliminando" + error);
//             reject([error]);
//         });

//     })
// }


}