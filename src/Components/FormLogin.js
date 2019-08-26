import React from 'react'

const Login = (props) => {
  const {form,onSubmit,onChange} = props

  return(
    <div className="container">
  <form onSubmit={onSubmit}>
    <div className="form-group">
      <label >Email</label>
      <input type="email" 
        name="email" 
        className="form-control" aria-describedby="emailHelp" 
        placeholder="Enter email"
        onChange={onChange}
        value={form.email}
      />
      <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div className="form-group">
      <label >Password</label>
      <input type="password" className="form-control" name="password"  placeholder="Password"
        onChange={onChange}
        value={form.password}
      />
    </div>
    <div className="form-group form-check">
    </div>
    <button type="submit" className="btn btn-primary">Enviar</button>
  </form>
</div>

  )
  
  }


export default Login