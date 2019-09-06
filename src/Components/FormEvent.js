import React from 'react'


const FormEvent = ({form,onChange,onSubmit}) => {

    return (
    <form className="container" onSubmit={onSubmit} >
        <br/>
        <div className="row">
            <div className="col-4">
                <label >Titulo</label>
                <input className="form-control" type="text" required 
                 name="title" 
                 onChange={onChange}
                 defaultValue={form.title} />
            
            </div>
            <div className="col-4">
                <label >Descripcion</label>
                <input className="form-control" type="text" required
                 name="descripcion" 
                 onChange={onChange}
                 defaultValue={form.descripcion} />
            </div>
            <div className="col-4">
                <label >Lugar</label>
                <input className="form-control" type="text" required name="location"   
                 onChange={onChange}
                 defaultValue={form.location} />
            </div>
            
        </div>
        <div className="row">
            <div className="col-4">
                <label >Fecha</label>
                <input className="form-control" type="text" required name="date" 
                 onChange={onChange}
                 defaultValue={form.date}/>
            
            </div>
            <div className="col-4">
                <label >Hora de inicio</label>
                <input className="form-control" type="text" required name="start" 
                 onChange={onChange}
                 defaultValue={form.start}/>
            </div>
            <div className="col-4">
                <label >Hora de salida</label>
                <input className="form-control" type="text" required name="finish" 
                  onChange={onChange}
                  defaultValue={form.finish}/>
            </div>
            
        </div>
        <div className="row">
        <div className="col-4">
                <label >user_id</label>
                <input className="form-control" type="text" required name="user_id" onChange={onChange}
                 defaultValue={form.user_id} />
            </div>
            <div className="col-4">
                <label >Sitio web</label>
                <input className="form-control" type="text" required name="web_site" onChange={onChange}
                 defaultValue={form.web_site} />
            </div>
            <div className="col-4">
                <label >Imagen</label>
                <input className="form-control" type="text" required name="image" onChange={onChange}
                 defaultValue={form.image} />
            </div>
        </div>
        <br/>
        <button className="btn btn-info">Enviar</button>
    </form>
    )
}




export default FormEvent