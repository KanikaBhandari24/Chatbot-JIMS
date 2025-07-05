const chatIcon = document.getElementById('chat-icon');
const chatbot = document.getElementById('chatbot');
const chatMessages = document.getElementById('chat-messages');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');

const studentOptions = ['Library', 'Exam updates', 'ERP', 'Internship', 'Academic Calender', 'Previous Year Questions', 'Faculty'];
const parentOptions = ['Fee Details', 'Faculty', 'Placement', 'Achievements', 'Infrastructure'];
const admissionOptions = ['Admission Process', 'Courses Offered at JIMS', 'Academic Calender', 'Infrastructure', 'Events'];

let currentRole = null;

const closeChatBot = () => {
  chatbot.style.display = 'none';
  chatIcon.style.display = 'block';
  chatMessages.innerHTML = '';
};

chatIcon.onclick = () => {
  chatbot.style.display = 'flex';
  chatIcon.style.display = 'none';
  currentRole = null;
  chatMessages.innerHTML = '';
  showBotMessage("👋 Hello! I'm JIMS Assistant. Are you a:");
  setTimeout(() => {
    showOptions(['New Admission', 'Student', 'Parent', 'Career at JIMS'], true);
  }, 600);
};

sendBtn.onclick = () => handleUserInput(false);
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleUserInput(false);
});

function handleUserInput(isButtonClick = false) {
  const text = userInput.value.trim();
  if (!text) return;
  showUserMessage(text);
  userInput.value = '';
  handleFlow(text, isButtonClick);
}

function showUserMessage(text) {
  const msg = document.createElement('div');
  msg.className = 'user';
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showBotMessage(text) {
  const temp = document.createElement('div');
  temp.className = 'bot dm-sans-unique';
  temp.style.visibility = 'hidden';
  temp.innerHTML = text;
  chatMessages.appendChild(temp);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  const width = temp.offsetWidth;
  const height = temp.offsetHeight;
  chatMessages.removeChild(temp);

  const typing = document.createElement('div');
  typing.className = 'typing';
  typing.style.width = width + 'px';
  typing.style.height = height + 'px';
  typing.innerHTML = '<span>...</span>';
  chatMessages.appendChild(typing);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  setTimeout(() => {
    typing.remove();
    const msg = document.createElement('div');
    msg.className = 'bot';
    msg.innerHTML = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 500);
}

function showOptions(options, isRoot = false) {
  const existingWrappers = document.querySelectorAll('.option-wrapper');
  existingWrappers.forEach(wrapper => wrapper.remove());

  const wrapper = document.createElement('div');
  wrapper.className = 'option-wrapper';

  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.onclick = () => {
      showUserMessage(opt);
      handleFlow(opt, true);
    };
    wrapper.appendChild(btn);
  });

  if (!isRoot) {
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = '<i class="fa-solid fa-arrow-left"></i> Back';
    backBtn.onclick = () => {
      wrapper.remove();
      currentRole = null;
      showPreviousOptions();
    };
    wrapper.appendChild(backBtn);
  }

  chatMessages.appendChild(wrapper);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showPreviousOptions() {
  if (!currentRole) {
    showBotMessage("👋 Hello! I'm JIMS Assistant. Are you a:");
    setTimeout(() => {
      showOptions(['New Admission', 'Student', 'Parent', 'Career at JIMS'], true);
    }, 600);
  } else if (currentRole === 'student') {
    showBotMessage("🎓 What do you want to know?");
    setTimeout(() => {
      showOptions(studentOptions);
    }, 600);
  } else if (currentRole === 'parent') {
    showBotMessage("👨‍👩‍👧‍👦 How can I help you?");
    setTimeout(() => {
      showOptions(parentOptions);
    }, 600);
  } else if (currentRole === 'admission') {
    showBotMessage("📝 What would you like to explore?");
    setTimeout(() => {
      showOptions(admissionOptions);
    }, 600);
  } else if (currentRole === 'career at jims') {
    window.open('https://www.jimsd.org/placements.php', '_blank');

    // Step 1: Show the first message
    showBotMessage("💼 Opening career opportunities at JIMS for you!");

    // Step 2: After delay, show the next message + options
    setTimeout(() => {
      showBotMessage("👋 Hello! I'm JIMS Assistant. Are you a:");

      setTimeout(() => {
        showOptions(['New Admission', 'Student', 'Parent', 'Career at JIMS'], true);
      }, 400); // small delay to let the previous message render before showing options

    }, 800); // adjust delay as needed (should match how fast one message animates in)
  }
}

async function handleFlow(choice, isButtonClick = false) {
  const lowerChoice = choice.toLowerCase().trim();

  if (['student', 'parent', 'new admission', 'career at jims'].includes(lowerChoice)) {
    if (lowerChoice === 'student') {
      currentRole = 'student';
      showBotMessage("🎓 Great! What do you want to know?");
      setTimeout(() => {
        showOptions(studentOptions);
      }, 600);
    } else if (lowerChoice === 'parent') {
      currentRole = 'parent';
      showBotMessage("👨‍👩‍👧‍👦 How can I help you?");
      setTimeout(() => {
        showOptions(parentOptions);
      }, 600);
    } else if (lowerChoice === 'new admission') {
      currentRole = 'admission'; // Internally use 'admission' for consistency
      showBotMessage("📝 What would you like to explore?");
      setTimeout(() => {
        showOptions(admissionOptions);
      }, 600);
    } else if (lowerChoice === 'career at jims') {
      currentRole = 'career at jims';

      // Open placement page
      window.open('https://www.jimsd.org/career.php', '_blank');

      // Step 1: Show career message
      showBotMessage("💼 Opening career opportunities at JIMS for you!");

      // Step 2: Wait, then show next bot message
      setTimeout(() => {
        const msgText = "👋 Hello! I'm JIMS Assistant. Are you a:";
        showBotMessage(msgText);

        // Step 3: Wait for that message to appear fully before showing options
        setTimeout(() => {
          showOptions(['New Admission', 'Student', 'Parent', 'Career at JIMS'], true);
        }, 600); // Give enough time for the message to appear
      }, 800);

      return;
    }
    return;
  }

  const links = {
    student: {
      'exam': 'http://www.ipu.ac.in/exam_notices.php',
      'library': 'https://www.jimsd.org/lib/index.php',
      'erp': 'https://beta.edumarshal.com/',
      'internship': 'https://www.jimsd.org/internship.php',
      'academic calender': 'https://www.jimsd.org/calender.php',
      'previous': 'https://www.jimsd.org/lib/question.php',
      'faculty': 'https://www.jimsd.org/faculty.php',
    },
    parent: {
      'fee': '',
      'placement': 'https://www.jimsd.org/placements.php',
      'infrastructure': 'https://www.jimsd.org/institute.php',
      'achievements': 'https://www.jimsd.org/achievement.php',
      'faculty': 'https://www.jimsd.org/faculty.php',
    },
    admission: {
      'admission': 'https://www.jimsd.org/admissions.php',
      'courses': 'https://www.jimsd.org/programs.php',
      'infrastructure': 'https://www.jimsd.org/institute.php',
      'events': 'https://www.jimsd.org/events.php',
      'calendar': 'https://www.jimsd.org/calender.php',
      'academic': 'https://www.jimsd.org/calender.php'
    }
  };

  if (currentRole && links[currentRole]) {
    const currentLinks = links[currentRole];
    for (const key in currentLinks) {
      if (lowerChoice.includes(key)) {
        window.open(currentLinks[key], '_blank');
        setTimeout(() => {
          showOptions(Object.keys(currentLinks).map(k => capitalize(k)));
        }, 500);
        return;
      }
    }
  }

  if (!isButtonClick) {
    showBotMessage("🤖 Please choose an option from the list.");
    showPreviousOptions();
  }
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
