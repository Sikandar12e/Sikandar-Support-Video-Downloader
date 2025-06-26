// Get references to the HTML elements
const downloadBtn = document.getElementById('downloadBtn');
const videoUrlInput = document.getElementById('videoUrl');
const resultDiv = document.getElementById('result');

// Add an event listener to the download button
downloadBtn.addEventListener('click', () => {
    const url = videoUrlInput.value.trim();

    // Step 1: Validate the input URL
    if (url === '') {
        showError('कृपया एक मान्य वीडियो URL दर्ज करें।');
        return;
    }
    
    // Check if the URL is from Instagram or Pinterest
    if (!url.includes('instagram.com') && !url.includes('pinterest.com')) {
        showError('केवल Instagram और Pinterest के URL ही समर्थित हैं।');
        return;
    }

    // Step 2: Show a loading indicator to the user
    showLoader();

    // Step 3: Simulate a backend API call
    // NOTE: This is a demo. In a real website, you would make a fetch request 
    // to your backend server here.
    setTimeout(() => {
        // This is a fake response object for demonstration.
        const fakeResponse = {
            success: true,
            title: 'आपका वीडियो यहाँ है!',
            thumbnail: `https://placehold.co/600x400/1e294b/ffffff?text=Video+Thumbnail`,
            downloadUrl: '#' // The real download link would come from the backend
        };

        if (fakeResponse.success) {
            showResult(fakeResponse);
        } else {
            showError('वीडियो डाउनलोड करने में विफल। कृपया पुनः प्रयास करें।');
        }
    }, 2500); // Simulate a 2.5-second delay
});

// Function to show the loading spinner
function showLoader() {
    resultDiv.innerHTML = `
        <div class="flex flex-col items-center justify-center bg-gray-800/50 p-6 rounded-lg">
            <div class="loader mb-4"></div>
            <p class="text-gray-300">वीडियो प्रोसेस हो रहा है...</p>
        </div>
    `;
}

// Function to show an error message
function showError(message) {
    resultDiv.innerHTML = `
        <div class="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
            <strong class="font-bold">त्रुटि:</strong>
            <span class="block sm:inline">${message}</span>
        </div>
    `;
}

// Function to display the final result with a download link
function showResult(data) {
    resultDiv.innerHTML = `
        <div class="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden animate-fade-in">
            <div class="md:flex">
                <div class="md:flex-shrink-0">
                    <img class="h-48 w-full object-cover md:w-48" src="${data.thumbnail}" alt="Video thumbnail">
                </div>
                <div class="p-6 flex flex-col justify-between">
                    <div>
                        <p class="text-lg font-semibold text-white">${data.title}</p>
                    </div>
                    <a href="${data.downloadUrl}" download class="mt-4 md:mt-0 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center justify-center transition duration-300">
                        <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        अभी डाउनलोड करें
                    </a>
                </div>
            </div>
        </div>
    `;
}
