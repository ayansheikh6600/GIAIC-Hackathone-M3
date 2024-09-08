import { GetData } from "../firebase.js";
const resumeForm = document.getElementById('resumeForm')  ;
    const resumeContainer = document.getElementById('resume') ;

window.onload = async() => {
 const param =new URLSearchParams(window.location.search);
 const page = param.get('username');

 console.log(param);

 const data = await GetData(page)

 if(data){

     resumeContainer.innerHTML = generateResume(data);
 }

 
 
};


function generateResume(data) {
    return `
      <div class="resume-container">
          <div class="left-column">
              <div class="profile-image">
                  <img src="${data.image || 'default-profile.png'}" alt="Profile Image" />
              </div>
              <div class="contact-section">
                  <h2>Contact</h2>
                  <p>${data.address}</p>
                  <p>${data.phone}</p>
                  <p>${data.email}</p>
              </div>
              <div class="communication-section">
                  <h2>Communication</h2>
                  <p>${data.communication}</p>
              </div>
              <div class="leadership-section">
                  <h2>Leadership</h2>
                  <p>${data.leadership}</p>
              </div>
          </div>
          <div class="right-column">
              <div class="name-section">
                  <h1>${data.name}</h1>
                  <h3>${data.jobTitle}</h3>
              </div>
              <div class="education-section">
                  <h2>Education</h2>
                  <p>${data.education}</p>
              </div>
              <div class="experience-section">
                  <h2>Experience</h2>
                  <p>${data.jobTitle} at ${data.company}</p>
              </div>
              <div class="references-section">
                  <h2>References</h2>
                  <p>Available upon request</p>
              </div>
          </div>
      </div>
      
    `;
  }