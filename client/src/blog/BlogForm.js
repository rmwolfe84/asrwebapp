// website-root/js/components/blog/BlogForm.js
import { generateBlogContentAPI, submitBlogPostAPI } from './BlogService.js'; // Use ES Module import

class BlogForm {
    constructor(containerElement) {
        this.container = containerElement;
        this.generatedContent = null; // Store generated content temporarily
        this.currentPrompt = null; // Store the prompt used
        this.render();
        this.bindEvents();
    }

    render() {
        this.container.innerHTML = `
      <h3>Create New Blog Post</h3>
      <form id="blog-form">
        <div class="form-group">
            <label for="blog-title">Title:</label>
            <input type="text" id="blog-title" placeholder="Enter blog post title" required>
        </div>
        <div class="form-group">
            <label for="blog-prompt">AI Prompt:</label>
            <textarea id="blog-prompt" rows="4" placeholder="Enter a detailed prompt for the AI..."></textarea>
            <button type="button" id="generate-button" class="button">Generate Content</button>
            <span id="generate-status" class="status-message"></span>
        </div>
        <div class="form-group">
            <label for="generated-content-area">Generated Content:</label>
            <textarea id="generated-content-area" rows="10" placeholder="AI generated content will appear here..." readonly></textarea>
        </div>
        <div class="form-group">
            <label for="publish-date">Schedule Publish Date (Optional):</label>
            <input type="datetime-local" id="publish-date">
        </div>
        <button type="button" id="submit-button" class="button" disabled>Submit for Approval</button>
        <span id="submit-status" class="status-message"></span>
      </form>
    `;
        this.titleInput = this.container.querySelector('#blog-title');
        this.promptInput = this.container.querySelector('#blog-prompt');
        this.generateButton = this.container.querySelector('#generate-button');
        this.generatedContentArea = this.container.querySelector('#generated-content-area');
        this.submitButton = this.container.querySelector('#submit-button');
        this.publishDateInput = this.container.querySelector('#publish-date');
        this.generateStatus = this.container.querySelector('#generate-status');
        this.submitStatus = this.container.querySelector('#submit-status');
    }

    bindEvents() {
        this.generateButton.addEventListener('click', this.handleGenerate.bind(this));
        this.submitButton.addEventListener('click', this.handleSubmit.bind(this));
        // Enable submit only when content is generated and title is present
        this.titleInput.addEventListener('input', this.checkEnableSubmit.bind(this));
    }

    checkEnableSubmit() {
         this.submitButton.disabled = !(this.titleInput.value.trim() && this.generatedContent);
    }

    setStatus(element, message, isError = false) {
        element.textContent = message;
        element.className = `status-message ${isError ? 'error' : 'success'}`;
        // Clear message after a few seconds
        setTimeout(() => { element.textContent = ''; }, 5000);
    }

    async handleGenerate() {
        const prompt = this.promptInput.value.trim();
        if (!prompt) {
            this.setStatus(this.generateStatus, "Please enter a prompt.", true);
            return;
        }

        this.generateButton.disabled = true;
        this.generatedContentArea.value = "Generating...";
        this.setStatus(this.generateStatus, "Generating content...");
        this.generatedContent = null; // Reset content
        this.checkEnableSubmit();


        try {
            const content = await generateBlogContentAPI(prompt);
            this.generatedContent = content;
            this.currentPrompt = prompt;
            this.generatedContentArea.value = content;
            this.setStatus(this.generateStatus, "Content generated successfully!", false);
            this.checkEnableSubmit(); // Check if title is also filled now
        } catch (error) {
            this.generatedContentArea.value = "Error generating content.";
            this.setStatus(this.generateStatus, `Error: ${error.message}`, true);
            this.generatedContent = null;
            this.currentPrompt = null;
        } finally {
            this.generateButton.disabled = false;
        }
    }

    async handleSubmit() {
        const title = this.titleInput.value.trim();
        const publishDate = this.publishDateInput.value || null;

        if (!title || !this.generatedContent) {
            this.setStatus(this.submitStatus, "Title and generated content are required.", true);
            return;
        }

        this.submitButton.disabled = true;
        this.setStatus(this.submitStatus, "Submitting...");

        const postData = {
            title: title,
            content: this.generatedContent,
            prompt: this.currentPrompt,
            publishDate: publishDate,
        };

        try {
            const result = await submitBlogPostAPI(postData);
            this.setStatus(this.submitStatus, result.message || "Post submitted successfully!", false);
            this.resetForm();
            // Optionally dispatch an event so the parent component (blog.js) knows
            this.dispatchEvent('blogSubmitted', result.post);
        } catch (error) {
            this.setStatus(this.submitStatus, `Error: ${error.message}`, true);
            this.submitButton.disabled = false; // Re-enable on error
        }
    }

    resetForm() {
        this.titleInput.value = '';
        this.promptInput.value = '';
        this.generatedContentArea.value = '';
        this.publishDateInput.value = '';
        this.generatedContent = null;
        this.currentPrompt = null;
        this.submitButton.disabled = true;
        this.generateStatus.textContent = '';
        this.submitStatus.textContent = '';
    }


    dispatchEvent(eventName, detail) {
        // CustomEvent bubbles up the DOM tree
        const event = new CustomEvent(eventName, { detail: detail, bubbles: true });
        this.container.dispatchEvent(event);
    }
}

export default BlogForm;