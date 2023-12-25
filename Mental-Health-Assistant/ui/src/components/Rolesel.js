function Rolesel(){
    return(
        <div class="modal fade" id="chooserole" data-bs-backdrop="true" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
      <div className="container">
        <div class="row">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>

        <div class="row">
        <h1 class="modal-title fs-4 d-flex justify-content-center" id="exampleModalToggleLabel">Choose Your Role</h1> </div>

        
        </div>
        
      </div>
      <div class="modal-body d-flex justify-content-center">
  <div class="d-flex gap-5">
  <button type="button" class="btn btn-primary" data-bs-target="#stu" data-bs-toggle="modal">Student</button>
    <button type="button" class="btn btn-primary" data-bs-target="#cou" data-bs-toggle="modal">Councilor</button>
  </div>
</div>
  
    </div>
  </div>
</div>
    );
}

export default Rolesel