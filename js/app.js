
// to hold students after fetching them from API
let temStudents;
const URL = 'https://script.google.com/macros/s/AKfycbwhXSfQLSoM_AgY1sSpmHu_hFuMRNVFgG5Igioag1NKOjbcaIg/exec';
const URL_TRY = 'https://script.google.com/macros/s/AKfycbwOKZHRCQOP0yuT8GUIylUrWm2XfDoVGROpBzA/exec';

// Get students from API
const getStudents = (groupId)=>{
  fetch(URL_TRY+"?id=" + groupId)
  .then(response =>{
   return response.json();
  })
  .then(data => {
    // Create students from API
    let students1 = [];
    data.students.forEach(student => {
      students1.push(new Student(student.name, groupId,student.id, student.email, student.type))
    });
    // assign students to temporary Student variable
    temStudents = students1;
    // fill the date field with date
    setDate()
    // load Group according to group id
    loadGroup(groupId,students1);
  })
}



// assign functionality to the group's button
function chooseGroup() {
  if (navigator.onLine){
    //add onclick each button
    const btn2 = document.getElementById("btn0");
    btn2.onclick = function() {
      getStudents(1)
    };
    const btn3 = document.getElementById("btn1");
    btn3.onclick = function() {
      getStudents(2)
    };
    const btn4 = document.getElementById("btn2");
    btn4.onclick = function() {
      getStudents(3)
    };
  }else{
    alert('there is not internet connection!');
  }
}

// function to set the date
function setDate() {
  let today = new Date().toISOString().substr(0, 10);
  document.querySelector("#date-picker").value = today;
}

// loading students page
function loadGroup(groupId, students) {
  document.getElementById("main-container").hidden = true;
  document.getElementById("date-picker").hidden = false;
  document.getElementById("try").innerHTML = "";
  document.getElementById("send-btn-container").innerHTML = "";
  document.getElementById("group-id").innerHTML = `<h4>Group ${groupId}</h4>`;
  students.forEach(student=> {
    document.getElementById("try").innerHTML += `<div>
        <div class="card ${student.isSelected ? 'selected' : ''}" id="card-${student.codeNumber}">
          <div id="banner-${student.codeNumber}" class="${student.type.class}">
            <div class="avatar ${student.type.avatar}"><span class="points-counter">${student.random}</span></div>
          </div>
          <div class="show-name">
            <h3>${student.name}</h3>
            <div class="show-info">
              <a href="">📧 ${student.email}</a>
              <a href="">🌐 ${student.codeNumber}</a>
            </div>
          </div>
          <ul>
            <span title="${student.status.name}" class="check-attendance" id="user-status-${student.codeNumber}">
              <i class="${student.status.class}"></i>
            </span>
            <span id="bad-behavior-btn-${student.codeNumber}" class="behavior">
              <i class="fas fa-exclamation-triangle"></i>
              <small>${student.getBadBehavior()}</small>
            </span>
            <span id="random-btn-${student.codeNumber}" class="up-arrow">
              <i class="up-arrow fas fa-arrow-circle-up"></i>
            </span>
            <span id="random-sub-btn-${student.codeNumber}" class="down-arrow">
              <i class="fas fa-arrow-circle-down"></i>
            </span>
            <span id="star-student-${student.codeNumber}" class="star-student">
              <i class="fas fa-medal"></i>
            </span>
            <span id="med-student-${student.codeNumber}" class="med-student">
              <i class="fas fa-user-md"></i>
            </span>
            </br>
            <span ${student.tools ? '' : 'style="color:red"'} id="tools-student-${student.codeNumber}" class="tools-student">
              <i class="fas fa-tools"></i>
            </span>
            <span id="chat-student-${student.codeNumber}" class="chat-student">
              <i class="fas fa-comments">
                <small>${student.getChat()}</small>
              </i>
            </span>
            <span id="participation-student-${student.codeNumber}" class="participation-student">
              <i class="fas fa-user-plus">
                <small>${student.getParticipation()}</small>
              </i>
            </span>
            <span id="sleep-student-${student.codeNumber}" class="sleep-student">
              <i class="fas fa-user-alt-slash">
                <small>${student.getSleep()}</small>
              </i>
            </span>
            <span id="note-student-${student.codeNumber}" class="note-student">
              <i class="fas fa-user-edit">
                <small>${student.getNote()}</small>
              </i>
            </span>
            <div class="tweet-box">
              <div id="like-${student.codeNumber}" class="like">
              </div>
            </div>
          </ul>
        </div>
        <!--card end-->
      </div>`;


  });

  document.getElementById("send-btn-container").innerHTML += `<button type="button" class="btn btn-outline-info btn-lg m-3" id="btn-send">ارسال البيانات</button>`;
  
  
  document.getElementById("send-btn-container").innerHTML += `<!-- Button trigger modal -->
        <button id="random-button" type="button" class="btn btn-outline-primary btn-lg m-3" data-toggle="modal" data-target="#exampleModalCenter">
          أختيار عشوائي
        </button>`;
  document.getElementById("random-button").onclick = function () {
    pickRandomStudent();
  };

  // addingEvents(students);
  document.getElementById("btn-send").onclick = function () {
    sendData(temStudents);
  };
  functionalityToCards(students);
  // ifAbsentDisable(students);
}


// looping function to send form every 3 sec
let i = 0; //  set your counter to 1
// send data to the form and disable send button
function sendData(students) {
  if (!navigator.onLine){
    alert('there is no internet connection!');
  }else{

    let dateNow = document.getElementById('date-picker').value;
    setTimeout(()=>{
      student = students[i];
      const sendUrl =
        URL_TRY +
        "?date=" +
        dateNow +
        "&number=" +
        student.codeNumber +
        "&name=" +
        student.name +
        "&participation=" +
        student.participation +
        "&type=" +
        student.type.name +
        "&badBehavior=" +
        student.badBehavior +
        "&tools=" +
        student.tools +
        "&random=" +
        student.random +
        "&status=" +
        student.status.name +
        "&chat=" +
        student.chat +
        "&sleep=" +
        student.sleep +
        "&note=" +
        student.note +
        "&group=" +
        student.group +
        "&action=insert";
      fetch(sendUrl).then(res => {
      return res.json()
      }).then(data => console.log(i,data));
      i++;
      if(i < students.length){
        sendData(temStudents);
      };
    },3000);
    document.getElementById("btn-send").disabled = true;
  }
}


function ifAbsentDisable(students) {
  for (let i = 0; i < students.length; i++) {
    if (students[i].status == "Absent") {
      document.getElementById("participation-btn-" + students[i].codeNumber).disabled = true;
    } else {
      document.getElementById("participation-btn-" + students[i].codeNumber).disabled = false;
    }
  }
}


// Choose Random Student
let counter = 0;
function pickRandomStudent() {
  if(counter >= temStudents.length){
    document.querySelector('#btn-random').disabled = true;
    console.log('done');
  }else{
    const randomStudent = temStudents[Math.floor(Math.random() * temStudents.length)];
    const goToStudent = document.getElementById('card-' + randomStudent.codeNumber);
    if(goToStudent.className == 'card selected'){
      pickRandomStudent();
    }else{
      counter++;
      goToStudent.scrollIntoView();
      goToStudent.className = 'card selected';
      randomStudent.setIsSelected();
      renderRandom(randomStudent);
      // functionalityToRandomCards(randomStudent);
    }
  }
}

function renderRandom (randomStudent){
  document.getElementById('modal-body-add').innerHTML = `<div>
        <div class="card" id="card-${randomStudent.codeNumber}">
          <div id="random-banner-${randomStudent.codeNumber}" class="${randomStudent.type.class}">
            <div class="avatar ${randomStudent.type.avatar}"><span class="points-counter">${randomStudent.random}</span></div>
          </div>
          <div class="show-name">
            <h3>${randomStudent.name}</h3>
            <div class="show-info">
              <a href="">📧 ${randomStudent.email}</a>
              <a href="">🌐 ${randomStudent.codeNumber}</a>
            </div>
          </div>
          <ul>
            <span title="${randomStudent.status.name}" class="check-attendance" id="random-user-status-${randomStudent.codeNumber}">
              <i class="${randomStudent.status.class}"></i>
            </span>
            <span id="random-bad-behavior-btn-${randomStudent.codeNumber}" class="behavior">
              <i class="fas fa-exclamation-triangle"></i>
              <small>${randomStudent.getBadBehavior()}</small>
            </span>
            <span id="random-random-btn-${randomStudent.codeNumber}" class="up-arrow">
              <i class="up-arrow fas fa-arrow-circle-up"></i>
            </span>
            <span id="random-random-sub-btn-${randomStudent.codeNumber}" class="down-arrow">
              <i class="fas fa-arrow-circle-down"></i>
            </span>
            <span id="random-star-student-${randomStudent.codeNumber}" class="star-student">
              <i class="fas fa-medal"></i>
            </span>
            <span id="random-med-student-${randomStudent.codeNumber}" class="med-student">
              <i class="fas fa-user-md"></i>
            </span>
            </br>
            <span ${randomStudent.tools ? '' : 'style="color:red"'} id="random-tools-student-${randomStudent.codeNumber}" class="tools-student">
              <i class="fas fa-tools"></i>
            </span>
            <span id="random-chat-student-${randomStudent.codeNumber}" class="chat-student">
              <i class="fas fa-comments">
                <small>${randomStudent.getChat()}</small>
              </i>
            </span>
            <span id="random-participation-student-${randomStudent.codeNumber}" class="participation-student">
              <i class="fas fa-user-plus">
                <small>${randomStudent.getParticipation()}</small>
              </i>
            </span>
            <span id="random-sleep-student-${randomStudent.codeNumber}" class="sleep-student">
              <i class="fas fa-user-alt-slash">
                <small>${randomStudent.getSleep()}</small>
              </i>
            </span>
            <span id="random-note-student-${randomStudent.codeNumber}" class="note-student">
              <i class="fas fa-user-edit">
                <small>${randomStudent.getNote()}</small>
              </i>
            </span>
            <div class="tweet-box">
              <div id="random-like-${randomStudent.codeNumber}" class="like">
              </div>
            </div>
          </ul>
        </div>
        <!--card end-->
      </div>`;
  functionalityToRandomCards(randomStudent);
}

//first act load groups
chooseGroup();



const functionalityToCards =  students => {
  students.forEach(student=>{

    document.getElementById("bad-behavior-btn-" + student.codeNumber).onclick = function () {
      student.setBadBehavior();
      loadGroup(student.group, temStudents);
    };
    document.getElementById("random-btn-" + student.codeNumber).onclick = function () {
      student.setRandom();
      if (student.random > 1 && student.type.name != "gold") {
        student.setType({ 'name': 'normal', 'class': 'banner', 'avatar': 'avatar-img' });
      }
      loadGroup(student.group, temStudents);
    };
    document.getElementById("random-sub-btn-" + student.codeNumber).onclick = function () {
      student.setRandomSub();
      if(student.random < -2 && student.random > -4){
        student.setType({ 'name': 'normal', 'class': 'banner' , 'avatar': 'avatar-img'});
      }else if (student.random <= -10){
        student.setType({ 'name': 'low', 'class': 'banner-care', 'avatar': 'avatar-low-img'});
      }
      loadGroup(student.group, temStudents);
    }; 

    // - - - - - - - - - Set the status of the student - - - - - - - - - //
    const userStatus = document.getElementById('user-status-'+student.codeNumber);
    userStatus.addEventListener('click', (e) => {
      const className = userStatus.firstElementChild.className;
      if (student.status.name == "Present") {
        student.setStatus({ 'name': 'Late', 'class': 'fas fa-user-clock'});
        loadGroup(student.group, temStudents);
      } else if (student.status.name == 'Late') {
        student.setStatus({ 'name': 'Mission', 'class': 'fas fa-user-tag' });
        loadGroup(student.group, temStudents);
      } else if (student.status.name == 'Mission') {
        student.setStatus({ 'name': 'Absent', 'class': 'fas fa-user-times' });
        loadGroup(student.group, temStudents);
      } else {
        student.setStatus({ 'name': 'Present', 'class': 'fas fa-user-check' });
        loadGroup(student.group, temStudents);
      }
    })
    // - - - - - - - - - - end the status - - - - - - - - - - - - - -//
  
  
    // - - - - - - - - - - Adding type - - - - - - - - - - - - //
    const starStudent = document.getElementById('star-student-' + student.codeNumber);
    const bannerStatus = document.getElementById('banner-' + student.codeNumber);
    starStudent.addEventListener('click', (e) => {
      const className = bannerStatus.className;
      if (student.type.name == "normal") {
        student.setType({'name': 'gold','class':'banner-gold', 'avatar':'avatar-gold-img'});
        // bannerStatus.className = "banner-gold";
        loadGroup(student.group, temStudents);
      } else if (student.type.name == "gold") {
        // bannerStatus.className = "banner";
        student.setType({ 'name': 'normal', 'class': 'banner', 'avatar': 'avatar-img'});
        loadGroup(student.group, temStudents);
      }else{
        student.setType({ 'name': 'normal', 'class': 'banner', 'avatar': 'avatar-img' });
        loadGroup(student.group, temStudents);
      }
    })
  
    const medStudent = document.getElementById('med-student-' + student.codeNumber);
    medStudent.addEventListener('click', (e) => {
      // const className = bannerStatus.className;
      if (student.type.name == "normal") {
        // bannerStatus.className = "banner-care";
        student.setType({ 'name': 'low', 'class': 'banner-care', 'avatar': 'avatar-low-img'});
        loadGroup(student.group, temStudents);
      } else if (student.type.name == "low")  {
        // bannerStatus.className = "banner";
        student.setType({ 'name': 'normal', 'class': 'banner', 'avatar': 'avatar-img' });
        loadGroup(student.group, temStudents);
      }else{
        student.setType({ 'name': 'normal', 'class': 'banner', 'avatar': 'avatar-img' });
        loadGroup(student.group, temStudents);
      }
    })

    // Tools button functionality
    const toolsStudent = document.getElementById('tools-student-' + student.codeNumber);
    toolsStudent.addEventListener('click', (e) => {
        student.setTools();
        loadGroup(student.group, temStudents);
    });
    // Chat button functionality
    const chatStudent = document.getElementById('chat-student-' + student.codeNumber);
    chatStudent.addEventListener('click', (e) => {
        student.setChat();
        loadGroup(student.group, temStudents);
    });
    // Participation button functionality
    const participationStudent = document.getElementById('participation-student-' + student.codeNumber);
    participationStudent.addEventListener('click', (e) => {
        student.setParticipation();
        loadGroup(student.group, temStudents);
    });
    // Sleep not Focus button functionality
    const sleepStudent = document.getElementById('sleep-student-' + student.codeNumber);
    sleepStudent.addEventListener('click', (e) => {
        student.setSleep();
        loadGroup(student.group, temStudents);
    });
    // Note not following button functionality
    const noteStudent = document.getElementById('note-student-' + student.codeNumber);
    noteStudent.addEventListener('click', (e) => {
        student.setNote();
        loadGroup(student.group, temStudents);
    });
  
  
  
    const likeButton = document.getElementById('like-' + student.codeNumber)
  
    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('is-liked')
    })
  })

}


// - - - - - - - - RANDOM STUDENT FUNCTIONALITY - - - - - - - - - - - - - - - - 

const functionalityToRandomCards =  student => {

    document.getElementById("random-bad-behavior-btn-" + student.codeNumber).onclick = function () {
      student.setBadBehavior();
      renderRandom(student);
      loadGroup(student.group, temStudents);
    };
    document.getElementById("random-random-btn-" + student.codeNumber).onclick = function () {
      student.setRandom();
      if (student.random > 1 && student.type.name != "gold") {
        student.setType({ 'name': 'normal', 'class': 'banner', 'avatar': 'avatar-img' });
      }
      renderRandom(student);
      loadGroup(student.group, temStudents);
    };
    document.getElementById("random-random-sub-btn-" + student.codeNumber).onclick = function () {
      student.setRandomSub();
      if(student.random < -2 && student.random > -4){
        student.setType({ 'name': 'normal', 'class': 'banner' , 'avatar': 'avatar-img'});
      }else if (student.random <= -10){
        student.setType({ 'name': 'low', 'class': 'banner-care', 'avatar': 'avatar-low-img'});
      }
      renderRandom(student);
      loadGroup(student.group, temStudents);
    }; 

    // - - - - - - - - - Set the status of the student - - - - - - - - - //
    const userStatus = document.getElementById('random-user-status-'+student.codeNumber);
    userStatus.addEventListener('click', (e) => {
      const className = userStatus.firstElementChild.className;
      if (student.status.name == "Present") {
        student.setStatus({ 'name': 'Late', 'class': 'fas fa-user-clock'});
        renderRandom(student);
        loadGroup(student.group, temStudents);
      } else if (student.status.name == 'Late') {
        student.setStatus({ 'name': 'Mission', 'class': 'fas fa-user-tag' });
        renderRandom(student);
        loadGroup(student.group, temStudents);
      } else if (student.status.name == 'Mission') {
        student.setStatus({ 'name': 'Absent', 'class': 'fas fa-user-times' });
        renderRandom(student);
        loadGroup(student.group, temStudents);
      } else {
        student.setStatus({ 'name': 'Present', 'class': 'fas fa-user-check' });
        renderRandom(student);
        loadGroup(student.group, temStudents);
      }
    })
    // - - - - - - - - - - end the status - - - - - - - - - - - - - -//
  
  
    // - - - - - - - - - - Adding type - - - - - - - - - - - - //
    const starStudent = document.getElementById('random-star-student-' + student.codeNumber);
    const bannerStatus = document.getElementById('random-banner-' + student.codeNumber);
    starStudent.addEventListener('click', (e) => {
      const className = bannerStatus.className;
      if (student.type.name == "normal") {
        student.setType({'name': 'gold','class':'banner-gold', 'avatar':'avatar-gold-img'});
        // bannerStatus.className = "banner-gold";
        renderRandom(student);
        loadGroup(student.group, temStudents);
      } else if (student.type.name == "gold") {
        // bannerStatus.className = "banner";
        student.setType({ 'name': 'normal', 'class': 'banner', 'avatar': 'avatar-img'});
        renderRandom(student);
        loadGroup(student.group, temStudents);
      }else{
        student.setType({ 'name': 'normal', 'class': 'banner', 'avatar': 'avatar-img' });
        renderRandom(student);
        loadGroup(student.group, temStudents);
      }
    })
  
    const medStudent = document.getElementById('random-med-student-' + student.codeNumber);
    medStudent.addEventListener('click', (e) => {
      // const className = bannerStatus.className;
      if (student.type.name == "normal") {
        // bannerStatus.className = "banner-care";
        student.setType({ 'name': 'low', 'class': 'banner-care', 'avatar': 'avatar-low-img'});
        renderRandom(student);
        loadGroup(student.group, temStudents);
      } else if (student.type.name == "low")  {
        // bannerStatus.className = "banner";
        student.setType({ 'name': 'normal', 'class': 'banner', 'avatar': 'avatar-img' });
        renderRandom(student);
        loadGroup(student.group, temStudents);
      }else{
        student.setType({ 'name': 'normal', 'class': 'banner', 'avatar': 'avatar-img' });
        renderRandom(student);
        loadGroup(student.group, temStudents);
      }
    });

    // Tools button functionality
    const toolsStudent = document.getElementById('random-tools-student-' + student.codeNumber);
    toolsStudent.addEventListener('click', (e) => {
      student.setTools();
      renderRandom(student);
      loadGroup(student.group, temStudents);
    });
    // Chat button functionality
    const chatStudent = document.getElementById('random-chat-student-' + student.codeNumber);
    chatStudent.addEventListener('click', (e) => {
      student.setChat();
      renderRandom(student);
      loadGroup(student.group, temStudents);
    });
    // Participation button functionality
    const participationStudent = document.getElementById('random-participation-student-' + student.codeNumber);
    participationStudent.addEventListener('click', (e) => {
      student.setParticipation();
      renderRandom(student);
      loadGroup(student.group, temStudents);
    });
    // Sleep not Focus button functionality
    const sleepStudent = document.getElementById('random-sleep-student-' + student.codeNumber);
    sleepStudent.addEventListener('click', (e) => {
      student.setSleep();
      renderRandom(student);
      loadGroup(student.group, temStudents);
    });
    // Note not following button functionality
    const noteStudent = document.getElementById('random-note-student-' + student.codeNumber);
    noteStudent.addEventListener('click', (e) => {
      student.setNote();
      renderRandom(student);
      loadGroup(student.group, temStudents);
    });
  
  
  
    const likeButton = document.getElementById('random-like-' + student.codeNumber)
  
    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('is-liked')
    })

}