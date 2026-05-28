//Librerias react y de terceros
import { useState } from 'react';
import toast from 'react-hot-toast';

import { Clapperboard, CloudUpload, FileUp } from 'lucide-react';

export default function MovieImportarPage(){
    const [status, setStatus] = useState('');
    const [file, setFile] = useState(null);

    function handleFileChange(e) {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }   
    }

    async function subirArchivo(){
        try {
            // Validamos archivo
            if(file == null) {
                toast.error("Selecciona un archivo.");
                return;
            }
            
            //Cambia el estado a cargando
            setStatus('cargando');

            //Creamos formdata con el objeto del formulario front
            var formData = new FormData();

            //Agregarmos archivo
            if(file != null) formData.append('file', file);

            //Ejecutamos agregar enviandole el form y esperamos respuesta
            var res = await postFormData(formData);

            //Si la respuesta es positiva
            console.log(res);
            if(res.success){
                //Mostramos mensaje success
                toast.success("Éxito!");
            }else{
                //Si nos arrojo error lo mostramos
                if(res.error) toast.error(res.error);
            }

            //Modificamos status a ok
            setStatus('ok');
        } catch (err) {
            //Si hay algun error lo monstramos
            setStatus('nok');
            toast.error(err)
        }        
    }

    async function postFormData(form)  {
        //Creamos encabezados, indicamos que tipo de recuerso envia (json)
        const customHeaders = new Headers();
        //customHeaders.append("Content-Type", "multipart/form-data'");

        //Realizamos la solicitud HTTP asincróna,  
        var response = await fetch("http://localhost:3001/api/movie/importar", {
            method: "POST",
            body: form,
            headers: customHeaders
        });
        
        //Si hay respuesta la trasformamos en json
        var result;
        if(response)
            result = await response.json();

        //Devolvemos resultado
        return result;
    }


    return (
        <>
        <div class="container-fluid">
            <div class="effect-bg"></div>
            <div class="container text-center" style={{marginTop: "25px", marginBottom: "25px"}}>
                <div class="row">
                    <div class="col">             
                        <h1>  
                            <span class="badge text-bg-light" style={{marginRight: "10px"}}>
                                <Clapperboard style={{verticalAlign: "baseline"}}/>
                            </span>
                            Movies
                        </h1>
                    </div>
                </div>
            </div>
            <div class="container text-center">
                <div class="row justify-content-md-center">
                    <div class="col col-sx-12 col-md-4">
                        <div class="card card--white-transparent">
                            <div class="card-body">
                                <h5 class="card-title">
                                    <CloudUpload style={{marginRight: "10px"}}/>        
                                    Importar películas                        
                                </h5>
                                <hr />
                                <p class="card-text">Es muy sencillo, sólo sigue estos pasos!:</p>
                                <div class="alert alert-primary" role="alert">
                                    &#9757; Paso 1: Selecciona un archivo excel (.xls) con los datos de las péliculas que vas a importar.
                                    <div class="mb-3">
                                        <br />
                                        <input class="form-control" type="file" id="formFile" onChange={handleFileChange} accept=".xlsx, .xls, .csv"/>
                                    </div>                                    
                                </div>
                                <br />
                                <div class="alert alert-info" role="alert">
                                    &#9996; Paso 2: Importalo dando click en el siguiente botón.
                                    <br />
                                    <button class="btn btn-primary btn-effect" type="button" onClick={subirArchivo} style={{marginTop: "20px", marginBottom: "10px", width: "200px"}}>
                                        {
                                            status == "cargando" ? (
                                                <>
                                                    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                                    <span role="status">Loading...</span>
                                                </>
                                            ) : (
                                                <span role="status">&#128640; Subir</span>
                                            )
                                        }                                        
                                    </button>                                                           
                                </div>
                                <br />
                                {
                                    status == "ok" ?  (
                                        <div class="alert alert-success" role="alert">
                                        Archivo importado con éxito! &#128540;
                                        </div>
                                    ) : (<></>)
                                }
                                {
                                    status == "nok" ?  (
                                        <div class="alert alert-danger" role="alert">
                                        Error al importar el archivo &#128557;
                                        </div>
                                    ) : (<></>)
                                }                                                      
                            </div>
                        </div>
                    </div>
                </div>            
            </div>    
        </div>    
        </>
    )
}