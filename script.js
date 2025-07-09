const chatIcon = document.getElementById('chat-icon');
const chatbot = document.getElementById('chatbot');
const chatMessages = document.getElementById('chat-messages');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');

const studentOptions = ['Library', 'Exam updates', 'ERP', 'Internship', 'Academic Calender', 'Previous Year Questions', 'Faculty'];
const parentOptions = ['Fee Details', 'Faculty', 'Placement', 'Achievements', 'Infrastructure'];
const admissionOptions = ['Admission Process', 'Courses Offered at JIMS', 'Industry Connect', 'Infrastructure', 'Events'];

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
  showBotMessage("👋 Hello! I'm <strong style='color:#007bff;'>Jino</strong>. Are you a:");
  setTimeout(() => {
    showOptions(['Admission Aspirant', 'Student', 'Parent', 'Job Seeker'], true);
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
    showBotMessage("👋 Hello! I'm <strong style='color:#007bff;'>Jino</strong>. Are you a:");
    setTimeout(() => {
      showOptions(['Admission Aspirant', 'Student', 'Parent', 'Job Seeker'], true);
    }, 600);
  } else if (currentRole === 'student') {
    showBotMessage("🎓 What do you want to know?");
    setTimeout(() => showOptions(studentOptions), 600);
  } else if (currentRole === 'parent') {
    showBotMessage("👨‍👩‍👧‍👦 How can I help you?");
    setTimeout(() => showOptions(parentOptions), 600);
  } else if (currentRole === 'admission') {
    showBotMessage("📝 What would you like to explore?");
    setTimeout(() => showOptions(admissionOptions), 600);
  } else if (currentRole === 'job_seeker') {
    window.open('https://www.jimsd.org/career.php', '_blank');
    showBotMessage("💼 Opening career opportunities at JIMS for you!");
    setTimeout(() => {
      showBotMessage("👋 Hello! I'm <strong style='color:#007bff;'>Jino</strong>. Are you a:");
      setTimeout(() => {
        showOptions(['Admission Aspirant', 'Student', 'Parent', 'Job Seeker'], true);
      }, 400);
    }, 800);
  }
}

async function handleFlow(choice, isButtonClick = false) {
  const lowerChoice = choice.toLowerCase().trim();

  if (['student', 'parent', 'admission aspirant', 'job seeker'].includes(lowerChoice)) {
    if (lowerChoice === 'student') {
      currentRole = 'student';
      showBotMessage("🎓 Great! What do you want to know?");
      setTimeout(() => showOptions(studentOptions), 600);
    } else if (lowerChoice === 'parent') {
      currentRole = 'parent';
      showBotMessage("👨‍👩‍👧‍👦 How can I help you?");
      setTimeout(() => showOptions(parentOptions), 600);
    } else if (lowerChoice === 'admission aspirant') {
      currentRole = 'admission';
      showBotMessage("📝 What would you like to explore?");
      setTimeout(() => showOptions(admissionOptions), 600);
    } else if (lowerChoice === 'job seeker') {
      currentRole = 'job_seeker';
      window.open('https://www.jimsd.org/career.php', '_blank');
      showBotMessage("💼 Opening career opportunities at JIMS for you!");
      setTimeout(() => {
        showBotMessage("👋 Hello! I'm <strong style='color:#007bff;'>Jino</strong>. Are you a:");
        setTimeout(() => {
          showOptions(['Admission Aspirant', 'Student', 'Parent', 'Job Seeker'], true);
        }, 600);
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
      'industry': 'https://www.jimsd.org/gallery.php'
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
