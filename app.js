// Selecting form elements and resume container
var resumeForm = document.getElementById('resumeForm');
var resumeContainer = document.getElementById('resume');
// Function to generate the resume HTML
function generateResume(data) {
    return "\n    <div class=\"resume-container\">\n        <div class=\"left-column\">\n            <div class=\"profile-image\">\n                <img src=\"".concat(data.image, "\" alt=\"Profile Image\" />\n            </div>\n            <div class=\"contact-section\">\n                <h2>Contact</h2>\n                <p>").concat(data.address, "</p>\n                <p>").concat(data.phone, "</p>\n                <p>").concat(data.email, "</p>\n            </div>\n            <div class=\"communication-section\">\n                <h2>Communication</h2>\n                <p>").concat(data.communication, "</p>\n            </div>\n            <div class=\"leadership-section\">\n                <h2>Leadership</h2>\n                <p>").concat(data.leadership, "</p>\n            </div>\n        </div>\n        <div class=\"right-column\">\n            <div class=\"name-section\">\n                <h1>").concat(data.name, "</h1>\n                <h3>").concat(data.jobTitle, "</h3>\n            </div>\n            <div class=\"education-section\">\n                <h2>Education</h2>\n                <p>").concat(data.education, "</p>\n            </div>\n            <div class=\"experience-section\">\n                <h2>Experience</h2>\n                <p>").concat(data.jobTitle, " at ").concat(data.company, "</p>\n            </div>\n            <div class=\"references-section\">\n                <h2>References</h2>\n                <p>Available upon request</p>\n            </div>\n        </div>\n    </div>\n  ");
}
// Function to handle form submission
resumeForm.addEventListener('submit', function (event) {
    event.preventDefault();
    // Get form data
    var formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        education: document.getElementById('education').value,
        institution: document.getElementById('institution').value,
        jobTitle: document.getElementById('jobTitle').value,
        company: document.getElementById('company').value,
        communication: document.getElementById('communication').value,
        leadership: document.getElementById('leadership').value,
        address: document.getElementById('address').value,
        phone: document.getElementById('phone').value,
        website: "", // You can add this field if required
        skills: document.getElementById('skills').value.split(','),
        image: null, // We'll handle the image separately
    };
    var imageInput = document.getElementById('image');
    // Check if an image was uploaded
    if (imageInput.files && imageInput.files[0]) {
        var reader = new FileReader();
        // When the image is loaded, generate the resume
        reader.onload = function (e) {
            var _a;
            formData.image = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result; // base64 or blob URL
            resumeContainer.innerHTML = generateResume(formData);
        };
        // Read the image file
        reader.readAsDataURL(imageInput.files[0]);
    }
    else {
        // If no image, generate the resume without an image
        resumeContainer.innerHTML = generateResume(formData);
    }
});
