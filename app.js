import Upload, { getDownloadURL, ref, storage, uploadBytesResumable } from "./firebase.js";

const imggDiv = document.getElementById("imggDiv")


document.getElementById('download-pdf').addEventListener('click', function () {
  var element = document.querySelector('#resume');
  var opt = {
    margin: 0.5,
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
});


let IMageURl;

const imgUplod = (e)=>{

  imggDiv.style.display = "block"

const file =  e.files[0]
// console.log(e.files[0]);


// Create the file metadata
/** @type {any} */
const metadata = {
  contentType: 'image/jpeg'
};

// Upload file and metadata to the object 'images/mountains.jpg'
const storageRef = ref(storage, 'images/' + file.name);
const uploadTask = uploadBytesResumable(storageRef, file, metadata);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      // console.log('File available at', downloadURL);

      IMageURl = downloadURL

      imggDiv.style.display = "none"
    });
  }
);

  


}


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
        image: IMageURl,
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



window.imgUplod = imgUplod