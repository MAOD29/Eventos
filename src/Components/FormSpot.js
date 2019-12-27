import React from 'react'

const imagePreviewExist = (imagePreview) => {
   
    if (imagePreview) {
       return  (<img src={imagePreview} width={'320px'} alt="imagen previa" />);
      } else {
       return (<div className="previewText">Please select an Image for Preview</div>);
      }
  
}
const FormEvent = ({form,onChange,onSubmit,onChooseFile,imagePreview}) => {

    return (
    <form className="container section" onSubmit={onSubmit} >
        <br/>
        <div className="row">
            <div className="col-4">
                <label >Titulo</label>
                <input className="form-control" type="text" required 
                 name="name" 
                 onChange={onChange}
                 defaultValue={form.name} />
            
            </div>
            <div className="col-4">
                <label >Descripcion</label>
                <input className="form-control" type="text" required
                 name="description"
                 onChange={onChange}
                 defaultValue={form.description} />
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
                <label >Imagen</label>
                <input className="form-control" type="file" required name="image" onChange={onChooseFile} />
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




export default FormEvent