import Upload from "./firebase.js";



document.addEventListener('DOMContentLoaded', () => {
    // Selecting form elements and resume container
    const resumeForm = document.getElementById('resumeForm')  ;
    const resumeContainer = document.getElementById('resume') ;
    const resumeLink = document.getElementById('resume-link') ;


   

    let currentResumeData

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
        <div class="btn-div">
            <button class="edit-btn">Edit</button>
        </div>
      `;
    }

    function switchToEditMode() {
      if (currentResumeData) {
        (document.getElementById('name') ).value = currentResumeData.name;
        (document.getElementById('email') ).value = currentResumeData.email;
        (document.getElementById('education') ).value = currentResumeData.education;
        (document.getElementById('institution') ).value = currentResumeData.institution;
        (document.getElementById('jobTitle') ).value = currentResumeData.jobTitle;
        (document.getElementById('company') ).value = currentResumeData.company;
        (document.getElementById('communication') ).value = currentResumeData.communication;
        (document.getElementById('leadership') ).value = currentResumeData.leadership;
        (document.getElementById('address') ).value = currentResumeData.address;
        (document.getElementById('phone') ).value = currentResumeData.phone;
        (document.getElementById('skills') ).value = currentResumeData.skills.join(',');
        
        resumeForm.style.display = 'block';
        resumeContainer.style.display = 'none';
      }
    }

    resumeForm.addEventListener('submit',(event) => {
      event.preventDefault();

      const  num = Math.random()*10 

      const formData = {
        name: (document.getElementById('name')  ).value,
        email: (document.getElementById('email')   ).value,
        education: (document.getElementById('education')   ).value,
        institution: (document.getElementById('institution')  ).value,
        jobTitle: (document.getElementById('jobTitle')   ).value,
        company: (document.getElementById('company')   ).value,
        communication: (document.getElementById('communication')  ).value,
        leadership: (document.getElementById('leadership')   ).value,
        address: (document.getElementById('address')   ).value,
        phone: (document.getElementById('phone')   ).value,
        website: "",
        skills: (document.getElementById('skills')   ).value.split(','),
        image: null,
      };

      const imageInput = document.getElementById('image')   ;

      if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
          formData.image = e.target?.result;
          currentResumeData = formData;
          resumeContainer.innerHTML = generateResume(formData);
          resumeLink.innerText = window.location.href + (document.getElementById('email')).value + num
          resumeLink.setAttribute('href', `${window.location.href + "pages/view.html?username=" + (document.getElementById('email')).value + num}`);
          resumeForm.style.display = 'none';
          resumeContainer.style.display = 'block';
        };

        Upload(formData,(document.getElementById('email')).value + num)

        reader.readAsDataURL(imageInput.files[0]);
      } else {
        currentResumeData = formData;
        resumeContainer.innerHTML = generateResume(formData);
        resumeForm.style.display = 'none';
        resumeContainer.style.display = 'block';
      }
    });

    // Use event delegation to handle clicks on dynamically created elements
    document.body.addEventListener('click', (event) => {
      const target = event.target;
      if (target.classList.contains('edit-btn')) {
        switchToEditMode();
      }
    });
});
