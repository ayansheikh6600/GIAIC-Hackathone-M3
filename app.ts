import Upload from "./firebase";

// Define the structure of the resume data using an interface
interface ResumeData {
  name: string;
  email: string;
  education: string;
  institution: string;
  jobTitle: string;
  company: string;
  communication: string;
  leadership: string;
  address: string;
  phone: string;
  website?: string;
  skills: string[];
  image: string | null;
}

const downloadPdfBtn = document.getElementById('download-pdf') as HTMLButtonElement;
const resumeForm = document.getElementById('resumeForm') as HTMLFormElement;
const resumeContainer = document.getElementById('resume') as HTMLDivElement;
const resumeLink = document.getElementById('resume-link') as HTMLAnchorElement;

let currentResumeData: ResumeData | null = null;



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


downloadPdfBtn.addEventListener('click', () => {
  const element = document.querySelector('#resume') as HTMLElement;
  const opt = {
    margin: 0.5,
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
});

function generateResume(data: ResumeData): string {
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

function switchToEditMode(): void {
  if (currentResumeData) {
    (document.getElementById('name') as HTMLInputElement).value = currentResumeData.name;
    (document.getElementById('email') as HTMLInputElement).value = currentResumeData.email;
    (document.getElementById('education') as HTMLInputElement).value = currentResumeData.education;
    (document.getElementById('institution') as HTMLInputElement).value = currentResumeData.institution;
    (document.getElementById('jobTitle') as HTMLInputElement).value = currentResumeData.jobTitle;
    (document.getElementById('company') as HTMLInputElement).value = currentResumeData.company;
    (document.getElementById('communication') as HTMLInputElement).value = currentResumeData.communication;
    (document.getElementById('leadership') as HTMLInputElement).value = currentResumeData.leadership;
    (document.getElementById('address') as HTMLInputElement).value = currentResumeData.address;
    (document.getElementById('phone') as HTMLInputElement).value = currentResumeData.phone;
    (document.getElementById('skills') as HTMLInputElement).value = currentResumeData.skills.join(',');

    resumeForm.style.display = 'block';
    resumeContainer.style.display = 'none';
  }
}

// Handle form submission
resumeForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();

  const num = Math.random() * 10;

  const formData: ResumeData = {
    name: (document.getElementById('name') as HTMLInputElement).value,
    email: (document.getElementById('email') as HTMLInputElement).value,
    education: (document.getElementById('education') as HTMLInputElement).value,
    institution: (document.getElementById('institution') as HTMLInputElement).value,
    jobTitle: (document.getElementById('jobTitle') as HTMLInputElement).value,
    company: (document.getElementById('company') as HTMLInputElement).value,
    communication: (document.getElementById('communication') as HTMLInputElement).value,
    leadership: (document.getElementById('leadership') as HTMLInputElement).value,
    address: (document.getElementById('address') as HTMLInputElement).value,
    phone: (document.getElementById('phone') as HTMLInputElement).value,
    website: '',
    skills: (document.getElementById('skills') as HTMLInputElement).value.split(','),
    image: null,
  };

  const imageInput = document.getElementById('image') as HTMLInputElement;

  if (imageInput.files && imageInput.files[0]) {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      formData.image = e.target?.result as string;
      currentResumeData = formData;
      resumeContainer.innerHTML = generateResume(formData);
      resumeLink.innerText = window.location.href + (document.getElementById('email') as HTMLInputElement).value + num;
      resumeLink.setAttribute('href', `${window.location.href + "pages/view.html?username=" + (document.getElementById('email') as HTMLInputElement).value + num}`);
      resumeForm.style.display = 'none';
      resumeContainer.style.display = 'block';
    };

    Upload(formData, (document.getElementById('email') as HTMLInputElement).value + num);

    reader.readAsDataURL(imageInput.files[0]);
  } else {
    currentResumeData = formData;
    resumeContainer.innerHTML = generateResume(formData);
    resumeForm.style.display = 'none';
    resumeContainer.style.display = 'block';
  }
});

// Event delegation to handle dynamic edit button
document.body.addEventListener('click', (event: Event) => {
  const target = event.target as HTMLElement;
  if (target.classList.contains('edit-btn')) {
    switchToEditMode();
  }
});
