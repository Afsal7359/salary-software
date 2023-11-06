import React from 'react'
import PageHeader from '../PageHeader'

function Purpose() {
  return (
    <>
    <PageHeader/>
  <div class="row">
                  <div class="col-sm-12">
                      <div class="card">
                          <div class="card-body">
                              <form>
                                  <div class="row">
                                      <div class="col-12">
                                          <div class="form-heading">
                                              <h4>Purpose Details</h4>
                                          </div>
                                      </div>
                                      <div className="col-12 col-md-6 col-xl-4">  
                                          <div className="form-group local-forms">
                                              <label >Purpose Id<span className="login-danger">*</span></label>
                                              <p className="form-control" type="text" placeholder="" />
                                          </div>
                                      </div>
                                      <div className="col-12 col-md-6 col-xl-4">  
                                          <div className="form-group local-forms">
                                              <label >Name<span className="login-danger">*</span></label>
                                              <input className="form-control" type="text" placeholder="" />
                                          </div>
                                      </div>
                                      <div className="col-12 col-md-6 col-xl-4">  
                                          <div class="doctor-submit text-end">
                                              <button type="submit" class="btn btn-primary submit-form me-2">Submit</button>
                                              <button type="submit" class="btn btn-primary cancel-form">Cancel</button>
                                          </div>
                                      </div>
                                  </div>
                              </form>
                          </div>
                      </div>							
                  </div>					
              </div>
  </>
  )
}

export default Purpose