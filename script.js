/*
 * script.js
 * Global JavaScript for McLaren AI Services Website
 * Includes Text-to-Speech and Login Validation
 */

// --- Text-to-Speech Function (for text_to_speech.html) ---

/**
 * Initiates the Text-to-Speech feature using the browser's Web Speech API.
 */
function speakText() {
    const text = document.getElementById('ttsText').value;
    const statusDiv = document.getElementById('ttsStatus');

    if (!('speechSynthesis' in window)) {
        statusDiv.innerHTML = 'Status: Browser does not support Text-to-Speech.';
        return;
    }

    if (text.trim() === "") {
        statusDiv.innerHTML = 'Status: Please enter text to speak.';
        return;
    }

    // Stop any current speech before starting a new one
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set event listeners for status updates
    utterance.onstart = () => {
        statusDiv.innerHTML = 'Status: Speaking...';
    };
    utterance.onend = () => {
        statusDiv.innerHTML = 'Status: Finished speaking.';
    };
    utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event.error);
        statusDiv.innerHTML = 'Status: Error during speech. Check console for details.';
    };
    
    window.speechSynthesis.speak(utterance);
}

// --- Login Validation Function (for login.html) ---

/**
 * Performs basic client-side form validation for the login page.
 * @param {Event} event - The form submission event.
 * @returns {boolean} - True if login simulation is successful, False otherwise.
 */
function validateLogin(event) {
    event.preventDefault(); 

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const messageDiv = document.getElementById('loginMessage');
    
    messageDiv.style.color = 'red';
    
    // Check for empty fields
    if (!username || !password) {
        messageDiv.textContent = 'Error: Both username and password are required.';
        return false;
    }

    // Simple placeholder validation check (in a real app, this is server-side)
    if (username === 'admin@mclaren.com' && password === 'racing') {
        // Successful login simulation
        messageDiv.style.color = 'var(--mclaren-orange)';
        messageDiv.textContent = 'Login Successful! Access Granted (Simulation).';
        
        // Simulate redirection after a short delay
        setTimeout(() => {
            messageDiv.textContent = ''; 
            // window.location.href = 'dashboard.html'; // Actual redirect logic
        }, 2000);
        
        return true;
    } else {
        // Failed login simulation
        messageDiv.textContent = 'Login Failed: Invalid username or password.';
        return false;
    }
}


// --- Global Event Listener for Logout (for all pages) ---

/**
 * Shows a temporary message box for simulated logout.
 */
function showMessageBox(text) {
    let messageBox = document.createElement('div');
    messageBox.textContent = text;
    messageBox.className = 'message-box'; 
    document.body.appendChild(messageBox);

    setTimeout(() => {
        messageBox.style.opacity = '0';
        setTimeout(() => messageBox.remove(), 300); // Remove after fade
    }, 2700); 
}

/**
 * Handles the simulated logout action globally.
 */
function handleLogout(event) {
    event.preventDefault();
    showMessageBox('Logged out successfully (Simulation).');
    // In a real application, session data would be cleared here.
}

// Attach logout function to all 'Logout' links on page load
document.addEventListener('DOMContentLoaded', () => {
    // Attempt to set CSS variables if not already defined (ensures message box styles work)
    if (!document.documentElement.style.getPropertyValue('--mclaren-orange')) {
        document.documentElement.style.setProperty('--mclaren-orange', '#FF8700');
        document.documentElement.style.setProperty('--mclaren-dark', '#1F1F1F');
    }

    const logoutLinks = document.querySelectorAll('nav a[href="#"]');
    logoutLinks.forEach(link => {
        link.addEventListener('click', handleLogout);
    });
});