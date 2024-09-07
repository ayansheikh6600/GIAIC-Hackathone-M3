// Selecting form elements and resume container
const resumeForm = document.getElementById('resumeForm') as HTMLFormElement;
const resumeContainer = document.getElementById('resume') as HTMLElement;

// Interface for form data structure
interface ResumeData {
  name: string;
  email: string;
  education: string;
  institution: string;
  jobTitle: string;
  company: string;
  phone: string;
  communication: string;
  address: string;
  website: string;
  leadership: string;
  skills: string[];
  image: string | null;
}


function generateResume(data: ResumeData): string {
  return `
    <div class="resume-container">
        <div class="left-column">
            <div class="profile-image">
                <img src="${data.image}" alt="Profile Image" />
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


resumeForm.addEventListener('submit', (event) => {
  event.preventDefault();


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
    website: "",
    skills: (document.getElementById('skills') as HTMLInputElement).value.split(','),
    image: null,
  };

  const imageInput = document.getElementById('image') as HTMLInputElement;

  if (imageInput.files && imageInput.files[0]) {
    const reader = new FileReader();

   
    reader.onload = (e) => {
      formData.image = e.target?.result as string;
      resumeContainer.innerHTML = generateResume(formData);
    };

    reader.readAsDataURL(imageInput.files[0]);
  } else {
    resumeContainer.innerHTML = generateResume(formData);
  }
});
