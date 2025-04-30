const form = document.getElementById('noteForm');
const addRecipientBtn = document.getElementById('addRecipientBtn');
const recipientsContainer = document.getElementById('recipientsContainer');
const statusMessage = document.getElementById('statusMessage');

addRecipientBtn.addEventListener('click', () => {
  const inputCount = recipientsContainer.querySelectorAll('input[name="recipientEmail"]').length;
  const newInput = document.createElement('input');
  newInput.type = 'email';
  newInput.name = 'recipientEmail';
  newInput.required = true;
  newInput.placeholder = `Recipient Email ${inputCount + 1}`;
  newInput.className = 'w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2';
  recipientsContainer.querySelector('div.space-y-2').appendChild(newInput);
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  statusMessage.textContent = '';
  const senderEmail = form.senderEmail.value.trim();
  const senderPassword = form.senderPassword.value.trim();
  const noteContent = form.noteContent.value.trim();
  const recipientInputs = form.querySelectorAll('input[name="recipientEmail"]');
  const recipients = Array.from(recipientInputs).map(input => input.value.trim()).filter(email => email.length > 0);

  if (recipients.length < 5) {
    statusMessage.textContent = 'Please enter at least 5 recipient emails.';
    statusMessage.className = 'mt-4 text-center font-semibold text-red-600';
    return;
  }

  const emailData = {
    senderEmail,
    senderPassword,
    recipients,
    subject: 'Change Over Note',
    text: noteContent,
  };

  statusMessage.textContent = 'Sending emails...';
  statusMessage.className = 'mt-4 text-center font-semibold text-blue-600';

  try {
    const result = await window.electronAPI.sendEmail(emailData);
    if (result.success) {
      statusMessage.textContent = 'Emails sent successfully!';
      statusMessage.className = 'mt-4 text-center font-semibold text-green-600';
      form.reset();
      // Reset to 5 recipient inputs
      const recipientDiv = recipientsContainer.querySelector('div.space-y-2');
      recipientDiv.innerHTML = '';
      for (let i = 1; i <= 5; i++) {
        const input = document.createElement('input');
        input.type = 'email';
        input.name = 'recipientEmail';
        input.required = true;
        input.placeholder = `Recipient Email ${i}`;
        input.className = 'w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500';
        recipientDiv.appendChild(input);
      }
    } else {
      statusMessage.textContent = `Failed to send emails: ${result.error}`;
      statusMessage.className = 'mt-4 text-center font-semibold text-red-600';
    }
  } catch (error) {
    statusMessage.textContent = `Error: ${error.message}`;
    statusMessage.className = 'mt-4 text-center font-semibold text-red-600';
  }
});
