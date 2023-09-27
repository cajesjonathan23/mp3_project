import { useState } from 'react';
import axios from 'axios';
import Home from '../components/Home';
import './Report.css'
import { type } from '@testing-library/user-event/dist/type';
import { format } from 'date-fns';
const Report = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const [selectedType, setSelectedType] = useState("");

    const [error, setError] = useState(""); 

    
  const validateForm = () => {
    if (!name || !address || !title || !description || !selectedType || !selectedFile) {
      setError("All fields are required");
      return false;
    }else {
      setError("");
      return true;
    }
  };
  const addReport = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const currentDate = format(new Date(), 'yyyy-MM-dd');
      const userEmail = localStorage.getItem('user_email'); 

      if (!userEmail) {
        setError("User email not found in local storage");
        return;
      }
      // If validation passes, submit the form
      let getData = new FormData();

      getData.append('name', name);
      getData.append('address', address);
      getData.append('title', title);
      getData.append('description', description);
      getData.append('date', currentDate);
      getData.append('file', selectedFile);
      getData.append('type', selectedType);
      getData.append('email', userEmail);

      getData.append('function', 2);

      axios({
        method: "POST",
        url: "https://getcms.online/mp3_db.php",
        data: getData,
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      })
      .then((response) => {
        alert("Thank you for submitting the report. We take your privacy seriously, and all the information you've provided is securely stored and protected. If you have any questions or need further assistance, please don't hesitate to contact us.")
        alert("Report Submitted Successfully");
      })
      .catch((error) => {
        console.error("Error submitting report:", error);
        setError("Error submitting report. Please try again later.");
      });
    }
  };
    return ( 

        <>
        <Home></Home>
      <div className="container ">
        <div className="d-flex justify-content-center card-container" >
            <div class="card mx-auto mx-md-0 " style={{marginTop:'90px'}}>
                <div class="card-header">
                    REPORT FORM
                </div>

                <div class="card-body">
                {error && <div className="alert alert-danger">{error}</div>}
                    <form action="#" method="post" enctype="multipart/form-data">
                        <div class="form-group">
                            <label for="name">Reporter Name*</label>
                            <input class="form-control" type="text" name="name" onChange={(e) =>setName(e.target.value)} />
                        </div>
                       
                      
                                <div class="form-group">
                                    <label for="village">Address:*</label>
                                    <input class="form-control" type="text" name="address" placeholder="Enter your address" onChange={(e) =>setAddress(e.target.value)}/>
                                </div>
                         
                        <div class="form-group">
                            <label for="title">Report Title*</label>
                            <input class="form-control" type="text" name="title" placeholder="Report Title" onChange={(e) =>setTitle(e.target.value)}/>
                        </div>
                        <div class="form-group">
                            <label for="description">Report Description*</label>
                            <textarea class="form-control" id="description" name="description" placeholder="Report Description" rows="3" onChange={(e) =>setDescription(e.target.value)}></textarea>
                        </div>
                        <div class="form-group">
                            <label for="type">Type of Report</label>
                            <select class="form-control"  id="type"
                                name="type"
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}>
                                <option value="Corona Virus">Corona Virus</option>
                                <option value="Health">Health</option>
                                <option value="Food Aid">Food Aid</option>
                                <option value="Economy">Economy</option>
                                <option value="Education">Education</option>
                                <option value="Agriculture">Agriculture</option>
                                <option value="Drugs">Drugs</option>
                                <option value="Criminal Acts">Criminal Acts</option>
                                <option value="Sexual Harassment">Sexual Harassment</option>
                                <option value="Natural Disasters">Natural Disasters</option>
                                <option value="Lost Item">Lost Item</option>
                            </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="file">Attachment</label><br />
                          <input
                            className="form-control-file"
                            type="file"
                            name="file"
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                          />
                        </div><br />

                    
                        <input class="btn btn-success w-100" type="submit" name="btn" value="Report!" onClick={addReport}/>
                    </form>
                </div>

                <div class="card-footer small text-muted">
                    * must be filled
                </div>
    </div>
  </div>
</div>
            
        </>
     );
}
 
export default Report;