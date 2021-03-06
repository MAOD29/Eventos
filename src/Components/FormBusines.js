import React from 'react'

const typebusiness = (id,options) => {
    const type = options.find((option) => option.id === id )
    return type ? type.name : 'Seleccione...'
  
}
const imagePreviewExist = (imagePreview) => {
   
    if (imagePreview) {
       return  (<img src={imagePreview} width={'320px'} alt="imagen previa" />);
      } else {
       return (<div className="previewText">Please select an Image for Preview</div>);
      }
  
}

const FormBusines = ({form,onChange,onSubmit,options,onChooseFile,imagePreview}) => {
    
    return (
    <form className="container section" onSubmit={onSubmit}>
        <br/>
        <div className="row">
            <div className="col-4">
                <label >Nombre</label>
                <input className="form-control" type="text" required 
                 name="name" 
                 onChange={onChange}
                 defaultValue={form.name} />
            
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
                <label >Contacto</label>
                <input className="form-control" type="text" required name="contact" 
                 onChange={onChange}
                 defaultValue={form.contact}/>
            
            </div>
            <div className="col-4">
                <label >Hora de inicio</label>
                <input className="form-control" type="time" required name="start" 
                 onChange={onChange}
                 defaultValue={form.start}/>
            </div>
            <div className="col-4">
                <label >Hora de salida</label>
                <input className="form-control" type="time" required name="finish" 
                  onChange={onChange}
                  defaultValue={form.finish}/>
            </div>
            
        </div>
        <div className="row">
            <div className="col-4">
            <label>Elige un tipo:</label>
                <select className="form-control" required onChange={onChange} name="typebusinesses_id" defaultValue={form.typebusiness_id}>
                    <option value={form.typebusinesses_id}>
                    {typebusiness(form.typebusinesses_id,options)}
                    </option>

                    { options.map(key => (
                        <option key={key.id} value={key.id}>{key.name}</option>
                        )
                    )}
                </select>
            </div>
            <div className="col-4">
                <label >Imagen</label>
                <input   className="form-control" type="file"  name="image" onChange={onChooseFile}
                 />

                  
            </div>
            <div className="col-4" >
                {imagePreviewExist(imagePreview)}
            </div>
        </div>
        <br/>
        <button className="btn btn-info">Enviar</button>


    </form>
    )
}




export default FormBusines