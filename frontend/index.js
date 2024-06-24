async function sprintChallenge5() { // Note the async keyword so you can use `await` inside sprintChallenge5
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇

  // 👇 ==================== TASK 1 START ==================== 👇

  // 🧠 Use Axios to GET learners and mentors.
  // ❗ Use the variables `mentors` and `learners` to store the data.
  // ❗ Use the await keyword when using axios.
  const footer = document.querySelector('footer')
  
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY`

  const cards = document.querySelector(".cards");

  function updateHeaderText(text) {
    const header = document.querySelector('header p');

    if (header) {
      header.textContent = text;
    }
  }

  async function getLearnersFromAPI(apiUrl) {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      return [];
    }
  }
  


  let mentors = [] // fix this
  let learner = [] // fix this

  // 👆 ==================== TASK 1 END ====================== 👆

  // 👇 ==================== TASK 2 START ==================== 👇

  // 🧠 Combine learners and mentors.
  // ❗ At this point the learner objects only have the mentors' IDs.
  // ❗ Fix the `learners` array so that each learner ends up with this exact structure:
  // {
  //   id: 6,
  //   fullName: "Bob Johnson",
  //   email: "bob.johnson@example.com",
  //   mentors: [
  //     "Bill Gates",
  //     "Grace Hopper"
  //   ]`
  // }
  function getMentorDetails(mentorId, mentorList) {
    const mentor = mentorList.find(mentor => mentor.id === mentorId);
    return mentor;
  }

  async function createCard({id, fullName, email, mentors}) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');

    const name = document.createElement('h3');
    name.textContent = `${fullName}`;

    const contact = document.createElement('div');
    contact.textContent = `${email}`;

    const teacher = document.createElement('h4');
    teacher.classList.add('closed');
    teacher.textContent = `Mentors`;

    const mentorListElement = document.createElement('ul');
    mentorListElement.classList.add('closed');
    
    mentors.forEach(mentorId => {
      const mentor = getMentorDetails(mentorId, mentorList);
      const mentorItem = document.createElement('li');
      mentorItem.textContent = `${mentor.firstName} ${mentor.lastName}`;
      mentorListElement.appendChild(mentorItem);
    })

    cardElement.appendChild(name);
    cardElement.appendChild(contact);
    cardElement.appendChild(teacher);
    cardElement.appendChild(mentorListElement);

    cardElement.addEventListener("click", () => {
      const cardsContainer = document.querySelector(".cards");
      const selectedCard = cardsContainer.querySelector(".selected");
      if(!cardElement.classList.contains("selected")){
        cardElement.classList.add("selected");
      }
      if(selectedCard){
        selectedCard.classList.remove("selected");
      }
      const isSelected = cardElement.classList.contains("selected");
      const leanerIdElement = name.querySelector('.leaner-id');
      if(isSelected) {
        if(!leanerIdElement) {
          const learnerId = document.createElement('span');
          learnerId.textContent = ` ID ${id}`;
          learnerId.classList.add('leaner-id');
          name.textContent = `${fullName},`;
          name.appendChild(learnerId);
        }
        updateHeaderText(`the selected learner is ${fullName}`); 
      } else {
        if (leanerIdElement) {
          name.textContent = `${fullName}`;
          leanerIdElement.remove();
          updateHeaderText('No learner is selected');
        }
      }
    })
  // toggle mentor list
  teacher.addEventListener("click", () => {
    teacher.classList.toggle("open");
    teacher.classList.toggle("closed");
  });

  cards.appendChild(cardElement);
  }

  const learnerApiUrl = "http://localhost:3003/api/learners";
  const mentorApiUrl = "http://localhost:3003/api/mentors";


  // 👇 ==================== TASK 3 START ==================== 👇

    // 🧠 Flesh out the elements that describe each learner
    // ❗ Give the elements below their (initial) classes, textContent and proper nesting.
    // ❗ Do not change the variable names, as the code that follows depends on those names.
    // ❗ Also, loop over the mentors inside the learner object, creating an <li> element for each mentor.
  
    const[learners, mentorList] = await Promise.all([
    getLearnersFromAPI(learnerApiUrl),
    getMentorsFromAPI(mentorApiUrl)
  ]);
  
  learners.forEach(createCard);

    

    // 👆 ==================== TASK 3 END ====================== 👆

    // 👆 WORK ONLY ABOVE THIS LINE 👆
    // 👆 WORK ONLY ABOVE THIS LINE 👆
    // 👆 WORK ONLY ABOVE THIS LINE 👆
    card.appendChild(mentorsList)
    card.dataset.fullName = learner.fullName
    cardsContainer.appendChild(card)

    card.addEventListener('click', evt => {
      const mentorsHeading = card.querySelector('h4')
      // critical booleans
      const didClickTheMentors = evt.target === mentorsHeading
      const isCardSelected = card.classList.contains('selected')
      // do a reset of all learner names, selected statuses, info message
      document.querySelectorAll('.card').forEach(crd => {
        crd.classList.remove('selected')
        crd.querySelector('h3').textContent = crd.dataset.fullName
      })
      info.textContent = 'No learner is selected'
      // conditional logic
      if (!didClickTheMentors) {
        // easy case, no mentor involvement
        if (!isCardSelected) {
          // selecting the card:
          card.classList.add('selected')
          heading.textContent += `, ID ${learner.id}`
          info.textContent = `The selected learner is ${learner.fullName}`
        }
      } else {
        // clicked on mentors, we toggle and select no matter what
        card.classList.add('selected')
        if (mentorsHeading.classList.contains('open')) {
          mentorsHeading.classList.replace('open', 'closed')
        } else {
          mentorsHeading.classList.replace('closed', 'open')
        }
        if (!isCardSelected) {
          // if card was not selected adjust texts
          heading.textContent += `, ID ${learner.id}`
          info.textContent = `The selected learner is ${learner.fullName}`
        }
      }
    })
  }

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`


// ❗ DO NOT CHANGE THIS CODE. WORK ONLY INSIDE TASKS 1, 2, 3
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
